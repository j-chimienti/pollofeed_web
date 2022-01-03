

const HOST = Cypress.env("HOST")
const resizeObserverLoopErrRe = /^[^(ResizeObserver loop limit exceeded)]/
Cypress.on('uncaught:exception', (err) => {
  /* returning false here prevents Cypress from failing the test */
  if (resizeObserverLoopErrRe.test(err.message)) {
    return false
  }
})

const invoice_button = "#invoice_button"
const invoice_modal = "#invoice_modal"
const invoice_payment_selector = "#invoice-payment-selector"

describe("pollofeed", () => {
  it("can create invoice", () => {
    cy.visit(HOST)
    cy.get(invoice_payment_selector).click()
    cy.get(invoice_button).click();
    cy.get(invoice_modal).should("be.visible")
  })


  it("can create delayed invoice", () => {
    cy.visit(HOST)
    cy.get(invoice_payment_selector).click()
    cy.get("#delayed-order-selector").click()
    cy.get(invoice_button).click();
    cy.get(invoice_modal).should("be.visible")
  })
})
