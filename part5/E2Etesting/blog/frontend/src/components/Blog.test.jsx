import { render, screen } from "@testing-library/react";
import Blog from "./Blog";
import userEvent from "@testing-library/user-event";

test("renders content", async () => {
  const blog = {
    title: "this is testing",
    author: "x",
    url: "x",
    likes: 0,
    user: {
      username: "saloni",
      id: "687f8b26b5f65b7a6c3e027d",
    },
  };

  const mockHandler = vi.fn();

  const { container } = render(
    <Blog blog={blog} editBlogLikes={mockHandler} />
  );
  // const element = screen.getByText((content) =>
  //   content.includes("this is testing")
  // );
  // expect(element).toBeInTheDocument();
  const div = container.querySelector(".blog");
  expect(div).toHaveTextContent("this is testing");

  const titleDiv = container.querySelector(".title");
  expect(titleDiv).toHaveTextContent(blog.title);

  const authorDiv = container.querySelector(".author");
  expect(authorDiv).toHaveTextContent(blog.author);

  let likesURLDiv = container.querySelector(".likesUrl");
  expect(likesURLDiv).toBeNull();

  const user = userEvent.setup();
  const button = screen.getByText("Like");
  await user.click(button);
  await user.click(button);

  expect(mockHandler.mock.calls).toHaveLength(2);

  const viewButton = screen.getByRole("button", { name: /view/i });
  await user.click(viewButton);
  likesURLDiv = await screen.findByTestId("likesUrl");
  expect(likesURLDiv).toBeInTheDocument();
});
