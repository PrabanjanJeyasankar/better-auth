import axiosInstance from '../utils/axiosInstance'

const handleNewPasswordService = (email, newPassword) => {
    return axiosInstance
        .post('/user/reset-password', {
            email,
            newPassword,
        })
        .then((response) => response)
        .catch((error) => {
            console.error(error)
            return error
        })
}

export default handleNewPasswordService
