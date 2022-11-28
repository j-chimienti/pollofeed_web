export const LIGHTNING_INVOICE_STATUS = {
  unpaid: "unpaid",
  expired: "expired",
  paid: "paid",
}

export const twitterDmUrl =
  "https://twitter.com/messages/compose?recipient_id=1074427325679370200&text=hello"
// "https://twitter.com/messages/compose?text=example%20text&recipient_id=1001"

export const FEED_TOKEN_KEY = "FEED_TOKEN_KEY"

export const PAYMENT_TYPES = [
  { type: "INVOICE", label: "INVOICE" },
  { type: "TOKENS", label: "MY TOKENS" },
  // { type: "LNURL", label: "LNURL" },
  // { type: "OFFER", label: "OFFER" },
  // { type: "LNADDR", label: "LNADDR" },
]

export const LocalStorageKeys = {
  LIGHTNING_INVOICE: "LIGHTNING_INVOICE",
  PAYMENT_TYPE_KEY: "PAYMENT_TYPE",
  AUTH_PROVIDER: "AUTH_PROVIDER",
}

export const CHECK_INVOICE_INTERVAL = parseInt(
  process.env.CHECK_INVOICE_INTERVAL
)
// add random param so no cache
export const STREAM_URL = `${process.env.STREAM_URL}?${new Date()}`
