import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

test("<BlogForm /> updates parent state and calls onSubmit", async () => {
  const createBlog = vi.fn();
  const user = userEvent.setup();

  render(<BlogForm createBlog={createBlog} />);

  const input = screen.getAllByRole("textbox"); //or use getByPlaceholderText("input title")
  const sendButton = screen.getByText("Create");

  await user.type(input[0], "testing a form...");
  await user.type(input[1], "author");
  await user.type(input[2], "http://example.com");
  await user.click(sendButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0]).toEqual({
    title: "testing a form...",
    author: "author",
    likes: 0,
    url: "http://example.com",
  });
});
