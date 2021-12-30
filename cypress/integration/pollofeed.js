

const HOST = Cypress.env("HOST")
const resizeObserverLoopErrRe = /^[^(ResizeObserver loop limit exceeded)]/
Cypress.on('uncaught:exception', (err) => {
  /* returning false here prevents Cypress from failing the test */
  if (resizeObserverLoopErrRe.test(err.message)) {
    return false
  }
})


describe("pollofeed", () => {
  it("can create invoice", () => {
    const invoice_button = "#invoice_button"
    cy.visit(HOST)
    cy.get("#invoice-payment-selector").click()
    cy.get(invoice_button).click();
    const invoice_modal = "#invoice_modal"
    cy.get(invoice_modal, {timeout: 5000}).should("be.visible")
  })


  it("can create delayed invoice", () => {
    const invoice_button = "#invoice_button"
    cy.visit(HOST)
    cy.get("#invoice-payment-selector").click()
    cy.get("#delayed-order-selector").click()
    cy.get(invoice_button).click();
    const invoice_modal = "#invoice_modal"
    cy.get(invoice_modal, {timeout: 5000}).should("be.visible")
  })
})
