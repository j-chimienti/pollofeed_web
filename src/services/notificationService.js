import { Notify } from "quasar"

export function notifyInvoicePaid(label = null) {
  const opts = {
    // type: "positive",
    color: "accent",
    textColor: "primary",
    // avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
    // avatar: "https://imagedelivery.net/aieSGS-_IR9UJPRPLPtPfw/99952f36-00b3-4c17-53cf-e080eb553400/public",
    avatar: "https://imagedelivery.net/aieSGS-_IR9UJPRPLPtPfw/3472d83f-4517-4f83-4ea0-8442e97b4700/public",
    // icon: "fas fa-thumbs-up",
    message: "Invoice paid",
  }
  if (label) opts.group = `invoice-paid-${label}`
  Notify.create(opts)
}

export function notifyExpired(label) {
  Notify.create({
    group: `invoice-expired-${label}`,
    message: "invoice expired",
  })
}
