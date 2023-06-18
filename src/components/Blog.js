import { useState } from "react"

const Blog = ({blog, addLike, removeBlog}) => {
  const [showAll, setShowAll] = useState(false)

  const toggleShowAll = () => {
    setShowAll(!showAll)
  }

  const likeBlog = () => {
    addLike(blog)
  }

  const deleteBlog = () => {
    removeBlog(blog)
  }

  return (
    <div className='blog'>
      {!showAll &&
      <div>
        <h3>{blog.title}</h3>
        <p>{blog.author}</p>
        <button onClick={toggleShowAll}>Show more</button>
      </div>
      }

      {showAll && (
        <div>
          <h3>{blog.title}</h3>
          <p>{blog.author}</p>
          <p>{blog.url}</p>
          
          <div className='blog_likes'>

            {blog.likes === 0 &&
            <p>Be the first to like this post!</p>
            }

            {blog.likes > 0 &&
            <p>Likes {blog.likes}</p>
            }

            <button onClick={likeBlog}>Like</button>
          </div>

          <p>{blog.user.username}</p>
          <button onClick={toggleShowAll}>Hide</button>

        </div>
      )}
      
      {/* TODO for 5.11 show remove button only if logged in user owns the blog */}
      <button onClick={deleteBlog}>Remove</button>
    </div>
  )
  }

export default Blog