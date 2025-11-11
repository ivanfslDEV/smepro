describe("New Appointment", () => {
  beforeEach(() => {
    cy.login();
  });

  it('should have a "New Appointment" button that opens in a new tab', () => {
    cy.visit("/dashboard");

    cy.get('[data-cy="create-new-appointment-button"]')
      .should("exist")
      .and("contain.text", "New Appointment");

    cy.get('[data-cy="create-new-appointment-button"]')
      .parent("a")
      .should("have.attr", "target", "_blank")
      .and("have.attr", "href")
      .and("include", "/business/");
  });

  it("should create New Appointment", () => {
    cy.visit("/business/cmhi7jwzy0000c6bci1oc5so7");
    cy.get('button[data-cy="save-button-appointment-form"]').should(
      "be.disabled"
    );
    cy.get('[data-cy="name-input-appointment-form"]')
      .type("John Doe")
      .should("have.value", "John Doe");
    cy.get('[data-cy="email-input-appointment-form"]')
      .type("johndoe@test.com")
      .should("have.value", "johndoe@test.com");
    cy.get('[data-cy="phone-input-appointment-form"]')
      .type("12345678900")
      .should("have.value", "(12) 34567-8900");
    cy.get('[data-cy="service-select-appointment-form"]').click();

    cy.get('[data-cy="service-select-appointment-form-content"]')
      .contains("Basic Haircut")
      .click();

    cy.get('[data-cy="service-select-appointment-form"]').should(
      "contain.text",
      "Basic Haircut"
    );
    cy.get('button[data-cy="save-button-appointment-form"]').should(
      "not.be.disabled"
    );
    cy.get('[data-cy="available-times-appointment-form"]', {
      timeout: 6000,
    }).should("exist");

    cy.get('[data-cy="time-slot-24:00"]').click();
    cy.get('button[data-cy="save-button-appointment-form"]').click();
    cy.get('[data-cy="toast-success"]', { timeout: 6000 }).should("be.visible");
  });
});
