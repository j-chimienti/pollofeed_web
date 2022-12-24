<template>
  <div class="q-pa-md">
    <p>$5.00 for 75 tokens <small>sent by email</small></p>
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
      />
      <div>
        <ButtonV3 label="generate address" />
      </div>
    </q-form>
  </div>
</template>

<script>
import AppMixin from "../mixins/AppMixin"
import { Notify } from "quasar"
import ButtonV3 from "components/ButtonV3"

export default {
  name: "BitcoinPayment",
  components: { ButtonV3 },
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
