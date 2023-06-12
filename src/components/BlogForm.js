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
      <form className="blog_form" onSubmit={createBlog}>
        <input value={title} onChange={handleTitleChange}/>
        <input value={author} onChange={handleAuthorChange}/>
        <input value={url} onChange={handleUrlChange}/>
        <button type='submit'>Create</button>
     </form>
    </div>
  )
}

export default BlogForm