type MineState = {
  show: boolean;
  isMine: boolean;
};

type SquareState = {
  blank: boolean;
  flag: boolean;
  number: boolean;
  mine: MineState;
};

describe("Flag count adjusts as expected", () => {
  it("Flag count decrements as expected", () => {
    cy.visit("localhost:3000");
    cy.startGame();
    cy.firstClick();
    cy.window()
      .its("store")
      .invoke("getState")
      .its("squares")
      .its("value")
      .then((value: Array<Array<SquareState>>) => {
        let coordinatesToFlag: Array<number> = [];
        for (let i = 0; i < value.length; i++) {
          for (let j = 0; j < value[i].length; j++) {
            if (!value[i][j].number && !value[i][j].blank) {
              coordinatesToFlag.push(i, j);
            }
          }
        }
        cy.get(
          `[data-cy="row${coordinatesToFlag[0]}column${coordinatesToFlag[1]}"]`
        )
          .as("flagLocation")
          .should("exist");
        cy.get("@flagLocation").click({ altKey: true });
        cy.get(`[data-cy="flagCount"]`).as("flagCount").should("exist");
        cy.get("@flagCount").should("have.text", 9);
      });
  });
  it("Flag count increments as expected", () => {
    cy.visit("localhost:3000");
    cy.startGame();
    cy.firstClick();
    cy.window()
      .its("store")
      .invoke("getState")
      .its("squares")
      .its("value")
      .then((value: Array<Array<SquareState>>) => {
        let coordinatesToFlag: Array<number> = [];
        for (let i = 0; i < value.length; i++) {
          for (let j = 0; j < value[i].length; j++) {
            if (!value[i][j].number && !value[i][j].blank) {
              coordinatesToFlag.push(i, j);
            }
          }
        }
        cy.get(
          `[data-cy="row${coordinatesToFlag[0]}column${coordinatesToFlag[1]}"]`
        )
          .as("flagLocation")
          .should("exist");
        cy.get("@flagLocation").click({ altKey: true });
        cy.get(`[data-cy="flagCount"]`).as("flagCount").should("exist");
        cy.get("@flagCount").should("have.text", 9);
        cy.get("@flagLocation").click({ altKey: true });
        cy.get("@flagCount").should("have.text", 10);
      });
  });
  it("Flag implementation impacts flag state", () => {
    cy.visit("localhost:3000");
    cy.startGame();
    cy.firstClick();
    cy.window()
      .its("store")
      .invoke("getState")
      .its("squares")
      .its("value")
      .then((value: Array<Array<SquareState>>) => {
        let coordinatesToFlag: Array<number> = [];
        for (let i = 0; i < value.length; i++) {
          for (let j = 0; j < value[i].length; j++) {
            if (!value[i][j].number && !value[i][j].blank) {
              coordinatesToFlag.push(i, j);
            }
          }
        }
        cy.get(
          `[data-cy="row${coordinatesToFlag[0]}column${coordinatesToFlag[1]}"]`
        )
          .as("flagLocation")
          .should("exist");
        cy.get("@flagLocation").click({ altKey: true });
        cy.get(
          `[data-cy=flag${coordinatesToFlag[0]}${coordinatesToFlag[1]}]`
        ).should("exist");
      });
    cy.window()
      .its("store")
      .invoke("getState")
      .its("flags")
      .its("value")
      .should("equal", 9);
  });
});
