<script>
import { mapActions, mapGetters, mapMutations } from "vuex"
import { DELAY_FEEDING, GET_INVOICE, INVOICE } from "../store/actions"
import { LIGHTNING_URL, PAYMENT_TYPES } from "../constants"
import {
  FEEDINGS,
  SET_DELAYED_FEEDING,
  SET_INVOICE,
  SET_USE_TOKEN_NOW,
} from "../store/mutations"

import { RESUME_SESSION } from "../auth/actions"
import { LOGIN_TYPE } from "src/auth/mutations"

export default {
  name: "AppMixin",
  data() {
    return {
      lnurl: LIGHTNING_URL,
      displayUrl: "lightning:" + LIGHTNING_URL.toUpperCase(),
      PAYMENT_TYPES,
      paymentTypes: PAYMENT_TYPES,
      lightningAddress: process.env.LIGHTNING_ADDRESS,
    }
  },
  methods: {
    ...mapActions([INVOICE, GET_INVOICE, DELAY_FEEDING, RESUME_SESSION]),
    ...mapMutations([
      SET_USE_TOKEN_NOW,
      SET_INVOICE,
      SET_DELAYED_FEEDING,
      FEEDINGS,
      LOGIN_TYPE,
    ]),
  },
  computed: {
    feedings: {
      get() {
        return this.$store.getters.feedings
      },
      set(f) {
        this.FEEDINGS(f)
      },
    },
    ...mapGetters([
      "user",
      "email",
      "picture",
      "authenticated",
      "bitcoinAddress",
      "connectedToWebsocket",
      "invoiceUnpaid",
      "invoiceStatus",
      "invoiceExpired",
      "invoicePaid",
      "delayedFeedingResponse",
      "userEmail",
      "websocket",
      "showFeedNow",
      "feedPriceUSD",
      "feedTokens",
      "loginType",
      "invoice",
      "qr",
      "bolt11",
      "btc_usd",
      "modals",
      "loadingInvoice",
      "buttonDisabled",
      "paymentType",
    ]),
  },
}
</script>

<style scoped></style>
