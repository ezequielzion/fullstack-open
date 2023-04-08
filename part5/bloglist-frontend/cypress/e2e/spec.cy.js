describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
  })

  it('Login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Matti Luukkainen logged in')
    })

    describe('failed login', function(){
      beforeEach(function() {
        cy.get('#username').type('wrong')
        cy.get('#password').type('justwrong')
        cy.get('#login-button').click()
      })

      it('fails with wrong credentials', function() {
        cy.get('.error-notification').should('contain', 'Wrong credentials')
      })

      it('and color is red', function(){
        cy.get('.error-notification').should('contain', 'Wrong credentials')
          .should('have.css', 'color', 'rgb(255, 0, 0)')
      })
    })
  })
})