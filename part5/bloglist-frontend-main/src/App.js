import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async () => {
    try {
      setUser(null)
      window.localStorage.removeItem('loggedBlogappUser')
    } catch (exception) {
      setErrorMessage('Failed to log out')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => {
    return (
      <Togglable buttonLabel='login'>
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </Togglable>
    )
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()

    blogService
      .create(blogObject)
      .then(returnedBlogs => {
        setErrorMessage(`A new blog ${blogObject.title} by ${blogObject.author} is added!`)
        setBlogs(blogs.concat(returnedBlogs))
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const updateBlog = (blogObject) => {
    console.log(blogObject)
    blogService.update(blogObject.id, {
      ...blogObject,
      likes: blogObject.likes + 1
    }).then(() => {
      blogService.getAll().then(blogs =>
        setBlogs(blogs)
      )
      setErrorMessage(`${blogObject.title} by ${blogObject.author} is updated!`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    })
  }

  const deleteBlog = (blogObject) => {
    if (window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}?`))
      blogService.deleteBlog(blogObject.id).then(() => {
        blogService.getAll().then(blogs =>
          setBlogs(blogs)
        )
        setErrorMessage(`${blogObject.title} is removed!`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const blogForm = () => {
    return (
      <Togglable buttonLabel='New Blog' ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
    )
  }

  return (
    <div>
      <h2>Blog Website</h2>
      {errorMessage !== null && <Notification errorMessage={errorMessage} type='error' />}
      {user === null ? loginForm() : <div>
        <p>{user.name} logged-in<button onClick={handleLogout}>Logout</button></p>
        {blogForm()}
      </div>}
      <h2>Blogs</h2>
      {
        blogs.map(blog =>
          <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} />
        )
      }
    </div >
  )
}

export default App
