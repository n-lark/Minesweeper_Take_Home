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
    const arrayOfPossibleRenders = ["1", "2", "3", "4", "5", "6", "7", "8", ""];
    cy.visit("localhost:3000");
    cy.startGame();
    cy.get(`[data-cy="row1column1"]`).as("row1Column1").should("exist");
    cy.get("@row1Column1").click();
    cy.get("@row1Column1")
      .invoke("text")
      .then((text) => {
        expect(text).to.be.oneOf(arrayOfPossibleRenders);
      });
  });
});
