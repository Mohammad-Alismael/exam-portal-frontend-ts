import { expect, test, describe, it } from "vitest";
import { render } from "@testing-library/react";
import LandingHeader from "../components/custom-ui/LandingHeader";
import {BrowserRouter} from "react-router-dom";

describe('Landing Header', () => {
  it('renders the correct link based on the "type" prop', () => {
    const screen = render(
        <BrowserRouter>
          <LandingHeader type="auth" />
        </BrowserRouter>
    );

    const link = screen.getByText("Don't have an account?");
    expect(link).exist
    expect(link.getAttribute('href')).toBe('/signup');
  });
  
  it('renders the correct link when "type" prop is not "auth"', () => {
      const screen = render(
          <BrowserRouter>
              <LandingHeader type="signup" />
          </BrowserRouter>
      );

      const link = screen.getByText("Already have an account?");
      expect(link).exist
      expect(link.getAttribute('href')).toBe('/login');
  });
});
