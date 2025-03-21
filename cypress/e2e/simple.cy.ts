import type {} from "cypress";

const dragElementSelector = "[data-testid=drag_wrap_sauces] ul li:first";
const dragBunsElementSelector = "[data-testid=drag_wrap_buns] ul li:first";
const dragSoucesLinkSelector = "[data-testid=drag_wrap_sauces] a";
const dropSouseSelector = "[data-testid=drop_wrap_souces]";
const dropBunsSelector = "[data-testid=drop_wrap_buns]";
const modalSelector = "#modal";
const modalButtonCloseSelector = `${modalSelector} svg`;
const modalButtonOrderSelector = "[data-testid=order_button]";

const inputEmailSelector = "[data-testid=email_input]";
const inputPasswordSelector = "[data-testid=password_input]";

describe("template spec", () => {
  beforeEach(() => {
    cy.intercept("GET", "ingredients", { fixture: "ingredients" });
    cy.intercept("POST", "login", { fixture: "login" });
    cy.intercept("POST", "orders", { fixture: "orders" });

    cy.visit("");
  });

  it("should be drag element and drop in conteiner", () => {
    cy.get(dragElementSelector).first().trigger("dragstart");
    cy.get(dropSouseSelector).trigger("drop");
    cy.get(`${dropSouseSelector} .constructor-element`);
  });

  it("should be open modal after user click with ingredient description", () => {
    cy.get(dragSoucesLinkSelector).first().click();
    cy.get(modalSelector)
      .should("include.text", "Детали ингридиента")
      .and("include.text", "Тестовый соус");
  });

  it("should be opened and close modal after user click", () => {
    cy.get(dragSoucesLinkSelector).first().click();
    cy.get(modalButtonCloseSelector).click();
    cy.get(modalSelector).should("be.empty");
  });

  it("should be open modal after click order button", () => {
    const email = "leshiy_POS@mail.ru";
    const password = "136661987";

    cy.get(dragElementSelector).first().trigger("dragstart");
    cy.get(dropSouseSelector).trigger("drop");
    cy.get(dragBunsElementSelector).first().trigger("dragstart");
    cy.get(dropBunsSelector).trigger("drop");
    cy.get(modalButtonOrderSelector).click();

    cy.get(inputEmailSelector).type(`${email}`);
    cy.get(inputPasswordSelector).type(`${password}{enter}`);
    cy.wait(1000);

    cy.get(modalButtonOrderSelector).click();
    cy.get(modalSelector).should(
      "include.text",
      "Тестовый заказ для тестовых тестов"
    );
    cy.get(modalButtonCloseSelector).click();
    cy.get(modalSelector).should("be.empty");
  });
});
