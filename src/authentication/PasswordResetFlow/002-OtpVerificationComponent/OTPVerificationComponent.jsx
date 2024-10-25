import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePasswordResetContext } from '../../../context/passwordResetContext'

import InputFieldComponent from '../../../components/InputFieldComponent/InputFieldComponent'
import handleOTPVerificationService from '../../../service/handleOTPVerificationService'
import ButtonComponent from '../../../components/ButtonComponent/ButtonComponent'
import otpVerificationStyles from './OTPVerificationComponent.module.css'
import toast from 'react-hot-toast'

function OTPVerificationComponent() {
    const [otp, setOtp] = useState('')
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()
    const { email } = usePasswordResetContext()
    console.log(email)

    const handleInputChange = (event) => {
        setOtp(event.target.value)
        setErrors({})
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setIsLoading(true)

        try {
            const response = await handleOTPVerificationService(email, otp)

            if (response.status === 200) {
                toast.success('OTP verified successfully!')
                navigate('/set-new-password')
            } else if (response.status === 400) {
                toast.error('Invalid OTP. Please try again.')
                setErrors({ otp: 'Invalid OTP' })
            } else if (response.status === 410) {
                toast.error('OTP has expired.')
                setErrors({ otp: 'OTP has expired' })
            }
        } catch (error) {
            toast.error('An error occurred. Please try again later.')
            console.error('OTP verification error:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleBack = () => {
        navigate('/request-otp')
    }

    return (
        <div className={otpVerificationStyles.container}>
            <form
                className={otpVerificationStyles.form}
                onSubmit={handleSubmit}
                noValidate>
                <h1 className={otpVerificationStyles.title}>Verify OTP</h1>
                <p className={otpVerificationStyles.subtitle}>
                    Enter the One-Time Password (OTP) sent to your email.
                </p>
                
                <div className={otpVerificationStyles.inputGroup}>
                    <InputFieldComponent
                        type='text'
                        id='otp'
                        name='otp'
                        value={otp}
                        placeholder=' '
                        label='OTP'
                        onChange={handleInputChange}
                        error={errors.otp}
                        containerClass={otpVerificationStyles.inputGroup}
                        inputClass={otpVerificationStyles.input}
                        labelClass={otpVerificationStyles.label}
                        errorClass={otpVerificationStyles.error}
                    />
                </div>
                <ButtonComponent
                    type='submit'
                    className={otpVerificationStyles.submitButton}
                    disabled={isLoading}>
                    {isLoading ? 'Verifying...' : 'Verify OTP'}
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
