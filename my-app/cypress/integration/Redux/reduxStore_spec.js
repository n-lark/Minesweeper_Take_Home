import { setNumOfSquares } from "../../../src/features/numOfSquaresSlice";

describe("Testing redux store", () => {
  it("Redux store has initial state on load", () => {
    cy.visit("localhost:3000");
    cy.window()
      .its("store")
      .invoke("getState")
      .should("deep.equal", {
        flags: { value: 0 },
        gameLost: { value: false },
        gameWon: { value: false },
        numOfSquares: { value: { numOfSquares: 64, rowLength: 8 } },
        rulesModal: { value: false },
        squares: { value: Array(0) },
        timer: { value: 0 },
      });
  });

  it("UI interactions impact redux store", () => {
    cy.visit("localhost:3000");
    cy.get(`[data-cy="chose-level-hard"]`)
      .as("chooseLevelHard")
      .should("exist");
    cy.get("@chooseLevelHard").click();

    cy.window()
      .its("store")
      .invoke("getState")
      .its("numOfSquares")
      .should("deep.equal", { value: { numOfSquares: 144, rowLength: 12 } });
  });

  it("Redux actions impact Redux store", () => {
    cy.visit("localhost:3000");

    cy.window()
      .its("store")
      .invoke(
        "dispatch",
        setNumOfSquares({ numOfSquares: 100, rowLength: 10 })
      );

    cy.window()
      .its("store")
      .invoke("getState")
      .its("numOfSquares")
      .should("deep.equal", { value: { numOfSquares: 100, rowLength: 10 } });
  });
});
