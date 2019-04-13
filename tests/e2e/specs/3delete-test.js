describe('Delete a hero', () => {
    
    it('delete', () => {
      cy.visit('/')
      cy.request('GET', 'http://localhost:3000/heroes').then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.length(3)
      })
      cy.wait(500)
      cy.get('tr.md-table-row').should('have.length', 4)
      cy.get('tbody>tr').eq(2).within(() => {
        cy.get('[data-test=delete]').click()
      })
      cy.get('.md-dialog-container').should('be.visible')
      cy.contains('OK').click()
      cy.get('.md-dialog-container').should('not.be.visible')
      cy.wait(500)
      cy.get('tr.md-table-row').should('have.length', 3)
    });
  });