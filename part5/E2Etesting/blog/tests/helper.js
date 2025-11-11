const loginWith = async (page, username, password) => {
  await page.getByRole("button", { name: "login" }).click();
  const textboxes = await page.getByRole("textbox").all();
  await textboxes[0].fill(username);
  await textboxes[1].fill(password);
  await page.getByRole("button", { name: "login" }).click();
};

const createBlog = async (page, content, author, url) => {
  await page.getByRole("button", { name: "new blog" }).click();
  const textboxes = await page.getByRole("textbox").all();
  await textboxes[0].fill(content);
  await textboxes[1].fill(author);
  await textboxes[2].fill(url);
  await page.getByRole("button", { name: "Create" }).click();
};

export { loginWith, createBlog };
