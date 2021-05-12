describe("Modal behaves as expected with user interaction", () => {
  it("Modal opens and closes with user interaction at GameStart", () => {
    cy.visit("localhost:3000");

    cy.get(`[data-cy="rulesModal"]`).as("rulesModal").should("exist");
    cy.get("@rulesModal").click();

    cy.get(`[data-cy="modal-content"]`).as("modalText").should("exist");
    cy.get("@modalText").should(
      "have.text",
      "The goal of minesweeper is to open all cells that do not contain a mine. The game will end if a cell that contains a mine is opened. A cell is opened by clicking on it. The first click of the game cannot be a mine. "
    );

    cy.get("@modalText").click();
    cy.get("@modalText").should("not.exist");
  });
  it("Modal opens and closes with user interaction at Game", () => {
    cy.visit("localhost:3000");
    cy.startGame();

    cy.get(`[data-cy="rulesModalAtGame"]`)
      .as("rulesModalAtGame")
      .should("exist");
    cy.get("@rulesModalAtGame").click();

    cy.get(`[data-cy="modal-content"]`).as("modalText").should("exist");
    cy.get("@modalText").should(
      "have.text",
      "The goal of minesweeper is to open all cells that do not contain a mine. The game will end if a cell that contains a mine is opened. A cell is opened by clicking on it. The first click of the game cannot be a mine. "
    );

    cy.get("@modalText").click();
    cy.get("@modalText").should("not.exist");
  });
});
