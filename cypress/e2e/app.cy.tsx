describe("App is working: ", () => {
  it("should be available on home page", () => {
    cy.visit("/a");
  });
});

describe("Routing is working: ", () => {
  before(() => {
    cy.visit("/");
  });

  after(() => {
    cy.visit("/");
  });

  it("should open main page by default", () => {
    cy.contains("Вдохновлено школами, в которых не учили алгоритмам");
  });

  it("should open recursion page", () => {
    cy.visit("/recursion");
    cy.contains("Строка");
  });

  it("should open fibonacci page", () => {
    cy.visit("/fibonacci");
    cy.contains("Последовательность Фибоначчи");
  });

  it("should open sorting page", () => {
    cy.visit("/sorting");
    cy.contains("Сортировка массива");
  });

  it("should open stack page", () => {
    cy.visit("/stack");
    cy.contains("Стек");
  });

  it("should open queue page", () => {
    cy.visit("/queue");
    cy.contains("Очередь");
  });

  it("should open list page", () => {
    cy.visit("/list");
    cy.contains("Связный список");
  });
});
