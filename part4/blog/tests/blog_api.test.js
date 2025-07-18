const { test, after, beforeEach } = require("node:test");
const bcrypt = require("bcrypt");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const helper = require("./test_helper");
const User = require("../models/user");

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

// test("testing delete ", async () => {
//   const oldBlogs = await Blog.find({});
//   const id = "6847faeff8275ef257e9ec23";
//   const response = await api.delete(`/api/blogs/${id}`).expect(204);

//   const newBlogs = await Blog.find({});
//   assert.strictEqual(newBlogs.length + 1, oldBlogs.length);
// });

// test("testing update of blog likes", async () => {
//   const id = "6847faeff8275ef257e9ec23";
//   const editedBlog = {
//     title: "Editing",
//     author: "Edit",
//     url: "test",
//     likes: 1,
//   };
//   const response = await api
//     .put(`/api/blogs/${id}`)
//     .send(editedBlog)
//     .expect(200);
//   assert.strictEqual(response.body.likes, 1);
// });

describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });

  test("creation fails with proper statuscode and message if username already taken", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "root",
      name: "Superuser",
      password: "salainen",
      blogs:[],
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    assert(result.body.error.includes("expected `username` to be unique"));

    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "salainen",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    assert(usernames.includes(newUser.username));
  });
});

after(async () => {
  await mongoose.connection.close();
});
