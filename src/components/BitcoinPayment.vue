<template>
<div>
  <a v-if="bitcoinAddress" :href="href">{{bitcoinAddress}}</a>
</div>
</template>

<script>
  import AppMixin from "../mixins/AppMixin"

  export default {
    name: "BitcoinPayment",
    mixins: [AppMixin],
    computed: {
      href() { return `bitcoin:${this.bitcoinAddress}`}
    }
  }
</script>

<style scoped>
a {
  color: var(--q-primary);
}
</style>
