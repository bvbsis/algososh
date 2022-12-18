import circleState from "../constants/circleSate";

const { modified, initial, changing } = circleState;

describe("Recursion-page (String-page) :", () => {
  before(() => {
    cy.visit("/recursion");
  });

  afterEach(() => {
    cy.reload();
  });

  it('should disable "reverse" button when input is empty', () => {
    cy.get(".text_type_input").as("input");
    cy.get("[class^=string-page_inputContainer__] > .text_type_button").as(
      "button"
    );

    cy.get("@input").should("have.value", "");
    cy.get("@button").should("be.disabled");
    cy.get("@input").type("hello").should("have.value", "hello");
    cy.get("@button").should("not.be.disabled");
  });

  it("should reverse a row with animation", () => {
    cy.get(".text_type_input").as("input");
    cy.get("[class^=string-page_inputContainer__] > .text_type_button").as(
      "button"
    );
    cy.get("[class^=string-page_lettersContainer__]").as("lettersContainer");

    cy.clock();
    cy.get("@input").type("hello");
    cy.get("@button").click();
    cy.get("@lettersContainer").find("[class^=circle_content__]").as("circles");
    cy.get("@circles").find("[class^=circle_circle__]").as("circlesOutline");
    cy.get("@circlesOutline").each(($circleOutline, index) => {
      switch (index) {
        case 0: {
          cy.wrap($circleOutline)
            .should("have.css", "border", `4px solid ${changing}`)
            .contains("h");
          break;
        }
        case 1: {
          cy.wrap($circleOutline)
            .should("have.css", "border", `4px solid ${initial}`)
            .contains("e");
          break;
        }
        case 2: {
          cy.wrap($circleOutline)
            .should("have.css", "border", `4px solid ${initial}`)
            .contains("l");
          break;
        }
        case 3: {
          cy.wrap($circleOutline)
            .should("have.css", "border", `4px solid ${initial}`)
            .contains("l");
          break;
        }
        case 4: {
          cy.wrap($circleOutline)
            .should("have.css", "border", `4px solid ${changing}`)
            .contains("o");
          break;
        }
      }
    });

    cy.tick(1000);
    cy.get("@circles").find("[class^=circle_circle__]").as("circlesOutline");
    cy.get("@circlesOutline").each(($circleOutline, index) => {
      switch (index) {
        case 0: {
          cy.wrap($circleOutline)
            .should("have.css", "border", `4px solid ${modified}`)
            .contains("o");
          break;
        }
        case 1: {
          cy.wrap($circleOutline)
            .should("have.css", "border", `4px solid ${changing}`)
            .contains("e");
          break;
        }
        case 2: {
          cy.wrap($circleOutline)
            .should("have.css", "border", `4px solid ${initial}`)
            .contains("l");
          break;
        }
        case 3: {
          cy.wrap($circleOutline)
            .should("have.css", "border", `4px solid ${changing}`)
            .contains("l");
          break;
        }
        case 4: {
          cy.wrap($circleOutline)
            .should("have.css", "border", `4px solid ${modified}`)
            .contains("h");
          break;
        }
      }
    });

    cy.tick(1000);
    cy.get("@circles").find("[class^=circle_circle__]").as("circlesOutline");
    cy.get("@circlesOutline").each(($circleOutline, index) => {
      switch (index) {
        case 0: {
          cy.wrap($circleOutline)
            .should("have.css", "border", `4px solid ${modified}`)
            .contains("o");
          break;
        }
        case 1: {
          cy.wrap($circleOutline)
            .should("have.css", "border", `4px solid ${modified}`)
            .contains("l");
          break;
        }
        case 2: {
          cy.wrap($circleOutline)
            .should("have.css", "border", `4px solid ${modified}`)
            .contains("l");
          break;
        }
        case 3: {
          cy.wrap($circleOutline)
            .should("have.css", "border", `4px solid ${modified}`)
            .contains("e");
          break;
        }
        case 4: {
          cy.wrap($circleOutline)
            .should("have.css", "border", `4px solid ${modified}`)
            .contains("h");
          break;
        }
      }
    });
  });
});
