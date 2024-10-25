import axiosInstance from '../utils/axiosInstance'

const handleOTPVerificationService = async (email, otp) => {
    try {
        const response = await axiosInstance.post('/user/verify-otp', {
            email,
            otp,
        })
        return response
    } catch (error) {
        return error
    }
}

export default handleOTPVerificationService
