describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    const user2 = {
      name: 'Latti Muukkainen',
      username: 'sluukkai',
      password: 'malainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.request('POST', 'http://localhost:3003/api/users', user2)
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
        cy.login({ username: 'mluukkai', password: 'salainen' })
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

      it('User can like blogs', function(){
        cy.createBlog({
          title: 'a blog created by cypress',
          author: 'Cecy "The Mad press" Pressman',
          url: 'https://www.google.com'
        })
        cy.contains('button', 'Show').click()

        cy.get('#likes')
          .invoke('text')
          .should('contain', '0')
        cy.contains('button', 'Like').click()
        cy.get('#likes')
          .invoke('text')
          .should('contain', '1')
      })

      it('User can remove blog they created', function(){
        cy.contains('new blog').click()
        cy.get('#title').type('a blog that will be deleted')
        cy.get('#author').type('Dèlete Mason')
        cy.get('#url').type('https://www.google.com')
        cy.contains('save').click()
        cy.contains('a blog that will be deleted')
        cy.contains('button', 'Show').click()

        cy.contains('Remove').click()
        cy.get('html').should('not.contain', '.blog')
      })

      it('Only user who created blog can remove it', function(){
        cy.createBlog({
          title: 'a blog created by cypress',
          author: 'Cecy "The Mad press" Pressman',
          url: 'https://www.google.com'
        })
        cy.contains('new blog').click()
        cy.get('#title').type('a blog that will not be deleted')
        cy.get('#author').type('Jason Mason')
        cy.get('#url').type('https://www.google.com')
        cy.contains('save').click()
        cy.contains('button', 'Show').click()
        cy.contains('Remove')

        cy.contains('button', 'logout').click()

        cy.get('#username').type('sluukkai')
        cy.get('#password').type('malainen')
        cy.get('#login-button').click()
        cy.contains('button', 'Show').click()

        cy.get('html').should('not.contain', 'Remove')
      })

      it('blogs are ordered based on likes', async function(){
        cy.createBlog({
          title: 'Second most likes',
          author: 'Seymour Second',
          url: 'https://www.google.com'
        })
        cy.contains('Second most likes')
          .parent().contains('button', 'Show').click()
        cy.contains('Second most likes')
          .parent().parent().contains('button', 'Like').as('2ndButton')
        cy.contains('Second most likes')
          .parent().parent().get('#likes').invoke('text').as('2ndLikeText')
        cy.get('@2ndButton').click()
        cy.get('@2ndLikeText').should('contain', 1)
        cy.get('@2ndButton').click()
        cy.get('@2ndLikeText').should('contain', 2)
        cy.get('@2ndButton').click()
        cy.get('@2ndLikeText').should('contain', 3)


        cy.createBlog({
          title: 'Third most likes',
          author: 'Theodore Third',
          url: 'https://www.google.com'
        })
        cy.contains('Third most likes')
          .parent().contains('button', 'Show').click()
        cy.contains('Third most likes')
          .parent().parent().contains('button', 'Like').as('3rdButton')
        cy.contains('Third most likes')
          .parent().parent().get('#likes').invoke('text').as('3rdLikeText')
        cy.get('@3rdButton').click()
        cy.get('@3rdLikeText').should('contain', 1)


        cy.createBlog({
          title: 'Most likes',
          author: 'Monica Mostang',
          url: 'https://www.google.com'
        })
        cy.contains('Most likes')
          .parent().contains('button', 'Show').click()
        cy.contains('Most likes')
          .parent().parent().contains('button', 'Like').as('1stButton')
        cy.contains('Most likes')
          .parent().parent().get('#likes').invoke('text').as('MostLikeText')
        cy.get('@1stButton').click()
        cy.get('@MostLikeText').should('contain', 1)
        cy.get('@1stButton').click()
        cy.get('@MostLikeText').should('contain', 2)
        cy.get('@1stButton').click()
        cy.get('@MostLikeText').should('contain', 3)
        cy.get('@1stButton').click()
        cy.get('@MostLikeText').should('contain', 4)
        cy.get('@1stButton').click()
        cy.get('@MostLikeText').should('contain', 5)
        cy.get('@1stButton').click()
        cy.get('@MostLikeText').should('contain', 6)
        cy.get('@1stButton').click()
        cy.get('@MostLikeText').should('contain', 7)

        cy.get('.blog').eq(0).should('contain', 'Most likes')
        cy.get('.blog').eq(1).should('contain', 'Second most likes')
        cy.get('.blog').eq(2).should('contain', 'Third most likes')
      })
    })
  })
})