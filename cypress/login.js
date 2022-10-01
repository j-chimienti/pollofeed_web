

export function login(un, pw, assertSuccess = true) {
  assert(un)
  assert(pw)
  cy.visit('http://localhost:8080/')
  cy.get(".login-button").click()
  cy.get(".login-modal").should("be", "visible")
  cy.get('input[type=email]').type(un)
  cy.get('input[type=password]').type(`${pw}{enter}`) // enter causes form to submit

  if (assertSuccess) {
    cy.wait("@LOGIN").its('response.statusCode').should('eq', 200)
    cy.url().should('include', '/')
    cy.getCookie("player-session")
    //cy.get("#blackjack_table").should("be.visible")
    //cy.get(".request_bet_button").should("be.visible").and("have.text", "Deal")
  }
  // cy.getCookie('your-session-cookie').should('exist')
}
