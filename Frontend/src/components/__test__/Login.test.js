
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Login from '../Login';
import '@testing-library/jest-dom/extend-expect';

describe('Login component', () => {
    const handleLoginMock = jest.fn();

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders without crashing', () => {
        const { getByTestId } = render(<Login handleLogin={handleLoginMock} />);
        // eslint-disable-next-line testing-library/prefer-screen-queries
        const loginForm = getByTestId('login-form');
        expect(loginForm).toBeInTheDocument();
    });

    test('calls handleLogin function when form is submitted', () => {
        const { getByTestId } = render(<Login handleLogin={handleLoginMock} />);
        // eslint-disable-next-line testing-library/prefer-screen-queries
        const loginForm = getByTestId('login-form');
        // eslint-disable-next-line testing-library/prefer-screen-queries
        const usernameInput = getByTestId('username-input');
        // eslint-disable-next-line testing-library/prefer-screen-queries
        const passwordInput = getByTestId('password-input');
        // eslint-disable-next-line testing-library/prefer-screen-queries
        const rememberMeCheckbox = getByTestId('remember-me-checkbox');
        // eslint-disable-next-line testing-library/prefer-screen-queries
        const submitButton = getByTestId('submit-button');

        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
        fireEvent.click(rememberMeCheckbox);
        fireEvent.click(submitButton);

        expect(handleLoginMock).toHaveBeenCalledTimes(1);
        expect(handleLoginMock).toHaveBeenCalledWith(expect.any(Object));
    });

    test('displays error message when provided', () => {
        const errorMessage = 'Invalid username or password';
        const { getByText } = render(<Login handleLogin={handleLoginMock} errorMessage={errorMessage} />);
        // eslint-disable-next-line testing-library/prefer-screen-queries
        const errorText = getByText(errorMessage);
        expect(errorText).toBeInTheDocument();
    });
});