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

    describe('When logged in', function() {
      beforeEach(function() {
        cy.get('#username').type('mluukkai')
        cy.get('#password').type('salainen')
        cy.get('#login-button').click()
      })

      it('A blog can be created', function() {
        cy.contains('new blog').click()
        cy.get('#title').type('a blog created by cypress')
        cy.get('#author').type('Cecy "The Mad press" Pressman')
        cy.get('#url').type('https://www.google.com')
        cy.contains('save').click()
        cy.contains('a blog created by cypress')
        cy.contains('Cecy "The Mad press" Pressman')
      })

      it.only('User can like blogs', function(){
        cy.contains('new blog').click()
        cy.get('#title').type('a blog created by cypress')
        cy.get('#author').type('Cecy "The Mad press" Pressman')
        cy.get('#url').type('https://www.google.com')
        cy.contains('save').click()
        cy.contains('button', 'Show').click()

        cy.get('#likes')
          .invoke('text')
          .should('contain', '0')
        cy.contains('button', 'Like').click()
        cy.get('#likes')
          .invoke('text')
          .should('contain', '1')
      })
    })
  })
})