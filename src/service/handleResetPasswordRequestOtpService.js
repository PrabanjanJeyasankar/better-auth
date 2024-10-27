import axiosInstance from '../utils/axiosInstance'

const handleResetPasswordRequestOtpService = (email) => {
    return axiosInstance
        .post('/user/request-otp', {
            email,
        })
        .then((response) => response)
        .catch((error) => {
            console.error(error)
            return error
        })
}

export default handleResetPasswordRequestOtpService
