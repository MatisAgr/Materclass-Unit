import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import RegisterPage from '../pages/Register';
import fetchMock from 'jest-fetch-mock';
import '@testing-library/jest-dom/extend-expect';
fetchMock.enableMocks();

describe('Register', () => {
    let registerForm, usernameInput, emailInput, passwordInput, confirmPasswordInput, birthDateInput, submitButton, errorMessage, loginLink;

    /****Prepare ****/
    beforeEach(() => {
        render(
            <MemoryRouter>
                <RegisterPage />
            </MemoryRouter>
        );
        registerForm = screen.getByTestId('register-form');
        usernameInput = screen.getByTestId('username-input');
        emailInput = screen.getByTestId('email-input');
        passwordInput = screen.getByTestId('password-input');
        confirmPasswordInput = screen.getByTestId('password-input-check');
        birthDateInput = screen.getByTestId('birth-input');
        submitButton = screen.getByTestId('submit-register-button');
        errorMessage = screen.getByTestId('error-message');
        loginLink = screen.getByTestId('login-link');
    });


    /***************** Test for rendering of register page *****************/
    test('renders register page', () => {
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

    /******************* Test for fetch *****************/

    test('should register a new user and find it in the database', async () => {
        const randomUser = {
            username: 'User' + Math.floor(Math.random() * 1000),
            email: 'user' + Math.floor(Math.random() * 1000) + '@test.com',
            password: 'Password' + Math.floor(Math.random() * 1000),
            birthDate: new Date().toISOString().split('T')[0]
        };

        // Simulate the registration process
        fireEvent.change(usernameInput, { target: { value: randomUser.username } });
        fireEvent.change(emailInput, { target: { value: randomUser.email } });
        fireEvent.change(passwordInput, { target: { value: randomUser.password } });
        fireEvent.change(confirmPasswordInput, { target: { value: randomUser.password } });
        fireEvent.change(birthDateInput, { target: { value: randomUser.birthDate }});

        await waitFor(() => {
            expect(usernameInput.value).toBe(randomUser.username);
            expect(emailInput.value).toBe(randomUser.email);
            expect(passwordInput.value).toBe(randomUser.password);
            expect(confirmPasswordInput.value).toBe(randomUser.password);
            expect(birthDateInput.value).toBe(randomUser.birthDate);
            expect(submitButton).not.toBeDisabled();
        });

        fetchMock.mockResponseOnce(JSON.stringify({ message: 'User registered' }));

        await new Promise(resolve => setTimeout(resolve, 0));   

        expect(fetch).toHaveBeenCalledWith('http://localhost/Materclass-Unit/backend/api/user/create', expect.objectContaining({
            method: 'POST',
            body: expect.any(FormData) 
        }));
    
        // Check the fetch response
        const response = fetch.mock.results[0].value;
        expect(response.status).toBe(200);
        const responseBody = await response.json();
        expect(responseBody).toEqual({ message: 'User registered' });
    
    });

});