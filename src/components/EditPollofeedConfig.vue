<template>
  <q-form @submit.prevent="setPollofeedConfig">
    <q-form-group
      id="input-group-feed-price"
      description="cost to feed chickens in satoshis"
      label="price"
    >
      <q-form-input
        required
        type="number"
        v-model="feedPrice"
        id="baseFeedPrice"
        placeholder="satoshis"
      ></q-form-input>
    </q-form-group>
    <q-form-group id="input-group-price-increase" label="increase price">
      <q-form-checkbox
        v-model="applyFeedPriceFactor"
        id="applyFeedPriceFactor"
        required
        value="1"
        unchecked-value="0"
      ></q-form-checkbox>
    </q-form-group>
    <q-form-group id="feed-seconds" label="feed seconds">
      <q-form-input
        required
        type="number"
        v-model="feedTime"
        id="feedTime"
        placeholder="feed seconds"
      ></q-form-input>
    </q-form-group>
    <q-btn type="submit">Update</q-btn>
  </q-form>
</template>

<script>
import { mapGetters } from "vuex"
import { UPDATE_CONFIG } from "../store/actions"

export default {
  name: "EditPollofeedConfig",
  data() {
    return { feedPrice: 50, feedTime: 14 }
  },
  computed: {
    ...mapGetters(["pollofeedConfig"]),
    baseFeedPrice() {
      return this.pollofeedConfig.baseFeedPrice
    },
    applyFeedPriceFactor() {
      return this.pollofeedConfig.applyFeedPriceFactor
    },
    baseFeedTime() {
      return this.pollofeedConfig.feedTime
    },
  },
  methods: {
    setPollofeedConfig() {
      const { feedPrice, applyFeedPriceFactor, feedTime } = this
      const config = {
        baseFeedPrice: parseInt(feedPrice),
        feedTime: parseInt(feedTime),
        applyFeedPriceFactor: Boolean(parseInt(applyFeedPriceFactor)),
      }
      this.$store.dispatch(UPDATE_CONFIG, config)
    },
  },
}
</script>

<style scoped></style>
