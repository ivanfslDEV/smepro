describe("New Appointment", () => {
  const userData = {
    name: "John Doe",
    email: "johndoe@test.com",
    phone: "12345678900",
    service: "Basic Haircut",
    time: "24:00",
    otherTimes: ["09:00", "10:00"],
    date: "11/11/2025",
  };

  beforeEach(() => {
    cy.login();
  });

  context("Dashboard Button", () => {
    it('should have a "New Appointment" button that opens in a new tab', () => {
      cy.visit("/dashboard");

      cy.get('[data-cy="create-new-appointment-button"]')
        .should("exist")
        .and("contain.text", "New Appointment")
        .parent("a")
        .should("have.attr", "target", "_blank")
        .and("have.attr", "href")
        .and("include", "/business/");
    });
  });

  context("Creating an Appointment", () => {
    beforeEach(() => {
      cy.visit("/business/cmhi7jwzy0000c6bci1oc5so7");
    });

    it("should fill the form and select service & time", () => {
      cy.get('button[data-cy="save-button-appointment-form"]').should(
        "be.disabled"
      );

      cy.get('[data-cy="name-input-appointment-form"]')
        .type(userData.name)
        .should("have.value", userData.name);

      cy.get('[data-cy="email-input-appointment-form"]')
        .type(userData.email)
        .should("have.value", userData.email);

      cy.get('[data-cy="phone-input-appointment-form"]')
        .type(userData.phone)
        .should("have.value", "(12) 34567-8900");

      // Select service
      cy.get('[data-cy="service-select-appointment-form"]').click();
      cy.get('[data-cy="service-select-appointment-form-content"]')
        .contains(userData.service)
        .click();
      cy.get('[data-cy="service-select-appointment-form"]').should(
        "contain.text",
        userData.service
      );

      // Save button should now be enabled
      cy.get('button[data-cy="save-button-appointment-form"]').should(
        "not.be.disabled"
      );

      // Wait for available times to render
      cy.get('[data-cy="available-times-appointment-form"]', {
        timeout: 6000,
      }).should("exist");

      // Select specific time
      cy.get(`[data-cy="time-slot-${userData.time}"]`).click();

      // Submit form
      cy.get('button[data-cy="save-button-appointment-form"]').click();

      // Toast should appear
      cy.get('[data-cy="toast-success"]', { timeout: 6000 }).should(
        "be.visible"
      );
    });
  });

  context("Verify Appointment on Dashboard", () => {
    it("should display the created appointment and allow cancellation", () => {
      cy.visit("/dashboard");

      // Check time slots availability
      cy.get(`[data-cy="time-slot-calendar-${userData.time}"]`).should(
        "not.contain.text",
        "Available"
      );
      userData.otherTimes.forEach((time) => {
        cy.get(`[data-cy="time-slot-calendar-${time}"]`).should(
          "contain.text",
          "Available"
        );
      });

      // Check appointment info
      cy.get(`[data-cy="time-slot-calendar-name-${userData.time}"]`).should(
        "contain.text",
        userData.name
      );
      cy.get(`[data-cy="time-slot-calendar-phone-${userData.time}"]`).should(
        "contain.text",
        "(12) 34567-8900"
      );

      // Open appointment details dialog
      cy.get(`[data-cy="time-slot-calendar-details-${userData.time}"]`).click();
      cy.contains("Appointment Details").should("be.visible");
      cy.contains("View Appointment Details").should("be.visible");
      cy.contains(`Schedule Time:${userData.time}`).should("be.visible");
      cy.contains(`Schedule Date:${userData.date}`).should("be.visible");
      cy.contains(`Name:${userData.name}`).should("be.visible");
      cy.contains(`Phone:(12) 34567-8900`).should("be.visible");
      cy.contains(`E-mail:${userData.email}`).should("be.visible");
      cy.contains(`Service:${userData.service}`).should("be.visible");

      // Close dialog
      cy.get('[data-slot="dialog-close"]').click();

      // Cancel appointment
      cy.get(`[data-cy="time-slot-calendar-cancel-${userData.time}"]`).click();
      cy.get('[data-cy="toast-success"]', { timeout: 6000 }).should(
        "be.visible"
      );

      // Time slot should now be available again
      cy.get(`[data-cy="time-slot-calendar-${userData.time}"]`).should(
        "contain.text",
        "Available"
      );
    });
  });
});
