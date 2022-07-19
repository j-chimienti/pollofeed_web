import {
  BTC_USD,
  CLEAR_LOADING_INVOICE,
  DELAYED_INVOICE_PAID,
  LOADING_INVOICE,
  OPEN_INVOICE_MODAL,
  SET_INVOICE,
  SET_PAYMENT_TYPE
} from "src/store/mutations"
import { GET_INVOICE, INVOICE, INVOICE_PAID } from "src/store/actions"
import { LIGHTNING_INVOICE_STATUS, LocalStorageKeys, PAYMENT_TYPES } from "src/constants"
import _get from "lodash.get"
import { LocalStorage } from "quasar"
import { satsToUsd } from "src/services/moneyUtils"
const fmtbtc = require("fmtbtc")
const { msat2sat } = fmtbtc

const getters = {
  btc_usd: (state) => state.btc_usd,
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
  invoiceModuleVisible: (state) => state.invoiceModuleVisible,
  satoshi: state => {
    return msat2sat(_get(state.invoice, "amount_msat", 0), true)
  },
  feedPriceUSD: (_, getters) => {
    return satsToUsd(getters.satoshi)
  },
}

const loadIvoiceFromStorage = () => {
  try {
    const invOpt = LocalStorage.getItem(LocalStorageKeys.LIGHTNING_INVOICE)
    if (invOpt && typeof invOpt === "object" && invOpt.label) return invOpt
    else return null
  } catch (e) {
    return null
  }
}

function loadPaymentTypeFromStorage() {
  const defaultVal = PAYMENT_TYPES[0].type
  try {
    const pt = LocalStorage.getItem(LocalStorageKeys.PAYMENT_TYPE_KEY)
    if (typeof pt !== "string") return defaultVal
    else {
      const found = PAYMENT_TYPES.find((p) => p.type === pt)
      if (found) return found.type
      else return defaultVal
    }
  } catch (e) {
    return defaultVal
  }
}

const paymentType = loadPaymentTypeFromStorage()

const state = {
  paymentType,
  invoice: loadIvoiceFromStorage(),
  loadingInvoice: false,
  btc_usd: 30000,
  invoiceModuleVisible: false,
  invoiceInterval: null,
  feedPriceSats: 300, // todo: hardcode
  loadingInvoiceTime: {
    start: null,
    end: null,
  },
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
  [OPEN_INVOICE_MODAL](state) {
    state.invoiceModuleVisible = true
  },
  [DELAYED_INVOICE_PAID](state) {
    state.paymentType = "TOKENS"
    state.loadingInvoice = false
    state.invoiceModuleVisible = false
  },
}

const actions = {
  [INVOICE_PAID]({ commit, rootGetters }, label) {
    const tokenOpt = rootGetters.feedTokens.find((d) => d.label === label)
    if (tokenOpt) commit(DELAYED_INVOICE_PAID, tokenOpt)
  },
  [GET_INVOICE]({ getters }) {
    if (getters.invoiceStatus === LIGHTNING_INVOICE_STATUS.unpaid) {
      const id = getters.invoice.payment_hash
      getters.websocket._send({ WsGetInvoice: null, payment_hash: id })
    } else {
      // ignore expired and paid
    }
  },
  [INVOICE]({getters,  commit }, req) {
    const {delayFeeding, feedings} = req
    commit(LOADING_INVOICE)
    getters.websocket._send({ WsRequestLightingInvoice: null, delayFeeding, feedings })
  },

}

export const invoiceModule = { getters, state, mutations, actions }
