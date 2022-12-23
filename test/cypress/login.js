export function login(un, pw, code = 200) {
  assert(un)
  assert(pw)
  cy.intercept("POST", "/api/login").as("LOGIN_RESPONSE")
  cy.visit("/")
  cy.dataCy("loginBtn").click()
  cy.dataCy("loginForm").should("be", "visible")
  cy.get("input[type=email]").type(un)
  cy.get("input[type=password]").type(`${pw}{enter}`) // enter causes form to submit
  cy.wait("@LOGIN_RESPONSE").its("response.statusCode").should("eq", code)
}
