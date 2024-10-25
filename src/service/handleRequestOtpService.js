import axiosInstance from '../utils/axiosInstance'

const handleRequestOtpService = async (email) => {
    try {
        const response = await axiosInstance.post('/user/request-otp', {
            email,
        })
        return response
    } catch (error) {
        return error
    }
}

export default handleRequestOtpService
