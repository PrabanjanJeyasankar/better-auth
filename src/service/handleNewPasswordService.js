import axiosInstance from '../utils/axiosInstance'

const handleNewPasswordService = async (email, newPassword) => {
    try {
        const response = await axiosInstance.post('/user/reset-password', {
            email,
            newPassword,
        })

        return response
    } catch (error) {
        return error
    }
}

export default handleNewPasswordService
