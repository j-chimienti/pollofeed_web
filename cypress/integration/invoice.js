

const HOST = Cypress.env("HOST")
const resizeObserverLoopErrRe = /^[^(ResizeObserver loop limit exceeded)]/
Cypress.on('uncaught:exception', (err) => {
  /* returning false here prevents Cypress from failing the test */
  if (resizeObserverLoopErrRe.test(err.message)) {
    return false
  }
})



const invoice_button = "[data-cy=invoice_button]"
const bolt11 = "[data-id=bolt11]"
const stream = "#live_stream"

function createInvoice() {
  cy.get(stream).should("be.visible")
  cy.get(invoice_button).click()
  cy.contains("copy").should("be.visible")
  cy.contains("share").should("be.visible")

}

describe("pollofeed", () => {
  it("can create invoice", () => {
    cy.visit(HOST)
    createInvoice()
  })



})
