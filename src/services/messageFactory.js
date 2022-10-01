/* eslint-disable no-unused-vars */
import {
  ADD_FEED_TOKEN,
  BTC_USD,
  CLEAR_LOADING_INVOICE,
  REMOVE_FEED_TOKEN,
  SET_INVOICE,
  SET_ORDERS,
  SET_PAYMENT_TYPE
} from "../store/mutations"
import { Notify } from "quasar"
import { LIGHTNING_INVOICE_STATUS } from "src/constants"
import { INVOICE_PAID } from "src/store/actions"

import _get from "lodash.get"
import { SET_USE_TOKEN_NOW } from "src/store/mutations"
import { notifyExpired, notifyInvoicePaid } from "src/services/notificationService"


export function websocketMessageFactory(store, json) {
  const {
    success = false,
    invoice = null,
    // todayOrderCount = null,
    error = null,
    orders = null,
    // bitcoinAddress = null,
    delayedFeedingResponse = null,
    btc_usd = null,
    // {"time": 1663758020.2687995, "label": "pollofeed.com,pollofeed,OCS1b0-Gg9g=", "seconds": 10}
    feedingStarted = null,
    invoicePaid = null, //  ListInvoice.label

    tokens = null,
    message = null,
  } = json

  if (message !== null) {
    //{"success":true,"message":"NOT_FOUND:2ad0d1624d046fb088bd4133761010eeb86cbf3bd0c772d78d47880a71c45f66"}
    if (message.startsWith("NOT_FOUND:")) {
      const [_, ph] = message.split(":")
      store.commit(REMOVE_FEED_TOKEN, ph)
      store.commit(SET_INVOICE, null)
    }
  }
  if (feedingStarted !== null) {
    const timeout = new Date(feedingStarted.time * 1000 + (feedingStarted.seconds * 1000)).getTime() - new Date().getTime()
    Notify.create({
      type: 'positive',
      message: `feeding for ${feedingStarted.seconds} seconds`,
      spinner: true,
      closeBtn: true,
      timeout,
      group: `feeding-${feedingStarted.label}`
    })
  }
  if (tokens !== null) {
    tokens.forEach(t => store.commit(ADD_FEED_TOKEN, t))
  }
  // if (bitcoinAddress) store.commit(BITCOIN_ADDRESS, bitcoinAddress)
  if (error) store.commit(CLEAR_LOADING_INVOICE)
  if (invoice) {
    store.commit(CLEAR_LOADING_INVOICE)
    store.commit(SET_INVOICE, invoice)
    const tokens = parseToken(invoice)
    tokens.forEach(t => store.commit(ADD_FEED_TOKEN, t))
    if (tokens.length) store.commit(SET_USE_TOKEN_NOW, tokens[0])
    if (invoice.status === LIGHTNING_INVOICE_STATUS.paid) {
      notifyInvoicePaid(invoice.label)
      // if paid and has token show user t
      if (tokens.length) {
        store.commit(SET_PAYMENT_TYPE, "TOKENS")
      }
    } else if (invoice.status === LIGHTNING_INVOICE_STATUS.unpaid) {
      // ignore unpaid
    } else if (invoice.status === LIGHTNING_INVOICE_STATUS.expired) {
      // remove feed tokens if expired
      notifyExpired(invoice.label)
      tokens.forEach(t => store.commit(REMOVE_FEED_TOKEN, t))
    }
  }
  if (invoicePaid) store.dispatch(INVOICE_PAID, invoicePaid)
  if (btc_usd) store.commit(BTC_USD, btc_usd)
  if (orders) store.commit(SET_ORDERS, orders)
  // if (todayOrderCount) store.commit("todayOrderCount", todayOrderCount)
  // {"success":true,"delayedFeedingResponse":{"success":true,"token":" lfQ/5r7rkBNZOH8z+DBqHA==","message":"Used feed token"}}
  if (delayedFeedingResponse) {
    const { success, token, message } = delayedFeedingResponse
    const icon = success ? "fas fa-thumbs-up" : "fas fa-thumbs-down"
    Notify.create({
      icon,
      type: success ? "positive" : "warning",
      message,
    })
    if (success) {
      store.commit(REMOVE_FEED_TOKEN, token)
    }
    store.commit(SET_USE_TOKEN_NOW, null)
  }

}

/**
 *
 * @param invoice ListInvoice
 * amount_msat: "55000msat"
 bolt11: "lnbc550n1psumvaxpp5kpevk9aplsxghdjqtm68vn6mwpp8xa8n5u58e788mx5tydzta93qdrggejk2epqgd5xjcmtv4h8xgzqypcx7mrvdanx2ety9e3k7mfq95kjqar0ddjkugpaypjxyun0vfe85c6xg33y2nngxdf5cj6rffnyz0faxqzjccqpjsp57du2ywrwak4h37gz8yuhmxwxhhlmmy864t4tjmcklurj05c5vghsrzjqvgu458d7jkxw2vgqh85gp7egdvv5cxdgnewxcy9dua3czyte4rcyzym9uqqwqqqqqqqqqqpqqqqqlgq9q9qyyssqn0sqvm74z4qsn8ntfatpjzlnzuawnuh2esf92q6dd546jmxv26kspdpvn927y295ul3lsmv2dm90kh4tqewnsg2fu8ascgnvstnsfvqpmyf67u"
 description: "\"feed chickens tokens=HgLZdrPOTFG6M9cpOJxung==\""
 expires_at: 1640871422
 label: "pollofeed.com-uGY-Isz7E3U="
 msatoshi: 55000
 payment_hash: "b072cb17a1fc0c8bb6405ef4764f5b70427374f3a7287cf8e7d9a8b2344be962"
 status: "unpaid"
 * @returns []String
 */
export function parseToken(invoice) {
  const d = _get(invoice, "description", "")
  let j = []
  try {
    if (d.includes("tokens="))
    j = d.split("tokens=")[1].split(",")
  } catch (e) {
    console.error("error parsing description", e)
  }
  return j

}
