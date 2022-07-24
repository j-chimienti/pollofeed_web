import { LocalStorage } from "quasar"
import { LocalStorageKeys, PAYMENT_TYPES } from "src/constants"

export const loadIvoiceFromStorage = () => {
  try {
    const invOpt = LocalStorage.getItem(LocalStorageKeys.LIGHTNING_INVOICE)
    if (invOpt && typeof invOpt === "object" && invOpt.label) return invOpt
    else return null
  } catch (e) {
    return null
  }
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
