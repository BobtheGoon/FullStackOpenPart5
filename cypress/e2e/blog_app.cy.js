describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/test/reset')
    
    const user = {
      name: 'Gob',
      username: 'GobtheBoon',
      password: 'bananaynay'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)

    cy.visit('http://localhost:3000')
  })

  describe('Login', function() {
    it('Login form is shown', function() {
      cy.contains('Login')
    })

    it('Logs the user in with correct creds', function() {
      cy.contains('Login').click()
      cy.get('#username_input').type('GobtheBoon')
      cy.get('#password_input').type('bananaynay')
      cy.get('#login_button').click()
      cy.contains('GobtheBoon logged in')
    })

    it('Fails to log in with wrong creds, and displays error', function() {
      cy.contains('Login').click()
      cy.get('#username_input').type('GobtheBuun')
      cy.get('#password_input').type('banana')
      cy.get('#login_button').click()
      cy.contains('Wrong username or password')
    })
  })

  describe('Blogs', function() {
    beforeEach(function() {
      cy.login({username: 'GobtheBoon', password: 'bananaynay'})
    })

    it.only('Creates a blog', function() {
      cy.contains('Add blog').click()
      cy.get('#title').type('TestBlog1')
      cy.get('#author').type('Tester')
      cy.get('#url').type('www.test.com')
      cy.get('#submit_blog_btn').click()

      cy.contains('TestBlog1')
    })
  })
})