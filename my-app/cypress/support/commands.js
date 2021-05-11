Cypress.Commands.add("startGame", () => {
  cy.get(`[data-cy="start-game"]`).as("startGame");
  cy.get("@startGame").click();
});

Cypress.Commands.add("endGame", () => {
  cy.get(`[data-cy="end-game"]`).as("endGame");
  cy.get("@endGame").click();
});

Cypress.Commands.add("playAgain", () => {
  cy.get(`[data-cy="play-again"]`).as("playAgain");
  cy.get("@playAgain").click();
});
