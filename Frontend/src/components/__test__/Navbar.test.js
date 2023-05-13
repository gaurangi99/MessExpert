import React from "react";
import { render, fireEvent,screen } from "@testing-library/react";
import {MemoryRouter, useNavigate} from "react-router-dom";
import BasicNavbar from "../BasicNavbar";
import '@testing-library/jest-dom/extend-expect';
import userEvent from "@testing-library/user-event";

jest.mock("react-router-dom", () => ({
    useNavigate: jest.fn(),
}));

describe("BasicNavbar", () => {
    const handleLogout = jest.fn();
    const user = { username: "testuser" };

    beforeEach(() => {
        useNavigate.mockReturnValue(jest.fn());
    });

    it("renders without crashing", () => {
        render(<BasicNavbar user={user} handleLogout={handleLogout} />);
    });

    it("displays the user's username when logged in", () => {
        const { getByText } = render(
            <BasicNavbar user={user} handleLogout={handleLogout} />
        );
        // eslint-disable-next-line testing-library/prefer-screen-queries
        expect(getByText(user.username)).toBeInTheDocument();
    });

    it("displays the Login button when not logged in", () => {
        const { getByText } = render(<BasicNavbar handleLogout={handleLogout} />);
        // eslint-disable-next-line testing-library/prefer-screen-queries
        expect(getByText("Login")).toBeInTheDocument();
    });

   // toBeInTheDocument it('renders the navbar with Logout button when user is logged in', () => {
   //      const user = { username: 'testuser' };
   //      const handleLogout = jest.fn();
   //      render(<BasicNavbar user={user} handleLogout={handleLogout} />);
   //      expect(screen.getByText(/MessExpert/i)).toBeInTheDocument();
   //      expect(screen.getByText(/Home/i)).toBeInTheDocument();
   //      expect(screen.getByRole('button', { name: /testuser/i })).toBeInTheDocument();
   //      expect(screen.queryByText('Logout')).toBeNull();
   //      // click the username dropdown button
   //      const dropdownButton = screen.getByRole('button', { name: /testuser/i });
   //      userEvent.click(dropdownButton);
   //      // eslint-disable-next-line testing-library/prefer-presence-queries
   //      expect(screen.queryByText(/Logout/i)).toBeInTheDocument();
   //      // click the logout button
   //      const logoutButton = screen.queryByText(/Logout/i);
   //      userEvent.click(logoutButton);
   //      expect(handleLogout).toHaveBeenCalledTimes(1);
   //  });

    it('renders the navbar with Login button when user is not logged in', () => {
        const user = null;
        const handleLogout = jest.fn();
        render(<BasicNavbar user={user} handleLogout={handleLogout} />);
        expect(screen.getByText(/MessExpert/i)).toBeInTheDocument();
        expect(screen.getByText(/Home/i)).toBeInTheDocument();
        expect(screen.getByText(/Login/i)).toBeInTheDocument();
        expect(screen.queryByRole('button', { name: /testuser/i })).toBeNull();
        expect(screen.queryByText('Logout')).toBeNull();
    });

    it('should render navbar with login link', () => {
        render(

                <BasicNavbar />

        );

        // eslint-disable-next-line no-restricted-globals
        const loginLink = screen.getByRole('link', { name: /Login/i });
        expect(loginLink).toBeInTheDocument();
    });
});