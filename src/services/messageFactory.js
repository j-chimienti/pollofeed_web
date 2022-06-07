/* eslint-disable no-unused-vars */
import {
  ADD_FEED_TOKEN,
  AUTHENTICATED,
  BTC_USD,
  CLEAR_LOADING_INVOICE,
  OPEN_INVOICE_MODAL,
  REMOVE_FEED_TOKEN,
  SET_INVOICE,
  SET_ORDERS,
  SET_PAYMENT_TYPE,
} from "../store/mutations"
import { Notify } from "quasar"
import { LIGHTNING_INVOICE_STATUS } from "src/constants"
import { INVOICE_PAID } from "src/store/actions"

import _get from "lodash.get"
import { SET_USE_TOKEN_NOW, CLOSE_INVOICE_MODAL } from "src/store/mutations"
import { FeedToken } from "src/models/FeedToken"

export function websocketMessageFactory(store, json) {
  const {
    success = false,
    invoice = null,
    todayOrderCount = null,
    error = null,
    orders = null,
    feedToken = null,
    delayedFeedingResponse = null,
    btc_usd = null,
    invoicePaid = null, //  ListInvoice.label

    // ADMIN

    message = null,
    // merchandise = null,
    // invoiceUrl = null,
    // feederSpinning = null,
    //   clientCount = null,
    authenticated = null,
    //   swagInvoices = null,
    //   processingInvoices = null,
    //   pollofeedConfig = null,
    //   ordersView = null,
    //   ordersByDay = null
  } = json

  if (message !== null) {
    //{"success":true,"message":"NOT_FOUND:2ad0d1624d046fb088bd4133761010eeb86cbf3bd0c772d78d47880a71c45f66"}
    if (message.startsWith("NOT_FOUND:")) {
      const [_, ph] = message.split(":")
      store.commit(REMOVE_FEED_TOKEN, ph)
      store.commit(SET_INVOICE, null)
    }
  }
  if (error) store.commit(CLEAR_LOADING_INVOICE)
  if (invoice) {
    store.commit(CLEAR_LOADING_INVOICE)
    store.commit(SET_INVOICE, invoice)
    const tokenOpt = parseToken(invoice)
    if (tokenOpt) store.commit(ADD_FEED_TOKEN, new FeedToken(invoice))
    store.commit(SET_USE_TOKEN_NOW, tokenOpt)
    if (invoice.status === LIGHTNING_INVOICE_STATUS.paid) {
      Notify.create({
        type: "positive",
        message: "Invoice paid",
      })
      // if paid and has token show user t
      if (tokenOpt) {
        store.commit(SET_PAYMENT_TYPE, "DELAYED")
      }
    } else if (invoice.status === LIGHTNING_INVOICE_STATUS.unpaid) {
      store.commit(OPEN_INVOICE_MODAL)
    } else if (invoice.status === LIGHTNING_INVOICE_STATUS.expired) {
      store.commit(CLOSE_INVOICE_MODAL)
      Notify.create("invoice expired")
    }
  }
  if (invoicePaid) {
    store.dispatch(INVOICE_PAID, invoicePaid)
  }
  if (btc_usd) store.commit(BTC_USD, btc_usd)
  // if (invoiceUrl) window.location = invoiceUrl
  if (authenticated != null) store.commit(AUTHENTICATED, authenticated)
  if (orders) store.commit(SET_ORDERS, orders)
  if (todayOrderCount) store.commit("todayOrderCount", todayOrderCount)
  if (feedToken) {
    // todo: verify
    alert("feed token sent")
  }
  // {"success":true,"delayedFeedingResponse":{"success":true,"token":" lfQ/5r7rkBNZOH8z+DBqHA==","message":"Used feed token"}}
  if (delayedFeedingResponse) {
    const { success, token, message } = delayedFeedingResponse
    Notify.create({
      type: success ? "positive" : "negative",
      message,
    })
    if (success) {
      store.commit(REMOVE_FEED_TOKEN, token)
    }
    store.commit(SET_USE_TOKEN_NOW, null)
  }

  // admin

  // if (merchandise) store.commit(MERCHANDISE, merchandise)
  // if (clientCount) store.commit(CLIENT_COUNT, clientCount)
  // if (swagInvoices) store.commit(SWAG_INVOICES, swagInvoices)
  // if (processingInvoices) store.commit(PROCESSING_INVOICES, processingInvoices)
  // if (ordersView) store.commit(ORDERS_VIEW, ordersView)
  // if (ordersByDay) store.commit(ORDERS_BY_DAY, ordersByDay)
  // if (pollofeedConfig) store.commit(POLLOFEED_CONFIG, pollofeedConfig)
}

/**
 *
 * @param invoice ListInvoice
 * amount_msat: "55000msat"
 bolt11: "lnbc550n1psumvaxpp5kpevk9aplsxghdjqtm68vn6mwpp8xa8n5u58e788mx5tydzta93qdrggejk2epqgd5xjcmtv4h8xgzqypcx7mrvdanx2ety9e3k7mfq95kjqar0ddjkugpaypjxyun0vfe85c6xg33y2nngxdf5cj6rffnyz0faxqzjccqpjsp57du2ywrwak4h37gz8yuhmxwxhhlmmy864t4tjmcklurj05c5vghsrzjqvgu458d7jkxw2vgqh85gp7egdvv5cxdgnewxcy9dua3czyte4rcyzym9uqqwqqqqqqqqqqpqqqqqlgq9q9qyyssqn0sqvm74z4qsn8ntfatpjzlnzuawnuh2esf92q6dd546jmxv26kspdpvn927y295ul3lsmv2dm90kh4tqewnsg2fu8ascgnvstnsfvqpmyf67u"
 description: "Feed Chickens @ pollofeed.com -- token = dbrobrzcFDbENh3SLKCJfA=="
 expires_at: 1640871422
 label: "pollofeed.com-uGY-Isz7E3U="
 msatoshi: 55000
 payment_hash: "b072cb17a1fc0c8bb6405ef4764f5b70427374f3a7287cf8e7d9a8b2344be962"
 status: "unpaid"
 * @returns {null|*}
 */
export function parseToken(invoice) {
  const d = _get(invoice, "description", null)
  if (d && d.includes("-- token = ")) {
    return d.split("token =").pop()
  } else return null
}
