import { handleErrors } from "./handleErrors"

handleErrors()

const stream = "#live_stream"

function createInvoice() {

  cy.get('.feed_btn').click()
  cy.contains("copy").should("be.visible")
  cy.contains("share").should("be.visible")
  //cy.contains("lnbc")

}

describe("pollofeed", () => {

  beforeEach(() => {
    cy.visit("/")
  })
  it("can create invoice", () => {
    cy.get(stream).should("be.visible")
    cy.wait(1000)
    createInvoice()
    cy.get('.feed-price-usd').should("be.visible")
    cy.get('#bolt11').should("contain.text", "lnbc")
  })



})
