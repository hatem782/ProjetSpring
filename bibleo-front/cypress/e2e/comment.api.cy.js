describe("comments", () => {
  it("successfully retrieves all comments", () => {
    cy.request("GET", "http://localhost:8080/api/commentaire/page").should(
      (response) => {
        // Assertion on the response status code
        expect(response.status).to.eq(200);

        // Check if the response has the expected content type
        expect(response.headers["content-type"]).to.include("application/json");

        // Check if the response body has the expected structure
        expect(response.body).to.have.property("content");

        // Assuming 'content' is an array
        expect(response.body.content).to.be.an("array");
      }
    );
  });

  let savedComment = {};

  it("successfully creates a comment", () => {
    const commentData = {
      objet: "Test",
      contenu: "Test Content",
      livre: { id: 1 },
      adherent: { id: 3 },
      // Add other properties specific to your comment data structure
    };

    cy.request(
      "POST",
      "http://localhost:8080/api/commentaire/create",
      commentData
    ).should((response) => {
      expect(response.status).to.eq(200);

      // Check if the response body has the expected structure
      expect(response.body).to.have.property("id");
      expect(response.body).to.have.property("objet", commentData.objet);
      expect(response.body).to.have.property("contenu", commentData.contenu);

      // Assuming 'message' is not present in the response
      // You can assert it does not have 'message' property
      expect(response.body).to.not.have.property("message");

      // Assuming 'livre' is present in the response
      expect(response.body).to.have.property("livre");
      expect(response.body.livre).to.have.property("id", commentData.livre.id);

      // Assuming 'adherent' is present in the response
      expect(response.body).to.have.property("adherent");
      expect(response.body.adherent).to.have.property(
        "id",
        commentData.adherent.id
      );

      // Assuming other properties in the response
      expect(response.body).to.have.property("raisonSign", null);
      expect(response.body).to.have.property("estSignale", false);

      savedComment = response.body;
    });
  });

  it("successfully retrieves a the added comment by ID", () => {
    cy.request(
      "GET",
      `http://localhost:8080/api/commentaire/get/${savedComment.id}`
    ).should((response) => {
      expect(response.status).to.eq(200);
    });
  });

  let savedCommentUpdate = {};
  it("should update comment", () => {
    const data = {
      raisonSign: "No Content",
    };
    cy.request({
      method: "PUT",
      url: `http://localhost:8080/api/commentaire/update/${savedComment.id}`,
      body: data,
    }).then((response) => {
      expect(response.status).to.eq(200);

      savedCommentUpdate = response.body;
    });
  });

  it("successfully retrieves a the updated comment by ID", () => {
    cy.request(
      "GET",
      `http://localhost:8080/api/commentaire/get/${savedCommentUpdate.id}`
    ).should((response) => {
      expect(response.status).to.eq(200);
    });
  });

  let savedCommentSignal = {};
  it("should signal comment added", () => {
    const data = {
      raisonSign: "No Content",
    };
    cy.request({
      method: "PUT",
      url: `http://localhost:8080/api/commentaire/signal/${savedComment.id}`,
      body: data,
    }).then((response) => {
      expect(response.status).to.eq(200);

      savedCommentSignal = response.body;
    });
  });

  it("should delet comment signal", () => {
    cy.request({
      method: "Delete",
      url: `http://localhost:8080/api/commentaire/delete/${savedComment.id}`,
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
