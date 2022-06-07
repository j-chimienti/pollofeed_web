import $ from "jquery"

export function update() {
  let firstName = $("#firstName").val()
  let lastName = $("#lastName").val()
  let address = $("#address").val()
  let address2 = $("#address2").val()
  let zip = $("#zip").val()
  let state = $("#state").val()
  let country = $("#country").val()
  let city = $("#city").val()
  let email = $("#email").val()
  let cmd = ""
  if (!(firstName && lastName && address && zip && country && city && email)) {
    cmd = "<please fill in all required fields first>"
  } else {
    cmd = `Good to go!`
  }
  $("#command").text(cmd)
  if (cmd !== "Good to go!") {
    // console.error("FIX FIELDS")
    return null
  }
  return {
    firstName,
    lastName,
    address,
    address2,
    zip,
    state,
    country,
    city,
    email,
  }
}
