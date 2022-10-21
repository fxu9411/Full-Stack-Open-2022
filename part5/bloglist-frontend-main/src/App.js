import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [newBlog, setNewBlog] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      // console.log(user)
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
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

  const handleLogout = async (event) => {
    // event.preventDefault()
    try {
      setUser(null)
      window.localStorage.removeItem('loggedNoteappUser')
    } catch (exception) {
      setErrorMessage('Failed to log out')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <div>
      <h2>Log into application</h2>
      <div>
        <Notification message={errorMessage} type='error' />
      </div>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input type='text' value={username} name='Username' onChange={({ target }) => setUsername(target.value)}></input>
        </div>
        <div>
          password
          <input type='password' value={password} name='Password' onChange={({ target }) => setPassword(target.value)}>
          </input>
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newBlog,
      author: newAuthor,
      url: newUrl
    }

    blogService
      .create(blogObject)
      .then(returnedBlogs => {
        setBlogs(blogs.concat(returnedBlogs))
        setNewBlog('')
        setNewAuthor('')
        setNewUrl('')
        setErrorMessage(`A new blog ${blogObject.title} by ${blogObject.author} is added!`)
      })
  }

  const handleBlogChange = (event) => {
    setNewBlog(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const blogForm = () => (
    <div>
      <h2>Blogs</h2>
      <h2>Create New</h2>
      <div>
        <Notification message={errorMessage} type='notification' />
      </div>
      <form onSubmit={addBlog}>
        <p>Title <input value={newBlog} onChange={handleBlogChange} /></p>
        <p>Author <input value={newAuthor} onChange={handleAuthorChange} /></p>
        <p>URL <input value={newUrl} onChange={handleUrlChange} /></p>
        <button type='submit' onSubmit={addBlog}>save</button>
      </form >
      <p>{user.name} logged-in <button onClick={handleLogout}>Log out</button></p>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  return (
    <div>
      {user === null ? loginForm() : blogForm()}
    </div >
  )
}

export default App
