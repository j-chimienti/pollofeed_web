import { handleErrors } from "../handleErrors"

handleErrors()

describe("pollofeed", () => {
  it("can create invoice", () => {
    cy.visit("/")
    cy.get("[data-cy=live_stream]").should("be.visible")
    cy.get("[data-cy=wsConnected]")
    cy.get("[data-cy=createLightningInvoiceButton]").click()
    cy.contains("[data-cy=copyBolt11]").should("be.visible")
    cy.contains("[data-cy=shareBolt11]").should("be.visible")
    cy.get("[data-cy=feedPrice]").should("be.visible")
    cy.get("[data-cy=bolt11]").should("contain.text", "lnbc")
  })
})
