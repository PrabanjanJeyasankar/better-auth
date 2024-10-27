import { useState, useContext } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'

import { UserContext } from '../../../context/userContext'

import handleSignupOtpVerificationService from '../../../service/handleSignupOtpVerificationService'
import handleResetPasswordOtpVerificationService from '../../../service/handleResetPasswordOtpVerificationService.js'

import ButtonComponent from '../../../components/ButtonComponent/ButtonComponent'
import SpinnerLoaderComponent from '../../../components/SpinnerLoaderComponent/SpinnerLoaderComponent'

import otpVerificationStyles from './OTPVerificationComponent.module.css'
import toast from 'react-hot-toast'
import OtpInputComponent from '../../../components/OtpInputComponent/OtpInputComponent.jsx'

function OTPVerificationComponent() {
    const { setIsLoggedIn, setUserProfile } = useContext(UserContext)
    const [otp, setOtp] = useState(Array(6).fill(''))
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const location = useLocation()
    const { isSignup, email } = location.state || {}
    const navigate = useNavigate()

    const handleOtpChange = (newOtp) => {
        setOtp(newOtp)
        setErrors({})
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setIsLoading(true)

        if (otp.some((digit) => digit === '')) {
            setErrors({ otp: 'Please fill all OTP fields.' })
            setIsLoading(false)
            return
        }

        const otpString = otp.join('')

        try {
            let response
            console.log(isSignup)

            if (isSignup) {
                response = await handleSignupOtpVerificationService(
                    email,
                    otpString
                )
            } else {
                response = await handleResetPasswordOtpVerificationService(
                    email,
                    otpString
                )
            }

            if (response.status === 201 && isSignup) {
                console.log(response.status)
                const userProfile = response.data.userProfile
                setIsLoggedIn(true)
                setUserProfile(userProfile)
                localStorage.setItem('userProfile', JSON.stringify(userProfile))
                localStorage.setItem('isLoggedIn', 'true')

                toast.success('OTP verified successfully!')
                navigate(isSignup ? '/' : '/set-new-password')
            } else if (response.status === 200 && !isSignup) {
                toast.success('OTP verified successfully!')
                navigate(isSignup ? '/' : '/set-new-password')
            } else if (response.status === 400) {
                toast.error('Invalid OTP')
            } else if (response.status === 400) {
                toast.error('User not found')
            } else if (response.status === 410) {
                toast.error('OTP has expired.')
            }
        } catch (error) {
            toast.error('An error occurred. Please try again later.')
            console.error('OTP verification error:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleBack = () => {
        navigate(isSignup ? '/signup' : '/request-otp')
    }

    return (
        <div className={otpVerificationStyles.container}>
            <form
                className={otpVerificationStyles.form}
                onSubmit={handleSubmit}
                noValidate>
                <h1 className={otpVerificationStyles.title}>Verify OTP</h1>
                <p className={otpVerificationStyles.subtitle}>
                    Enter the OTP sent to
                    <span className={otpVerificationStyles.otp_sent_email}>
                        {' '}
                        {email}
                    </span>
                    .
                </p>
                <p className={otpVerificationStyles.change_mail_container}>
                    Wrong mail id?{' '}
                    <Link
                        to={isSignup ? '/signup' : '/request-otp'}
                        className={otpVerificationStyles.change_mail}>
                        Change mail
                    </Link>
                </p>
                <div className={otpVerificationStyles.inputGroup}>
                    <OtpInputComponent value={otp} onChange={handleOtpChange} />{' '}
                </div>
                {errors.otp && (
                    <p className={otpVerificationStyles.error_message}>
                        {errors.otp}
                    </p>
                )}
                <ButtonComponent
                    type='submit'
                    className={otpVerificationStyles.submitButton}
                    disabled={isLoading}>
                    {isLoading ? <SpinnerLoaderComponent /> : null}
                    <span
                        className={
                            otpVerificationStyles.verify_button_state_text
                        }>
                        {isLoading ? 'Verifying...' : 'Verify OTP'}
                    </span>
                </ButtonComponent>
                <ButtonComponent
                    className={otpVerificationStyles.back_button}
                    onClick={handleBack}>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        className='lucide lucide-chevron-left'>
                        <path d='m15 18-6-6 6-6' />
                    </svg>
                    <span>Back</span>
                </ButtonComponent>
            </form>
        </div>
    )
}

export default OTPVerificationComponent
