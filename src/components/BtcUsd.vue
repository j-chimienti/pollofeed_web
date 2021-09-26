<template>
  <span v-if="btc_usd">btc=${{btc_usd.toLocaleString()}}</span>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "BtcUsd",
  computed: {
    ...mapGetters(['btc_usd'])
  },
}
</script>

<style scoped>

</style>
