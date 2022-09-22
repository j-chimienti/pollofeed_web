import {
  BITCOIN_ADDRESS,
  BTC_USD,
  CLEAR_LOADING_INVOICE,
  DELAYED_INVOICE_PAID,
  LOADING_INVOICE,
  SET_INVOICE,
  SET_PAYMENT_TYPE
} from "src/store/mutations"
import { GET_INVOICE, INVOICE, INVOICE_PAID } from "src/store/actions"
import { LIGHTNING_INVOICE_STATUS, LocalStorageKeys } from "src/constants"
import _get from "lodash.get"
import { LocalStorage, Notify } from "quasar"
import { satsToUsd } from "src/services/moneyUtils"
import { loadPaymentTypeFromStorage, loadIvoiceFromStorage } from "src/store/localStorageHelper"

const fmtbtc = require("fmtbtc")
const { msat2sat } = fmtbtc

const paymentType = loadPaymentTypeFromStorage()


const getters = {
  btc_usd: (state) => state.btc_usd,
  bitcoinAddress: (state) => state.bitcoinAddress,
  invoice: (state) => state.invoice,
  invoiceStatus: (state) => _get(state.invoice, "status", null),
  invoicePaid: (state, getters) =>
    getters.invoiceStatus === LIGHTNING_INVOICE_STATUS.paid,
  invoiceUnpaid: (state, getters) =>
    getters.invoiceStatus === LIGHTNING_INVOICE_STATUS.unpaid,
  invoiceExpired: (state, getters) =>
    getters.invoiceStatus === LIGHTNING_INVOICE_STATUS.expired,
  bolt11: (state) => _get(state.invoice, "bolt11", null),
  paymentType: (state) => state.paymentType,
  loadingInvoice: (state) => state.loadingInvoice,
  satoshi: state => {
    return msat2sat(_get(state.invoice, "amount_msat", 0))
  },
  feedPriceUSD: (_, getters) => {
    return satsToUsd(getters.satoshi, getters.btc_usd)
  },
}


const state = {
  paymentType,
  invoice: loadIvoiceFromStorage(),
  loadingInvoice: false,
  btc_usd: 1,
  bitcoinAddress: null
}

const mutations = {
  [LOADING_INVOICE](state) {
    state.loadingInvoice = true
  },
  [CLEAR_LOADING_INVOICE](state) {
    state.loadingInvoice = false
  },
  [SET_INVOICE](state, invoice) {
    state.invoice = invoice
    state.loadingInvoice = false
    LocalStorage.set(LocalStorageKeys.LIGHTNING_INVOICE, invoice)
  },
  [BTC_USD](state, btc_usd) {
    state.btc_usd = btc_usd
  },
  [SET_PAYMENT_TYPE](state, paymentType) {
    state.paymentType = paymentType
    if (typeof paymentType === "string")
      LocalStorage.set(LocalStorageKeys.PAYMENT_TYPE_KEY, paymentType)
  },
  [DELAYED_INVOICE_PAID](state) {
    state.paymentType = "TOKENS"
    state.loadingInvoice = false
  },
  [BITCOIN_ADDRESS](s, addr) { s.bitcoinAddress = addr }
}

const actions = {
  [INVOICE_PAID]({ commit, rootGetters }, label) {
    const tokenOpt = rootGetters.feedTokens.find((d) => d === label)
    if (tokenOpt) commit(DELAYED_INVOICE_PAID, tokenOpt)
  },
  [GET_INVOICE]({ getters }) {
    if (getters.invoiceStatus === LIGHTNING_INVOICE_STATUS.unpaid) {
      const label = getters.invoice.label
      if (getters.websocket) getters.websocket._send({ WsGetInvoice: null, label })
      else console.log("ws not connected")
    } else {
      // ignore expired and paid
    }
  },
  [INVOICE]({getters }, req) {
    const {delayFeeding, feedings} = req
    if (getters.websocket)
       getters.websocket._send({ WsRequestLightingInvoice: null, delayFeeding, feedings })
    else Notify.create({
      type: "negative",
      icon: "fas fa-sad-cry",
      message: "websocket not connected"
    })
  },

}

export const invoiceModule = { getters, state, mutations, actions }
