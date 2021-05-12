/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    startGame(): Chainable<Element>;
    endGame(): Chainable<Element>;
    playAgain(): Chainable<Element>;
    markFlags(flagsToMark: number, row: number): Chainable<Element>;
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

Cypress.Commands.add("markFlags", (flagsToMark: number, row: number) => {
  for (let i = 0; i <= flagsToMark; i++) {
    cy.get(`[data-cy="row${row}column${i}"]`)
      .as(`row${row}column${i}`)
      .should("exist");
    cy.get(`@row${row}column${i}`).click({ altKey: true });
  }
});
