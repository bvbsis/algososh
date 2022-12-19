import circleState from "../constants/circleSate";
import selectors from "../constants/selectors";

const { initial, changing, modified } = circleState;
const {
  elementClass,
  outlineClass,
  listElemenstSelector,
  inputSelector,
  listPageButtonsSelector,
} = selectors;

describe("List-page :", () => {
  before(() => {
    cy.visit("/list");
  });

  afterEach(() => {
    cy.reload();
  });

  it('should disable all "add" buttons when inputs are empty', () => {
    cy.get(inputSelector).eq(0).as("input");
    cy.get(inputSelector).eq(1).as("indexInput");
    cy.get(listPageButtonsSelector).eq(0).as("addInHeadButton");
    cy.get(listPageButtonsSelector).eq(1).as("addInTailButton");
    cy.get(listPageButtonsSelector).eq(4).as("addByIndexButton");

    cy.get("@input").should("have.value", "");
    cy.get("@indexInput").should("have.value", "");
    cy.get("@addInHeadButton").should("be.disabled");
    cy.get("@addInTailButton").should("be.disabled");
    cy.get("@addByIndexButton").should("be.disabled");
    cy.get("@input").type("12345").should("have.value", "1234");
    cy.get("@addInHeadButton").should("not.be.disabled");
    cy.get("@addInTailButton").should("not.be.disabled");
    cy.get("@addByIndexButton").should("be.disabled");
    cy.get("@indexInput").type("1").should("have.value", "1");
    cy.get("@addInHeadButton").should("not.be.disabled");
    cy.get("@addInTailButton").should("not.be.disabled");
    cy.get("@addByIndexButton").should("not.be.disabled");
  });

  it("should show initial list", () => {
    cy.get("[class^=list-page_listContainer__]").as("listContainer");
    cy.get("@listContainer").find(elementClass).as("listElements");
    cy.get("@listElements").each(($element, index) => {
      cy.wrap($element).find(outlineClass).as("elementOutline");
      switch (index) {
        case 0: {
          cy.get("@elementOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($element).should("contain.text", "head");
          cy.wrap($element).should("not.contain.text", "tail");
          cy.get("@elementOutline").should("contain.text", "0");
          break;
        }
        case 1: {
          cy.get("@elementOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($element).should("not.contain.text", "head");
          cy.wrap($element).should("not.contain.text", "tail");
          cy.get("@elementOutline").should("contain.text", "34");
          break;
        }
        case 2: {
          cy.get("@elementOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($element).should("not.contain.text", "head");
          cy.wrap($element).should("not.contain.text", "tail");
          cy.get("@elementOutline").should("contain.text", "8");
          break;
        }
        case 3: {
          cy.get("@elementOutline").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          cy.wrap($element).should("not.contain.text", "head");
          cy.wrap($element).should("contain.text", "tail");
          cy.get("@elementOutline").should("contain.text", "1");
          break;
        }
        default: {
          break;
        }
      }
    });
  });

  it("should add an element in head", () => {
    cy.get(inputSelector).eq(0).as("input");
    cy.get(listPageButtonsSelector).eq(0).as("addInHeadButton");

    cy.get("@input").type("1111");
    cy.get("@addInHeadButton").click();

    cy.get(listElemenstSelector).as("listElements");
    cy.clock();
    cy.get("@listElements")
      .eq(0)
      .find(outlineClass)
      .eq(1)
      .should("have.css", "border", `4px solid ${initial}`)
      .and("contain.text", "0");
    cy.get("@listElements")
      .eq(0)
      .find(outlineClass)
      .eq(0)
      .should("contain.text", "1111")
      .and("have.css", "border", `4px solid ${changing}`);

    cy.tick(500);
    cy.get(listElemenstSelector).as("listElements");
    cy.get("@listElements")
      .eq(0)
      .find(outlineClass)
      .should("have.css", "border", `4px solid ${modified}`)
      .and("contain.text", "1111");
    cy.get("@listElements").eq(0).should("contain.text", "head");
    cy.get("@listElements")
      .eq(1)
      .find(outlineClass)
      .should("have.css", "border", `4px solid ${initial}`)
      .and("not.contain.text", "1111");
    cy.get("@listElements").eq(1).should("not.contain.text", "head");

    cy.tick(500);
    cy.get(listElemenstSelector).as("listElements");
    cy.get("@listElements")
      .eq(0)
      .find(outlineClass)
      .should("have.css", "border", `4px solid ${initial}`)
      .and("contain.text", "1111");
    cy.get("@listElements").eq(0).should("contain.text", "head");
    cy.get("@listElements")
      .eq(1)
      .find(outlineClass)
      .should("have.css", "border", `4px solid ${initial}`)
      .and("not.contain.text", "1111");
    cy.get("@listElements").eq(1).should("not.contain.text", "head");
  });

  it("should add an element in tail", () => {
    cy.get(inputSelector).eq(0).as("input");
    cy.get(listPageButtonsSelector).eq(1).as("addInTailButton");

    cy.clock();
    cy.get("@input").type("1111");
    cy.get("@addInTailButton").click();

    cy.get(listElemenstSelector).as("listElements");

    cy.get("@listElements")
      .eq(3)
      .find(outlineClass)
      .eq(1)
      .should("have.css", "border", `4px solid ${initial}`)
      .and("contain.text", "1");
    cy.get("@listElements")
      .eq(3)
      .find(outlineClass)
      .eq(0)
      .should("contain.text", "1111")
      .and("have.css", "border", `4px solid ${changing}`);

    cy.tick(500);
    cy.get(listElemenstSelector).as("listElements");
    cy.get("@listElements")
      .eq(3)
      .find(outlineClass)
      .should("have.css", "border", `4px solid ${initial}`)
      .and("not.contain.text", "1111");
    cy.get("@listElements").eq(3).should("not.contain.text", "tail");
    cy.get("@listElements")
      .eq(4)
      .find(outlineClass)
      .should("have.css", "border", `4px solid ${modified}`)
      .and("contain.text", "1111");
    cy.get("@listElements").eq(4).should("contain.text", "tail");

    cy.tick(500);
    cy.get(listElemenstSelector).as("listElements");
    cy.get("@listElements")
      .eq(3)
      .find(outlineClass)
      .should("have.css", "border", `4px solid ${initial}`)
      .and("not.contain.text", "1111");
    cy.get("@listElements").eq(3).should("not.contain.text", "tail");
    cy.get("@listElements")
      .eq(4)
      .find(outlineClass)
      .should("have.css", "border", `4px solid ${initial}`)
      .and("contain.text", "1111");
    cy.get("@listElements").eq(4).should("contain.text", "tail");
  });

  it("should add an element by index", () => {
    cy.clock();
    cy.get(inputSelector).eq(0).as("input");
    cy.get(inputSelector).eq(1).as("indexInput");
    cy.get(listPageButtonsSelector).eq(4).as("addByIndexButton");
    cy.get("@input").type("1111");
    cy.get("@indexInput").type("2");
    cy.get("@addByIndexButton").click();

    cy.get(listElemenstSelector).as("listElements");

    cy.get("@listElements").each(($element, index) => {
      cy.wrap($element).find(outlineClass).as("outlines");
      switch (index) {
        case 0: {
          cy.wrap($element).should("not.contain", "head");
          cy.get("@outlines")
            .eq(0)
            .should("contain", "1111")
            .and("have.css", "border", `4px solid ${changing}`);
          cy.get("@outlines")
            .eq(1)
            .should("not.contain", "1111")
            .and("have.css", "border", `4px solid ${initial}`);
          break;
        }
        case 1: {
          cy.wrap($element)
            .should("not.contain", "head")
            .and("not.contain", "1111");
          cy.get("@outlines").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          break;
        }
        case 2: {
          cy.wrap($element)
            .should("not.contain", "head")
            .and("not.contain", "1111");
          cy.get("@outlines").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          break;
        }
        case 3: {
          cy.wrap($element)
            .should("not.contain", "head")
            .and("not.contain", "1111");
          cy.get("@outlines").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          break;
        }
      }
    });

    cy.tick(500);
    cy.get("@listElements").each(($element, index) => {
      cy.wrap($element).find(outlineClass).as("outlines");
      switch (index) {
        case 0: {
          cy.wrap($element).should("contain", "head");
          cy.get("@outlines")
            .should("not.contain", "1111")
            .and("have.css", "border", `4px solid ${changing}`);
          break;
        }
        case 1: {
          cy.wrap($element).should("not.contain", "head");
          cy.get("@outlines")
            .eq(0)
            .should("contain", "1111")
            .and("have.css", "border", `4px solid ${changing}`);
          cy.get("@outlines")
            .eq(1)
            .should("have.css", "border", `4px solid ${initial}`);
          break;
        }
        case 2: {
          cy.wrap($element)
            .should("not.contain", "head")
            .and("not.contain", "1111");
          cy.get("@outlines").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          break;
        }
        case 3: {
          cy.wrap($element)
            .should("not.contain", "head")
            .and("not.contain", "1111");
          cy.get("@outlines").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          break;
        }
      }
    });

    cy.tick(500);
    cy.get("@listElements").each(($element, index) => {
      cy.wrap($element).find(outlineClass).as("outlines");
      switch (index) {
        case 0: {
          cy.wrap($element)
            .should("contain", "head")
            .and("not.contain", "tail")
            .and("not.contain", "1111");
          cy.get("@outlines").should(
            "have.css",
            "border",
            `4px solid ${changing}`
          );
          break;
        }
        case 1: {
          cy.wrap($element)
            .should("not.contain", "head")
            .and("not.contain", "tail")
            .and("not.contain", "1111");
          cy.get("@outlines").should(
            "have.css",
            "border",
            `4px solid ${changing}`
          );
          break;
        }
        case 2: {
          cy.wrap($element)
            .should("not.contain", "head")
            .and("not.contain", "tail");
          cy.get("@outlines")
            .should("have.css", "border", `4px solid ${modified}`)
            .and("contain", "1111");
          break;
        }
        case 3: {
          cy.wrap($element)
            .should("not.contain", "head")
            .and("not.contain", "tail")
            .and("not.contain", "1111");
          cy.get("@outlines").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          break;
        }
        case 4: {
          cy.wrap($element)
            .should("not.contain", "head")
            .and("contain", "tail")
            .and("not.contain", "1111");
          cy.get("@outlines").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          break;
        }
      }
    });

    cy.tick(500);
    cy.get("@listElements").each(($element, index) => {
      cy.wrap($element).find(outlineClass).as("outlines");
      switch (index) {
        case 0: {
          cy.wrap($element)
            .should("contain", "head")
            .and("not.contain", "tail")
            .and("not.contain", "1111");
          cy.get("@outlines").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          break;
        }
        case 1: {
          cy.wrap($element)
            .should("not.contain", "head")
            .and("not.contain", "tail")
            .and("not.contain", "1111");
          cy.get("@outlines").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          break;
        }
        case 2: {
          cy.wrap($element)
            .should("not.contain", "head")
            .and("not.contain", "tail");
          cy.get("@outlines")
            .should("have.css", "border", `4px solid ${initial}`)
            .and("contain", "1111");
          break;
        }
        case 3: {
          cy.wrap($element)
            .should("not.contain", "head")
            .and("not.contain", "tail")
            .and("not.contain", "1111");
          cy.get("@outlines").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          break;
        }
        case 4: {
          cy.wrap($element)
            .should("not.contain", "head")
            .and("contain", "tail")
            .and("not.contain", "1111");
          cy.get("@outlines").should(
            "have.css",
            "border",
            `4px solid ${initial}`
          );
          break;
        }
      }
    });
  });

  it("should delete an element from head", () => {
    cy.clock();
    cy.get(listPageButtonsSelector).eq(2).as("deleteFromHeadButton");
    cy.get("@deleteFromHeadButton").click();

    cy.get(listElemenstSelector).as("listElements");

    cy.get("@listElements").each(($element, index) => {
      cy.wrap($element).find(outlineClass).as("outlines");
      switch (index) {
        case 0: {
          cy.wrap($element)
            .should("not.contain", "head")
            .and("not.contain", "tail")
            .and("contain.html", "circle_content__");
          cy.get("@outlines")
            .eq(0)
            .should("have.css", "border", `4px solid ${initial}`)
            .and("contain.text", "");
          cy.get("@outlines")
            .eq(1)
            .should("have.css", "border", `4px solid ${changing}`)
            .and("contain.text", "0");
          break;
        }
        case 1: {
          cy.wrap($element)
            .should("not.contain", "head")
            .and("not.contain", "tail")
            .and("not.contain.html", "circle_content__");
          cy.get("@outlines")
            .should("have.css", "border", `4px solid ${initial}`)
            .and("contain.text", "34");
          break;
        }
        case 2: {
          cy.wrap($element)
            .should("not.contain", "head")
            .and("not.contain", "tail")
            .and("not.contain.html", "circle_content__");
          cy.get("@outlines")
            .should("have.css", "border", `4px solid ${initial}`)
            .and("contain.text", "8");
          break;
        }
        case 3: {
          cy.wrap($element)
            .should("not.contain", "head")
            .and("contain", "tail")
            .and("not.contain.html", "circle_content__");
          cy.get("@outlines")
            .should("have.css", "border", `4px solid ${initial}`)
            .and("contain.text", "1");
          break;
        }
      }
    });

    cy.tick(500);
    cy.get(listElemenstSelector).as("listElements");
    cy.get("@listElements").each(($element, index) => {
      cy.wrap($element).find(outlineClass).as("outlines");
      switch (index) {
        case 0: {
          cy.wrap($element)
            .should("contain", "head")
            .and("not.contain", "tail")
            .and("not.contain.html", "circle_content__");
          cy.get("@outlines")
            .should("have.css", "border", `4px solid ${initial}`)
            .and("contain.text", "34");
          break;
        }
        case 1: {
          cy.wrap($element)
            .should("not.contain", "head")
            .and("not.contain", "tail")
            .and("not.contain.html", "circle_content__");
          cy.get("@outlines")
            .should("have.css", "border", `4px solid ${initial}`)
            .and("contain.text", "8");
          break;
        }
        case 2: {
          cy.wrap($element)
            .should("not.contain", "head")
            .and("contain", "tail")
            .and("not.contain.html", "circle_content__");
          cy.get("@outlines")
            .should("have.css", "border", `4px solid ${initial}`)
            .and("contain.text", "1");
          break;
        }
      }
    });
  });

  it("should delete an element from tail", () => {
    cy.clock();
    cy.get(listPageButtonsSelector).eq(3).as("deleteFromTailButton");
    cy.get(listElemenstSelector).as("listElements");

    cy.get("@deleteFromTailButton").click();

    cy.get("@listElements").each(($element, index) => {
      cy.wrap($element).find(outlineClass).as("outlines");
      switch (index) {
        case 0: {
          cy.wrap($element)
            .should("contain", "head")
            .and("not.contain", "tail")
            .and("not.contain.html", "circle_content__");
          cy.get("@outlines")
            .should("have.css", "border", `4px solid ${initial}`)
            .and("contain.text", "0");
          break;
        }
        case 1: {
          cy.wrap($element)
            .should("not.contain", "head")
            .and("not.contain", "tail")
            .and("not.contain.html", "circle_content__");
          cy.get("@outlines")
            .should("have.css", "border", `4px solid ${initial}`)
            .and("contain.text", "34");
          break;
        }
        case 2: {
          cy.wrap($element)
            .should("not.contain", "head")
            .and("not.contain", "tail")
            .and("not.contain.html", "circle_content__");
          cy.get("@outlines")
            .should("have.css", "border", `4px solid ${initial}`)
            .and("contain.text", "8");
          break;
        }
        case 3: {
          cy.wrap($element)
            .should("not.contain", "head")
            .and("not.contain", "tail")
            .and("contain.html", "circle_content__");
          cy.get("@outlines")
            .eq(0)
            .should("have.css", "border", `4px solid ${initial}`)
            .and("contain.text", "");
          cy.get("@outlines")
            .eq(1)
            .should("have.css", "border", `4px solid ${changing}`)
            .and("contain.text", "1");
          break;
        }
      }
    });

    cy.tick(500);
    cy.get(listElemenstSelector).as("listElements");
    cy.get("@listElements").each(($element, index) => {
      cy.wrap($element).find(outlineClass).as("outlines");
      switch (index) {
        case 0: {
          cy.wrap($element)
            .should("contain", "head")
            .and("not.contain", "tail")
            .and("not.contain.html", "circle_content__");
          cy.get("@outlines")
            .should("have.css", "border", `4px solid ${initial}`)
            .and("contain.text", "0");
          break;
        }
        case 1: {
          cy.wrap($element)
            .should("not.contain", "head")
            .and("not.contain", "tail")
            .and("not.contain.html", "circle_content__");
          cy.get("@outlines")
            .should("have.css", "border", `4px solid ${initial}`)
            .and("contain.text", "34");
          break;
        }
        case 2: {
          cy.wrap($element)
            .should("not.contain", "head")
            .and("contain", "tail")
            .and("not.contain.html", "circle_content__");
          cy.get("@outlines")
            .should("have.css", "border", `4px solid ${initial}`)
            .and("contain.text", "8");
          break;
        }
      }
    });
  });

  it("should delete an element by index", () => {
    cy.clock();
    cy.get(listPageButtonsSelector).eq(5).as("deleteByIndexButton");
    cy.get(inputSelector).eq(1).as("indexInput");

    cy.get("@indexInput").type("2");
    cy.get("@deleteByIndexButton").click();

    cy.get(listElemenstSelector).as("listElements");
    cy.get("@listElements").each(($element, index) => {
      cy.wrap($element).find(outlineClass).as("outlines");
      switch (index) {
        case 0: {
          cy.wrap($element)
            .should("contain", "head")
            .and("not.contain", "tail")
            .and("not.contain.html", "circle_content__");
          cy.get("@outlines")
            .should("have.css", "border", `4px solid ${changing}`)
            .and("contain.text", "0");
          break;
        }
        case 1: {
          cy.wrap($element)
            .should("not.contain", "head")
            .and("not.contain", "tail")
            .and("not.contain.html", "circle_content__");
          cy.get("@outlines")
            .should("have.css", "border", `4px solid ${initial}`)
            .and("contain.text", "34");
          break;
        }
        case 2: {
          cy.wrap($element)
            .should("not.contain", "head")
            .and("not.contain", "tail")
            .and("not.contain.html", "circle_content__");
          cy.get("@outlines")
            .should("have.css", "border", `4px solid ${initial}`)
            .and("contain.text", "8");
          break;
        }
        case 3: {
          cy.wrap($element)
            .should("not.contain", "head")
            .and("contain", "tail")
            .and("not.contain.html", "circle_content__");
          cy.get("@outlines")
            .should("have.css", "border", `4px solid ${initial}`)
            .and("contain.text", "1");
          break;
        }
      }
    });

    cy.tick(500);
    cy.get(listElemenstSelector).as("listElements");
    cy.get("@listElements").each(($element, index) => {
      cy.wrap($element).find(outlineClass).as("outlines");
      switch (index) {
        case 0: {
          cy.wrap($element)
            .should("contain", "head")
            .and("not.contain", "tail")
            .and("not.contain.html", "circle_content__");
          cy.get("@outlines")
            .should("have.css", "border", `4px solid ${changing}`)
            .and("contain.text", "0");
          break;
        }
        case 1: {
          cy.wrap($element)
            .should("not.contain", "head")
            .and("not.contain", "tail")
            .and("not.contain.html", "circle_content__");
          cy.get("@outlines")
            .should("have.css", "border", `4px solid ${changing}`)
            .and("contain.text", "34");
          break;
        }
        case 2: {
          cy.wrap($element)
            .should("not.contain", "head")
            .and("not.contain", "tail")
            .and("not.contain.html", "circle_content__");
          cy.get("@outlines")
            .should("have.css", "border", `4px solid ${initial}`)
            .and("contain.text", "8");
          break;
        }
        case 3: {
          cy.wrap($element)
            .should("not.contain", "head")
            .and("contain", "tail")
            .and("not.contain.html", "circle_content__");
          cy.get("@outlines")
            .should("have.css", "border", `4px solid ${initial}`)
            .and("contain.text", "1");
          break;
        }
      }
    });

    cy.tick(500);
    cy.get(listElemenstSelector).as("listElements");
    cy.get("@listElements").each(($element, index) => {
      cy.wrap($element).find(outlineClass).as("outlines");
      switch (index) {
        case 0: {
          cy.wrap($element)
            .should("contain", "head")
            .and("not.contain", "tail")
            .and("not.contain.html", "circle_content__");
          cy.get("@outlines")
            .should("have.css", "border", `4px solid ${changing}`)
            .and("contain.text", "0");
          break;
        }
        case 1: {
          cy.wrap($element)
            .should("not.contain", "head")
            .and("not.contain", "tail")
            .and("not.contain.html", "circle_content__");
          cy.get("@outlines")
            .should("have.css", "border", `4px solid ${changing}`)
            .and("contain.text", "34");
          break;
        }
        case 2: {
          cy.wrap($element)
            .should("not.contain", "head")
            .and("not.contain", "tail")
            .and("contain.html", "circle_content__");
          cy.get("@outlines")
            .eq(0)
            .should("have.css", "border", `4px solid ${initial}`)
            .and("not.contain.text", "8");
          cy.get("@outlines")
            .eq(1)
            .should("have.css", "border", `4px solid ${changing}`)
            .and("contain.text", "8");
          break;
        }
        case 3: {
          cy.wrap($element)
            .should("not.contain", "head")
            .and("contain", "tail")
            .and("not.contain.html", "circle_content__");
          cy.get("@outlines")
            .should("have.css", "border", `4px solid ${initial}`)
            .and("contain.text", "1");
          break;
        }
      }
    });

    cy.tick(500);
    cy.get(listElemenstSelector).as("listElements");
    cy.get("@listElements").each(($element, index) => {
      cy.wrap($element).find(outlineClass).as("outlines");
      switch (index) {
        case 0: {
          cy.wrap($element)
            .should("contain", "head")
            .and("not.contain", "tail")
            .and("not.contain.html", "circle_content__");
          cy.get("@outlines")
            .should("have.css", "border", `4px solid ${initial}`)
            .and("contain.text", "0");
          break;
        }
        case 1: {
          cy.wrap($element)
            .should("not.contain", "head")
            .and("not.contain", "tail")
            .and("not.contain.html", "circle_content__");
          cy.get("@outlines")
            .should("have.css", "border", `4px solid ${initial}`)
            .and("contain.text", "34");
          break;
        }
        case 2: {
          cy.wrap($element)
            .should("not.contain", "head")
            .and("contain", "tail")
            .and("not.contain.html", "circle_content__");
          cy.get("@outlines")
            .should("have.css", "border", `4px solid ${initial}`)
            .and("contain.text", "1");
          break;
        }
      }
    });
  });
});
