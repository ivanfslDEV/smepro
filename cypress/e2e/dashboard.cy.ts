describe("Dashboard", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("/dashboard");
  });

  it("Open dashboard", () => {
    cy.contains("Schedule").should("be.visible");
    cy.contains("Reminders").should("be.visible");
  });
});

describe("Notes", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("/dashboard");
  });

  it("Create Reminder", () => {
    cy.get('[role="dialog"]').should("not.exist");
    cy.get('[data-cy="open-reminder-form"]').click();
    cy.get('[data-cy="reminder-dialog-form"]').should("be.visible");
    cy.contains("New Reminder").should("be.visible");
    cy.contains("Create a new reminder").should("be.visible");
    cy.get('button[data-cy="create-reminder-button"]').should("be.disabled");
    cy.get('textarea[data-cy="reminder-description-field"]').type("Buy milk");
    cy.get('button[data-cy="create-reminder-button"]').should(
      "not.be.disabled"
    );
    cy.get('button[data-cy="create-reminder-button"]').click();
    cy.get('[data-cy="reminder-list-item"]').contains("Buy milk");
  });

  it("Remove Reminder", () => {
    cy.get('[data-cy="reminder-list-item"]').contains("Buy milk");
    cy.get('button[data-cy="remove-button-reminder-item"]').click();
    cy.contains("You have 0 reminder(s)").should("be.visible");
  });
});
