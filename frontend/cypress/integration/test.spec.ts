describe("index", () => {
  it("return string if props empty", () => {
    cy.visit("/");

    cy.contains(/없어요/i);
  });
});
