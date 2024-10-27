import axiosInstance from '../utils/axiosInstance'

const handleSignupRequestOtpService = (formData) => {
    return axiosInstance
        .post('/user/request-signup-otp', {
            name: formData.name,
            email: formData.email,
            password: formData.password,
        })
        .then((response) => response)
        .catch((error) => {
            console.error(error)
            return error
        })
}

export default handleSignupRequestOtpService
