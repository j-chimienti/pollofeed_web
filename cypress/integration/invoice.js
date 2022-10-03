import { handleErrors } from "./handleErrors"

handleErrors()

const stream = "#live_stream"

function createInvoice() {

  cy.contains("create invoice").click()
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
    cy.wait(2000)
    createInvoice()
    cy.get('.feed-price-usd').should("be.visible")
    cy.get('#bolt11').should("contain.text", "lnbc")
  })



})
