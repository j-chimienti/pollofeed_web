/* eslint-disable */
import {LOGIN, LOGOUT, OPEN_WEBSOCKET, RESUME_SESSION,} from './actions'
// eslint-disable-next-line import/no-cycle
import {Notify} from 'quasar'
import {
  AUTHENTICATED,
  CLIENT_COUNT, ORDERS_BY_DAY, ORDERS_VIEW,
  POLLOFEED_CONFIG,
  PROCESSING_INVOICES,
  SWAG_INVOICES,
  TOTAL_ORDER_COUNT
} from "src/store/mutations";

async function onAuthSuccess({ commit, dispatch, $router}) {
  await dispatch(OPEN_WEBSOCKET)
  commit(AUTHENTICATED, true)
  await $router.push({name: 'admin'})
}

const actions = {
  [RESUME_SESSION]({ commit, dispatch }) {
    return fetch('/api/admin/resumeSession')
    .then((res) => ((res.ok) ? res.text() : Promise.reject(new Error("bad response"))))
    .then(({ user }) => onAuthSuccess({ commit, dispatch, $router: this.$router }))
    .catch(err => {
      console.log("error resume session " +  err)
      Notify.create({
        type: 'negative',
        message: 'Invalid request ' + err })
      return this.$router.push({name: 'login'})
    })
  },

  [LOGIN]({ commit, dispatch }, body) {
    return fetch('/api/admin/login', { method: 'post', body: JSON.stringify(body), headers: { 'content-type': 'application/json' } })
    .then((res) => ((res.ok) ? res.text() : Promise.reject(new Error("bad response"))))
    .then(({ user }) => onAuthSuccess({ commit, dispatch, $router: this.$router }))
    .catch((e) => {
      Notify.create({
        type: 'negative',
        message: 'Invalid request ' + e })
    })
  },
  [LOGOUT]({  }) {
    return fetch('/api/admin/logout', { method: 'post' }).finally(() => {
      return this.$router.push({ name: 'login' })
    })
  },
}

const getters = {
  totalOrderCount: state => state.totalOrderCount,
  authenticated: state => state.authenticated,
  todayOrderCount: state => state.todayOrderCount,
  pollofeedConfig: state => state.pollofeedConfig,
  ordersView: state => state.ordersView,
  swagInvoices: state => state.swagInvoices,
  processingInvoices: state => state.processingInvoices,
  clientCount: state => state.clientCount,
}

const state = {
  authenticated: null,
  totalOrderCount: null,
  todayOrderCount: null,
  pollofeedConfig: null,
  ordersView: null,
  swagInvoices: [],
  clientCount: null,
  processingInvoices: null
}

const mutations = {
  [AUTHENTICATED](state, a) { state.authenticated = a },
  [TOTAL_ORDER_COUNT](state, c) { state.totalOrderCount = c },
  [SWAG_INVOICES](state, i) { state.swagInvoices = i },
  [PROCESSING_INVOICES](state, p) { state.processingInvoices = p },
  [POLLOFEED_CONFIG](state, c) { state.pollofeedConfig = c },
  [CLIENT_COUNT](state, c) { state.clientCount = c },
  [ORDERS_BY_DAY](state, c) { state.ordersByDay = c },
  [ORDERS_VIEW](state, c) { state.ordersView = c }

}




export default {
  // namespaced: true,
  getters,
  mutations,
  actions,
  state
}
