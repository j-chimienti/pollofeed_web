import {
  BTC_USD,
  CLEAR_LOADING_INVOICE,
  DELAYED_INVOICE_PAID,
  LOADING_INVOICE,
  OPEN_INVOICE_MODAL,
  SET_INVOICE,
  SET_PAYMENT_TYPE,
} from "src/store/mutations"
import {
  API_INVOICE,
  GET_INVOICE,
  INVOICE,
  INVOICE_PAID,
  WEBSOCKET_INVOICE,
} from "src/store/actions"
import { websocketMessageFactory } from "src/services/messageFactory"
import {
  LIGHTNING_INVOICE_STATUS,
  LocalStorageKeys,
  PAYMENT_TYPES,
} from "src/constants"
import _get from "lodash.get"
import { LocalStorage, Notify } from "quasar"
import { satsToUsd } from "src/services/moneyUtils"

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
  feedPriceUSD: (state) => satsToUsd(state.feedPriceSats, state.btc_usd),
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
    if (
      invoice &&
      typeof invoice === "object" &&
      _get(invoice, "status", null) !== null
    )
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
      if (getters.connectedToWebsocket)
        getters.websocket._send({ WsGetInvoice: null, payment_hash: id })
      else
        return fetch("/api/invoice/" + id, { method: "get" })
          .then((res) => res.json())
          .then((res) => websocketMessageFactory(this, res))
    } else {
      // ignore expired and paid
    }
  },
  [INVOICE]({ getters, dispatch, commit }, delayFeeding = false) {
    commit(LOADING_INVOICE)
    if (!getters.connectedToWebsocket) {
      return dispatch(API_INVOICE, delayFeeding)
    } else {
      return dispatch(WEBSOCKET_INVOICE, delayFeeding)
    }
  },
  [WEBSOCKET_INVOICE]({ getters, commit }, delayFeeding) {
    commit(LOADING_INVOICE)
    getters.websocket._send({ WsRequestLightingInvoice: null, delayFeeding })
  },
  [API_INVOICE]({ commit }, delayFeeding) {
    const body = JSON.stringify({
      WsRequestLightingInvoice: null,
      delayFeeding,
    })
    commit(LOADING_INVOICE)
    return fetch("/api/invoice", {
      method: "post",
      body,
      headers: { "content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((invoice) => {
        return websocketMessageFactory(this, { invoice })
      })
      .catch(() => {
        Notify.create({ type: "negative", message: "Error creating invoice" })
      })
      .finally(() => commit(CLEAR_LOADING_INVOICE))
  },
}

export const invoiceModule = { getters, state, mutations, actions }
