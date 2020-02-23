import React from "react";
import { render } from "@testing-library/react";
import { PlayerName } from "./PlayerName";
import { shallow } from "enzyme";

describe("PlayerName", () => {
  test("renders without player", () => {
    render(<PlayerName />);
  });

  test("renders with player", () => {
    render(<PlayerName player={{ username: "TEST" }} />);
  });

  test("proper username used", () => {
    shallow(<PlayerName player={{ username: "TEST" }} />).contains("TEST");
  });
});
