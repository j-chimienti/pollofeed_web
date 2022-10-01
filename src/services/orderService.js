import _get from "lodash.get"

/**
 *
 * @param invoice ListInvoice
 * amount_msat: "55000msat"
 bolt11: "lnbc550n1psumvaxpp5kpevk9aplsxghdjqtm68vn6mwpp8xa8n5u58e788mx5tydzta93qdrggejk2epqgd5xjcmtv4h8xgzqypcx7mrvdanx2ety9e3k7mfq95kjqar0ddjkugpaypjxyun0vfe85c6xg33y2nngxdf5cj6rffnyz0faxqzjccqpjsp57du2ywrwak4h37gz8yuhmxwxhhlmmy864t4tjmcklurj05c5vghsrzjqvgu458d7jkxw2vgqh85gp7egdvv5cxdgnewxcy9dua3czyte4rcyzym9uqqwqqqqqqqqqqpqqqqqlgq9q9qyyssqn0sqvm74z4qsn8ntfatpjzlnzuawnuh2esf92q6dd546jmxv26kspdpvn927y295ul3lsmv2dm90kh4tqewnsg2fu8ascgnvstnsfvqpmyf67u"
 description: "\"feed chickens tokens=HgLZdrPOTFG6M9cpOJxung==\""
 expires_at: 1640871422
 label: "pollofeed.com-uGY-Isz7E3U="
 msatoshi: 55000
 payment_hash: "b072cb17a1fc0c8bb6405ef4764f5b70427374f3a7287cf8e7d9a8b2344be962"
 status: "unpaid"
 * @returns []String
 */
export function parseToken(invoice) {
  const d = _get(invoice, "description", "")
  let j = []
  try {
    if (d.includes("tokens="))
      j = d.replaceAll(new RegExp(/"/g), "").split("tokens=")[1].split(",")
  } catch (e) {
    console.error("error parsing description", e)
  }
  return j

}

