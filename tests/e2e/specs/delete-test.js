describe('Delete a hero', () => {
    
    it('delete', () => {
      cy.visit('/')
      cy.request('GET', 'http://localhost:3000/heroes').then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.length(4)
        expect(response).to.have.property('headers')
        expect(response).to.have.property('duration')
      })
      
      cy.get('tbody>tr').eq(2).within(() => {
        cy.get('[data-test=delete]').click()
      })
      cy.get('.md-dialog-container').should('be.visible')
      cy.contains('OK').click()
      // cy.request('PUT', 'http://localhost:3000/heroes/1', {"name":"Grey", "surname": "Duck", "pseudo": "Monkey"})
      //   .then((response) => {
      //     expect(response.body).to.eq("success")
      //   })
      cy.get('.md-dialog-container').should('not.be.visible')
      cy.request('GET', 'http://localhost:3000/heroes').then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.length(3)
        expect(response).to.have.property('headers')
        expect(response).to.have.property('duration')
      })
    });
  });