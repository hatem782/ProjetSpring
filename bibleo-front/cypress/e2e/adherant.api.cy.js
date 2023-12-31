describe("Adherant", () => {
  it("successfully retrieves all Adherants", () => {
    cy.request("GET", "http://localhost:8080/api/adherant/all").should(
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

  let savedAdherant = {};

  it("successfully creates a Adherant", () => {
    const adherantData = {
      fullname: "hatem12inlog",
      email: "hatem12inlog@gmail.com",
      birthday: "1970-01-01T00:00:00.000+00:00",
      phone: "52117044",
      address: "tunis",
      abonnementExpireDate: "2023-01-01T00:00:00.000+00:00",
      password: "12345",
    };
    cy.request(
      "POST",
      "http://localhost:8080/api/adherant/create",
      adherantData
    ).should((response) => {
      expect(response.status).to.eq(201);

      savedAdherant = response.body;
    });
  });

  it("successfully retrieves a the added Adherant by ID", () => {
    cy.request(
      "GET",
      `http://localhost:8080/api/adherant/one/${savedAdherant.id}`
    ).should((response) => {
      expect(response.status).to.eq(200);
    });
  });

  let savedAdherantUpdate = {};
  it("should update Adherant", () => {
    const data = {
      fullname: "hatem12inlog12",
      email: "hatem12inlog@gmail.com",
      birthday: "1970-01-01T00:00:00.000+00:00",
      phone: "52117044",
      address: "tunis",
      abonnementExpireDate: "2023-01-01T00:00:00.000+00:00",
      password: "12345",
    };
    cy.request({
      method: "PUT",
      url: `http://localhost:8080/api/adherant/update/${savedAdherant.id}`,
      body: data,
    }).then((response) => {
      expect(response.status).to.eq(200);

      savedAdherantUpdate = response.body;
    });
  });

  it("successfully retrieves a the updated auteur by ID", () => {
    cy.request(
      "GET",
      `http://localhost:8080/api/adherant/one/${savedAdherantUpdate.id}`
    ).should((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it("should delet auther added", () => {
    cy.request({
      method: "Delete",
      url: `http://localhost:8080/api/adherant/delete/${savedAdherantUpdate.id}`,
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
