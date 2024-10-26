import axiosInstance from '../utils/axiosInstance'

const handleSignupService = async (formData) => {
    try {
        const response = await axiosInstance.post('/user/signup', formData)
        return response
    } catch (error) {
        return error.response
    }
}

export default handleSignupService
