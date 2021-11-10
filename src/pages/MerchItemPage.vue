<template>
  <q-page padding>
   <SplashScreen v-if="loading"/>
    <div v-else>
      <div v-if="error">{{error}}</div>
      <div v-if="merchItem">
        <div>
          {{merchItem.shippedAt ? "SHIPPED" : "NOT SHIPPED"}}
        </div>
        <div v-html="merchItem.purchaseInfo">
        </div>
        <div v-html="merchItem.purchaseItems"></div>
        <q-input type="textarea" :model-value="JSON.stringify(merchItem, null, 4)" />
      </div>
    </div>
  </q-page>
</template>

<script>
import {mapGetters} from "vuex";
import {MERCH_ITEM} from "src/store/mutations";
import SplashScreen from "components/SplashScreen";

export default {
  components: {SplashScreen},
  // name: 'PageName',
  data() {
    return { error: null, loading: true }
  },
  computed: {
    ...mapGetters(['merchItem'])
  },
  mounted() {
    this.loading = true
    fetch("/api/merch/" + this.$route.params.id, {method: "POST"})
    .then(res => res.json())
    .then(item => {
      this.$store.commit(MERCH_ITEM, item)
      return item;
    })
    .catch(err => this.error = "Not found " + this.$route.params.id)
    .finally(() => this.loading = false)
  }
}
</script>
