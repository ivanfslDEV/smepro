describe("Dashboard", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("/dashboard");
  });

  it("should display main sections", () => {
    cy.contains("Schedule").should("be.visible");
    cy.contains("Reminders").should("be.visible");
  });

  context("Reminders", () => {
    const reminderText = "Buy milk";

    it("should create a new reminder", () => {
      cy.get('[data-cy="open-reminder-form"]').click();
      cy.get('[data-cy="reminder-dialog-form"]').should("be.visible");

      cy.contains("New Reminder").should("be.visible");
      cy.contains("Create a new reminder").should("be.visible");

      cy.get('button[data-cy="create-reminder-button"]').should("be.disabled");

      cy.get('textarea[data-cy="reminder-description-field"]').type(
        reminderText
      );

      cy.get('button[data-cy="create-reminder-button"]')
        .should("not.be.disabled")
        .click();

      cy.get('[data-cy="reminder-list-item"]').contains(reminderText);
    });

    it("should remove an existing reminder", () => {
      cy.get('[data-cy="reminder-list-item"]').contains(reminderText);
      cy.get('button[data-cy="remove-button-reminder-item"]').click();
      cy.contains("You have 0 reminder(s)").should("be.visible");
    });
  });
});
