describe('Delete a hero', () => {
    it('check heroes number before deleting', () => {
      cy.visit('/')
      cy.get('tr.md-table-row').should('have.length', 4)
    });
    it('delete', () => {
      cy.get('tbody>tr').eq(3).within(() => {
        cy.get('[data-test=delete]').click()
      })
      cy.get('.md-dialog-container').should('be.visible')
      cy.wait(500)
      cy.contains('OK').click()
    });
    it('check heroes number after deleting', () => {
      cy.get('.md-dialog-container').should('not.be.visible')
      cy.get('tr.md-table-row').should('have.length', 3)
    });
  });