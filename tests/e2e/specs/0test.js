describe('My First Test', () => {
  it('Visits the app root url', () => {
    cy.visit('/');
    cy.contains('h1', 'Superheroes');
  });
  it('Check heroes request', () => {
    cy.server()
    cy.request('GET', 'http://localhost:3000/heroes').then((response) => {
      expect(response.status).to.eq(200)
      cy.wrap(response.body).its('length').should('be.gt', 1)
      cy.wrap(response.body).should('be.a', 'Array')
      cy.wrap(response.body).each((value, index)=>{
        cy.wrap(value).should('be.a', 'Object')
      })
    })
    const getHeroes = () => cy.request('http://localhost:3000/heroes').its('body');
    cy.request('http://localhost:3000/heroes')
    .its('headers')
    .its('content-type')
    .should('include', 'application/json')
  });
});

// describe('todos API', () => {
//   /**
//    * @typedef {Object} Todo
//    * @property {number} id
//    * @property {string} task
//    */

//    /** @type {Todo[]} */
  // const initialItems = [
  //   {
  //     "id": 1,
  //     "task": "read something"
  //   },
  //   {
  //     "id": 2,
  //     "task": "write something"
  //   }
  // ]

  // const getItems = () =>
  //   cy.request('/todos')
  //     .its('body')

  // /** @type {(todo:Todo) => Cypress.Chainable} */
  // const add = item =>
  //   cy.request('POST', '/todos', item)

  // const deleteItem = item =>
  //   cy.request('DELETE', `/todos/${item.id}`)

  // const deleteAll = () =>
  //   getItems()
  //     .each(deleteItem)

  // const reset = () => {
  //   deleteAll()
  //   initialItems.forEach(add)
  // }

  // beforeEach(reset)
  // afterEach(reset)

//   it('returns id + task objects', () => {
//     getItems()
//       .each(value =>
//         expect(value).to.have.all.keys('id', 'task')
//       )
//   })

//   it('adds an item', () => {
//     const randomId = Cypress._.random(0, 10000)
//     const item = {id:randomId, task:'life'}

//     add(item)
//     cy.request(`/todos/${randomId}`)
//       .its('body')
//       .should('deep.eq', item)
//   })

//   it('deletes an item', () => {
//     const id = initialItems[0].id
//     cy.request('DELETE', `/todos/${id}`)
//     getItems()
//       .should('have.length', 1)
//   })
// })