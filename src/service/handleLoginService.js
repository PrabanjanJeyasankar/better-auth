import axiosInstance from '../utils/axiosInstance'

const handleLoginService = async (formData) => {
    try {
        const response = await axiosInstance.post('/user/login', formData)
        return response
    } catch (error) {
        return error
    }
}

export default handleLoginService
