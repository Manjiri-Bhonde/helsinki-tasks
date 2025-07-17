const { test, after } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");

const api = supertest(app);

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs");

  assert.strictEqual(response.body.length, 6);
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

test("check if new blog is created succesfully", async () => {
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
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const newBlogs = await Blog.find({});
  assert.strictEqual(oldBlogs.length, newBlogs.length - 1);
});

test("check if likes not provided defualt to zero", async () => {
  const blog = {
    title: "Testing zero",
    author: "XYZ",
    url: "google.com",
  };
  const response = await api.post("/api/blogs").send(blog);
  const newBlog = response.body;
  assert.strictEqual(newBlog.likes, 0);
});

test("testing delete ", async () => {
  const oldBlogs = await Blog.find({});
  const id = "6847faeff8275ef257e9ec23";
  const response = await api.delete(`/api/blogs/${id}`).expect(204);

  const newBlogs = await Blog.find({});
  assert.strictEqual(newBlogs.length + 1, oldBlogs.length);
});

test.only("testing update of blog likes", async () => {
  const id = "6847faeff8275ef257e9ec23";
  const editedBlog = {
    title: "Editing",
    author: "Edit",
    url: "test",
    likes: 1,
  };
  const response = await api
    .put(`/api/blogs/${id}`)
    .send(editedBlog)
    .expect(200);
  assert.strictEqual(response.body.likes, 1);
});

after(async () => {
  await mongoose.connection.close();
});
