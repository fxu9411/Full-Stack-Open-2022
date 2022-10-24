import { useState } from "react"

const Blog = ({ blog, updateBlog, deleteBlog }) => {
  const [showDetail, setShowDetail] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      {blog.title}<button onClick={() => setShowDetail(!showDetail)}>View</button>
      <button onClick={() => updateBlog(blog)}>Like</button>
      <button onClick={() => deleteBlog(blog)}>Delete</button>
      <p>{showDetail && `URL: ${blog.url}`}</p>
      <p>{showDetail && `Likes: ${blog.likes}`}</p>
      <p>{showDetail && `Author: ${blog.author}`}</p>
    </div>
  )
}

export default Blog