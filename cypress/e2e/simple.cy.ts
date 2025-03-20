import type {} from "cypress";

describe("template spec", () => {
  beforeEach(() => {
    cy.intercept("GET", "ingredients", { fixture: "ingredients" });
    cy.intercept("POST", "login", { fixture: "login" });
    cy.intercept("POST", "orders", { fixture: "orders" });

    // cy.visit("http://localhost:5173/login");
    // cy.get("[data-testid=email_input]").type(`${email}`);
    // cy.get("[data-testid=password_input]").type(`${password}{enter}`);
    // cy.wait(3000);
    cy.visit("http://localhost:5173/");
  });

  it("should be drag element and drop in conteiner", () => {
    cy.get("[data-testid=drag_wrap_sauces] ul li:first")
      .first()
      .trigger("dragstart");
    cy.get("[data-testid=drop_wrap_souces]").trigger("drop");
    cy.get("[data-testid=drop_wrap_souces] .constructor-element");
  });

  it("should be open modal after user click with ingredient description", () => {
    cy.get("[data-testid=drag_wrap_sauces] a").first().click();
    cy.get("#modal")
      .should("include.text", "Детали ингридиента")
      .and("include.text", "Тестовый соус");
  });

  it("should be opened and close modal after user click", () => {
    cy.get("[data-testid=drag_wrap_sauces] a").first().click();
    cy.get("#modal svg").click();
    cy.get("#modal").should("be.empty");
  });

  it("should be open modal after click order button", () => {
    const email = "leshiy_POS@mail.ru";
    const password = "136661987";

    cy.get("[data-testid=drag_wrap_sauces] ul li:first")
      .first()
      .trigger("dragstart");
    cy.get("[data-testid=drop_wrap_souces]").trigger("drop");
    cy.get("[data-testid=drag_wrap_buns] ul li:first")
      .first()
      .trigger("dragstart");
    cy.get("[data-testid=drop_wrap_buns]").trigger("drop");
    cy.get("[data-testid=order_button]").click();

    cy.get("[data-testid=email_input]").type(`${email}`);
    cy.get("[data-testid=password_input]").type(`${password}{enter}`);
    cy.wait(1000);

    cy.get("[data-testid=order_button]").click();
    cy.get("#modal").should(
      "include.text",
      "Тестовый заказ для тестовых тестов"
    );
    cy.get("#modal svg").click();
    cy.get("#modal").should("be.empty");
  });
});
