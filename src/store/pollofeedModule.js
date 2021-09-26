import {
  API_INVOICE,
  BTCPAYSERVER_INVOICE_REQUEST,
  DELAY_FEEDING,
  INVOICE,
  OPEN_WEBSOCKET,
  WEBSOCKET_INVOICE
} from "./actions";
import {
  ADD_FEED_TOKEN,
  BTC_USD,
  CLEAR_LOADING_INVOICE,
  CLOSE_DELAY_FEEDING_MODAL,
  CLOSE_INVOICE_MODAL,
  DELAYED_FEEDING_FAILURE,
  DELAYED_FEEDING_SUCCESS,
  FEEDER_DONE_SPINNING,
  FEEDER_SPINNING,
  LOADING_BTCPAYSERVER_INVOICE,
  LOADING_INVOICE,
  OPEN_INVOICE_MODAL,
  REMOVE_FEED_TOKEN,
  SET_DELAYED_FEEDING,
  SET_INVOICE,
  WEBSOCKET_CLOSED,
  WEBSOCKET_OPEN
} from "./mutations";
import {WebsocketService} from "../services/WebsocketService";
import {websocketMessageFactory} from "../services/Ws";

export const pollofeedModule = {
  getters: {
    isDelayedOrder: state => state.delayFeeding === "delayed",
    btc_usd: state => state.btc_usd,
    loadingInvoice: state => state.loadingInvoice,
    loadingBtcpayserverInvoice: state => state.loadingBtcpayserverInvoice,
    invoice: state => state.invoice,
    payreq: state => state.invoice.payreq,
    qr: state => state.qr,
    ordersByDay: state => state.ordersByDay,
    feederSpinning : state => state.feederSpinning,
    websocket: state => state.websocket,
    connectedToWebsocket: state => state.websocket !== null,
    feedTokens: state => state.feedTokens,
    delayedFeedingResponse: state => state.delayedFeedingResponse,
    delayFeeding: state => state.delayFeeding,
    buttonDisabled: state => state.loadingInvoice,
    modals: state => state.modals,
  },
  state: {
    delayFeeding: "not_delayed",
    feederSpinning: null,
    websocket: null,
    loadingBtcpayserverInvoice: false,
    invoice: {},
    feedTokens: [],
    btc_usd: null,
    loadingInvoice: false,
    qr: null,
    modals: {
      invoice: {
        visible: false
      },
      success: {
        visible: false
      },
      delayFeeding: {
        visible: false
      }
    },
    // admin
    delayedFeedingResponse: null,
  },
  mutations: {
    [SET_DELAYED_FEEDING] (state, delayFeeding) { state.delayFeeding = delayFeeding },
    [SET_INVOICE] (state, invoice) { state.invoice = invoice },
    [BTC_USD] (state, btc_usd) { state.btc_usd = btc_usd },
    [WEBSOCKET_OPEN](state, ws) { state.websocket = ws },
    [WEBSOCKET_CLOSED](state) { state.websocket = null },
    [FEEDER_DONE_SPINNING](state) {  state.feederSpinning = false },
    [FEEDER_SPINNING](state) {  state.feederSpinning = true },
    [LOADING_INVOICE](state) { state.loadingInvoice = true },
    [CLEAR_LOADING_INVOICE](state) { state.loadingInvoice = false },
    [ADD_FEED_TOKEN](state, feedToken) {
      if (!state.feedTokens.find(t => t === feedToken))
        state.feedTokens.push(feedToken)
    },
    [REMOVE_FEED_TOKEN](state, token) { state.feedTokens = state.feedTokens.filter(ft => ft !== token) },
    [DELAYED_FEEDING_SUCCESS](state, message) { state.delayedFeedingResponse = message },
    [DELAYED_FEEDING_FAILURE](state, message) { state.delayedFeedingResponse = message },
    [CLOSE_DELAY_FEEDING_MODAL](state) {
      state.modals.delayFeeding.visible = false
      state.delayedFeedingResponse = ""
    },
    [OPEN_INVOICE_MODAL](state) { state.modals.invoice.visible = true },
    [CLOSE_INVOICE_MODAL](state) { state.modals.invoice.visible = false },
    [LOADING_BTCPAYSERVER_INVOICE](state, loading = true) { state.loadingBtcpayserverInvoice = loading }
  },
  actions: {
    [DELAY_FEEDING]({getters}, token) {
      getters.websocket._send({WsDelayFeedingRequest: null, token})
    },
    [WEBSOCKET_INVOICE]({getters, commit}, delayFeeding) {
      commit(LOADING_INVOICE)
      getters.websocket._send({WsRequestLightingInvoice: null, delayFeeding})
    },
    [API_INVOICE]({getters, commit}, delayFeeding) {
      const body = JSON.stringify({WsRequestLightingInvoice: null, delayFeeding})
      commit(LOADING_INVOICE)
      return fetch("/invoice", {method: "post", body, headers: {"content-type": "application/json"}})
        .then(res => res.json())
        .then(invoice => {
          return websocketMessageFactory(this,{invoice})
        }).finally(() => commit(CLEAR_LOADING_INVOICE))
    },
    [BTCPAYSERVER_INVOICE_REQUEST]({getters, commit}, invoice) {
      commit(LOADING_BTCPAYSERVER_INVOICE, true)
      getters.websocket._send({WsBtcpayServerInvoiceRequest: null, invoice})
      return router.push({name: "splash"})
    },
    [INVOICE]({getters, dispatch}, delayFeeding = false) {
      if (!(getters.connectedToWebsocket && getters.websocket.ws.readyState === 1)) {
        return dispatch(API_INVOICE, delayFeeding)
      } else {
        return dispatch(WEBSOCKET_INVOICE, delayFeeding)
      }
    },
    [OPEN_WEBSOCKET](store) {
      const {commit} = store
      return new WebsocketService(store, process.env.VUE_APP_WS_PATH,  websocketMessageFactory).then((ws) => {
        commit(WEBSOCKET_OPEN, ws)
      }).catch(err => {
        console.error(err)
        commit(WEBSOCKET_CLOSED)
      })
    },
  }
}
