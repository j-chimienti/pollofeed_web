/* eslint-disable no-unused-vars */
import {
  ADD_FEED_TOKEN, AUTHENTICATED,
  BTC_USD,
  CLEAR_LOADING_INVOICE,
  CLIENT_COUNT,
  CLOSE_INVOICE_MODAL,
  DELAYED_FEEDING_FAILURE,
  DELAYED_FEEDING_SUCCESS,
  FEEDER_DONE_SPINNING,
  FEEDER_SPINNING,
  MERCHANDISE,
  OPEN_INVOICE_MODAL,
  ORDERS_BY_DAY,
  ORDERS_VIEW,
  POLLOFEED_CONFIG,
  PROCESSING_INVOICES,
  REMOVE_FEED_TOKEN,
  SET_INVOICE,
  SET_ORDERS,
  SWAG_INVOICES
} from "../store/mutations";
import {Notify} from 'quasar'
import { Dialog } from 'quasar'


let spinnerTimout = null
export function websocketMessageFactory(store, json) {

  const {
    success = false,
    invoice = null,
    message = null,
    todayOrderCount = null,
    error = null,
    merchandise = null,
    orders = null,
    invoiceUrl = null,
    feederSpinning = null,
    feedToken = null,
    delayedFeedingResponse = null,
    btc_usd = null,

      // ADMIN

      clientCount = null,
      authenticated = null,
      swagInvoices = null,
      processingInvoices = null,
      pollofeedConfig = null,
      ordersView = null,
      ordersByDay = null
  } = json
  if (message && typeof message === "string" && message.includes("failed to create invoice")) {
    alert("Error creating invoice")
    store.commit(CLEAR_LOADING_INVOICE)
  }
  if (authenticated != null) store.commit(AUTHENTICATED, authenticated)
  if (!success) store.commit(CLEAR_LOADING_INVOICE)
  if (invoiceUrl) window.location = invoiceUrl
  if (invoice) {
    store.commit(CLEAR_LOADING_INVOICE)
    if (invoice.status === "paid") {
      onPayment(invoice)
    } else if (invoice.status === "unpaid") {
      handleInvoice(invoice)
    }
  }
  if (error) alert(error)
  if (orders)  store.commit(SET_ORDERS, orders)
  if (todayOrderCount) store.commit("todayOrderCount", todayOrderCount)
  if (feederSpinning) {
    Notify.create("Feeder spinning")
    store.commit(FEEDER_SPINNING)
    if (spinnerTimout !== null) clearInterval(spinnerTimout)
    spinnerTimout = setTimeout(() => {
      store.commit(FEEDER_DONE_SPINNING)
    }, 1000 * 14) // todo: hardcode
  }
  if (feedToken) store.commit(ADD_FEED_TOKEN, feedToken)
  if (delayedFeedingResponse) onDelayedFeedingResponse(delayedFeedingResponse)

  if (btc_usd) store.commit(BTC_USD, btc_usd)
  if (merchandise) store.commit(MERCHANDISE, merchandise)

  // admin

  if (clientCount) store.commit(CLIENT_COUNT, clientCount)
  if (swagInvoices) store.commit(SWAG_INVOICES, swagInvoices)
  if (processingInvoices) store.commit(PROCESSING_INVOICES, processingInvoices)
  if (ordersView) store.commit(ORDERS_VIEW, ordersView)
  if (ordersByDay) store.commit(ORDERS_BY_DAY, ordersByDay)
  if (pollofeedConfig) store.commit(POLLOFEED_CONFIG, pollofeedConfig)

  function onDelayedFeedingResponse(delayedFeedingResponse) {
    const {success, token} = delayedFeedingResponse
    if (success) store.commit( DELAYED_FEEDING_SUCCESS , "Used token " + token)
    else store.commit(DELAYED_FEEDING_FAILURE, "Failed to use token " + token)
    if (success) {
      store.commit(REMOVE_FEED_TOKEN, token)
      setTimeout(() => {
      }, 2000)
    }
  }

  async function handleInvoice( inv) {
    store.commit(SET_INVOICE, inv)
    store.commit(OPEN_INVOICE_MODAL)
    return handleDelayed(inv)
  }

// todo: if feed token increase timeout with success_modal
  function onPayment(invoice) {
    store.commit(SET_INVOICE, invoice)
    handleDelayed(invoice)
    store.commit(CLOSE_INVOICE_MODAL)
    if (isMerchInvoice(invoice)) {
      const id = isMerchInvoice(invoice)
      const message = `id=${id} You will recieve an email shortly <a href="https://pollofeed.com/merch/${id}">view order</a>`
      Dialog.create({
        type: "positive",
        title: invoice.description,
        html: true,
        message,
      })
    } else if (isDelayed(invoice)) {
      const message =`Invoice paid token=${isDelayed(invoice)}`
      Dialog.create({
        title: "Delayed order paid.",
        message,
        type: "positive",
      })
    } else {
      Notify.create("Invoice paid")
    }
  }


  function handleDelayed( invoice) {
    const t = isDelayed(invoice);
    if (t) {
      store.commit(ADD_FEED_TOKEN, t)
    }
  }

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
export function isDelayed(invoice) {
    if (invoice.description.includes("-- token = ")) {
      return invoice.description.split("token =").pop()
    } else return null

}

export function isMerchInvoice(invoice) {
    if (invoice.description.includes("merch")) {
      return invoice.description.replace("pollofeed merch -", "").trim()
    } else return null
}
