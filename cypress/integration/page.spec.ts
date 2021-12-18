it("view page", () => {
  cy.visit("http://localhost:8080/");
  cy.findByRole("heading").should("have.text", "DateTimeFormat Explorer");
  cy.findByRole("combobox", { name: /formatter/i}).should("have.value", "DateTimeFormat");
  cy.findByRole("combobox", { name: /locale/i}).should("have.value", "en-GB");
  cy.findByLabelText(/date/i).should("have.value", "2004-04-04T04:04:04");

  cy.findByTestId("option-section-dateStyle").should("be.visible");
  cy.firstCodeBlock().should("contain", `{ dateStyle: "full" }\n// Sunday, 4 April 2004`);

  // When user changes locale
  cy.findByRole("combobox", { name: /locale/i}).select("sv");
  cy.firstCodeBlock().should("contain", `{ dateStyle: "full" }\n// söndag 4 april 2004`);

  // When user changes date
  cy.findByLabelText(/date/i).type("2014-08-03T12:22");
  cy.firstCodeBlock().should("contain", `{ dateStyle: "full" }\n// söndag 3 augusti 2014`);

  // When user selects NumberFormat
  cy.findByRole("combobox", { name: /formatter/i}).select("NumberFormat");
  cy.findByRole("heading").should("have.text", "NumberFormat Explorer");
  // Should have same locale as before
  cy.findByRole("combobox", { name: /locale/i}).should("have.value", "sv");
  cy.findByRole("combobox", { name: /unit/i}).should("have.value", "degree");
  cy.findByRole("textbox", { name: /amount/i}).should("have.value", "123456.789");
  cy.findByTestId("option-section-unitDisplay").should("be.visible");

  cy.firstCodeBlock().should("contain", `{ style: "unit", unit: "degree", unitDisplay: "short", }`);
  cy.findByLabelText("Unit").select("gram");
  cy.firstCodeBlock().should("contain", `{ style: "unit", unit: "gram", unitDisplay: "short", }`);
  cy.findByRole("textbox", { name: /amount/i}).clear().type("13");
  cy.firstCodeBlock().should("contain", `13 g`);

  // Change to currency display
  cy.findByRole("button", {name: /currency/i}).click();
  cy.findByRole("combobox", {name: /currency/i}).should("have.value", "EUR");
  cy.findByRole("textbox", {name: /amount/i}).should("have.value", "13");

  cy.firstCodeBlock().should("contain", `{ currencySign: "standard", style: "currency", currency: "EUR", }`);
  cy.firstCodeBlock().invoke("text").invoke("replace", /\u00a0/g, " ").should("contain", `13,00 €`);

  // Change currency
  cy.findByRole("combobox", {name: /currency/i}).select("SEK");
  cy.firstCodeBlock().invoke("text").invoke("replace", /\u00a0/g, " ").should("contain", `13,00 kr`);
  cy.findByRole("textbox", {name: /amount/i}).clear().type("22");
  cy.firstCodeBlock().invoke("text").invoke("replace", /\u00a0/g, " ").should("contain", `22,00 kr`);

  // Change to list format
  cy.findByRole("combobox", { name: /formatter/i}).select("ListFormat");
  cy.firstCodeBlock().should("contain", `{ type: "conjunction" }`);
  cy.firstCodeBlock().should("contain", "Miso, Sesam och Mami");

  // Change input
  cy.findByRole("textbox", { name: /list/i}).clear().type("JS,HTML,CSS");
  cy.firstCodeBlock().should("contain", "JS, HTML och CSS");
})