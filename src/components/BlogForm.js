import { useState } from "react"

const BlogForm = ({addBlog}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const createBlog = (event) => {
    event.preventDefault()
    addBlog({
      title: title,
      author: author,
      url: url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  return (
    <div>
      <form className='blog_form' onSubmit={createBlog}>
        <label htmlFor='title'>Title</label>
        <input value={title} name='title' onChange={handleTitleChange}/>
        <label htmlFor='author'>Author</label>
        <input value={author} name='author' onChange={handleAuthorChange}/>
        <label htmlFor='url'>URL</label>
        <input value={url} name='url' onChange={handleUrlChange}/>
        <button type='submit'>Create</button>
     </form>
    </div>
  )
}

export default BlogForm