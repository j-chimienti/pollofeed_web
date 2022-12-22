<template>
  <div>
    <q-form @submit="sendBitcoinInvoice" ref="btcInvoiceForm">
      <q-input
        v-model="emailForBitcoinInvoice"
        type="email"
        placeholder="email"
        required
      />
      <q-btn color="primary" type="submit">Generate address</q-btn>
      <p>
        Submit email to generate address. You will receive a token via email
      </p>
    </q-form>
    <a v-if="bitcoinAddress" :href="href">{{ bitcoinAddress }}</a>
  </div>
</template>

<script>
import AppMixin from "../mixins/AppMixin"
import { Notify } from "quasar"

export default {
  name: "BitcoinPayment",
  data() {
    return { emailForBitcoinInvoice: "" }
  },
  mixins: [AppMixin],
  methods: {
    sendBitcoinInvoice() {
      this.$refs.btcInvoiceForm
        .validate()
        .then(() => {
          this.BITCOIN_INVOICE(this.emailForBitcoinInvoice)
        })
        .catch((err) => {
          Notify.create("invalid " + err)
        })
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
