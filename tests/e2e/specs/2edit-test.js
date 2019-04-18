describe('Edit a hero', () => {
    it('check table rows and click on 3', () => {
      cy.visit('/')
      cy.wait(500)
      cy.get('tr.md-table-row').should('have.length', 4).eq(3).within(() => {
        cy.get('[data-test=edit]').click()
      })
    });
    it('edit hero number 3', () => {
      cy.get('.md-dialog-container').should('be.visible')
      cy.get('[data-test=name]').clear().type('Bruce')
      cy.get('[data-test=surname]').clear().type('Benner')
      cy.get('[data-test=pseudo]').clear().type('Hulk')
      cy.get('[type=submit]').click()
      cy.get('.md-dialog-container').should('not.be.visible')
    });
    it('check if hero number 3 edited', () => {
      cy.get('tbody>tr').eq(3).within(() => {
        cy.get('td').eq(1).contains('Bruce')
        cy.get('td').eq(2).contains('Benner')
        cy.get('td').eq(3).contains('Hulk')
      })
    });
  });