<template>
  <div>
    <p>Submit email for order. You will receive a token via email</p>
    <q-form @submit="sendBitcoinInvoice">
      <q-input
        v-model="emailForBitcoinInvoice"
        type="email"
        placeholder="email"
        required
      />
      <q-btn type="submit">send</q-btn>
    </q-form>
    <a v-if="bitcoinAddress" :href="href">{{ bitcoinAddress }}</a>
  </div>
</template>

<script>
import AppMixin from "../mixins/AppMixin"

export default {
  name: "BitcoinPayment",
  data() {
    return { emailForBitcoinInvoice: "jchimien@gmail.com" }
  },
  mixins: [AppMixin],
  methods: {
    sendBitcoinInvoice() {
      this.BITCOIN_INVOICE(this.emailForBitcoinInvoice)
    },
  },
  computed: {
    href() {
      return `bitcoin:${this.bitcoinAddress}`
    },
  },
}
</script>

<style scoped>
a {
  color: var(--q-primary);
}
</style>
