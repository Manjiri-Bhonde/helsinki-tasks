const blogsRouter = require("express").Router();
const logger = require("../utils/logger");

const Blog = require("../models/blog");

blogsRouter.get("/", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

blogsRouter.get("/:id", (request, response, next) => {
  Blog.findById(request.params.id)
    .then((blog) => {
      if (blog) {
        response.json(blog);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

blogsRouter.post("/", (request, response, next) => {
  const body = request.body;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes ?? 0,
  });

  blog
    .save()
    .then((blogSaved) => {
      response.json(blogSaved);
    })
    .catch((error) => next(error));
});

blogsRouter.delete("/:id", async (request, response, next) => {
  const { id } = request.params;

  await Blog.findByIdAndDelete(id);
  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response, next) => {
  const { title, author, url, likes } = request.body;
  try {
    const blog = await Blog.findById(request.params.id);
    if (!blog) {
      return response.status(404).end();
    }
    blog.title = title;
    blog.author = author;
    blog.url = url;
    blog.likes = likes;

    const updatedBlog = await blog.save();

    response.json(updatedBlog);
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;
