import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import '@testing-library/jest-dom/extend-expect';
import App from "./App";

test("renders App component without crashing", () => {
    const { getByTestId } = render(
        <MemoryRouter>
            <App />
        </MemoryRouter>
    );
    expect(getByTestId("app")).toBeInTheDocument();
});

test("renders BasicNavbar component", () => {
    const { getByTestId } = render(
        <MemoryRouter>
            <App />
        </MemoryRouter>
    );
    expect(getByTestId("navbar")).toBeInTheDocument();
});

test("renders Footer component", () => {
    const { getByTestId } = render(
        <MemoryRouter>
            <App />
        </MemoryRouter>
    );
    expect(getByTestId("footer")).toBeInTheDocument();
});