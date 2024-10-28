import { useNavigate } from 'react-router-dom'
import { useUserContext } from '../../context/userContext'
import handleLogoutService from '../../service/handleLogoutService'
import ButtonComponent from '../ButtonComponent/ButtonComponent'
import heroStyles from './HeroComponent.module.css'
import { useEffect, useState } from 'react'
import useGoogleAuthVerification from '../../hooks/useGoogleAuthVerification'

function HeroComponent() {
    const navigate = useNavigate()
    const { isLoggedIn, userProfile, setIsLoggedIn, setUserProfile } =
        useUserContext()
    const [isGoogleAuthVerification, setIsGoogleAuthVerification] =
        useState(false)
    const [userName, setUserName] = useState(userProfile?.name)

    const handleLogout = async () => {
        try {
            await handleLogoutService(setIsLoggedIn, setUserProfile)
            setIsLoggedIn(false)
            setUserProfile(null)
            setUserName(null)
            setIsGoogleAuthVerification(false)
            navigate('/')
        } catch (error) {
            console.error('Logout error:', error)
        }
    }

    useEffect(() => {
        const verifyGoogleAuth = async () => {
            try {
                const response = await useGoogleAuthVerification()
                if (response.status === 200) {
                    setIsGoogleAuthVerification(true)
                    setUserName(response.data.userData?.name)
                }
            } catch (error) {
                console.error('Error verifying Google auth:', error)
            }
        }

        verifyGoogleAuth()
    }, [])

    const isAuthenticated = isLoggedIn || isGoogleAuthVerification

    return (
        <div className={heroStyles.hero}>
            {isAuthenticated && userName ? (
                <h1 className={heroStyles.user_title}>
                    {`Hey, ${userName} \uD83D\uDC4B!`}
                </h1>
            ) : null}
            <h1 className={heroStyles.app_title}>Welcome to Better Auth</h1>
            <p className={heroStyles.subtitle}>
                Seamless Authentication for Modern Applications
            </p>
            <div className={heroStyles.buttonContainer}>
                {isAuthenticated ? (
                    <ButtonComponent
                        className={heroStyles.logout_button}
                        onClick={handleLogout}>
                        Logout
                    </ButtonComponent>
                ) : (
                    <>
                        <ButtonComponent
                            className={heroStyles.login_button}
                            onClick={() => navigate('/login')}>
                            Login
                        </ButtonComponent>
                        <ButtonComponent
                            className={heroStyles.signup_button}
                            onClick={() => navigate('/signup')}>
                            Sign Up
                        </ButtonComponent>
                    </>
                )}
            </div>
        </div>
    )
}

export default HeroComponent
