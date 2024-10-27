import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import HeroComponent from '../components/HeroComponent/HeroComponent'
import AuthenticationLayout from '../layouts/AuthenticationLayout/AuthenticationLayout'
import SignupComponent from '../authentication/SignupComponent/SignupComponent'
import LoginComponent from '../authentication/LoginComponent/LoginComponent'
import RequestOtpComponent from '../authentication/PasswordResetFlow/001-RequestOtpComponent/RequestOtpComponent'
import OTPVerificationComponent from '../authentication/PasswordResetFlow/002-OtpVerificationComponent/OTPVerificationComponent'
import SetupNewPasswordComponent from '../authentication/PasswordResetFlow/003-SetNewPasswordComponent/SetNewPasswordComponent'

function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<HeroComponent />} />
                <Route path='/' element={<AuthenticationLayout />}>
                    <Route path='signup' element={<SignupComponent />} />
                    <Route path='login' element={<LoginComponent />} />
                    <Route
                        path='request-otp'
                        element={<RequestOtpComponent />}
                    />
                    <Route
                        path='verify-otp'
                        element={<OTPVerificationComponent />}
                    />
                    <Route
                        path='set-new-password'
                        element={<SetupNewPasswordComponent />}
                    />
                </Route>
            </Routes>
        </Router>
    )
}

export default AppRoutes
