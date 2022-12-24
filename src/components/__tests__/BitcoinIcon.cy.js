import BitcoinIcon from "components/BitcoinIcon"

describe("ButtonV3", () => {
  it("should pass in props", () => {
    cy.mount(BitcoinIcon)

    cy.get(".feed_btn").should("be.visible").should("contain", "FEED NOW")
  })
})
