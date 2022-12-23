<template>
  <div class="q-pa-md" style="max-width: 400px">
    <q-form
      @submit="sendBitcoinInvoice"
      ref="btcInvoiceForm"
      class="q-gutter-md"
    >
      <q-input
        v-model="emailForBitcoinInvoice"
        type="email"
        placeholder="email"
        required
        hint="You will receive tokens in an email"
      />
      <div>
        <q-btn color="primary" type="submit" label="Generate address" />
      </div>
    </q-form>
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
