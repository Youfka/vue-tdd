describe('Edit a hero', () => {
    
    it('edit', () => {
      cy.visit('/')
      cy.server({ delay: 500 })
      cy.request('GET', 'http://localhost:3000/heroes').then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.length(3)
      })
      cy.get('tbody>tr', {timeout: 3000}).eq(3).within(() => {
        cy.get('[data-test=edit]').click()
      })
      cy.get('.md-dialog-container').should('be.visible')
      cy.get('[data-test=name]').clear().type('Nick')
      cy.get('[data-test=surname]').clear().type('Fury')
      cy.get('[data-test=pseudo]').clear().type('Fury1')
      cy.get('[type=submit]').click()
      cy.get('.md-dialog-container').should('not.be.visible')
      cy.get('tbody>tr').eq(3).within(() => {
        cy.get('td').eq(1).contains('Nick')
        cy.get('td').eq(2).contains('Fury')
        cy.get('td').eq(3).contains('Fury1')
      })
    });
  });