<template>
  <div>
    <div class="row justify-center">
      <div style="max-width: 400px">
        <p>$5.00 for 75 tokens <small>sent by email</small></p>
        <q-form
          @submit="sendBitcoinInvoice"
          ref="btcInvoiceForm"
          class="q-gutter-md"
        >
          <q-input
            v-model="emailForBitcoinInvoice"
            dense
            class="q-my-md"
            label="email"
            :lazy-rules="[(v) => isValidEmail(v)]"
            error-message="Please enter a valid email address."
          />
          <div>
            <ButtonV3 label="submit" />
          </div>
        </q-form>
      </div>
    </div>
    <BTCPayServerInvoice v-if="btcPayServerInvoice !== null" />
  </div>
</template>

<script>
import AppMixin from "../mixins/AppMixin"
import { Notify } from "quasar"
import ButtonV3 from "components/ButtonV3"
import BTCPayServerInvoice from "components/BTCPayServerInvoice"

export default {
  name: "BitcoinPayment",
  components: { BTCPayServerInvoice, ButtonV3 },
  data() {
    return { emailForBitcoinInvoice: "" }
  },
  mixins: [AppMixin],
  methods: {
    isValidEmail(val) {
      const emailPattern =
        /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/
      return emailPattern.test(val) || "Invalid email"
    },
    sendBitcoinInvoice() {
      this.$refs.btcInvoiceForm
        .validate()
        .then((success) => {
          if (success) this.BITCOIN_INVOICE(this.emailForBitcoinInvoice)
          else Notify.create("invalid email")
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
