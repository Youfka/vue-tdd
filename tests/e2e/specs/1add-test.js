describe('Add a hero', () => {
  let rows;
  it('visit root page and check elements size', () => {
    cy.visit('/')
    cy.get('tr.md-table-row').its('length').should('be.gt', 2)
    cy.get('tr.md-table-row').its('length').then((size)=>{
      console.log(size);
      rows = size;
    })
  });
  it('add a hero', () => {
    cy.get('[data-test=add]').click()
    cy.get('.md-dialog-container').should('be.visible')
    cy.get('[data-test=name]').type('Steeve')
    cy.get('[data-test=surname]').type('Rogers')
    cy.get('[data-test=pseudo]').type('Captain America')
    cy.get('[type=submit]').click()
    cy.get('.md-dialog-container').should('not.be.visible')
  });
  it('check heroes number after adding', () => {
    cy.get('tr.md-table-row').should('have.length', rows+1)
  });
});