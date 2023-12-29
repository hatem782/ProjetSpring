describe("Emprunts", () => {
  it("successfully retrieves all Emprunts", () => {
    cy.request(
      "GET",
      "http://localhost:8080/api/emprunt/get-all-emprunts"
    ).should((response) => {
      // Assertion on the response status code
      expect(response.status).to.eq(200);

      // Check if the response has the expected content type
      expect(response.headers["content-type"]).to.include("application/json");

      // Check if the response body has the expected structure
      expect(response.body).to.have.property("content");

      // Assuming 'content' is an array
      expect(response.body.content).to.be.an("array");
    });
  });
});
