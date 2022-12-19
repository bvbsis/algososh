import circleState from "../constants/circleSate";
import selectors from "../constants/selectors";

const { initial } = circleState;
const { elementClass, outlineClass, inputSelector } = selectors;

describe("Fibonacci page :", () => {
  before(() => {
    cy.visit("/fibonacci");
  });

  afterEach(() => {
    cy.reload();
  });

  it("should disable button when input is empty", () => {
    cy.get(inputSelector).as("input");
    cy.get("[class^=fibonacci-page_inputContainer__] > .text_type_button").as(
      "button"
    );

    cy.get("@input").should("have.value", "");

    cy.get("@button").should("be.disabled");

    cy.get("@input").type("1").should("have.value", "1");

    cy.get("@button").should("not.be.disabled");
  });

  it("should generate fibonacci numbers", () => {
    cy.get(inputSelector).as("input");
    cy.get("[class^=fibonacci-page_inputContainer__] > .text_type_button").as(
      "button"
    );

    cy.clock();
    cy.get("@input").type("7");
    cy.get("@button").click();
    cy.get("@button").should("be.disabled");
    cy.get("[class^=fibonacci-page_digitsContainer__]").as("digitsContainer");
    cy.get("@digitsContainer").find(elementClass).as("circles");
    cy.get("@circles").find(outlineClass).as("circlesOutline");
    cy.get("@circlesOutline")
      .eq(0)
      .should("have.css", "border", `4px solid ${initial}`)
      .contains("1");

    cy.tick(500);
    cy.get("@digitsContainer").find(elementClass).as("circles");
    cy.get("@circles").find(outlineClass).as("circlesOutline");
    cy.get("@circlesOutline").each(($circleOutline) => {
      cy.wrap($circleOutline)
        .should("have.css", "border", `4px solid ${initial}`)
        .contains("1");
    });

    cy.tick(500);
    cy.get("@button").should("be.disabled");
    cy.get("@digitsContainer").find(elementClass).as("circles");
    cy.get("@circles").find(outlineClass).as("circlesOutline");
    cy.get("@circlesOutline").each(($circleOutline, index) => {
      switch (index) {
        case 0 || 1: {
          cy.wrap($circleOutline)
            .should("have.css", "border", `4px solid ${initial}`)
            .contains("1");
          break;
        }
        case 2: {
          cy.wrap($circleOutline)
            .should("have.css", "border", `4px solid ${initial}`)
            .contains("2");
          break;
        }
        default: {
          break;
        }
      }
    });

    cy.tick(500);
    cy.get("@button").should("be.disabled");
    cy.get("@digitsContainer").find(elementClass).as("circles");
    cy.get("@circles").find(outlineClass).as("circlesOutline");
    cy.get("@circlesOutline").each(($circleOutline, index) => {
      switch (index) {
        case 0 || 1: {
          cy.wrap($circleOutline)
            .should("have.css", "border", `4px solid ${initial}`)
            .contains("1");
          break;
        }
        case 2: {
          cy.wrap($circleOutline)
            .should("have.css", "border", `4px solid ${initial}`)
            .contains("2");
          break;
        }
        case 3: {
          cy.wrap($circleOutline)
            .should("have.css", "border", `4px solid ${initial}`)
            .contains("3");
          break;
        }
        default: {
          break;
        }
      }
    });

    cy.tick(500);
    cy.get("@digitsContainer").find(elementClass).as("circles");
    cy.get("@circles").find(outlineClass).as("circlesOutline");

    cy.get("@circlesOutline").each(($circleOutline, index) => {
      switch (index) {
        case 0 || 1: {
          cy.wrap($circleOutline)
            .should("have.css", "border", `4px solid ${initial}`)
            .contains("1");
          break;
        }
        case 2: {
          cy.wrap($circleOutline)
            .should("have.css", "border", `4px solid ${initial}`)
            .contains("2");
          break;
        }
        case 3: {
          cy.wrap($circleOutline)
            .should("have.css", "border", `4px solid ${initial}`)
            .contains("3");
          break;
        }
        case 4: {
          cy.wrap($circleOutline)
            .should("have.css", "border", `4px solid ${initial}`)
            .contains("5");
          break;
        }
        default: {
          break;
        }
      }
    });

    cy.tick(500);
    cy.get("@digitsContainer").find(elementClass).as("circles");
    cy.get("@circles").find(outlineClass).as("circlesOutline");
    cy.get("@circlesOutline").each(($circleOutline, index) => {
      switch (index) {
        case 0 || 1: {
          cy.wrap($circleOutline)
            .should("have.css", "border", `4px solid ${initial}`)
            .contains("1");
          break;
        }
        case 2: {
          cy.wrap($circleOutline)
            .should("have.css", "border", `4px solid ${initial}`)
            .contains("2");
          break;
        }
        case 3: {
          cy.wrap($circleOutline)
            .should("have.css", "border", `4px solid ${initial}`)
            .contains("3");
          break;
        }
        case 4: {
          cy.wrap($circleOutline)
            .should("have.css", "border", `4px solid ${initial}`)
            .contains("5");
          break;
        }
        case 5: {
          cy.wrap($circleOutline)
            .should("have.css", "border", `4px solid ${initial}`)
            .contains("8");
          break;
        }
        default: {
          break;
        }
      }
    });

    cy.tick(500);
    cy.get("@digitsContainer").find(elementClass).as("circles");
    cy.get("@circles").find(outlineClass).as("circlesOutline");
    cy.get("@circlesOutline").each(($circleOutline, index) => {
      switch (index) {
        case 0 || 1: {
          cy.wrap($circleOutline)
            .should("have.css", "border", `4px solid ${initial}`)
            .contains("1");
          break;
        }
        case 2: {
          cy.wrap($circleOutline)
            .should("have.css", "border", `4px solid ${initial}`)
            .contains("2");
          break;
        }
        case 3: {
          cy.wrap($circleOutline)
            .should("have.css", "border", `4px solid ${initial}`)
            .contains("3");
          break;
        }
        case 4: {
          cy.wrap($circleOutline)
            .should("have.css", "border", `4px solid ${initial}`)
            .contains("5");
          break;
        }
        case 5: {
          cy.wrap($circleOutline)
            .should("have.css", "border", `4px solid ${initial}`)
            .contains("8");
          break;
        }
        case 6: {
          cy.wrap($circleOutline)
            .should("have.css", "border", `4px solid ${initial}`)
            .contains("13");
          break;
        }
        default: {
          break;
        }
      }
    });

    cy.tick(500);
    cy.get("@digitsContainer").find(elementClass).as("circles");
    cy.get("@circles").find(outlineClass).as("circlesOutline");
    cy.get("@circlesOutline").each(($circleOutline, index) => {
      switch (index) {
        case 0 || 1: {
          cy.wrap($circleOutline)
            .should("have.css", "border", `4px solid ${initial}`)
            .contains("1");
          break;
        }
        case 2: {
          cy.wrap($circleOutline)
            .should("have.css", "border", `4px solid ${initial}`)
            .contains("2");
          break;
        }
        case 3: {
          cy.wrap($circleOutline)
            .should("have.css", "border", `4px solid ${initial}`)
            .contains("3");
          break;
        }
        case 4: {
          cy.wrap($circleOutline)
            .should("have.css", "border", `4px solid ${initial}`)
            .contains("5");
          break;
        }
        case 5: {
          cy.wrap($circleOutline)
            .should("have.css", "border", `4px solid ${initial}`)
            .contains("8");
          break;
        }
        case 6: {
          cy.wrap($circleOutline)
            .should("have.css", "border", `4px solid ${initial}`)
            .contains("13");
          break;
        }
        case 7: {
          cy.wrap($circleOutline)
            .should("have.css", "border", `4px solid ${initial}`)
            .contains("21");
          break;
        }
        default: {
          break;
        }
      }
    });

    cy.get("@button").should("not.be.disabled");
  });
});
