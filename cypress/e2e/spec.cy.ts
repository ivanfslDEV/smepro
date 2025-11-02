describe("Home Page", () => {
  it("should load successfully", () => {
    cy.visit("/");
    cy.contains("Welcome").should("be.visible");
  });
});
