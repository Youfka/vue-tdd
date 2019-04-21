describe('My First Test', () => {
  it('Visits the app root url', () => {
    cy.visit('/');
    cy.contains('h1', 'Superheroes');
  });
  it('Check heroes request', () => {
    cy.server()
    cy.request('GET', 'http://localhost:3000/heroes').then((response) => {
      expect(response.status).to.eq(200)
      cy.wrap(response.body).its('length').should('be.gt', 1)
      cy.wrap(response.body).should('be.a', 'Array')
      cy.wrap(response.body).each((value, index)=>{
        cy.wrap(value).should('be.a', 'Object')
      })
    })
  });
});
