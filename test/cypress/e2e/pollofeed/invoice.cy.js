import { handleErrors } from "../handleErrors"

handleErrors()

describe("pollofeed", () => {
  it("can create invoice", () => {
    cy.visit("/")
    cy.dataCy("wsConnected")
    // cy.dataCy("liveStream").should("be.visible")
    cy.dataCy("createLightningInvoiceButton").click()
    cy.dataCy("copyBolt11").should("be.visible")
    cy.dataCy("shareBolt11").should("be.visible")
    cy.dataCy("feedPrice").should("be.visible")
    cy.dataCy("bolt11").should("contain.value", "lnbc")
  })
})
