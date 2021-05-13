/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    startGame(): Chainable<Element>;
    endGame(): Chainable<Element>;
    playAgain(): Chainable<Element>;
    firstClick(): Chainable<Element>;
  }
}

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

Cypress.Commands.add("firstClick", () => {
  cy.get(`[data-cy="row1column1"]`).as("row1Column1").should("exist");
  cy.get("@row1Column1").click();
});
