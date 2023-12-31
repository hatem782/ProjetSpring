describe("ModalAdd Component", () => {
  let auteurData;
  beforeEach(() => {
    cy.fixture("auteur.json").then((data) => {
      auteurData = data.auteur;
    });
    cy.visit("http://localhost:3000/dashboard/manage-authors");
  });

  it("should open the ModalAdd and add an auther", () => {
    cy.wait(1000);

    // Click on the "Add Auther" button
    cy.get("button:contains('Add Auther')").click();

    // Fill in the form fields
    cy.get("input[name='nom']").type("Hatem");
    cy.get("input[name='prenom']").type("hello");
    cy.get("input[name='dateNaiss']").type("1990-01-01");
    cy.get("input[name='nationalite']").type("tunis");

    // Click the "Add" button
    cy.get("[data-test='buttonAddForm']").click();

    // Assuming the modal will close after adding an auther
    cy.get("#yourAddAutherModalId").should("not.exist");
  });

  it("should open the ModalUpdate and update the last author in the list", () => {
    // Assume each item in the list has a unique identifier, e.g., data-author-id
    cy.get("svg[data-testid='EditIcon']").last().click();
    // Fill in the form fields
    cy.get("input[name='nom']").type("12");
    cy.get("input[name='prenom']").type("12");
    cy.get("input[name='dateNaiss']").type("1993-01-01");
    cy.get("input[name='nationalite']").type("12");
    // Click the "Update" button
    cy.get("[data-test='buttonUpdateForm']").click();
  });

  it("should open the ModalDelete and delete the last author in the list", () => {
    // Assume each item in the list has a unique identifier, e.g., data-author-id
    cy.get("svg[data-testid='DeleteIcon']").last().click();

    // Click the "delete" button
    cy.get("[data-test='buttonDeleteForm']").click();
  });
});
