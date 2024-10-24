import axiosInstance from '../utils/axiosInstance'

const handleGoogleSignupService = async ({ name, email, googleId }) => {
    try {
        const response = await axiosInstance.post(
            '/user/google-signup',
            {
                name,
                email,
                googleId,
            },
            {
                withCredentials: true,
            }
        )
        return response
    } catch (error) {
        console.error('Signup error:', error)
        throw error
    }
}

export default handleGoogleSignupService
