

const HOST = Cypress.env("HOST")
const resizeObserverLoopErrRe = /^[^(ResizeObserver loop limit exceeded)]/
Cypress.on('uncaught:exception', (err) => {
  /* returning false here prevents Cypress from failing the test */
  if (resizeObserverLoopErrRe.test(err.message)) {
    return false
  }
})



const invoice_button = "[data-cy=invoice_button]"
const invoice_modal = "[data-cy=invoice_modal]"
const invoice_payment_selector = "[data-cy=invoice-payment-selector]"
const feedToken = "[data-id=feedToken]"
const bolt11 = "[data-id=bolt11]"

function createInvoice() {
  cy.get(invoice_payment_selector).click()
  cy.get(invoice_button).click();
  cy.get(invoice_modal).should("be.visible")
  cy.contains(".text-h4", "Pay with Lightning").should("be.visible")
  cy.get(bolt11).should("be.visible") // and start with lnbc
  cy.get(feedToken).should("not.exist") // and have some length
}

describe("pollofeed", () => {
  it("can create invoice", () => {
    cy.visit(HOST)
    createInvoice()
  })

  it("can create invoice and close modal", () => {
    cy.visit(HOST)
    createInvoice()
    cy.get("[data-cy=close-invoice-btn]").click()
    cy.get(invoice_modal).should("not.be.visible")
  })

  it("can create delayed invoice", () => {
    cy.visit(HOST)
    cy.get(invoice_payment_selector).click()
    cy.get("[data-cy=delayed-order-selector]").click()
    cy.get(invoice_button).click()
    cy.get(invoice_modal).should("be.visible")
    cy.get(bolt11).should("be.visible") // and start with lnbc
    cy.get(feedToken).should("be.visible") // and have some length
  })

})
