/* eslint-disable no-unused-vars */
import {
  ADD_FEED_TOKEN,
  BTC_USD,
  CLEAR_LOADING_INVOICE,
  CLOSE_DELAY_FEEDING_MODAL,
  CLOSE_INVOICE_MODAL,
  CLOSE_SUCCESS_MODAL,
  DELAYED_FEEDING_FAILURE,
  DELAYED_FEEDING_SUCCESS,
  FEEDER_DONE_SPINNING,
  FEEDER_SPINNING, OPEN_INVOICE_MODAL,
  OPEN_SUCCESS_MODAL,
  REMOVE_FEED_TOKEN,
  SET_INVOICE,
  SET_ORDERS
} from "../store/mutations";
import { Notify } from 'quasar'

let spinnerTimout = null
export function websocketMessageFactory(store, json) {

  function onDelayedFeedingResponse(delayedFeedingResponse) {
    const {success, token} = delayedFeedingResponse
    if (success) store.commit( DELAYED_FEEDING_SUCCESS , "Used token " + token)
    else store.commit(DELAYED_FEEDING_FAILURE, "Failed to use token " + token)
    if (success) {
      store.commit(REMOVE_FEED_TOKEN, token)
      setTimeout(() => {
        store.commit(CLOSE_DELAY_FEEDING_MODAL)
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
    // todo: if delayed show the token
    Notify.create("Invoice paid")
  }


  function handleDelayed( invoice) {
    const t = isDelayed(invoice);
    if (t) {
      store.commit(ADD_FEED_TOKEN, t)
    }
  }
  const {
    success = false,
    invoice = null,
    message = null,
    todayOrderCount = null,
    error = null,
    orders = null,
    invoiceUrl = null,
    feederSpinning = null,
    feedToken = null,
    delayedFeedingResponse = null,
    btc_usd = null
  } = json
  if (message && typeof message === "string" && message.includes("failed to create invoice")) {
    alert("Error creating invoice")
    store.commit(CLEAR_LOADING_INVOICE)
  }
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

}


export function isDelayed(invoice) {
  // eslint-disable-next-line no-prototype-builtins
  try {
    return invoice.metadata.feedToken
  } catch (e) {
    return null
  }
}
