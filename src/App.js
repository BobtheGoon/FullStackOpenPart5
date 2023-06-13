import { useState, useEffect } from 'react'
import './styles.css'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import InfoMessage from './components/InfoMessage'

import blogService from './services/blogs'
import loginService from './services/loginService'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [infoMessage, setInfoMessage] = useState(null)
  const [infoStyle, setInfoStyle] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({username, password})
      console.log('success')

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)

      setUser(user)
      setUserName('')
      setPassword('')
    }
    catch (exception) {
      console.log('failure')
      setInfoMessage('Wrong username or password')
      setInfoStyle('error')

      setTimeout(() => {
        setInfoMessage(null)
        setInfoStyle(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
    console.log('logged out')
  }

  const addBlog = (blogObject) => {
    blogService.submitBlog(blogObject)

    //Add new blog to blog state
    setBlogs(blogs.concat(blogObject))

    setInfoMessage(`Added new blog ${blogObject.title}!`)
    setInfoStyle('success')
    
    setTimeout(() => {
      setInfoMessage(null)
      setInfoStyle(null)
    }, 5000)
  }

  if (user === null) {
    return LoginForm({username, setUserName, password, setPassword, handleLogin, infoMessage, infoStyle})
  }

  return (
    <div>
      <h2>Blogs</h2>
      <InfoMessage message={infoMessage} style={infoStyle} />
      <div>
        {user.username} logged in
        <button onClick={handleLogout}>Log out</button>
      </div>
      <BlogForm addBlog={addBlog}/>
      <p></p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App