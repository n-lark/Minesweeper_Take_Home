describe("flag count adjusts as expected", () => {
  it("flag count decrements as expected", () => {
    cy.visit("localhost:3000");
    cy.startGame();
    cy.get(`[data-cy="row1column1"]`).as("row1Column1").should("exist");
    cy.get("@row1Column1").click();
    cy.markFlags(0, 0);
    cy.get(`[data-cy="flagCount"]`).as("flagCount").should("exist");
    cy.get("@flagCount").should("have.text", 9);
  });
  it("flag count increments as expected", () => {
    cy.visit("localhost:3000");
    cy.startGame();
    cy.get(`[data-cy="row1column1"]`).as("row1Column1").should("exist");
    cy.get("@row1Column1").click();
    cy.markFlags(0, 0);
    cy.get(`[data-cy="flagCount"]`).as("flagCount").should("exist");
    cy.get("@flagCount").should("have.text", 9);
    cy.markFlags(0, 0);
    cy.get("@flagCount").should("have.text", 10);
  });
  it("flag count color changes when flag count is less than or equal to zero", () => {
    cy.visit("localhost:3000");
    cy.startGame();
    cy.get(`[data-cy="row1column1"]`).as("row1Column1").should("exist");
    cy.get("@row1Column1").click();
    cy.markFlags(7, 1);
    cy.markFlags(1, 2);
    cy.get(`[data-cy="flagCount"]`).as("flagCount").should("exist");
    cy.get("@flagCount").should("have.css", "color", "rgb(207, 50, 50)");
    cy.markFlags(1, 3);
    cy.get("@flagCount").should("have.css", "color", "rgb(207, 50, 50)");
  });
});
