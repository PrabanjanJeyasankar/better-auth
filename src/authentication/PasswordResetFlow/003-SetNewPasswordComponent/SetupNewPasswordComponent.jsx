import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePasswordResetContext } from '../../../context/passwordResetContext'

import InputFieldComponent from '../../../components/InputFieldComponent/InputFieldComponent'
import ButtonComponent from '../../../components/ButtonComponent/ButtonComponent'
import handleNewPasswordService from '../../../service/handleNewPasswordService'
import setupNewPasswordStyles from './SetupNewPasswordComponent.module.css'
import validateNewPassword from '../../../utils/validateNewPassword'
import toast from 'react-hot-toast'

function SetupNewPasswordComponent() {
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const { email } = usePasswordResetContext()
    // console.log(email)

    const navigate = useNavigate()

    const handleInputChange = (event) => {
        const { name, value } = event.target
        if (name === 'newPassword') {
            setNewPassword(value)
        } else {
            setConfirmPassword(value)
        }
        setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setIsLoading(true)

        const { isValid, errors: validationErrors } = validateNewPassword(
            newPassword,
            confirmPassword
        )
        if (isValid) {
            try {
                const response = await handleNewPasswordService(
                    email,
                    newPassword
                )
                if (response.status === 200) {
                    toast.success('Password updated successfully!')
                    navigate('/login')
                } else if (response.status === 400) {
                    toast.error(
                        'New password cannot be the same as the old password'
                    )
                } else if (response.status === 404) {
                    toast.error('User not found.')
                } else {
                    toast.error('Unexpected error occurred.')
                }
            } catch (error) {
                if (error.response && error.response.status === 500) {
                    toast.error('Server error. Please try again.')
                } else {
                    toast.error('Network error. Please try again.')
                }
            } finally {
                setIsLoading(false)
            }
        } else {
            setErrors(validationErrors)
            setIsLoading(false)
        }
    }

    const handleBack = () => {
        navigate('/verify-otp')
    }

    return (
        <div className={setupNewPasswordStyles.container}>
            <form
                className={setupNewPasswordStyles.form}
                onSubmit={handleSubmit}
                noValidate>
                <h1 className={setupNewPasswordStyles.title}>
                    Set New Password
                </h1>
                <p className={setupNewPasswordStyles.subtitle}>
                    Make sure your password is memorable and secure.
                </p>
                <div className={setupNewPasswordStyles.input_group}>
                    <InputFieldComponent
                        type='password'
                        id='newPassword'
                        name='newPassword'
                        value={newPassword}
                        placeholder=' '
                        label='New Password'
                        onChange={handleInputChange}
                        error={errors.newPassword}
                        containerClass={setupNewPasswordStyles.input_group}
                        inputClass={setupNewPasswordStyles.input}
                        labelClass={setupNewPasswordStyles.label}
                        errorClass={setupNewPasswordStyles.error}
                    />
                </div>
                <div className={setupNewPasswordStyles.input_group}>
                    <InputFieldComponent
                        type='password'
                        id='confirmPassword'
                        name='confirmPassword'
                        value={confirmPassword}
                        placeholder=' '
                        label='Confirm Password'
                        onChange={handleInputChange}
                        error={errors.confirmPassword}
                        containerClass={setupNewPasswordStyles.input_group}
                        inputClass={setupNewPasswordStyles.input}
                        labelClass={setupNewPasswordStyles.label}
                        errorClass={setupNewPasswordStyles.error}
                    />
                </div>
                <ButtonComponent
                    type='submit'
                    className={setupNewPasswordStyles.submitButton}
                    disabled={isLoading}>
                    {isLoading ? 'Updating...' : 'Update Password'}
                </ButtonComponent>
                <ButtonComponent
                    className={setupNewPasswordStyles.back_button}
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

export default SetupNewPasswordComponent
