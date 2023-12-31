describe("Review", () => {
  it("successfully retrieves all Reviews", () => {
    cy.request("GET", "http://localhost:8080/api/review/page").should(
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

  let savedReview = {};

  it("successfully creates a review", () => {
    const reviewData = {
      rate: 1212354,
      livre: { id: 1 },
      adherent: { id: 3 },
    };
    cy.request(
      "POST",
      "http://localhost:8080/api/review/create",
      reviewData
    ).should((response) => {
      expect(response.status).to.eq(200);

      savedReview = response.body;
    });
  });

  it("successfully retrieves a the added review by ID", () => {
    cy.request(
      "GET",
      `http://localhost:8080/api/review/get/${savedReview.id}`
    ).should((response) => {
      expect(response.status).to.eq(200);
    });
  });

  let savedReviewUpdate = {};
  it("should update Review", () => {
    const data = {
      rate: 154,
      livre: { id: 1 },
      adherent: { id: 3 },
    };
    cy.request({
      method: "PUT",
      url: `http://localhost:8080/api/review/update/${savedReview.id}`,
      body: data,
    }).then((response) => {
      expect(response.status).to.eq(200);

      savedReviewUpdate = response.body;
    });
  });

  it("successfully retrieves a the updated review by ID", () => {
    cy.request(
      "GET",
      `http://localhost:8080/api/review/get/${savedReviewUpdate.id}`
    ).should((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it("should delet review added", () => {
    cy.request({
      method: "Delete",
      url: `http://localhost:8080/api/review/delete/${savedReviewUpdate.id}`,
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
