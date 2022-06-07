import { sat2btc } from "fmtbtc"

export function moneyFormat(usd) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  })

  return formatter.format(usd)
}
export function satsToUsd(sats, btc_usd) {
  return moneyFormat(sat2btc(sats, false) * btc_usd)
}
