import { generateNumber } from "../../../src/utility/generateNumber";

type mineState = {
  show: boolean;
  isMine: boolean;
};

type squareState = {
  blank: boolean;
  flag: boolean;
  number: boolean;
  mine: mineState;
};

describe("grid behaves as expected", () => {
  it("grid populates with correct number of squares", () => {
    cy.visit("localhost:3000");
    cy.get(`[data-cy="chose-level-hard"]`).as("levelHard").should("exist");
    cy.get("@levelHard").click();
    cy.startGame();
    cy.get(`[data-cy="grid"]`).as("grid").should("exist");
    cy.get("@grid").children().should("have.length", 144);
  });

  it("first click cannot be a mine", () => {
    cy.visit("localhost:3000");
    cy.startGame();
    cy.get(`[data-cy="row1column1"]`).as("row1Column1").should("exist");
    cy.get("@row1Column1").click();
    cy.window()
      .its("store")
      .invoke("getState")
      .its("squares")
      .its("value")
      .then((value: Array<Array<squareState>>) => {
        expect(value[1][1].mine.isMine).to.equal(false);
      });
  });

  it("grid renders correct amount of mines", () => {
    cy.visit("localhost:3000");
    cy.startGame();
    cy.firstClick();
    cy.window()
      .its("store")
      .invoke("getState")
      .its("squares")
      .its("value")
      .then((value: Array<Array<squareState>>) => {
        let mineCount: number = 0;
        for (let i = 0; i < value.length; i++) {
          for (let j = 0; j < value[i].length; j++) {
            if (value[i][j].mine.isMine) {
              mineCount++;
            }
          }
        }
        expect(mineCount).to.equal(10);
      });
  });

  it("clicking on a mine ends the game", () => {
    cy.visit("localhost:3000");
    cy.startGame();
    cy.firstClick();
    cy.window()
      .its("store")
      .invoke("getState")
      .its("squares")
      .its("value")
      .then((value: Array<Array<squareState>>) => {
        let mineCoordinates: Array<number> = [];
        for (let i = 0; i < value.length; i++) {
          for (let j = 0; j < value[i].length; j++) {
            if (value[i][j].mine.isMine) {
              mineCoordinates.push(i, j);
            }
          }
        }
        cy.get(
          `[data-cy="row${mineCoordinates[0]}column${mineCoordinates[1]}"]`
        )
          .as("mineLocated")
          .should("exist");
        cy.get("@mineLocated").click();
      });
    cy.get(`[data-cy="game-over"]`).as("gameOver").should("exist");
    cy.get("@gameOver").should("have.text", "Game Over");
    cy.window()
      .its("store")
      .invoke("getState")
      .its("squares")
      .its("value")
      .then((value: Array<Array<squareState>>) => {
        let minesExposed: number = 0;
        let mineCoordinates: Array<number> = [];
        for (let i = 0; i < value.length; i++) {
          for (let j = 0; j < value[i].length; j++) {
            if (value[i][j].mine.show) {
              minesExposed++;
              mineCoordinates.push(i, j);
            }
          }
        }
        expect(minesExposed).to.equal(10);
      });
  });

  it("clicking on an non mine adjacent square renders a blank square", () => {
    cy.visit("localhost:3000");
    cy.startGame();
    cy.firstClick();
    cy.window()
      .its("store")
      .invoke("getState")
      .its("squares")
      .its("value")
      .then((value: Array<Array<squareState>>) => {
        let blankCoordinates: Array<number> = [];
        for (let i = 0; i < value.length; i++) {
          for (let j = 0; j < value[i].length; j++) {
            if (
              generateNumber(i, j, value) === 0 &&
              !value[i][j].number &&
              !value[i][j].blank &&
              !value[i][j].mine.isMine
            ) {
              blankCoordinates.push(i, j);
            }
          }
        }
        cy.get(
          `[data-cy="row${blankCoordinates[0]}column${blankCoordinates[1]}"]`
        )
          .as("blankLocated")
          .should("exist");
        cy.get("@blankLocated").click();
        cy.get(
          `[data-cy="blankSpan${blankCoordinates[0]}${blankCoordinates[1]}"]`
        )
          .as("blankSpan")
          .should("exist");
        cy.get("@blankSpan").should(
          "have.css",
          "background-color",
          "rgb(240, 240, 240)"
        );
      });
  });

  it("clicking on a mine adjacent square renders a number", () => {
    cy.visit("localhost:3000");
    cy.startGame();
    cy.firstClick();
    cy.window()
      .its("store")
      .invoke("getState")
      .its("squares")
      .its("value")
      .then((value: Array<Array<squareState>>) => {
        let numberCoordinates: Array<number> = [];
        for (let i = 0; i < value.length; i++) {
          for (let j = 0; j < value[i].length; j++) {
            if (
              generateNumber(i, j, value) > 0 &&
              !value[i][j].number &&
              !value[i][j].blank &&
              !value[i][j].mine.isMine
            ) {
              numberCoordinates.push(i, j);
            }
          }
        }
        cy.get(
          `[data-cy="row${numberCoordinates[0]}column${numberCoordinates[1]}"]`
        )
          .as("numberLocated")
          .should("exist");
        cy.get("@numberLocated").click();
        cy.get("@numberLocated").should(
          "have.text",
          generateNumber(numberCoordinates[0], numberCoordinates[1], value)
        );
      });
  });
});
