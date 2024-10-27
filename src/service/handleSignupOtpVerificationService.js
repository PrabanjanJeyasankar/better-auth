import axiosInstance from '../utils/axiosInstance'

const handleSignupOtpVerificationService = (email, otp) => {
    return axiosInstance
        .post('/user/verify-signup-otp', {
            email,
            otp,
        })
        .then((response) => response)
        .catch((error) => {
            console.error(error)
            return error
        })
}

export default handleSignupOtpVerificationService
