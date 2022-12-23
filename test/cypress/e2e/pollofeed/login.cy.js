import { login } from "../../login"
import { handleErrors } from "app/test/cypress/e2e/handleErrors"
const un = Cypress.env("LOGIN_USERNAME")
const pw = Cypress.env("LOGIN_PASSWORD")

handleErrors()

describe("login", () => {
  beforeEach(() => {
    cy.clearCookies()
  })

  it("can login with user " + un, () => {
    login(un, pw, true)
  })

  it("can login with extra whitespace in username", () => {
    login(un + " ", pw, true)
  })

  it("can login with case insensitive email", () => {
    login(un.toUpperCase(), pw, true)
  })

  it("can login and logout " + un, () => {
    login(un, pw, true)
    cy.get("#logout-btn").click()
    cy.url().should("include", "/about")
  })

  it("fails to login with invalid password", () => {
    cy.intercept("POST", "/api/login").as("LOGIN_FAILURE")
    login(un, pw + "1", false)
    cy.wait("@LOGIN_FAILURE").its("response.statusCode").should("eq", 404)
    cy.contains("Cannot log in")
  })

  it("fails to login with invalid password (extra whitespace)", () => {
    cy.intercept("POST", "/api/login").as("LOGIN_FAILURE")
    login(un, pw + " ", false)
    cy.wait("@LOGIN_FAILURE").its("response.statusCode").should("eq", 404)
    cy.contains("Cannot log in")
  })

  it("fails to login with user not found", () => {
    cy.intercept("POST", "/api/login").as("LOGIN_FAILURE_NOT_FOUND")
    login("fake@gmail.com", "dfjdjfkdjlsdfkjdslfdjfl", false)
    cy.wait("@LOGIN_FAILURE_NOT_FOUND")
      .its("response.statusCode")
      .should("eq", 404)
    cy.contains("Cannot log in")
  })
})
