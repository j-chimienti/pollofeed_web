<script>
import { mapActions, mapGetters, mapMutations } from "vuex"
import {
  BITCOIN_INVOICE,
  DELAY_FEEDING,
  GET_INVOICE,
  INVOICE,
} from "../store/actions"
import { LIGHTNING_URL, PAYMENT_TYPES } from "../constants"
import {
  FEEDINGS,
  SET_DELAYED_FEEDING,
  SET_INVOICE,
  SET_PAYMENT_TYPE,
  SET_USE_TOKEN_NOW,
} from "../store/mutations"

import { RESUME_SESSION } from "../auth/actions"
import { LOGIN_TYPE } from "src/auth/mutations"

import logo from "../assets/img/PF/PF_profile_01.jpg"
export default {
  name: "AppMixin",
  data() {
    return {
      lnurl: LIGHTNING_URL,
      displayUrl: "lightning:" + LIGHTNING_URL.toUpperCase(),
      PAYMENT_TYPES,
      logo,
      paymentTypes: PAYMENT_TYPES,
      lightningAddress: process.env.LIGHTNING_ADDRESS,
    }
  },
  methods: {
    isValidEmail(val) {
      const emailPattern =
        /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/
      return emailPattern.test(val) || "Invalid email"
    },
    ...mapActions([
      INVOICE,
      GET_INVOICE,
      DELAY_FEEDING,
      RESUME_SESSION,
      BITCOIN_INVOICE,
    ]),
    ...mapMutations([
      SET_USE_TOKEN_NOW,
      SET_PAYMENT_TYPE,
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
      "btcPayServerInvoice",
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
