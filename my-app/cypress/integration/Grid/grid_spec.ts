import { generateNumber } from "../../../src/utility/generateNumber";

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

describe("Grid renders squares as expected", () => {
  it("Grid populates with correct number of squares", () => {
    cy.visit("localhost:3000");
    cy.get(`[data-cy="chose-level-hard"]`).as("levelHard").should("exist");
    cy.get("@levelHard").click();
    cy.startGame();
    cy.get(`[data-cy="grid"]`).as("grid").should("exist");
    cy.get("@grid").children().should("have.length", 144);
  });

  it("First click cannot be a mine", () => {
    cy.visit("localhost:3000");
    cy.startGame();
    cy.get(`[data-cy="row1column1"]`).as("row1Column1").should("exist");
    cy.get("@row1Column1").click();
    cy.window()
      .its("store")
      .invoke("getState")
      .its("squares")
      .its("value")
      .then((value: Array<Array<SquareState>>) => {
        expect(value[1][1].mine.isMine).to.equal(false);
      });
  });

  it("Grid renders correct amount of mines", () => {
    cy.visit("localhost:3000");
    cy.startGame();
    cy.firstClick();
    cy.window()
      .its("store")
      .invoke("getState")
      .its("squares")
      .its("value")
      .then((value: Array<Array<SquareState>>) => {
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

  it("Clicking on a mine ends the game and exposes all mines", () => {
    cy.visit("localhost:3000");
    cy.startGame();
    cy.firstClick();
    cy.window()
      .its("store")
      .invoke("getState")
      .its("squares")
      .its("value")
      .then((value: Array<Array<SquareState>>) => {
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
      .then((value: Array<Array<SquareState>>) => {
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

        for (let i = 0; i < minesExposed * 2; i += 2) {
          cy.get(
            `[data-cy="mine${mineCoordinates[i]}${mineCoordinates[i + 1]}"]`
          ).should("exist");
        }
      });
  });

  it("Clicking on an non mine adjacent square renders a blank square", () => {
    cy.visit("localhost:3000");
    cy.startGame();
    cy.firstClick();
    cy.window()
      .its("store")
      .invoke("getState")
      .its("squares")
      .its("value")
      .then((value: Array<Array<SquareState>>) => {
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
        cy.get(`[data-cy="blank${blankCoordinates[0]}${blankCoordinates[1]}"]`)
          .as("blank")
          .should("exist");
        cy.get("@blank").should(
          "have.css",
          "background-color",
          "rgb(240, 240, 240)"
        );
      });
  });

  it("Clicking on a mine adjacent square renders a number", () => {
    cy.visit("localhost:3000");
    cy.startGame();
    cy.firstClick();
    cy.window()
      .its("store")
      .invoke("getState")
      .its("squares")
      .its("value")
      .then((value: Array<Array<SquareState>>) => {
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
