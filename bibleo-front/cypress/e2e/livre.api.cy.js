describe("Livre", () => {
  it("successfully retrieves all Livres", () => {
    cy.request("GET", "http://localhost:8080/api/book/all").should(
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

  let savedLivre = {};

  it("successfully creates a Livre", () => {
    const livreData = {
      titre: "titre1",
      anneePub: "1970-01-01T00:00:00.000+00:00",
      isbn: "isbn1",
      description: "desc1",
      quantite: 12,
      amendeParJour: 11.0,
      imageUri: "imgurl",
      genre: "genre1",
      langue: "Arabe",
      auteur: {
        id: 1,
      },
    };
    cy.request(
      "POST",
      "http://localhost:8080/api/book/create",
      livreData
    ).should((response) => {
      expect(response.status).to.eq(201);

      savedLivre = response.body;
    });
  });

  it("successfully retrieves a the added livre by ID", () => {
    cy.request(
      "GET",
      `http://localhost:8080/api/book/one/${savedLivre.id}`
    ).should((response) => {
      expect(response.status).to.eq(200);
    });
  });

  let savedLivreUpdate = {};
  it("should update livre", () => {
    const data = {
      titre: "titre1231",
      anneePub: "1970-01-01T00:00:00.000+00:00",
      isbn: "isbn2",
      description: "desc1",
      quantite: 12,
      amendeParJour: 11.0,
      imageUri: "imgurl",
      genre: "genre1",
      langue: "Arabe",
      auteur: {
        id: 1,
      },
    };
    cy.request({
      method: "PUT",
      url: `http://localhost:8080/api/book/update/${savedLivre.id}`,
      body: data,
    }).then((response) => {
      expect(response.status).to.eq(200);

      savedLivreUpdate = response.body;
    });
  });

  it("successfully retrieves a the updated livre by ID", () => {
    cy.request(
      "GET",
      `http://localhost:8080/api/book/one/${savedLivre.id}`
    ).should((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it("should delet livre added", () => {
    cy.request({
      method: "Delete",
      url: `http://localhost:8080/api/book/delete/${savedLivre.id}`,
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
