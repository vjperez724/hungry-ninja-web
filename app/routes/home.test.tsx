import { render, screen } from "@testing-library/react";
import { createRoutesStub } from "react-router";
import { describe, expect, it } from "vitest";

import Home from "./home";

describe("Home route", () => {
  it("renders the application without crashing", () => {
    const Stub = createRoutesStub([
      {
        path: "/",
        Component: Home,
      },
    ]);

    render(<Stub initialEntries={["/"]} />);

    expect(screen.getByRole("main")).toBeInTheDocument();
  });
});
