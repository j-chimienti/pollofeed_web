import ButtonV3 from "components/ButtonV3"

describe("ButtonV3", () => {
  it("should pass in props", () => {
    cy.mount(ButtonV3, {
      props: {
        loading: false,
      },
    })

    cy.get(".feed_btn").should("be.visible").should("contain", "FEED NOW")
  })
})
