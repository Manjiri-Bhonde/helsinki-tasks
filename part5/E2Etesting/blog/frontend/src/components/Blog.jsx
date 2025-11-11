import { useState } from "react";

const Blog = ({ blog, editBlogLikes, handleDeleteBlog }) => {
  const [trimmedString, setTrimmedString] = useState(true);
  const [show, setShow] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
    overflow: trimmedString ? "hidden" : null,
    textOverflow: trimmedString ? "ellipsis" : null,
    width: "250px",
    whiteSpace: trimmedString ? "nowrap" : null,
  };

  const handleViewClick = () => {
    setTrimmedString((prev) => !prev);
    setShow((prev) => !prev);
  };

  return (
    <div style={{ display: " flex" }}>
      <div style={blogStyle} className="blog">
        <span className="title">{blog.title}</span> by
        <br /> <span className="author">{blog.author}</span> has
        <br />
        {show && (
          <div className="likesUrl" data-testid="likesUrl">
            <span> {blog.likes} number of likes</span>
            <br />
            <span>url : {"   " + blog.url}</span>
          </div>
        )}
        <button onClick={() => editBlogLikes(blog)}>Like</button>
        <button onClick={() => handleDeleteBlog(blog)}>Delete</button>
      </div>
      <button onClick={handleViewClick}>View</button>
    </div>
  );
};

export default Blog;
