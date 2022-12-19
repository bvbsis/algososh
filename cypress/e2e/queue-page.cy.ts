import circleState from "../constants/circleSate";
import selectors from "../constants/selectors";

const { initial, changing } = circleState;
const { elementClass, outlineClass, inputSelector, queuePageButtonsSelector } =
  selectors;

describe("Queue-page :", () => {
  before(() => {
    cy.visit("/queue");
  });

  afterEach(() => {
    cy.reload();
  });

  it('should disable "add" button when input is empty', () => {
    cy.get(inputSelector).eq(0).as("input");
    cy.get(queuePageButtonsSelector).eq(0).as("button");

    cy.get("@input").should("have.value", "");
    cy.get("@button").should("be.disabled");
    cy.get("@input").type("12345").should("have.value", "1234");
    cy.get("@button").should("not.be.disabled");
  });

  it("should add elements to the queue with animation", () => {
    cy.get(inputSelector).eq(0).as("input");
    cy.get(queuePageButtonsSelector).eq(0).as("addButton");
    cy.get("[class^=queue-page_queueContainer__]").as("queueContainer");

    cy.clock();
    cy.get("@queueContainer").find(elementClass).as("circles");
    cy.get("@circles").each(($circle, index) => {
      cy.wrap($circle).find(outlineClass).as("circleOutline");
      switch (index) {
        case 0: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          break;
        }
        case 1: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          break;
        }
        case 2: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          break;
        }
        case 3: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          break;
        }
        case 4: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          break;
        }
        case 5: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          break;
        }
        case 6: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          break;
        }
        default: {
          break;
        }
      }
    });
    cy.get("@input").type("aaaa");
    cy.get("@addButton").click();
    cy.get("@queueContainer").find(elementClass).as("circles");
    cy.get("@circles").each(($circle, index) => {
      cy.wrap($circle).find(outlineClass).as("circleOutline");
      switch (index) {
        case 0: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${changing}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          break;
        }
        case 1: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          break;
        }
        case 2: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          break;
        }
        case 3: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          break;
        }
        case 4: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          break;
        }
        case 5: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          break;
        }
        case 6: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          break;
        }
        default: {
          break;
        }
      }
    });

    cy.tick(500);
    cy.get("@queueContainer").find(elementClass).as("circles");
    cy.get("@circles").each(($circle, index) => {
      cy.wrap($circle).find(outlineClass).as("circleOutline");
      switch (index) {
        case 0: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${changing}`
          );
          cy.wrap($circle).should("contain.text", "head");
          cy.wrap($circle).should("contain.text", "tail");
          cy.get("@circleOutline").should("contain.text", "aaaa");
          break;
        }
        case 1: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          break;
        }
        case 2: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          break;
        }
        case 3: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          break;
        }
        case 4: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          break;
        }
        case 5: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          break;
        }
        case 6: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          break;
        }
        default: {
          break;
        }
      }
    });

    cy.tick(500);
    cy.get("@queueContainer").find(elementClass).as("circles");
    cy.get("@circles").each(($circle, index) => {
      cy.wrap($circle).find(outlineClass).as("circleOutline");
      switch (index) {
        case 0: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("contain.text", "head");
          cy.wrap($circle).should("contain.text", "tail");
          cy.get("@circleOutline").should("contain.text", "aaaa");
          break;
        }
        case 1: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          break;
        }
        case 2: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          break;
        }
        case 3: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          break;
        }
        case 4: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          break;
        }
        case 5: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          break;
        }
        case 6: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          break;
        }
        default: {
          break;
        }
      }
    });

    cy.get("@input").type("bbbb");
    cy.get("@addButton").click();
    cy.get("@queueContainer").find(elementClass).as("circles");
    cy.get("@circles").each(($circle, index) => {
      cy.wrap($circle).find(outlineClass).as("circleOutline");
      switch (index) {
        case 0: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("contain.text", "head");
          cy.wrap($circle).should("contain.text", "tail");
          cy.get("@circleOutline").should("contain.text", "aaaa");
          break;
        }
        case 1: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${changing}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          break;
        }
        case 2: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          break;
        }
        case 3: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          break;
        }
        case 4: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          break;
        }
        case 5: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          break;
        }
        case 6: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          break;
        }
        default: {
          break;
        }
      }
    });

    cy.tick(500);
    cy.get("@queueContainer").find(elementClass).as("circles");
    cy.get("@circles").each(($circle, index) => {
      cy.wrap($circle).find(outlineClass).as("circleOutline");
      switch (index) {
        case 0: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          cy.get("@circleOutline").should("contain.text", "aaaa");
          break;
        }
        case 1: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${changing}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("contain.text", "tail");
          cy.get("@circleOutline").should("contain.text", "bbbb");
          break;
        }
        case 2: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          break;
        }
        case 3: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          break;
        }
        case 4: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          break;
        }
        case 5: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          break;
        }
        case 6: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          break;
        }
        default: {
          break;
        }
      }
    });

    cy.tick(500);
    cy.get("@queueContainer").find(elementClass).as("circles");
    cy.get("@circles").each(($circle, index) => {
      cy.wrap($circle).find(outlineClass).as("circleOutline");
      switch (index) {
        case 0: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          cy.get("@circleOutline").should("contain.text", "aaaa");
          break;
        }
        case 1: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("contain.text", "tail");
          cy.get("@circleOutline").should("contain.text", "bbbb");
          break;
        }
        case 2: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          break;
        }
        case 3: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          break;
        }
        case 4: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          break;
        }
        case 5: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          break;
        }
        case 6: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          break;
        }
        default: {
          break;
        }
      }
    });

    cy.get("@input").type("cccc");
    cy.get("@addButton").click();
    cy.get("@queueContainer").find(elementClass).as("circles");
    cy.get("@circles").each(($circle, index) => {
      cy.wrap($circle).find(outlineClass).as("circleOutline");
      switch (index) {
        case 0: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          cy.get("@circleOutline").should("contain.text", "aaaa");
          break;
        }
        case 1: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("contain.text", "tail");
          cy.get("@circleOutline").should("contain.text", "bbbb");
          break;
        }
        case 2: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${changing}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          break;
        }
        case 3: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          break;
        }
        case 4: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          break;
        }
        case 5: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          break;
        }
        case 6: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          break;
        }
        default: {
          break;
        }
      }
    });

    cy.tick(500);
    cy.get("@queueContainer").find(elementClass).as("circles");
    cy.get("@circles").each(($circle, index) => {
      cy.wrap($circle).find(outlineClass).as("circleOutline");
      switch (index) {
        case 0: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          cy.get("@circleOutline").should("contain.text", "aaaa");
          break;
        }
        case 1: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          cy.get("@circleOutline").should("contain.text", "bbbb");
          break;
        }
        case 2: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${changing}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("contain.text", "tail");
          cy.get("@circleOutline").should("contain.text", "cccc");
          break;
        }
        case 3: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          break;
        }
        case 4: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          break;
        }
        case 5: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          break;
        }
        case 6: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          break;
        }
        default: {
          break;
        }
      }
    });

    cy.tick(500);
    cy.get("@queueContainer").find(elementClass).as("circles");
    cy.get("@circles").each(($circle, index) => {
      cy.wrap($circle).find(outlineClass).as("circleOutline");
      switch (index) {
        case 0: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          cy.get("@circleOutline").should("contain.text", "aaaa");
          break;
        }
        case 1: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          cy.get("@circleOutline").should("contain.text", "bbbb");
          break;
        }
        case 2: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("contain.text", "tail");
          cy.get("@circleOutline").should("contain.text", "cccc");
          break;
        }
        case 3: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          break;
        }
        case 4: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          break;
        }
        case 5: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          break;
        }
        case 6: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          break;
        }
        default: {
          break;
        }
      }
    });
  });

  it("should delete an element from the queue with animation", () => {
    cy.get(inputSelector).eq(0).as("input");
    cy.get(queuePageButtonsSelector).eq(0).as("addButton");
    cy.get(queuePageButtonsSelector).eq(1).as("deleteButton");
    cy.get("[class^=queue-page_queueContainer__]").as("queueContainer");

    cy.clock();
    cy.get("@input").type("aaaa");
    cy.get("@addButton").click();
    cy.tick(500);
    cy.tick(500);
    cy.get("@input").type("bbbb");
    cy.get("@addButton").click();
    cy.tick(500);
    cy.tick(500);
    cy.get("@input").type("cccc");
    cy.get("@addButton").click();
    cy.tick(500);
    cy.tick(500);
    cy.get("@queueContainer").find(elementClass).as("circles");
    cy.get("@circles").each(($circle, index) => {
      cy.wrap($circle).find(outlineClass).as("circleOutline");
      switch (index) {
        case 0: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          cy.get("@circleOutline").should("contain.text", "aaaa");
          break;
        }
        case 1: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          cy.get("@circleOutline").should("contain.text", "bbbb");
          break;
        }
        case 2: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("contain.text", "tail");
          cy.get("@circleOutline").should("contain.text", "cccc");
          break;
        }
        case 3: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          break;
        }
        case 4: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          break;
        }
        case 5: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          break;
        }
        case 6: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          break;
        }
        default: {
          break;
        }
      }
    });

    cy.get("@deleteButton").click();
    cy.get("@queueContainer").find(elementClass).as("circles");
    cy.get("@circles").each(($circle, index) => {
      cy.wrap($circle).find(outlineClass).as("circleOutline");
      switch (index) {
        case 0: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${changing}`
          );
          cy.wrap($circle).should("contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          cy.get("@circleOutline").should("contain.text", "aaaa");
          break;
        }
        case 1: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          cy.get("@circleOutline").should("contain.text", "bbbb");
          break;
        }
        case 2: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("contain.text", "tail");
          cy.get("@circleOutline").should("contain.text", "cccc");
          break;
        }
        case 3: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          break;
        }
        case 4: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          break;
        }
        case 5: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          break;
        }
        case 6: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          break;
        }
        default: {
          break;
        }
      }
    });

    cy.tick(500);
    cy.get("@queueContainer").find(elementClass).as("circles");
    cy.get("@circles").each(($circle, index) => {
      cy.wrap($circle).find(outlineClass).as("circleOutline");
      switch (index) {
        case 0: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          cy.get("@circleOutline").should("not.contain.text", "aaaa");
          break;
        }
        case 1: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          cy.get("@circleOutline").should("contain.text", "bbbb");
          break;
        }
        case 2: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("contain.text", "tail");
          cy.get("@circleOutline").should("contain.text", "cccc");
          break;
        }
        case 3: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          break;
        }
        case 4: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          break;
        }
        case 5: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          break;
        }
        case 6: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          break;
        }
        default: {
          break;
        }
      }
    });

    cy.get("@deleteButton").click();
    cy.get("@queueContainer").find(elementClass).as("circles");
    cy.get("@circles").each(($circle, index) => {
      cy.wrap($circle).find(outlineClass).as("circleOutline");
      switch (index) {
        case 0: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          cy.get("@circleOutline").should("not.contain.text", "aaaa");
          break;
        }
        case 1: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${changing}`
          );
          cy.wrap($circle).should("contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          cy.get("@circleOutline").should("contain.text", "bbbb");
          break;
        }
        case 2: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("contain.text", "tail");
          cy.get("@circleOutline").should("contain.text", "cccc");
          break;
        }
        case 3: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          break;
        }
        case 4: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          break;
        }
        case 5: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          break;
        }
        case 6: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          break;
        }
        default: {
          break;
        }
      }
    });

    cy.tick(500);
    cy.get("@queueContainer").find(elementClass).as("circles");
    cy.get("@circles").each(($circle, index) => {
      cy.wrap($circle).find(outlineClass).as("circleOutline");
      switch (index) {
        case 0: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          cy.get("@circleOutline").should("not.contain.text", "aaaa");
          break;
        }
        case 1: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          cy.get("@circleOutline").should("not.contain.text", "bbbb");
          break;
        }
        case 2: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("contain.text", "head");
          cy.wrap($circle).should("contain.text", "tail");
          cy.get("@circleOutline").should("contain.text", "cccc");
          break;
        }
        case 3: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          break;
        }
        case 4: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          break;
        }
        case 5: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          break;
        }
        case 6: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          break;
        }
        default: {
          break;
        }
      }
    });

    cy.get("@deleteButton").click();
    cy.get("@queueContainer").find(elementClass).as("circles");
    cy.get("@circles").each(($circle, index) => {
      cy.wrap($circle).find(outlineClass).as("circleOutline");
      switch (index) {
        case 0: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          cy.get("@circleOutline").should("not.contain.text", "aaaa");
          break;
        }
        case 1: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          cy.get("@circleOutline").should("not.contain.text", "bbbb");
          break;
        }
        case 2: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${changing}`
          );
          cy.wrap($circle).should("contain.text", "head");
          cy.wrap($circle).should("contain.text", "tail");
          cy.get("@circleOutline").should("contain.text", "cccc");
          break;
        }
        case 3: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          break;
        }
        case 4: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          break;
        }
        case 5: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          break;
        }
        case 6: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          break;
        }
        default: {
          break;
        }
      }
    });

    cy.tick(500);
    cy.get("@queueContainer").find(elementClass).as("circles");
    cy.get("@circles").each(($circle, index) => {
      cy.wrap($circle).find(outlineClass).as("circleOutline");
      switch (index) {
        case 0: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          cy.get("@circleOutline").should("not.contain.text", "aaaa");
          break;
        }
        case 1: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          cy.get("@circleOutline").should("not.contain.text", "bbbb");
          break;
        }
        case 2: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          cy.get("@circleOutline").should("not.contain.text", "cccc");
          break;
        }
        case 3: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          break;
        }
        case 4: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          break;
        }
        case 5: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          break;
        }
        case 6: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          break;
        }
        default: {
          break;
        }
      }
    });
  });

  it("should clear the queue", () => {
    cy.get(inputSelector).eq(0).as("input");
    cy.get(queuePageButtonsSelector).eq(0).as("addButton");
    cy.get(queuePageButtonsSelector).eq(2).as("clearButton");
    cy.get("[class^=queue-page_queueContainer__]").as("queueContainer");

    cy.clock();
    cy.get("@input").type("aaaa");
    cy.get("@addButton").click();
    cy.tick(500);
    cy.tick(500);
    cy.get("@input").type("bbbb");
    cy.get("@addButton").click();
    cy.tick(500);
    cy.tick(500);
    cy.get("@input").type("cccc");
    cy.get("@addButton").click();
    cy.tick(500);
    cy.tick(500);
    cy.get("@queueContainer").find(elementClass).as("circles");
    cy.get("@circles").each(($circle, index) => {
      cy.wrap($circle).find(outlineClass).as("circleOutline");
      switch (index) {
        case 0: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          cy.get("@circleOutline").should("contain.text", "aaaa");
          break;
        }
        case 1: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          cy.get("@circleOutline").should("contain.text", "bbbb");
          break;
        }
        case 2: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("contain.text", "tail");
          cy.get("@circleOutline").should("contain.text", "cccc");
          break;
        }
        case 3: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          break;
        }
        case 4: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          break;
        }
        case 5: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          break;
        }
        case 6: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          break;
        }
        default: {
          break;
        }
      }
    });
    cy.get("@clearButton").click();
    cy.tick(0);
    cy.get("@queueContainer").find(elementClass).as("circles");
    cy.get("@circles").each(($circle, index) => {
      cy.wrap($circle).find(outlineClass).as("circleOutline");
      switch (index) {
        case 0: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          cy.get("@circleOutline").should("not.contain.text", "aaaa");
          break;
        }
        case 1: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          cy.get("@circleOutline").should("not.contain.text", "bbbb");
          break;
        }
        case 2: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          cy.get("@circleOutline").should("not.contain.text", "cccc");
          break;
        }
        case 3: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          break;
        }
        case 4: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          break;
        }
        case 5: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          break;
        }
        case 6: {
          cy.get("@circleOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($circle).should("not.contain.text", "head");
          cy.wrap($circle).should("not.contain.text", "tail");
          break;
        }
        default: {
          break;
        }
      }
    });
    cy.get("@addButton").should("be.disabled");
    cy.get("@clearButton").should("be.disabled");
  });
});
