describe("template spec", () => {
  const serviceData = {
    name: "Hair Colouring",
    price: "15,00",
  };
  beforeEach(() => {
    cy.login();
  });
  it("should open services page", () => {
    cy.visit("/dashboard/services");
    cy.contains("Services").should("be.visible");
  });
  context("Creating an Service", () => {
    it("should fill a form and", () => {
      cy.visit("/dashboard/services");
      cy.get('[data-cy="open-create-service-form"]').click();
    });
  });
});
