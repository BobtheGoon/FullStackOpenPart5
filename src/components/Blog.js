import { useState } from "react"

const Blog = ({blog}) => {
  const [showAll, setShowAll] = useState(false)

  const toggleShowAll = () => {
    setShowAll(!showAll)
  }

  return (
    <div>
      {!showAll &&
      <div className='blog'>
        <h3>{blog.title}</h3>
        <p>{blog.author}</p>

        <button onClick={toggleShowAll}>More info</button>
      </div>
      }

      {showAll && (
        <div className='blog'>
          <h3>{blog.title}</h3>
          <p>{blog.author}</p>
          <p>{blog.url}</p>
          
          <div className='blog_likes'>
            {blog.likes === undefined &&
            <p>Be the first to like this post! {blog.likes}</p>
            }
            <button onClick={() => console.log('liked')}>Like</button>
          </div>

          <p>{blog.user.username}</p>

          <button onClick={toggleShowAll}>Show less</button>
        </div>
      )}
    </div>
  )
  }

export default Blog