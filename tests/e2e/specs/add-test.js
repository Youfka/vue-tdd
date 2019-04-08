describe('Adding a hero', () => {
  it('add', () => {
    cy.visit('/')
    cy.get('tr.md-table-row').should('have.length', 3)
    cy.get('[data-test=add]').click()

    cy.get('.md-dialog-container').should('be.visible')
    cy.get('[data-test=name]').type('Steeve')
    cy.get('[data-test=surname]').type('Rogers')
    cy.get('[data-test=pseudo]').type('Captain America')
    cy.get('[type=submit]').click()
    
    cy.get('.md-dialog-container').should('not.be.visible')
    cy.get('tr.md-table-row').should('have.length', 4)
  });
});