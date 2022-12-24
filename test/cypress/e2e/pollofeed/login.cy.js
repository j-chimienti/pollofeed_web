import { login } from "../../login"
import { handleErrors } from "../handleErrors"
const un = "glar@gmail.com"
const pw = "nameisglar"

handleErrors()

describe("login", () => {
  beforeEach(() => {
    cy.clearCookies()
  })

  it("can login with user " + un, () => {
    login(un, pw, 200)
  })

  // it("can login with extra whitespace in username", () => {
  //   login(un + " ", pw, true)
  // })
  //
  // it("can login with case insensitive email", () => {
  //   login(un.toUpperCase(), pw, true)
  // })
  //
  // it("can login and logout " + un, () => {
  //   login(un, pw, true)
  //   cy.dataCy("logoutBtn").click()
  //   cy.url().should("include", "/about")
  // })
  //
  // it("fails to login with invalid password", () => {
  //   login(un, pw + "1", 404)
  // })
  //
  // it("fails to login with invalid password (extra whitespace)", () => {
  //   login(un, pw + " ", 404)
  // })
  //
  // it("fails to login with user not found", () => {
  //   login("fake@gmail.com", "dfjdjfkdjlsdfkjdslfdjfl", 404)
  // })
})
