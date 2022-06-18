<script>
import { satsToUsd } from "../services/moneyUtils"
import { mapActions, mapGetters, mapMutations } from "vuex"
import { DELAY_FEEDING, GET_INVOICE, INVOICE } from "../store/actions"
import { PAYMENT_TYPES } from "../constants"
import {
  SET_DELAYED_FEEDING,
  SET_INVOICE,
  SET_USE_TOKEN_NOW,
} from "../store/mutations"

export default {
  name: "AppMixin",
  data() {
    const url = process.env.LIGHTNING_URL
    const urlD = process.env.LIGHTNING_URL_DELAYED
    return {
      lnurl: url,
      lnurlDelayed: urlD,
      displayUrl: "lightning:" + url.toUpperCase(),
      displayUrlDelayed: "lightning:" + urlD.toUpperCase(),
      PAYMENT_TYPES,
      paymentTypes: PAYMENT_TYPES,
      lightningAddress: process.env.LIGHTNING_ADDRESS
    }
  },
  methods: {
    satsToUsd,
    ...mapActions([INVOICE, GET_INVOICE, DELAY_FEEDING]),
    ...mapMutations([SET_USE_TOKEN_NOW, SET_INVOICE, SET_DELAYED_FEEDING]),
  },
  computed: {
    ...mapGetters([
      "invoiceUnpaid",
      "invoiceStatus",
      "invoiceExpired",
      "invoicePaid",
      "delayedFeedingResponse",
      "websocket",
      "showFeedNow",
      "feedPriceUSD",
      "feedTokens",
      "invoice",
      "qr",
      "bolt11",
      "btc_usd",
      "modals",
      "loadingInvoice",
      "invoiceModuleVisible",
      "buttonDisabled",
      "paymentType",
    ]),
  },
}
</script>

<style scoped></style>
