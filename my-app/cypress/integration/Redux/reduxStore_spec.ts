import { setBoard } from "../../../src/features/boardSlice";

describe("Testing redux store", () => {
  it("Redux store has initial state on load", () => {
    cy.visit("localhost:3000");
    cy.window()
      .its("store")
      .invoke("getState")
      .should("deep.equal", {
        flags: { value: 0 },
        gameWonOrLost: { value: { lost: false, won: false } },
        board: { value: { numOfSquares: 64, rowLength: 8 } },
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
      .its("board")
      .should("deep.equal", { value: { numOfSquares: 144, rowLength: 12 } });
  });

  it("Redux actions impact Redux store", () => {
    cy.visit("localhost:3000");

    cy.window()
      .its("store")
      .invoke("dispatch", setBoard({ numOfSquares: 100, rowLength: 10 }));

    cy.window()
      .its("store")
      .invoke("getState")
      .its("board")
      .should("deep.equal", { value: { numOfSquares: 100, rowLength: 10 } });
  });
});
