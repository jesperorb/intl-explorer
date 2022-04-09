import "@testing-library/cypress/add-commands";

Cypress.Commands.add("firstCodeBlock", () => {
  return cy.get(".highlight pre").first();
});
