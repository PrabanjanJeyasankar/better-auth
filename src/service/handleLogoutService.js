import axiosInstance from "../utils/axiosInstance"

const handleLogoutService = (setIsLoggedIn, setUserProfile) => {
    axiosInstance
        .post('/user/logout')
        .then(() => {
            setIsLoggedIn(false)
            setUserProfile(null)
            localStorage.removeItem('userProfile')
            localStorage.removeItem('isLoggedIn')
        })
        .catch((error) => {
            console.error('Logout error:', error)
        })
}

export default handleLogoutService
