import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LoginPage from '../pages/Login';
import '@testing-library/jest-dom/extend-expect';

describe('Login', () => {
    let usernameInput, passwordInput, submitButton, errorMessage, registerLink;

    /****Prepare ****/
    beforeEach(() => {
        render(
            <MemoryRouter>
                <LoginPage />
            </MemoryRouter>
        );
        usernameInput = screen.getByTestId('username-input');
        passwordInput = screen.getByTestId('password-input');
        submitButton = screen.getByTestId('submit-login-button');
        errorMessage = screen.getByTestId('error-message');
        registerLink = screen.getByTestId('register-link');
    });
    
    
    /***************** Test for rendering of login page *****************/
    test('renders login page', () => {
        const loginForm = screen.getByTestId('login-form');
        expect(loginForm).toBeInTheDocument();
        expect(usernameInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
        expect(errorMessage).toBeInTheDocument();
        expect(registerLink).toBeInTheDocument();
    });


    /***************** Test for initial state of input fields *****************/
    test('should render login form with initial state', () => {
        expect(usernameInput).toHaveValue('');
        expect(passwordInput).toHaveValue('');
        expect(submitButton).toBeDisabled();
        expect(errorMessage).toHaveTextContent('');
        expect(registerLink).toHaveTextContent('Register');
    });


    /***************** Test for input field binding *****************/
    test('should enable submit button when username and password are entered', async () => {
        expect(submitButton).toBeDisabled();

        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        fireEvent.change(passwordInput, { target: { value: 'testpass' } });

        await waitFor(() => {
            expect(usernameInput.value).toBe('testuser');
            expect(passwordInput.value).toBe('testpass');
            expect(submitButton).not.toBeDisabled();
        });

        fireEvent.click(submitButton);
        await waitFor(() => {
            expect(errorMessage).toHaveTextContent('');
        });
    });

    test('should display error message when username is empty', async () => {
        expect(usernameInput).toHaveValue('');
        expect(submitButton).toBeDisabled();

        fireEvent.change(passwordInput, { target: { value: 'testpass' } });

        await waitFor(() => {
            expect(passwordInput.value).toBe('testpass');
            expect(submitButton).toBeDisabled();
        });
    });

    test('should display error message when password is empty', async () => {
        expect(passwordInput).toHaveValue('');
        expect(submitButton).toBeDisabled();

        fireEvent.change(usernameInput, { target: { value: 'testuser' } });

        await waitFor(() => {
            expect(usernameInput.value).toBe('testuser');
            expect(submitButton).toBeDisabled();
        });

    });

    test('should display error message when username and password are empty', async () => {
        expect(usernameInput).toHaveValue('');
        expect(passwordInput).toHaveValue('');
        expect(submitButton).toBeDisabled();

        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(errorMessage).toHaveTextContent('');
        });

    });

});