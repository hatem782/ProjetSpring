describe("ModalAdd Component", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/dashboard/manage-authors");
  });

  it("should open the ModalAdd and add an auther", () => {
    cy.wait(1000);

    // Click on the "Add Auther" button
    cy.get("button:contains('Add Auther')").click();

    // Fill in the form fields
    cy.get("input[name='nom']").type("John");
    cy.get("input[name='prenom']").type("Doe");
    cy.get("input[name='dateNaiss']").type("1990-01-01");
    cy.get("input[name='nationalite']").type("American");

    // Click the "Add" button
    cy.get("[data-test='buttonAddForm']").click();

    // Assuming the modal will close after adding an auther
    cy.get("#yourAddAutherModalId").should("not.exist");
  });
});
