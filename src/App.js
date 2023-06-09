import { useState, useEffect, useRef } from 'react'
import './styles.css'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import InfoMessage from './components/InfoMessage'

import blogService from './services/blogs'
import loginService from './services/loginService'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [infoMessage, setInfoMessage] = useState(null)
  const [infoStyle, setInfoStyle] = useState(null)
  const [loginVisible, setLoginVisible] = useState(true)
  
  const blogFormRef = useRef()

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
    blogFormRef.current.toggleVisibility()
    blogService.submitBlog(blogObject)
    
    //Add current user as user that added blog
    blogObject.user = user

    //Add new blog to blog state
    setBlogs(blogs.concat(blogObject))

    setInfoMessage(`Added new blog ${blogObject.title}!`)
    setInfoStyle('success')
    
    setTimeout(() => {
      setInfoMessage(null)
      setInfoStyle(null)
    }, 5000)
  }

  const addLike = (blogObject) => {
    blogService.addLike(blogObject)

    setInfoMessage(`You liked ${blogObject.title}!`)
    setInfoStyle('success')
    
    setTimeout(() => {
      setInfoMessage(null)
      setInfoStyle(null)
    }, 5000)
  }

  const sortBlogsByLikes = (a, b) => {
    let order
    Number(a.props.blog.likes) > Number(b.props.blog.likes) ? order = 0 : order = 1
    return order
  }

  return (
    <div>
      <h2>Blogs</h2>
      <InfoMessage message={infoMessage} style={infoStyle} />

      {!user &&
      <div>
        <Togglable buttonLabel='Login'>
          <LoginForm username={username} setUserName={setUserName} password={password} setPassword={setPassword} handleLogin={handleLogin} infoMessage={infoMessage} infoStyle={infoStyle}/>
        </Togglable>
      </div>
      }

      {user &&
      <div>
        <div>
          {user.username} logged in
          <button onClick={handleLogout}>Log out</button>
        </div>
        <Togglable buttonLabel='Add blog' ref={blogFormRef}>
          <BlogForm addBlog={addBlog}/>
        </Togglable>
        {blogs
        .map(blog =>
          <Blog key={blog.id} blog={blog} addLike={addLike} />)
        .sort(sortBlogsByLikes)}
      </div>
      }
    </div>
  )
}

export default App