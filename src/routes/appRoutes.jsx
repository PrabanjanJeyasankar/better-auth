/*
|------------------------------------------------------------------------------
| App Routes
|------------------------------------------------------------------------------
|
| This file sets up all the main routes for the application, including routes
| for user authentication and password reset. Each route is structured with
| logical access control to ensure users follow the intended flow, especially
| in the password reset process.
|
*/

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import AuthenticationLayout from '../layouts/AuthenticationLayout/AuthenticationLayout'
import SignupComponent from '../authentication/SignupComponent/SignupComponent'
import LoginComponent from '../authentication/LoginComponent/LoginComponent'
import RequestOtpComponent from '../authentication/PasswordResetFlow/001-RequestOtpComponent/RequestOtpComponent'
import SetNewPasswordComponent from '../authentication/PasswordResetFlow/003-SetNewPasswordComponent/SetupNewPasswordComponent'
import {
    PasswordResetFlowProvider,
    usePasswordResetFlow,
} from '../context/passwordResetFlowContext'
import usePasswordResetGuard from '../hooks/usePasswordResetGaurd'
import { useEffect } from 'react'
import OTPVerificationComponent from '../authentication/PasswordResetFlow/002-OtpVerificationComponent/OTPVerificationComponent'

function AppRoutes() {

    return (
        /*
        |----------------------------------------------------------------------------
        | Password Reset Flow Provider
        |----------------------------------------------------------------------------
        |
        | Wraps the entire Router with `PasswordResetFlowProvider` to track user
        | progress within the password reset steps. Provides each route access to
        | flow state, so steps can be enforced and the user can proceed only in
        | the correct sequence.
        |
        */
        <PasswordResetFlowProvider>
            <Router>
                <Routes>
                    <Route path='/' element={<AuthenticationLayout />}>
                        <Route path='signup' element={<SignupComponent />} />
                        <Route path='login' element={<LoginComponent />} />

                        {/* Password reset step 1: Request OTP */}
                        <Route
                            path='request-otp'
                            element={<RequestOtpWrapper />}
                        />

                        {/* Password reset step 2: Verify OTP, access only after step 1 */}
                        <Route
                            path='verify-otp'
                            element={<OtpVerificationWrapper />}
                        />

                        {/* Password reset step 3: Set new password, access only after step 2 */}
                        <Route
                            path='set-new-password'
                            element={<SetNewPasswordWrapper />}
                        />

                        {/* Default route */}
                        <Route index element={<SignupComponent />} />
                    </Route>
                </Routes>
            </Router>
        </PasswordResetFlowProvider>
    )
}

/*
|------------------------------------------------------------------------------
| Request OTP Step Wrapper
|------------------------------------------------------------------------------
|
| Wrapper around the OTP request component. Once the user successfully requests
| an OTP, it marks this step as completed in the reset flow. This allows the
| user to advance to the OTP verification step.
|
*/
function RequestOtpWrapper() {
    const { advanceStep } = usePasswordResetFlow()
    useEffect(() => {
        advanceStep() // Unlock next step
    }, [])
    return <RequestOtpComponent />
}

/*
|------------------------------------------------------------------------------
| OTP Verification Step Wrapper
|------------------------------------------------------------------------------
|
| Wrapper for the OTP verification component. Uses a guard to check if the user
| has completed the request OTP step. If not, the guard redirects them back to
| request OTP.
|
*/
function OtpVerificationWrapper() {
    usePasswordResetGuard(1) // Ensure user has completed step 1
    const { advanceStep } = usePasswordResetFlow()
    useEffect(() => {
        advanceStep() // Unlock next step
    }, [])
    return <OTPVerificationComponent />
}

/*
|------------------------------------------------------------------------------
| Set New Password Step Wrapper
|------------------------------------------------------------------------------
|
| Wrapper for the Set New Password component. Ensures the user has verified
| their OTP (step 2) before accessing this final step to reset their password.
|
*/
function SetNewPasswordWrapper() {
    usePasswordResetGuard(2) // Ensure user has completed step 2
    return <SetNewPasswordComponent />
}

export default AppRoutes
