import React from "react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import BlogForm from "./BlogForm";

test("submit function is called with correct values", async () => {
  const createBlog = jest.fn();
  const user = userEvent.setup();

  const { container } = render(<BlogForm createBlog={createBlog} />);

  const titleInput = container.querySelector("#title");
  const authorInput = container.querySelector("#author");
  const urlInput = container.querySelector("#url");
  const submitButton = screen.getByText("save");

  await user.type(titleInput, "Title for BlogForm");
  await user.type(authorInput, "Mark Plátano");
  await user.type(urlInput, "cheche.com");
  await user.click(submitButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe("Title for BlogForm");
  expect(createBlog.mock.calls[0][0].author).toBe("Mark Plátano");
  expect(createBlog.mock.calls[0][0].url).toBe("cheche.com");
});
