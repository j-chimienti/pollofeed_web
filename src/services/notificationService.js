import { Notify } from "quasar"

// noinspection JSUnusedLocalSymbols
// const types = {
//   warning: "warning",
//   info: "info",
//   positive: "positive",
//   negative: "negative",
// }

const notificationLabels = new Set()

export function notifyInvoicePaid(label = null) {
  const opts = {
    // type: "positive",
    color: "accent",
    textColor: "primary",
    // avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
    // avatar: "https://imagedelivery.net/aieSGS-_IR9UJPRPLPtPfw/99952f36-00b3-4c17-53cf-e080eb553400/public",
    avatar:
      "https://imagedelivery.net/aieSGS-_IR9UJPRPLPtPfw/3472d83f-4517-4f83-4ea0-8442e97b4700/public",
    // icon: "fas fa-thumbs-up",
    message: "Invoice paid",
    badge: "",
  }
  if (label) opts.group = `invoice-paid-${label}`
  if (label && !notificationLabels.has(label)) {
    Notify.create(opts)
    notificationLabels.add(label)
  } else Notify.create(opts)
}

export function notifyExpired(label) {
  if (!notificationLabels.has(label)) {
    Notify.create({
      group: `invoice-expired-${label}`,
      message: "invoice expired",
    })
    notificationLabels.add(label)
  }
}
