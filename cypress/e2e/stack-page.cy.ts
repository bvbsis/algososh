import circleState from "../constants/circleSate";

const { initial, changing } = circleState;

describe("Stack-page :", () => {
  before(() => {
    cy.visit("/stack");
  });

  afterEach(() => {
    cy.reload();
  });

  it('should disable "add" button when input is empty', () => {
    cy.get(".text_type_input").as("input");
    cy.get("[class^=stack-page_inputContainer__] > .text_type_button")
      .eq(0)
      .as("button");

    cy.get("@input").should("have.value", "");
    cy.get("@button").should("be.disabled");
    cy.get("@input").type("12345").should("have.value", "1234");
    cy.get("@button").should("not.be.disabled");
  });

  it("should add an element to the stack with animation", () => {
    cy.get(".text_type_input").as("input");
    cy.get("[class^=stack-page_inputContainer__] > .text_type_button")
      .eq(0)
      .as("addButton");
    cy.get("[class^=stack-page_stackContainer__]").as("stackContainer");

    cy.clock();
    cy.get("@input").type("1234");
    cy.get("@addButton").click();
    cy.get("@stackContainer").find("[class^=circle_content__]").as("circles");
    cy.get("@circles").find("[class^=circle_circle__]").as("circlesOutline");
    cy.get("@circlesOutline")
      .eq(0)
      .should("have.css", "border", `4px solid ${changing}`)
      .contains("1234");
    cy.get("@circles").eq(0).contains("top");
    cy.get("@circles").eq(0).contains(0);

    cy.tick(1000);
    cy.get("@circlesOutline")
      .eq(0)
      .should("have.css", "border", `4px solid ${initial}`)
      .contains("1234");
    cy.get("@circles").eq(0).contains("top");
    cy.get("@circles").eq(0).contains(0);

    cy.get("@input").type("aa");
    cy.get("@addButton").click();
    cy.get("@stackContainer").find("[class^=circle_content__]").as("circles");
    cy.get("@circles").find("[class^=circle_circle__]").as("circlesOutline");
    cy.get("@circlesOutline")
      .eq(0)
      .should("have.css", "border", `4px solid ${initial}`)
      .contains("1234");
    cy.get("@circles").eq(0).contains("top").should("not.exist");
    cy.get("@circles").eq(0).contains(0);

    cy.get("@circlesOutline")
      .eq(1)
      .should("have.css", "border", `4px solid ${changing}`)
      .contains("aa");
    cy.get("@circles").eq(1).contains("top");
    cy.get("@circles").eq(1).contains(1);

    cy.tick(1000);
    cy.get("@stackContainer").find("[class^=circle_content__]").as("circles");
    cy.get("@circles").find("[class^=circle_circle__]").as("circlesOutline");
    cy.get("@circlesOutline")
      .eq(0)
      .should("have.css", "border", `4px solid ${initial}`)
      .contains("1234");
    cy.get("@circles").eq(0).contains("top").should("not.exist");
    cy.get("@circles").eq(0).contains(0);

    cy.get("@circlesOutline")
      .eq(1)
      .should("have.css", "border", `4px solid ${initial}`)
      .contains("aa");
    cy.get("@circles").eq(1).contains("top");
    cy.get("@circles").eq(1).contains(1);
  });

  it("should delete an element from the stack with animation", () => {
    cy.get(".text_type_input").as("input");
    cy.get("[class^=stack-page_inputContainer__] > .text_type_button")
      .eq(0)
      .as("addButton");
    cy.get("[class^=stack-page_inputContainer__] > .text_type_button")
      .eq(1)
      .as("deleteButton");
    cy.get("[class^=stack-page_stackContainer__]").as("stackContainer");

    cy.clock();
    cy.get("@input").type("1234");
    cy.get("@addButton").click();

    cy.tick(2000);
    cy.get("@input").type("4321");
    cy.get("@addButton").click();

    cy.tick(2000);
    cy.get("@stackContainer").find("[class^=circle_content__]").as("circles");
    cy.get("@circles").each(($circle) => {
      cy.wrap($circle).should("exist");
    });
    cy.get("@deleteButton").click();
    cy.get("@stackContainer").find("[class^=circle_content__]").as("circles");
    cy.get("@circles").find("[class^=circle_circle__]").as("circlesOutline");
    cy.get("@circlesOutline")
      .eq(1)
      .should("have.css", "border", `4px solid ${changing}`)
      .contains("4321");
      
    cy.get("@circlesOutline")
      .eq(0)
      .should("have.css", "border", `4px solid ${initial}`)
      .contains("1234");

    cy.tick(1000);
    cy.get("@stackContainer").find("[class^=circle_content__]").as("circles");
    cy.get("@circles").find("[class^=circle_circle__]").as("circlesOutline");
    cy.get("@circles").eq(1).should("not.exist");
    cy.get("@circles").eq(0).contains("top");
    cy.get("@circlesOutline")
      .eq(0)
      .should("have.css", "border", `4px solid ${initial}`)
      .contains("1234");
  });

  it("should clear the stack", () => {
    cy.get(".text_type_input").as("input");
    cy.get("[class^=stack-page_inputContainer__] > .text_type_button")
      .eq(0)
      .as("addButton");
    cy.get("[class^=stack-page_inputContainer__] > .text_type_button")
      .eq(2)
      .as("clearButton");
    cy.get("[class^=stack-page_stackContainer__]").as("stackContainer");

    cy.clock();
    cy.get("@input").type("aaaa");
    cy.get("@addButton").click();

    cy.tick(2000);
    cy.get("@input").type("bb");
    cy.get("@addButton").click();

    cy.tick(2000);
    cy.get("@stackContainer").find("[class^=circle_content__]").as("circles");
    cy.get("@circles").each(($circle) => {
      cy.wrap($circle).should("exist");
    });
    cy.get("@clearButton").click();

    cy.tick(0);
    cy.get("@circles").should("not.exist");
  });
});
