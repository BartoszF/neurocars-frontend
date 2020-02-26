import React from "react";
import { render } from "@testing-library/react";
import { shallow } from "enzyme";
import { LeagueBadge } from './LeagueBadge';

describe("LeagueBadge", () => {
  test("renders without player", () => {
    render(<LeagueBadge />);
  });

  test("renders with player", () => {
    render(<LeagueBadge player={{ username: "TEST", league: "F" }} />);
  });

  test('proper league letter', () => {
    shallow(<LeagueBadge player={{ username: "TEST", league: "F" }} />).contains("F");
  });
});
