describe('Delete a hero', () => {
    
    it('delete', () => {
      cy.visit('/')
      cy.get('tr.md-table-row').should('have.length', 4)
      cy.get('tbody>tr').eq(3).within(() => {
        cy.get('[data-test=delete]').click()
      })
      cy.get('.md-dialog-container').should('be.visible')
      cy.wait(500)
      cy.contains('OK').click()
      cy.get('.md-dialog-container').should('not.be.visible')
      cy.get('tr.md-table-row').should('have.length', 3)
    });
  });