describe("Home Page", () => {
  it("should load successfully", () => {
    cy.visit("/");
    cy.contains("Find Professionals").should("be.visible");
  });
});
