describe("index", () => {
  it("return string if props empty", () => {
    cy.visit("/");

    cy.contains(/blog/i);
  });
});
