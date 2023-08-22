const BLOG = {
  title: 'TestBlog1',
  author: 'Tester',
  blog_url: 'www.test.com'
}

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/test/reset')
    
    const user = {
      name: 'Gob',
      username: 'GobtheBoon',
      password: 'bananaynay'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)

    cy.visit('')
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

    it('Can create a blog', function() {
      cy.contains('Add blog').click()
      cy.get('#title').type(BLOG.title)
      cy.get('#author').type(BLOG.author)
      cy.get('#url').type(BLOG.blog_url)
      cy.get('#submit_blog_btn').click()

      cy.contains('TestBlog1')
    })

    it('Can like a blog', function() {
      cy.addBlog(BLOG)
      cy.contains('Show more').click()
      cy.contains('Like').click()
      cy.contains('Likes 1')
    })
  })
})