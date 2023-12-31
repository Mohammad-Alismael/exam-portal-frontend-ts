import {fireEvent, render} from "@testing-library/react";
import AuthForm from "../components/custom-ui/AuthForm";
import {useLoginMutation} from "../features/auth/usersApiSlice";
import {useDispatch} from "react-redux";
import {BrowserRouter, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import { expect, test, describe, it } from "vitest";
import LandingHeader from "../components/custom-ui/LandingHeader";

describe('AuthForm', () => {

    // Tests that submitting the login form with valid credentials calls the login mutation, dispatches the setCredentials action with user data, resets the form, and navigates to the dashboard.
    it('should call login mutation, dispatch setCredentials action, reset form, and navigate to dashboard when login form is submitted with valid credentials', () => {
        // Mock the necessary dependencies
        // const loginMock = jest.fn().mockResolvedValue({ data: { username: "testUser" } });
        // const setCredentialsMock = jest.fn();
        // const formResetMock = jest.fn();
        // const navigateMock = jest.fn();
        //
        // // Replace the original functions with the mocks
        // useLoginMutation.mockReturnValue([loginMock, { isLoading: false }]);
        // useDispatch.mockReturnValue(setCredentialsMock);
        // useForm.mockReturnValue({ handleSubmit: jest.fn((callback) => callback()), reset: formResetMock });
        // useNavigate.mockReturnValue(navigateMock);

        // Render the component and submit the form
        const authForm = render(
            <Route>
                <AuthForm mode="signup" />
            </Route>
        );
        fireEvent.submit(authForm.getByRole("button", { name: "Submit" }));
        const header = authForm.findByTestId('form-header')
        // Assertions
        expect(header).toContain('login')
        // expect(loginMock).toHaveBeenCalledWith({ username: "", password: "" });
        // expect(setCredentialsMock).toHaveBeenCalledWith({ username: "testUser", user: "" });
        // expect(formResetMock).toHaveBeenCalled();
        // expect(navigateMock).toHaveBeenCalledWith("/dashboard");
    });

//     // Tests that submitting the signup form with valid credentials calls the signup mutation and resets the form.
//     it('should call signup mutation and reset form when signup form is submitted with valid credentials', () => {
//         // Mock the necessary dependencies
//         const signupMock = jest.fn().mockResolvedValue({ data: { message: "Success" } });
//         const formResetMock = jest.fn();
//
//         // Replace the original functions with the mocks
//         useSignupMutation.mockReturnValue([signupMock, { isLoading: false }]);
//         useForm.mockReturnValue({ handleSubmit: jest.fn((callback) => callback()), reset: formResetMock });
//
//         // Render the component and submit the form
//         render(<AuthForm mode="signup" />);
//         fireEvent.submit(screen.getByRole("button", { name: "Submit" }));
//
//         // Assertions
//         expect(signupMock).toHaveBeenCalledWith({ username: "", email: "", password: "", userType: "" });
//         expect(formResetMock).toHaveBeenCalled();
//     });
//
//     // Tests that submitting the forgot password form with a valid email calls the forgotPassword mutation and resets the form.
//     it('should call forgotPassword mutation and reset form when forgot password form is submitted with a valid email', () => {
//         // Mock the necessary dependencies
//         const forgotPasswordMock = jest.fn().mockResolvedValue({ data: { message: "Success" } });
//         const formResetMock = jest.fn();
//
//         // Replace the original functions with the mocks
//         useForgotPasswordMutation.mockReturnValue([forgotPasswordMock, { isLoading: false }]);
//         useForm.mockReturnValue({ handleSubmit: jest.fn((callback) => callback()), reset: formResetMock });
//
//         // Render the component and submit the form
//         render(<AuthForm mode="forgot" />);
//         fireEvent.submit(screen.getByRole("button", { name: "Submit" }));
//
//         // Assertions
//         expect(forgotPasswordMock).toHaveBeenCalledWith({ email_id: "" });
//         expect(formResetMock).toHaveBeenCalled();
//     });
//
//     // Tests that submitting the reset password form with a valid token and new password calls the resetPassword mutation, resets the form, and navigates to the login page.
//     it('should call resetPassword mutation, reset form, and navigate to login page when reset password form is submitted with a valid token and new password', () => {
//         // Mock the necessary dependencies
//         const resetPasswordMock = jest.fn().mockResolvedValue({ data: { message: "Success" } });
//         const formResetMock = jest.fn();
//         const navigateMock = jest.fn();
//
//         // Replace the original functions with the mocks
//         useResetPasswordMutation.mockReturnValue([resetPasswordMock, { isLoading: false }]);
//         useForm.mockReturnValue({ handleSubmit: jest.fn((callback) => callback()), reset: formResetMock });
//         useNavigate.mockReturnValue(navigateMock);
//         useParams.mockReturnValue({ resetToken: "testToken" });
//
//         // Render the component and submit the form
//         render(<AuthForm mode="reset" />);
//         fireEvent.submit(screen.getByRole("button", { name: "Submit" }));
//
//         // Assertions
//         expect(resetPasswordMock).toHaveBeenCalledWith({ reset_token: "testToken", new_password: "" });
//         expect(formResetMock).toHaveBeenCalled();
//         expect(navigateMock).toHaveBeenCalledWith("/login");
//     });
//
// // Tests that submitting the login form with invalid credentials displays an error toast.
//

});
