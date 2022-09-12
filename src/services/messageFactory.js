/* eslint-disable no-unused-vars */
import {
  ADD_FEED_TOKEN,
  BTC_USD,
  CLEAR_LOADING_INVOICE,
  OPEN_INVOICE_MODAL,
  REMOVE_FEED_TOKEN,
  SET_INVOICE,
  SET_ORDERS,
  SET_PAYMENT_TYPE
} from "../store/mutations"
import { Notify } from "quasar"
import { LIGHTNING_INVOICE_STATUS } from "src/constants"
import { INVOICE_PAID } from "src/store/actions"

import _get from "lodash.get"
import { BITCOIN_ADDRESS, SET_USE_TOKEN_NOW } from "src/store/mutations"

export function websocketMessageFactory(store, json) {
  const {
    success = false,
    invoice = null,
    todayOrderCount = null,
    error = null,
    orders = null,
    feedToken = null,
    bitcoinAddress = null,
    delayedFeedingResponse = null,
    btc_usd = null,
    invoicePaid = null, //  ListInvoice.label

    debit = null,
    // ADMIN

    message = null,
    // merchandise = null,
    // invoiceUrl = null,
    // feederSpinning = null,
    //   clientCount = null,
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
  if (bitcoinAddress) store.commit(BITCOIN_ADDRESS, bitcoinAddress)
  if (error) store.commit(CLEAR_LOADING_INVOICE)
  if (invoice) {
    store.commit(CLEAR_LOADING_INVOICE)
    store.commit(SET_INVOICE, invoice)
    const tokens = parseToken(invoice)
    tokens.forEach(t => store.commit(ADD_FEED_TOKEN, t))
    if (tokens.length) store.commit(SET_USE_TOKEN_NOW, tokens[0])
    if (invoice.status === LIGHTNING_INVOICE_STATUS.paid) {
      Notify.create({
        type: "positive",
        group: `invoice-paid-${inv.label}`,
        message: "your transaction was successful!",
      })
      // if paid and has token show user t
      if (tokens.length) {
        store.commit(SET_PAYMENT_TYPE, "TOKENS")
      }
    } else if (invoice.status === LIGHTNING_INVOICE_STATUS.unpaid) {
      store.commit(OPEN_INVOICE_MODAL)
    } else if (invoice.status === LIGHTNING_INVOICE_STATUS.expired) {
      // ignore
    }
  }
  if (invoicePaid) {
    store.dispatch(INVOICE_PAID, invoicePaid)
  }
  if (btc_usd) store.commit(BTC_USD, btc_usd)
  if (orders) store.commit(SET_ORDERS, orders)
  if (todayOrderCount) store.commit("todayOrderCount", todayOrderCount)
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

  //{"status":"success","debit":{"bolt11":"lnbc20n1p323zrcsp5eexee9h0epx4q2udnfd4q7x5qt8hxu8cfxpf7v68rvj8dneldzuspp5t60qc2cefwx6xvflenn66znm0rld72urlwgycgtyjp94mds7rvssdq9u2d2zxqr3jscqpjrzjqdm9ng9v36em3598yqg5alyxr5afgquzmnapgqm5dd8c76ew3qgt5zc30gqqdwsqqqqqqqlgqqqqqqgq9q9qyysgq4yr7mz6xtv83vytuqkgjahh02jwwja5s7xm00slq3mdphv29rmzr07swymyfanw6fc32cy5a9yaghawn5ls8q2e85a2afqma5j2k2ycqettmh9","created_at":"2022-06-14T13:09:28.754974Z","satoshi":2,"label":"blackjack,google-oauth2|105041674665757088596,tymmGjDPsPg=","status":"complete"}}


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
 * @returns []String
 */
export function parseToken(invoice) {
  const d = _get(invoice, "description", "")
  let j = ""
  try {
    j = JSON.parse(d)
  } catch (e) {
    console.error("error parsing description", e)
  }
  return  _get(j, "token", [])

}
