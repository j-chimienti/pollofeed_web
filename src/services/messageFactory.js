/* eslint-disable no-unused-vars */
import {
  ADD_FEED_TOKEN,
  BITCOIN_ADDRESS,
  BTC_USD,
  CLEAR_LOADING_INVOICE,
  FEEDING_STARTED,
  REMOVE_FEED_TOKEN,
  SET_INVOICE,
  SET_ORDERS,
  SET_PAYMENT_TYPE,
} from "../store/mutations"
import { Notify } from "quasar"
import { LIGHTNING_INVOICE_STATUS } from "src/constants"
import { INVOICE_PAID } from "src/store/actions"
import { SET_USE_TOKEN_NOW } from "src/store/mutations"
import {
  notifyExpired,
  notifyInvoicePaid,
} from "src/services/notificationService"
import { parseToken } from "src/services/orderService"
import { saveBTCPayServerInvoice } from "src/services/localStorageService"

export function websocketMessageFactory(store, json) {
  const {
    success = false,
    invoice = null,
    error = null,
    orders = null,
    bitcoinAddress = null,
    delayedFeedingResponse = null,
    btc_usd = null,
    // {"time": 1663758020.2687995, "label": "pollofeed.com,pollofeed,OCS1b0-Gg9g=", "seconds": 10}
    feedingStarted = null,
    invoicePaid = null, //  ListInvoice.label
    notification = null, // string, notifications from backend similar to messages
    tokens = null,
    message = null,
    btcInvoice = null, // BTCPayServerInvoice
  } = json

  if (notification !== null) {
    Notify.create({
      type: "warning",
      message: notification,
      timeout: 60 * 1000,
      closeBtn: true,
    })
  }
  if (message !== null) {
    //{"success":true,"message":"NOT_FOUND:2ad0d1624d046fb088bd4133761010eeb86cbf3bd0c772d78d47880a71c45f66"}
    if (message.startsWith("NOT_FOUND:")) {
      const [_, ph] = message.split(":")
      store.commit(REMOVE_FEED_TOKEN, ph)
      store.commit(SET_INVOICE, null)
    } else if (message.includes("failed to create invoice")) {
      Notify.create({
        type: "negative",
        message: "failed to create invoice",
      })
      store.commit(CLEAR_LOADING_INVOICE)
    }
  }
  if (feedingStarted !== null) {
    const timeout =
      new Date(
        feedingStarted.time * 1000 + feedingStarted.seconds * 1000
      ).getTime() - new Date().getTime()
    Notify.create({
      type: "positive",
      message: `feeding for ${feedingStarted.seconds} seconds`,
      spinner: true,
      closeBtn: true,
      timeout,
      group: `feeding-${feedingStarted.label}`,
    })
    store.commit(FEEDING_STARTED, { timeout, label: feedingStarted.label })
  }
  if (tokens !== null) {
    tokens.forEach((t) => store.commit(ADD_FEED_TOKEN, t))
  }
  if (bitcoinAddress) store.commit(BITCOIN_ADDRESS, bitcoinAddress)
  if (error) store.commit(CLEAR_LOADING_INVOICE)
  if (invoice) {
    store.commit(CLEAR_LOADING_INVOICE)
    store.commit(SET_INVOICE, invoice)
    const tokens = parseToken(invoice)
    tokens.forEach((t) => store.commit(ADD_FEED_TOKEN, t))
    if (tokens.length) store.commit(SET_USE_TOKEN_NOW, tokens[0])
    if (invoice.status === LIGHTNING_INVOICE_STATUS.paid) {
      notifyInvoicePaid(invoice.label)
      // if paid and has token show user t
      if (tokens.length) {
        store.commit(SET_PAYMENT_TYPE, "TOKENS")
      } else {
        // no tokens check that feeder responds soon
        checkForLabel(store, invoice.label, 5000)
      }
    } else if (invoice.status === LIGHTNING_INVOICE_STATUS.unpaid) {
      // ignore unpaid
    } else if (invoice.status === LIGHTNING_INVOICE_STATUS.expired) {
      // remove feed tokens if expired
      notifyExpired(invoice.label)
      tokens.forEach((t) => store.commit(REMOVE_FEED_TOKEN, t))
    }
  }
  if (btcInvoice) {
    saveBTCPayServerInvoice(btcInvoice)
    window.open(btcInvoice.url)
  }
  if (invoicePaid) store.dispatch(INVOICE_PAID, invoicePaid)
  if (btc_usd) store.commit(BTC_USD, btc_usd)
  if (orders) store.commit(SET_ORDERS, orders)
  // if (todayOrderCount) store.commit("todayOrderCount", todayOrderCount)
  // {"success":true,"delayedFeedingResponse":{"success":true,"token":" lfQ/5r7rkBNZOH8z+DBqHA==","message":"Used feed token", invoiceLabel: "label"}}
  if (delayedFeedingResponse) {
    const {
      success,
      token,
      message,
      invoiceLabel = null,
    } = delayedFeedingResponse
    const icon = success ? "fas fa-thumbs-up" : "fas fa-thumbs-down"
    Notify.create({
      icon,
      type: success ? "positive" : "warning",
      message,
    })
    if (success) {
      store.commit(REMOVE_FEED_TOKEN, token)
      if (invoiceLabel) checkForLabel(store, invoiceLabel, 5000)
    }
    store.commit(SET_USE_TOKEN_NOW, null)
  }
}

function checkForLabel(store, label, timeout) {
  setTimeout(() => {
    const foundOpt = store.getters.fedInvoices.find(({ label, timeout }) => {
      return label === label
    })
    if (!foundOpt) {
      // Notify.create("Feeder has not feed, may be down")
    }
  }, timeout)
}
