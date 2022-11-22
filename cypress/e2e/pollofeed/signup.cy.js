function signup(un, pw) {
  cy.visit("/")
  cy.get("#signup-link").click()
  cy.get("input[type=email]").type(un)
  cy.get("input[type=password]").type(`${pw}{enter}`) // enter causes form to submit
  // cy.get(".login-btn").click()
  // our auth cookie should be present
  // we should be redirected to /
  cy.url().should("include", "/")
  cy.get("#blackjack_table").should("be.visible")
  // cy.getCookie('your-session-cookie').should('exist')
}

describe("signup", () => {
  const un = `TEST_USER_${new Date().getTime()}@gmail.com`
  beforeEach(() => {
    cy.clearCookies()
  })
  it("can signup new user", () => {
    cy.intercept("POST", "/api/signup").as("SIGNUP")
    signup(un, "TESTING_TESTING")
    cy.wait("@SIGNUP").its("response.statusCode").should("eq", 201)
    cy.contains(`Created user ${un}`)
    cy.get("#balance_tween").should("be.visible").should("have.text", "0")
    cy.wait(1000)
    cy.get(".request_bet_button").click()
    // since 0 balance, the invoice form pops up
    cy.get("#create-invoice-form").should("be.visible")
  })
  it("login to account if tried to signup with account", () => {
    cy.intercept("POST", "/api/signup").as("SIGNUP")
    signup(un, "TESTING_TESTING")
    cy.wait("@SIGNUP").its("response.statusCode").should("eq", 200)
    cy.get("#balance_tween").should("be.visible").should("have.text", "0")
  })
})
