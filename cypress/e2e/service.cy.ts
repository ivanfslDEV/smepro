describe("Services Management", () => {
  const serviceData = {
    name: "Hair Colouring",
    price: "15,00",
    newPrice: "13,00",
    time: "1",
  };

  const selectors = {
    toastSuccess: '[data-cy="toast-success"]',
    saveButton: 'button[data-cy="save-button-new-service-form"]',
    nameInput: '[data-cy="name-new-service-form"]',
    priceInput: '[data-cy="price-new-service-form"]',
    hourInput: '[data-cy="hour-new-service-form"][type="number"]',
    openCreateForm: '[data-cy="open-create-service-form"]',
  };

  beforeEach(() => {
    cy.login();
    cy.visit("/dashboard/services");
  });

  it("should open services page", () => {
    cy.contains("Services").should("be.visible");
  });

  context("Creating a Service", () => {
    it("should fill the create service form", () => {
      cy.get(selectors.openCreateForm).click();
      cy.contains("New Service").should("be.visible");
      cy.contains("Add a new service").should("be.visible");

      cy.get(selectors.nameInput)
        .clear()
        .type(serviceData.name)
        .should("have.value", serviceData.name);

      cy.get(selectors.priceInput)
        .clear()
        .type(serviceData.price)
        .should("have.value", serviceData.price);

      cy.get(selectors.hourInput)
        .clear()
        .type(serviceData.time)
        .should("have.value", serviceData.time);

      cy.get(selectors.saveButton).click();
      cy.get(selectors.toastSuccess, { timeout: 6000 }).should("be.visible");
    });
  });

  context("Updating a Service", () => {
    it("should update the service price", () => {
      cy.get(`[data-cy="service-edit-${serviceData.name}"]`).click();
      cy.contains("New Service").should("be.visible");
      cy.contains("Add a new service").should("be.visible");

      cy.get(selectors.priceInput)
        .clear()
        .type(serviceData.newPrice)
        .should("have.value", serviceData.newPrice);

      cy.get(selectors.saveButton).click();
      cy.get(selectors.toastSuccess, { timeout: 6000 }).should("be.visible");
    });
  });

  context("Deleting a Service", () => {
    it("should delete a service", () => {
      cy.get(`[data-cy="service-delete-${serviceData.name}"]`).click();
      cy.get(selectors.toastSuccess, { timeout: 6000 }).should("be.visible");
    });
  });
});
