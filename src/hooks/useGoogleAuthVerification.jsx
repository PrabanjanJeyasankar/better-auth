import axiosInstance from '../utils/axiosInstance'

const useGoogleAuthVerification = () => {
    return axiosInstance
        .get('/google-auth/verify')
        .then((response) => {
            console.log('Google Auth Response:', response)
            return response
        })
        .catch((error) => {
            console.error('Error during Google Auth Verification:', error)
            throw error
        })
}

export default useGoogleAuthVerification
