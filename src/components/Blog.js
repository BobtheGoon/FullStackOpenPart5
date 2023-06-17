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
        <h3>{blog.title}, {blog.author}</h3>
        <button onClick={toggleShowAll}>More info</button>
      </div>
      }

      {showAll &&
        <div className='blog'>
          <h3>{blog.title}, {blog.author}</h3>
          <p>{blog.url}</p>
          <div className='blog_likes'>
            <p>Likes {blog.likes}</p>
            <button onClick={() => console.log('liked')}>Like</button>
          </div>
          <button onClick={toggleShowAll}>Show less</button>
        </div>
      }
    </div>
  )
  }

export default Blog