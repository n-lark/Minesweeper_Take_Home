describe("Timer updates as expected", () => {
  it("Timer correctly records 10 seconds", () => {
    cy.visit("localhost:3000");
    cy.clock();
    cy.startGame();
    cy.get(`[data-cy="timer"]`).as("timer").should("exist");
    cy.tick(10000);
    cy.get("@timer").should("have.text", "00:00:10");
  });
});
