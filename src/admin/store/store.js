import Vuex from "vuex";
import Vue from 'vue'
import {adminWebsocketPath} from "@/constants";
import {LOGIN, MARK_SHIPPED, OPEN_ADMIN_WEBSOCKET, RESUME_SESSION, UPDATE_CONFIG} from "@/admin/store/actions";
import {
  ADD_ALERT,
  CLIENT_COUNT,
  LOGGED_IN,
  LOGGED_OUT,
  LOGGING_IN,
  LOGOUT,
  ORDERS_BY_DAY,
  ORDERS_VIEW,
  POLLOFEED_CONFIG,
  PROCESSING_INVOICES,
  SWAG_INVOICES,
  TOTAL_ORDER_COUNT
} from "@/admin/store/mutations";
import {storeItems} from "@/inventory";
import {WebsocketService} from "@/services/WebsocketService";
import {router} from "@/admin/router";
import {websocketMessageFactory} from "@/admin/store/messageFactory";
import {LOGIN_ERROR, WEBSOCKET_CLOSED, WEBSOCKET_OPEN} from "@/store/mutations";

// todo: move to model
function OrderViewC(info) {

  const order = info.order.length ? info.order[0] : null
  const hasOrder = order !== null
  const created_at = new Date(info.created_at)
  try { var paid_at = new Date(info.paid_at)  } catch { paid_at = null }
  try { var feedToken = order.metadata.feedToken } catch { feedToken = null }
  try { var acknowledged_at = new Date(order.acknowledged_at) } catch { acknowledged_at = null }

  // todo: create status text
  return Object.assign({}, info, {order, created_at, hasOrder, feedToken, acknowledged_at, paid_at })


}

Vue.use(Vuex)


export const store = new Vuex.Store({
  getters: {
    orders : state => state.orders,
    loginError : state => state.loginError,
    loggingIn : state => state.loggingIn,
    ordersByDay: state => state.ordersByDay,
    processingInvoices : state => state.processingInvoices,
    clientCount : state => state.clientCount,
    totalOrderCount: state => state.totalOrderCount,
    todayOrderCount: state => state.todayOrderCount,
    swagInvoices: state => state.swagInvoices,
    isLoggedIn: state => state.isLoggedIn,
    pollofeedConfig: state => state.pollofeedConfig,
    websocket: state => state.websocket,
    connectedToWebsocket: state => state.websocket !== null,
    ordersView: state => state.ordersView,
    alerts: state => state.alerts,
  },
  state: {
    isLoggedIn: false,
    loggingIn: false,
    loginError: null,
    todayOrderCount: 0,
    alerts: [],
    ordersView: [],
    ordersByDay: [],
    websocket: null,
    clientCount: null,
    pollofeedConfig: {
      baseFeedPrice: null,
      modifiedAt: null,
      id: null,
      applyFeedPriceFactor: null,
      feedTime: null
    },
    // admin
    swagInvoices: [],
    orders: null,
    totalOrderCount: null,
    processingInvoices: null,
    delayedFeedingResponse: null,
  },
  mutations: {
    [LOGGING_IN](state, loggingIn) { state.loggingIn = loggingIn; state.loginError = null; },
    [LOGIN_ERROR](state, loginError) { state.loginError = loginError; state.isLoggedIn = false },
    [WEBSOCKET_CLOSED](state) { state.websocket = null },
    [LOGGED_IN](state) { state.isLoggedIn = true; state.loggingIn = false },
    [LOGGED_OUT](state) { state.isLoggedIn = false; state.loggingIn = false },
    [POLLOFEED_CONFIG](state, config) { state.pollofeedConfig = config },
    [ADD_ALERT](state, alert) {
      function Alert(message) {
        const id = new Date()
        return {message, id}
      }
      const a = new Alert(alert)
      state.alerts = state.alerts.concat(a)
      setTimeout(() => {
        state.alerts = state.alerts.filter(a => a.id !== a.id)
      }, 5000)

    },
    [ORDERS_BY_DAY](state, ordersByDay) {
      state.ordersByDay = ordersByDay
      const sortedOrders = ordersByDay.sort((a, b) => new Date(b.day) - new Date(a.day))
      const todayOrders = sortedOrders[0]
      state.todayOrderCount = todayOrders ? todayOrders.orders : 0
    },
    [ORDERS_VIEW](state, ordersView) { state.ordersView = ordersView.map(o => new OrderViewC(o)) },
    [CLIENT_COUNT](state, clientCount) { state.clientCount = clientCount },
    [TOTAL_ORDER_COUNT](state, totalOrderCount) { state.totalOrderCount = totalOrderCount },

    [SWAG_INVOICES](state, swagInvoices) {
      state.swagInvoices = swagInvoices.map(i => ({...i,
        paid_at: new Date(i.paid_at),
        expires_at: new Date(i.expires_at),
        acknowledged_at: new Date(i.acknowledged_at),
        items: i.items.map(item => {
          var f = storeItems.find(si => si.id === item.id)
          if (!f) f = storeItems[0]
          return Object.assign({}, item, {
            image: f.image
          })
        })
      }))
    },
    [PROCESSING_INVOICES](state, processingInvoices) {
      state.processingInvoices = processingInvoices
    },
    [WEBSOCKET_OPEN](state, ws) { state.websocket = ws },
  },
  actions: {
    [UPDATE_CONFIG]({getters}, config) {
      const c = Object.assign({}, config, {_id: -1, modifiedAt: new Date(), feedTime: config.feedTime + "s"})
      getters.websocket._send({WsUpdatePollofeedConfig: null, config: c})
    },
    [OPEN_ADMIN_WEBSOCKET]({commit}) {
      return new WebsocketService(adminWebsocketPath,  websocketMessageFactory).then((ws) => {
        commit(WEBSOCKET_OPEN, ws)
      }).catch(err => {
        console.error(err)
        commit(WEBSOCKET_CLOSED)
      })
    },

    [RESUME_SESSION]({commit}) {
      commit(LOGGING_IN, true)
      fetch("/admin/resumeSession")
        .then(r => {
          commit(LOGGING_IN, false)
          if (r.ok) {
            commit(LOGGED_IN)
            return this.dispatch(OPEN_ADMIN_WEBSOCKET)
          } else this.dispatch(LOGOUT)
        })
        .catch(() => {
          commit(LOGGING_IN, false)
        })
    },
    [LOGOUT]() {
      fetch("/admin/logout", {method: "post"}).finally(() => router.push("/login"))
    },
    [MARK_SHIPPED]({getters}, id) {
      getters.websocket._send({WsSwagInvoiceMarkShipped: null, id})
    },
    // eslint-disable-next-line no-unused-vars
    [LOGIN]({commit}, {password, email}) {
      commit(LOGGING_IN, true)
      return fetch("/admin/login", {
        headers: {
          'Content-Type': 'application/json'
        },
        method: "post",
        body: JSON.stringify({password, email})
      })
        .then((res) => {
          if (res.ok) {
            commit(LOGGED_IN)
            return this.dispatch(OPEN_ADMIN_WEBSOCKET)
              .then(() => router.push("/"))
          } else return Promise.reject("Error logging in")
        })
        .catch((e) => {
          commit(LOGGING_IN, false)
          commit(LOGIN_ERROR, "Error logging in " + e)
        })
    }
  }
})
