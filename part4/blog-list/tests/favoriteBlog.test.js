const listHelper = require("../utils/list_helper");
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

describe("Most liked blogs", () => {
  test("of lists", () => {
    expect(listHelper.favoriteBlog(blogs).title).toBe(
      "Canonical string reduction"
    );
  });
});
