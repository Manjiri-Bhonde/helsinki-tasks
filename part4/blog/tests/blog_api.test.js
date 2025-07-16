const { test, after } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const blog = require("../models/blog");

const api = supertest(app);

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs");

  assert.strictEqual(response.body.length, 5);
});

test("unique identifier is id", async () => {
  const response = await api.get("/api/blogs");
  const blogs = response.body;
  blogs.forEach((blog) => {
    const keys = Object.keys(blog);
    assert(keys.includes("id"));
    assert(!keys.includes("_id"));
  });
});

test.only("check if new blog is created succesfully", async () => {
  const oldBlogs = await Blog.find({});
  const blog = new blog({
    title: "Testing whether there is new blog",
    author: "XYZ",
    url: "google.com",
    likes: 4,
  });

  await api
    .post("/api/blogs")
    .send(blog)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const newBlogs = await Blog.find({});
  assert.strictEqual(oldBlogs.length, newBlogs.length - 1);
});

after(async () => {
  await mongoose.connection.close();
});
