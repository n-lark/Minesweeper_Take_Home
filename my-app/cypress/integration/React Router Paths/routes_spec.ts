describe("Routes in URL path update as expected", () => {
  it("User clicks play game, directed to game", () => {
    cy.visit("localhost:3000");
    cy.startGame();
    cy.url().should("deep.equal", "http://localhost:3000/Game");
  });

  it("User visits invalid URL, directed to error page and restarts game", () => {
    cy.visit("http://localhost:3000/notARealRoute");
    cy.get(`[data-cy="error-message"]`).as("errorMessage").should("exist");
    cy.get("@errorMessage").should(
      "have.text",
      "Oops! Something weird happened."
    );

    cy.get(`[data-cy="restart-game"]`).as("restartGame").should("exist");
    cy.get("@restartGame").click();
    cy.url().should("deep.equal", "http://localhost:3000/");
  });

  it("User starts game, clicks end game, directed to final score page", () => {
    cy.visit("localhost:3000");
    cy.startGame();
    cy.endGame();
    cy.url().should("deep.equal", "http://localhost:3000/GameEnd");
  });

  it("User starts game, ends game, clicks play again and is directed to game start", () => {
    cy.visit("localhost:3000");
    cy.startGame();
    cy.endGame();
    cy.playAgain();
    cy.url().should("deep.equal", "http://localhost:3000/");
  });
});
