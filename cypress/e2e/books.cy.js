describe("login page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("page display", () => {
    cy.contains("Log in").should("be.visible");
  });

  it("should login with valid email and password", () => {
    cy.login("bropet@mail.ru", "123");
    cy.contains("Добро пожаловать bropet@mail.ru").should("be.visible");
  });

  it("should login with no valid", () => {
    cy.login("", "123");

    cy.get("#mail").then((elements) => {
      expect(elements[0].checkValidity()).to.be.false;
      expect(elements[0].validationMessage).to.be.eql("Заполните это поле.");
    });
  });

  it("should password with no valid", () => {
    cy.login("bropet@mail.ru", "");

    cy.get("#pass").then((elements) => {
      expect(elements[0].checkValidity()).to.be.false;
      expect(elements[0].validationMessage).to.be.eql("Заполните это поле.");
    });
  });

  it("should add a new book", () => {
    cy.login("test@test.com", "test");
    cy.contains("Добро пожаловать test@test.com").should("be.visible");
    cy.contains("Add new").click();
    const uniqueTitle = `The detective story - ${Cypress._.random(1, 1000)}`;
    cy.get("#title").type(uniqueTitle);
    cy.get("#description").type("A dog stole sausages");
    cy.get("#fileCover").click();
    cy.get("#fileBook").click();
    cy.get("#authors").type("Sharikov A.I.");
    cy.contains("Submit").click();
    cy.contains("The detective story").should("be.visible");
  });

  it("should add a book to favorite list", () => {
    cy.login("test@test.com", "test");
    cy.contains("Добро пожаловать test@test.com").should("be.visible");
    cy.contains("Add to favorite").click();
    cy.contains("Favorites").click();
    cy.contains("The detective story").should("be.visible");
  });

  it("should delete a book from favorite list", () => {
    cy.login("test@test.com", "test");
    cy.contains("Добро пожаловать test@test.com").should("be.visible");
    cy.contains("Favorites").click();
    cy.contains("The detective story").should("be.visible");
    cy.contains("Delete from favorite").click();
  });
  // cy.get(".ml-auto > .ml-2").click();
  // cy.get(".btn-dark").click();
  // cy.contains("Log in").click();
  // cy.get("#mail").type("bropet@mail.ru");
  // //cy.get("#pass").click();
  // cy.get("#pass").type("123");
  // cy.contains("Submit").click();
});
