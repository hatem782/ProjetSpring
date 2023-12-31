describe("Auteur", () => {
  it("successfully retrieves all Auteurs", () => {
    cy.request("GET", "http://localhost:8080/api/auther/all").should(
      (response) => {
        // Assertion on the response status code
        expect(response.status).to.eq(200);

        // Check if the response has the expected content type
        expect(response.headers["content-type"]).to.include("application/json");

        // Check if the response body has the expected structure
        expect(response.body).to.have.property("content");

        // Assuming 'content' is an array
        expect(response.body.content).to.be.an("array");

        // Check if the array has at least one task
        expect(response.body.content.length).to.be.greaterThan(0);
      }
    );
  });

  let savedAuteur = {};

  it("successfully creates a Auteur", () => {
    const auteurData = {
      nom: "ilhem",
      prenom: "gassem",
      dateNaiss: "1970-01-01T00:00:00.000+00:00",
      nationalite: "tunis",
    };
    cy.request(
      "POST",
      "http://localhost:8080/api/auther/create",
      auteurData
    ).should((response) => {
      expect(response.status).to.eq(201);

      savedAuteur = response.body;
    });
  });

  it("successfully retrieves a the added auteur by ID", () => {
    cy.request(
      "GET",
      `http://localhost:8080/api/auther/one/${savedAuteur.id}`
    ).should((response) => {
      expect(response.status).to.eq(200);
    });
  });

  let savedAuteurUpdate = {};
  it("should update auteur", () => {
    const data = {
      nom: "hatem",
      prenom: "hatem",
      dateNaiss: "1975-01-01T00:00:00.000+00:00",
      nationalite: "manouba",
    };
    cy.request({
      method: "PUT",
      url: `http://localhost:8080/api/auther/update/${savedAuteur.id}`,
      body: data,
    }).then((response) => {
      expect(response.status).to.eq(200);

      savedAuteurUpdate = response.body;
    });
  });

  it("successfully retrieves a the updated auteur by ID", () => {
    cy.request(
      "GET",
      `http://localhost:8080/api/auther/one/${savedAuteurUpdate.id}`
    ).should((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it("should delet auther added", () => {
    cy.request({
      method: "Delete",
      url: `http://localhost:8080/api/auther/delete/${savedAuteurUpdate.id}`,
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
