const { test, expect, describe, beforeEach } = require("@playwright/test");
const { loginWith, createBlog } = require("./helper");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3003/api/testing/reset");
    await request.post("http://localhost:3003/api/users", {
      data: {
        username: "man",
        name: "man",
        password: "man",
      },
    });
    await request.post("http://localhost:3003/api/users", {
      data: {
        username: "other",
        name: "other",
        password: "other",
      },
    });
    await page.goto("/");
  });

  test("login form displayed", async ({ page }) => {
    const locator = page.getByText("blogs");
    await page.getByRole("button", { name: "login" }).click();
    const textboxes = await page.getByRole("textbox").all();
    await expect(locator).toBeVisible();
    await expect(textboxes.length).toBeGreaterThan(0);
  });

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await loginWith(page, "man", "man");
      await expect(page.getByText("Welcome back man")).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await loginWith(page, "man", "manj");

      await expect(page.getByText("Error, Wrong credentials")).toBeVisible();
      await expect(page.getByText("Welcome back man")).not.toBeVisible();
    });
  });

  describe("When logged in", () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, "man", "man");
      await page.getByRole("button", { name: "login" }).click();
    });

    test("a new blog can be created", async ({ page }) => {
      await createBlog(page, "a note created by playwright", "man", "sddfsdf");
      await page.getByRole("button", { name: "Create" }).click();
      await expect(
        page.getByText("a note created by playwright blog created")
      ).toBeVisible();
    });

    describe("and a blog exists", () => {
      beforeEach(async ({ page }) => {
        await createBlog(
          page,
          "a note created by playwright",
          "man",
          "sddfsdf"
        );

        await createBlog(page, "anotheer note", "man", "iojiu");

        await page.getByRole("button", { name: "View" }).click();
      });

      test(" number of likes can be changed", async ({ page }) => {
        await page.getByRole("button", { name: "Like" }).all()[0].click();
        await page.getByRole("button", { name: "Like" }).all()[0].click();
        await page.getByRole("button", { name: "Like" }).all()[1].click();

        setTimeout(() => {
          console.log("1 number of like");
        }, [4000]);
        await expect(page.getByTestId("likesUrl")).toContainText(
          "1 number of likes"
        );
      });

      test("blog can be deleted", async ({ page }) => {
        await page.getByRole("button", { name: "Delete" }).click();
        await page.on("dialog", async (dialog) => {
          expect(dialog.type()).toBe("confirm");
          expect(dialog.message()).toContain(
            "Remove blog a note created by playwright"
          );
          await dialog.accept();
        });

        setTimeout(() => {
          expect(
            page.getByText("a note created by playwright ")
          ).not.toBeVisible();
        }, [3000]);
      });

      test("arranged in like asc order", async () => {
        await expect(
          page.getByRole("button", { name: "Delete" })
        ).toBeVisible();

        await expect(page.getByRole("button", { name: "Logout" })).click();
        await loginWith(page, "other", "other");
        await page.getByRole("button", { name: "View" }).click();
        await expect(
          page.getByRole("button", { name: "Delete" })
        ).not.toBeVisible();
      });

      test("tests can be deleted by user who added", async () => {
        await page.reload();
        const blogs = page.locator(".blog");
        const count = await blogs[0].count();
        expect(count).toBe(2);
      });
    });
  });
});
