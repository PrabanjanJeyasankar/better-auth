import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import AuthenticationLayout from '../layouts/AuthenticationLayout/AuthenticationLayout'
import SignupComponent from '../authentication/SignupComponent/SignupComponent'
import LoginComponent from '../authentication/LoginComponent/LoginComponent'
function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<AuthenticationLayout />}>
                    <Route path='signup' element={<SignupComponent />} />
                    <Route path='login' element={<LoginComponent />} />
                    <Route index element={<SignupComponent />} />
                </Route>
            </Routes>
        </Router>
    )
}


export default AppRoutes