describe('Delete a hero', () => {
    let rows;
    it('check heroes number before deleting', () => {
      cy.visit('/')
      cy.wait(500)
      cy.get('tr.md-table-row').its('length').should('be.gt', 3)
      cy.get('tr.md-table-row').its('length').then((size)=>{
        rows = size;
      })
    });
    it('delete 3rd item', () => {
      cy.get('tbody>tr').eq(3).within(() => {
        cy.get('[data-test=delete]').click()
      })
      cy.get('.md-dialog-container').should('be.visible')
      cy.contains('OK').click()
      cy.get('.md-dialog-container').should('not.be.visible')
    });
    it('check heroes number after deleting', () => {
      cy.get('tr.md-table-row').should('have.length', rows-1)
    });
  });