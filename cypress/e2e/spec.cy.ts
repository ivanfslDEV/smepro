describe("Home Page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should load successfully", () => {
    cy.contains("Find Professionals").should("be.visible");
  });
});

describe("Login Flow", () => {
  beforeEach(() => {
    cy.visit("/api/auth/signin");
  });

  it("should log in with valid credentials", () => {
    cy.get('input[name="email"]').clear().type("test@test.com");
    cy.get('input[name="password"]').clear().type("123456");
    cy.contains("button", "Sign in with Credentials").click();

    cy.visit("/dashboard");

    cy.contains("Schedule").should("be.visible");
    cy.contains("Reminders").should("be.visible");
  });
});

describe("Dashboard", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("/dashboard");
  });

  it("should test dashboard", () => {
    cy.contains("Schedule").should("be.visible");
    cy.contains("Reminders").should("be.visible");
  });
});
