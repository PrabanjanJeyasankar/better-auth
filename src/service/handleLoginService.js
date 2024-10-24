import axiosInstance from '../utils/axiosInstance'

const handleLoginService = async (formData) => {
    try {
        const response = await axiosInstance.post('/user/login', formData)
        return response
    } catch (error) {
        console.error('Signup error:', error)
        throw error
    }
}

export default handleLoginService
