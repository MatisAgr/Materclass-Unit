import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import RegisterPage from '../pages/Register';
import '@testing-library/jest-dom/extend-expect';

describe('Register', () => {
    let usernameInput, emailInput, passwordInput, confirmPasswordInput, birthDateInput, submitButton, errorMessage, loginLink;

    /****Prepare ****/
    beforeEach(() => {
        render(
            <MemoryRouter>
                <RegisterPage />
            </MemoryRouter>
        );
        usernameInput = screen.getByTestId('username-input');
        emailInput = screen.getByTestId('email-input');
        passwordInput = screen.getByTestId('password-input');
        confirmPasswordInput = screen.getByTestId('password-input-check');
        birthDateInput = screen.getByTestId('birth-input');
        submitButton = screen.getByTestId('sumbit-register-button');
        errorMessage = screen.getByTestId('error-message');
        loginLink = screen.getByTestId('login-link');
    });


    /***************** Test for rendering of register page *****************/
    test('renders register page', () => {
        const registerForm = screen.getByTestId('login-form');
        expect(registerForm).toBeInTheDocument();
        expect(usernameInput).toBeInTheDocument();
        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(confirmPasswordInput).toBeInTheDocument();
        expect(birthDateInput).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
        expect(errorMessage).toBeInTheDocument();
        expect(loginLink).toBeInTheDocument();
    });

    /***************** Test for initial state of input fields *****************/
    test('should render register form with initial state', () => {
        expect(usernameInput).toHaveValue('');
        expect(emailInput).toHaveValue('');
        expect(passwordInput).toHaveValue('');
        expect(confirmPasswordInput).toHaveValue('');
        expect(birthDateInput).toHaveValue('');
        expect(submitButton).toBeDisabled();
        expect(errorMessage).toHaveTextContent('');
        expect(loginLink).toHaveTextContent('Login');
    });


    /***************** Test for input field binding *****************/
    test('should enable submit button when all fields are entered', async () => {
        expect(submitButton).toBeDisabled();
        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
        fireEvent.change(passwordInput, { target: { value: 'testpass' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'testpass' } });
        fireEvent.change(birthDateInput, { target: { value: '2021-01-01' } });

        await waitFor(() => {
            expect(usernameInput.value).toBe('testuser');
            expect(emailInput.value).toBe('test@test.com');
            expect(passwordInput.value).toBe('testpass');
            expect(confirmPasswordInput.value).toBe('testpass');
            expect(birthDateInput.value).toBe('2021-01-01');
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

        fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
        fireEvent.change(passwordInput, { target: { value: 'testpass' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'testpass' } });
        fireEvent.change(birthDateInput, { target: { value: '2021-01-01' } });

        await waitFor(() => {
            expect(emailInput.value).toBe('test@test.com');
            expect(passwordInput.value).toBe('testpass');
            expect(confirmPasswordInput.value).toBe('testpass');
            expect(birthDateInput.value).toBe('2021-01-01');
            expect(submitButton).toBeDisabled();
        });
        
    });

    test('should display error message when email is empty', async () => {
        expect(emailInput).toHaveValue('');
        expect(submitButton).toBeDisabled();

        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        fireEvent.change(passwordInput, { target: { value: 'testpass' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'testpass' } });
        fireEvent.change(birthDateInput, { target: { value: '2021-01-01' } });

        await waitFor(() => {
            expect(usernameInput.value).toBe('testuser');
            expect(passwordInput.value).toBe('testpass');
            expect(confirmPasswordInput.value).toBe('testpass');
            expect(birthDateInput.value).toBe('2021-01-01');
            expect(submitButton).toBeDisabled();
        });
    });

    test('should display error message when password is empty', async () => {
        expect(passwordInput).toHaveValue('');
        expect(submitButton).toBeDisabled();

        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'testpass' } });
        fireEvent.change(birthDateInput, { target: { value: '2021-01-01' } });

        await waitFor(() => {
            expect(usernameInput.value).toBe('testuser');
            expect(emailInput.value).toBe('test@test.com');
            expect(confirmPasswordInput.value).toBe('testpass');
            expect(birthDateInput.value).toBe('2021-01-01');
            expect(submitButton).toBeDisabled();
        });

    });

    test('should display error message when confirm password is empty', async () => {
        expect(confirmPasswordInput).toHaveValue('');
        expect(submitButton).toBeDisabled();

        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
        fireEvent.change(passwordInput, { target: { value: 'testpass' } });
        fireEvent.change(birthDateInput, { target: { value: '2021-01-01' } });

        await waitFor(() => {
            expect(usernameInput.value).toBe('testuser');
            expect(emailInput.value).toBe('test@test.com');
            expect(passwordInput.value).toBe('testpass');
            expect(birthDateInput.value).toBe('2021-01-01');
            expect(submitButton).toBeDisabled();
        });

    });

    test('should display error message when birth date is empty', async () => {
        expect(birthDateInput).toHaveValue('');
        expect(submitButton).toBeDisabled();

        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
        fireEvent.change(passwordInput, { target: { value: 'testpass' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'testpass' } });

        await waitFor(() => {
            expect(usernameInput.value).toBe('testuser');
            expect(emailInput.value).toBe('test@test.com');
            expect(passwordInput.value).toBe('testpass');
            expect(confirmPasswordInput.value).toBe('testpass');
            expect(submitButton).toBeDisabled();
        });

    });
    

});