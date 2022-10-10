const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

test('GET: Total number of blogs', async () => {
    const response = await helper.blogInDb()
    expect(response).toHaveLength(helper.initialBlogs.length)
})

test('GET: blogs have ID', async () => {
    const blogs = await helper.blogInDb()
    expect(blogs[0].id).toBeDefined()
}, 100000)

test('POST: Create a new blog', async () => {
    const blog = {
        title: 'Test Title',
        author: 'Test Author',
        url: 'Test URL',
        likes: 100
    }
    await api.post('/api/blogs').send(blog).expect(201).expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    const titlesAtEnd = blogsAtEnd.map(r => r.title)
    expect(titlesAtEnd).toContain('Test Title')
}, 10000)

test('POST: Default Likes = 0', async () => {
    const blog = {
        title: 'Test Title',
        author: 'Test Author',
        url: 'Test URL',
    }
    await api.post('/api/blogs').send(blog).expect(201).expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    const blogAtEnd = blogsAtEnd.filter(blog => blog.title === 'Test Title')
    expect(blogAtEnd[0].likes).toEqual(0)
}, 10000)

test('POST: Empty Title and URL', async () => {
    const blog = {
        author: 'Test Author',
    }
    await api.post('/api/blogs').send(blog).expect(400)
}, 10000)

describe('DELETE: deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
        const blogsAtStart = await helper.blogInDb()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const blogsAtEnd = await helper.blogInDb()

        expect(blogsAtEnd).toHaveLength(
            helper.initialBlogs.length - 1
        )

        const titles = blogsAtEnd.map(r => r.title)

        expect(titles).not.toContain(blogToDelete.title)
    })
})

afterAll(() => {
    mongoose.connection.close()
})