/* eslint-disable no-unused-vars */

import {store} from "@/admin/store/store";
import {
  ADD_ALERT,
  CLIENT_COUNT,
  INVOICES,
  ORDERS_BY_DAY,
  ORDERS_VIEW,
  POLLOFEED_CONFIG,
  PROCESSING_INVOICES,
  SWAG_INVOICES,
  TOTAL_ORDER_COUNT
} from "@/admin/store/mutations";
import {FEEDER_SPINNING} from "@/store/mutations";

export function websocketMessageFactory(json) {
  const {
    success = false,
    message = null,
    clientCount = null,
    processingInvoices = null,
    invoices = null,
    error = null,
    totalOrderCount = null,
    feederSpinning = null,
    swagInvoices = null,
    pollofeedConfig = null,
    ordersView = null,
    ordersByDay = null
  } = json
  if (!success) console.error(json)
  if (message && typeof message === 'string' && !message.includes('pong')) store.commit(ADD_ALERT, message)
  if (error) alert(error)
  if (feederSpinning) store.commit(FEEDER_SPINNING)
  if (totalOrderCount)  store.commit(TOTAL_ORDER_COUNT, totalOrderCount)
  if (swagInvoices) store.commit(SWAG_INVOICES, swagInvoices)
  if (clientCount)  store.commit(CLIENT_COUNT, parseInt(clientCount))
  if (processingInvoices) store.commit(PROCESSING_INVOICES, processingInvoices)
  if (invoices) store.commit(INVOICES, invoices)
  if (ordersView) store.commit(ORDERS_VIEW, ordersView)
  if (ordersByDay) store.commit(ORDERS_BY_DAY, ordersByDay)
  if (pollofeedConfig) store.commit(POLLOFEED_CONFIG, pollofeedConfig)



}
