describe('My First Test', () => {
  it('Visits the app root url', () => {
    cy.visit('/');
    cy.contains('h1', 'Superheroes');
    
    cy.server()
    cy.request('GET', 'http://localhost:3000/heroes').then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.length(2)
      cy.wrap(response.body).should('be.a', 'Array').and('deep.eq', [
        {"name":"Tony","surname":"Stark","pseudo":"Iron Man"},
        {"name":"Natasha","surname":"Romanoff","pseudo":"Black Widow"}
      ])
      cy.wrap(response.body[0]).its('name').should('eq', 'Tony')
      expect(response).to.have.property('headers')
      expect(response).to.have.property('duration')
    })
  });
});
