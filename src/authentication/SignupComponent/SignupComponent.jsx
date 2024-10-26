import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../context/userContext.jsx'
import { validateSignupInputs } from '../../utils/authenticationFieldsValidation'

import InputFieldComponent from '../../components/InputFieldComponent/InputFieldComponent.jsx'
import handleSignupService from '../../service/handleSignupService.js'
import AppLogo from '../../../src/assets/images/better_auth_favicon.webp'
import PasswordStrengthBar from 'react-password-strength-bar'
import signupStyles from './SignupComponent.module.css'
import toast from 'react-hot-toast'

function SignupComponent() {
    const { setIsLoggedIn, setUserProfile } = useContext(UserContext)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    })
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setFormData((prev) => ({ ...prev, [name]: value }))
        setErrors((prev) => ({ ...prev, [name]: '' }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setIsLoading(true)

        const { isValid, errors: validationErrors } = validateSignupInputs(
            formData.name,
            formData.email,
            formData.password
        )

        if (isValid) {
            try {
                const response = await handleSignupService(formData)
                if (response.status === 201) {
                    setIsLoggedIn(true)
                    setUserProfile(response.data.userProfile)
                    localStorage.setItem(
                        'userProfile',
                        JSON.stringify(response.data.userProfile)
                    )
                    localStorage.setItem('isLoggedIn', 'true')

                    setFormData({ name: '', email: '', password: '' })
                    setErrors({})
                    toast.success('Sign-up successful')
                }
            } catch (error) {
                if (error.response && error.response.status === 409) {
                    setErrors({ email: 'User already exists' })
                    toast.error(
                        'User already registered, please login to continue.'
                    )
                } else {
                    console.error('Signup error:', error)
                    toast.error('Something went wrong. Please try again.')
                }
            } finally {
                setIsLoading(false)
            }
        } else {
            setErrors(validationErrors)
            setIsLoading(false)
        }
    }

    return (
        <div className={signupStyles.container}>
            <form
                className={signupStyles.form}
                onSubmit={handleSubmit}
                noValidate>
                <img
                    src={AppLogo}
                    className={signupStyles.app_logo}
                    alt='Better Auth Logo'
                />
                <h1 className={signupStyles.app_name}>
                    Create a Better Auth Account
                </h1>
                <h1 className={signupStyles.title}>Create account</h1>
                <p className={signupStyles.subtitle}>
                    Already have an account?
                    <Link to='/login' className={signupStyles.login_link}>
                        Login
                    </Link>
                </p>

                <InputFieldComponent
                    id='name'
                    name='name'
                    type='text'
                    value={formData.name}
                    placeholder=' '
                    label='Name'
                    onChange={handleInputChange}
                    error={errors.name}
                    containerClass={signupStyles.inputGroup}
                    inputClass={signupStyles.input}
                    labelClass={signupStyles.label}
                    errorClass={signupStyles.error}
                />

                <InputFieldComponent
                    id='email'
                    name='email'
                    type='email'
                    value={formData.email}
                    placeholder=' '
                    label='Email'
                    onChange={handleInputChange}
                    error={errors.email}
                    containerClass={signupStyles.inputGroup}
                    inputClass={signupStyles.input}
                    labelClass={signupStyles.label}
                    errorClass={signupStyles.error}
                />

                <InputFieldComponent
                    id='password'
                    name='password'
                    type='password'
                    value={formData.password}
                    placeholder=' '
                    label='Password'
                    onChange={handleInputChange}
                    error={errors.password}
                    containerClass={signupStyles.inputGroup}
                    inputClass={signupStyles.input}
                    labelClass={signupStyles.label}
                    errorClass={signupStyles.error}
                />

                {formData.password && (
                    <PasswordStrengthBar
                        password={formData.password}
                        className={signupStyles.strengthBar}
                    />
                )}

                <button
                    type='submit'
                    className={signupStyles.createButton}
                    disabled={isLoading}>
                    {isLoading ? 'Creating...' : 'Create account'}
                </button>
                {/* <button type='button' className={signupStyles.googleButton}>
                    <svg
                        className={signupStyles.googleIcon}
                        viewBox='0 0 24 24'>
                        <path
                            d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
                            fill='#4285F4'
                        />
                        <path
                            d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                            fill='#34A853'
                        />
                        <path
                            d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
                            fill='#FBBC05'
                        />
                        <path
                            d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
                            fill='#EA4335'
                        />
                    </svg>
                    Sign up with Google
                </button> */}
            </form>
        </div>
    )
}

export default SignupComponent
