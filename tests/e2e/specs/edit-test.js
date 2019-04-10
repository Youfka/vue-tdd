describe('Adding a hero', () => {
    
    it('edit', () => {
      cy.visit('/')
      cy.request('GET', 'http://localhost:3000/heroes')
      cy.get('tbody').selectNth(3).within(() => {
        cy.get('[data-test=edit]').click()
      })
      cy.get('.md-dialog-container').should('be.visible')
      cy.get('[data-test=name]').clear().type('Nick')
      cy.get('[data-test=surname]').clear().type('Fury')
      cy.get('[data-test=pseudo]').clear().type('Fury1')
      cy.get('[type=submit]').click()
    //   cy.request('POST', 'http://localhost:3000/heroes/:id', 1)
    //     .then((response) => {
    //       expect(response.body).to.eq("success")
    //     })
      cy.get('.md-dialog-container').should('not.be.visible')
      cy.get('tbody').selectNth(3).within(() => {
        cy.get('td').selectNth(1).contains('Nick')
        cy.get('td').selectNth(2).contains('Fury')
        cy.get('td').selectNth(3).contains('Fury1')
      })
    });
  });