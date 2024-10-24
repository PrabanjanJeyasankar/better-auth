import axiosInstance from '../utils/axiosInstance'

const handleSignup = async (formData) => {
    try {
        const response = await axiosInstance.post('/user/signup', formData)
        return response
    } catch (error) {
        console.error('Signup error:', error)
        throw error
    }
}

export default handleSignup
