import { Notify } from "quasar"

export function notifyInvoicePaid(label = null) {
  const opts = {
    type: "positive",
    icon: "fas fa-thumbs-up",
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
