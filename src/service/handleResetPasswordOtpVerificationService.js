import axiosInstance from '../utils/axiosInstance'

const handlePasswordResetOtpVerificationService = (email, otp) => {
    return axiosInstance
        .post('/user/verify-otp', {
            email,
            otp,
        })
        .then((response) => response)
        .catch((error) => {
            console.error(error)
            return error
        })
}

export default handlePasswordResetOtpVerificationService
