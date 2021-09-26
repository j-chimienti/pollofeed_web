<template>
<div>
   <div class="q-my-3" v-if="delayedFeedingResponse">
     {{delayedFeedingResponse}}
   </div>
   <p v-if="!feedTokens.length" class="text-grey">
     No delayed orders found
   </p>
     <div v-for="feedToken in feedTokens" :key="feedToken" class="row flex justify-around">
         <q-input readonly :model-value="feedToken"/>
              <q-btn @click="feed(feedToken)" rounded color="green">Feed</q-btn>
           <q-btn @click="removeToken(feedToken)" color="red"  icon="delete"/>

     </div>
     <q-input v-model="manualFeedToken" placeholder="enter token" class="q-my-md"/>
   <q-btn @click="manualFeed" color="primary" label="Feed"/>
</div>
</template>

<script>
import {DELAY_FEEDING} from "../store/actions";
import {mapGetters} from "vuex";
import {REMOVE_FEED_TOKEN} from "../store/mutations";

export default {
  name: "DelayFeeding",
  data() { return { manualFeedToken: ""}},
  computed: {
    ...mapGetters(['delayedFeedingResponse', 'websocket', 'feedTokens'])
  },
  methods: {
    manualFeed() {
      const id = this.manualFeedToken.trim()
      return this.feed(id)
    },
    removeToken(id) {
      if (id) return this.$store.commit(REMOVE_FEED_TOKEN, id)
      else alert("invalid request")
    },
    feed(id) {
      return this.$store.dispatch(DELAY_FEEDING, id)
    }
  }
}
</script>

<style scoped>

</style>
