import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import Toggable from "./components/Toggable";
import BlogForm from "./components/BlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");


  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) =>
        setBlogs(
          blogs
            .filter(
              (blog) => blog.user && blog.user.username === user?.username
            )
            .sort((a, b) => b.likes - a.likes)
        )
      );
  }, [user]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      console.log("logging in with", username, password);
      const user = await loginService.login({
        username: username,
        password: password,
      });
      setUser(user);
      setUsername("");
      setPassword("");
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
    } catch (exception) {
      setErrorMessage("Error, Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.clear();
    blogService.setToken(null);
  };

  const loginForm = () => {
    return (
      <Toggable buttonLabel="login">
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </Toggable>
    );
  };

  const blogForm = () => {
    return (
      <Toggable buttonLabel="new blog">
        <BlogForm createBlog={handleCreateNew} />
      </Toggable>
    );
  };

  const handleCreateNew = async (newBlog) => {
    const response = await blogService.create(newBlog);
    if (response.status === 201) {
      setErrorMessage(`${response.data.title} blog created`);
      setBlogs((prev) => prev.concat(newBlog));
    } else {
      setErrorMessage("Error occurred");
    }
    setTimeout(() => setErrorMessage(""), 5000);
    
  };

  const editBlogLikes = async (oldBlog) => {
    const editedBlog = {
      ...oldBlog,
      likes: oldBlog.likes + 1,
    };
    const response = await blogService.update(oldBlog.id, editedBlog);
    const newBlogsArray = blogs.map((blog) =>
      blog.id === response.id ? response : blog
    );
    setBlogs(newBlogsArray);
  };

  const handleDeleteBlog = async (obj) => {
    const userInput = window.confirm(`Remove blog  ${obj.title}`);

    const response = userInput && (await blogService.deleteBlog(obj.id));
    if (response.status === 204) {
      setBlogs((prev) => prev.filter((blog) => blog.id !== obj.id));
    }
  };

  return (
    <div>
      <h2>blogs</h2>
      {errorMessage !== "" && <Notification message={errorMessage} />}
      {user === null ? (
        loginForm()
      ) : (
        <>
          <h3>Welcome back {user?.username}</h3>
          <button type="button" onClick={() => handleLogout()}>
            Logout
          </button>

          {blogForm()}
          {blogs?.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              editBlogLikes={editBlogLikes}
              handleDeleteBlog={handleDeleteBlog}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default App;
