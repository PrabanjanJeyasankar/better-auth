import axiosInstance from '../utils/axiosInstance'

const googleAuthService = async () => {
    return axiosInstance
        .get('/google-auth/page-request')
        .then((response) => response.data.url)
        .catch((error) => {
            console.error(error)
            console.error(error?.response?.data)
            throw error
        })
}

export default googleAuthService
