import { LocalStorage } from "quasar"
import { LocalStorageKeys, PAYMENT_TYPES } from "src/constants"

export function saveBitcoinPrice(price) {
  return LocalStorage.set("BTC_USD", price)
}

export function loadBitcoinPrice() {
  return LocalStorage.getItem("BTC_USD") || 1
}

export function saveBTCPayServerInvoice(b) {
  return LocalStorage.set("BTCPAYSERVER_INVOICE", b)
}

export function loadBTCPayServerInvoice() {
  return LocalStorage.getItem("BTCPAYSERVER_INVOICE") || null
}

export function loadPaymentTypeFromStorage() {
  const defaultVal = PAYMENT_TYPES[0].type
  try {
    const pt = LocalStorage.getItem(LocalStorageKeys.PAYMENT_TYPE_KEY)
    if (typeof pt !== "string") return defaultVal
    else {
      const found = PAYMENT_TYPES.find((p) => p.type === pt)
      if (found) return found.type
      else return defaultVal
    }
  } catch (e) {
    return defaultVal
  }
}

export function savePaymentType(paymentType) {
  LocalStorage.set(LocalStorageKeys.PAYMENT_TYPE_KEY, paymentType)
}

export const loadIvoiceFromStorage = () => {
  try {
    const invOpt = LocalStorage.getItem(LocalStorageKeys.LIGHTNING_INVOICE)
    if (invOpt && typeof invOpt === "object" && invOpt.label) return invOpt
    else return null
  } catch (e) {
    return null
  }
}
