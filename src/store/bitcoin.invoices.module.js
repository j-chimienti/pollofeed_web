import {
  BTC_USD,
  CLEAR_LOADING_INVOICE,
  CLOSE_INVOICE_MODAL,
  LOADING_INVOICE,
  OPEN_INVOICE_MODAL,
  SET_INVOICE,
  SET_PAYMENT_TYPE
} from "src/store/mutations";
import {
  API_INVOICE,
  GET_INVOICE,
  INVOICE, PENDING_INVOICE_TIMEOUT,
  WEBSOCKET_INVOICE
} from "src/store/actions";
import {websocketMessageFactory} from "src/services/messageFactory";
import {LIGHTNING_INVOICE_STATUS, PAYMENT_TYPE_KEY} from "src/constants";

const getters = {
  btc_usd: state => state.btc_usd,
  invoice: state => state.invoice,
  bolt11: state => state.invoice.bolt11,
  paymentType: state => state.paymentType,
  loadingInvoice: state => state.loadingInvoice,
  invoiceModuleVisible: state => state.invoiceModuleVisible,
  invoiceInterval: state => state.invoiceInterval,
}

const state = {
  paymentType: localStorage.getItem(PAYMENT_TYPE_KEY) || "INVOICE",
  invoice: {},
  loadingInvoice: false,
  btc_usd: null,
  invoiceModuleVisible: false,
  invoiceInterval: null
}

const mutations = {
  [LOADING_INVOICE](state) { state.loadingInvoice = true },
  [CLEAR_LOADING_INVOICE](state) { state.loadingInvoice = false },
  [SET_INVOICE] (state, invoice) {
    state.invoice = invoice
  },
  [BTC_USD] (state, btc_usd) { state.btc_usd = btc_usd },
  [SET_PAYMENT_TYPE] (state, paymentType) {
    localStorage.setItem(PAYMENT_TYPE_KEY, paymentType)
    state.paymentType = paymentType
  },
  [OPEN_INVOICE_MODAL](state) { state.invoiceModuleVisible = true },
  [CLOSE_INVOICE_MODAL](state) { state.invoiceModuleVisible = false },
  ["PENDING_INVOICE_TIMEOUT"](state, to) { state.invoiceInterval = to },
  ["CLEAR_PENDING_INVOICE_TIMEOUT"](state) {
    clearInterval(state.invoiceInterval)
    state.invoiceInterval = null
  }
}

const actions = {
  [PENDING_INVOICE_TIMEOUT]({dispatch, commit}, inv) {  commit("PENDING_INVOICE_TIMEOUT", setTimeout(() => dispatch(GET_INVOICE, inv), 5000)) },
  [GET_INVOICE]({getters, commit}) {
    if (getters.invoice && getters.invoice.status && getters.invoice.status === LIGHTNING_INVOICE_STATUS.unpaid) {
      const id = getters.invoice.payment_hash
      if (getters.connectedToWebsocket)
        getters.websocket._send({WsGetInvoice: null, payment_hash: id})
      else
        return fetch("/api/invoice/" + id, {method: "get"})
        .then(res => res.json())
        .then(res => websocketMessageFactory(this,res))

    }
  },
  [INVOICE]({getters, dispatch}, delayFeeding = false) {
    if (!getters.connectedToWebsocket) {
      return dispatch(API_INVOICE, delayFeeding)
    } else {
      return dispatch(WEBSOCKET_INVOICE, delayFeeding)
    }
  },
  [WEBSOCKET_INVOICE]({getters, commit}, delayFeeding) {
    commit(LOADING_INVOICE)
    getters.websocket._send({WsRequestLightingInvoice: null, delayFeeding})
  },
  [API_INVOICE]({getters, commit}, delayFeeding) {
    const body = JSON.stringify({WsRequestLightingInvoice: null, delayFeeding})
    commit(LOADING_INVOICE)
    return fetch("/api/invoice", {method: "post", body, headers: {"content-type": "application/json"}})
    .then(res => res.json())
    .then(invoice => {
      return websocketMessageFactory(this,{invoice})
    }).finally(() => commit(CLEAR_LOADING_INVOICE))
  },
}

export const invoiceModule = {getters, state, mutations, actions}
