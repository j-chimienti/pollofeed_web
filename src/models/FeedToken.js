import { parseToken } from "src/services/messageFactory"

export function FeedToken(invoice) {
  const findToken = (i) => i.label === invoice.label

  return Object.assign({}, invoice, {
    token: parseToken(invoice),
    findToken,
  })
}
