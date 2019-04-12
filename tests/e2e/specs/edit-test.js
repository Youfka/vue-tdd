describe('Add a hero', () => {
    
    it('edit', () => {
      cy.visit('/')
      cy.request('GET', 'http://localhost:3000/heroes').then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.length(4)
        expect(response).to.have.property('headers')
        expect(response).to.have.property('duration')
      })
      
      cy.get('tbody>tr').eq(2).within(() => {
        cy.get('[data-test=edit]').click()
      })
      cy.get('.md-dialog-container').should('be.visible')
      cy.get('[data-test=name]').clear().type('Nick')
      cy.get('[data-test=surname]').clear().type('Fury')
      cy.get('[data-test=pseudo]').clear().type('Fury1')
      cy.get('[type=submit]').click()
      // cy.request('PUT', 'http://localhost:3000/heroes/1', {"name":"Grey", "surname": "Duck", "pseudo": "Monkey"})
      //   .then((response) => {
      //     expect(response.body).to.eq("success")
      //   })
      cy.get('.md-dialog-container').should('not.be.visible')
      cy.get('tbody>tr').eq(2).within(() => {
        cy.get('td').eq(1).contains('Nick')
        cy.get('td').eq(2).contains('Fury')
        cy.get('td').eq(3).contains('Fury1')
      })
    });
  });