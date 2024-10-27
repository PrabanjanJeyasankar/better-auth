import { Link, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import { UserContext } from '../../context/userContext'
import { validateLoginInputs } from '../../utils/authenticationFieldsValidation'

import InputFieldComponent from '../../components/InputFieldComponent/InputFieldComponent'
import AppLogo from '../../../src/assets/images/better_auth_favicon.webp'
import handleLoginService from '../../service/handleLoginService'
import loginStyles from './LoginComponent.module.css'
import toast from 'react-hot-toast'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'

function LoginComponent() {
    const { setIsLoggedIn, setUserProfile } = useContext(UserContext)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev)
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setFormData((prev) => ({ ...prev, [name]: value }))
        setErrors((prev) => ({ ...prev, [name]: '' }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setIsLoading(true)
        const { isValid, errors: validationErrors } = validateLoginInputs(
            formData.email,
            formData.password
        )

        if (isValid) {
            try {
                const response = await handleLoginService(formData)
                console.log(response)

                if (response.status === 200 && response.data) {
                    const userProfile = response.data.userProfile
                    setIsLoggedIn(true)
                    setUserProfile(userProfile)
                    localStorage.setItem(
                        'userProfile',
                        JSON.stringify(userProfile)
                    )
                    localStorage.setItem('isLoggedIn', 'true')
                    toast.success('Login successful')
                    navigate('/')
                } else if (response.status === 401) {
                    toast.error('Incorrect Password.')
                } else if (response.status === 404) {
                    toast.error('User not found, please sign up.')
                }
            } catch (error) {
                toast.error('An error occurred during login. Please try again.')
            } finally {
                setIsLoading(false)
            }
        } else {
            setErrors(validationErrors)
            setIsLoading(false)
        }
    }

    return (
        <div className={loginStyles.container}>
            <form
                className={loginStyles.form}
                onSubmit={handleSubmit}
                noValidate>
                <img
                    src={AppLogo}
                    className={loginStyles.app_logo}
                    alt='App Logo'
                />
                <h1 className={loginStyles.app_name}>Better Auth Login</h1>
                <h1 className={loginStyles.title}>Welcome Back</h1>
                <p className={loginStyles.subtitle}>
                    Don&#39;t have an account?
                    <Link to='/signup' className={loginStyles.signup_link}>
                        Sign Up
                    </Link>
                </p>
                <InputFieldComponent
                    id='email'
                    name='email'
                    type='email'
                    value={formData.email}
                    placeholder=' '
                    label='Email'
                    onChange={handleInputChange}
                    error={errors.email}
                    containerClass={loginStyles.inputGroup}
                    inputClass={loginStyles.input}
                    labelClass={loginStyles.label}
                    errorClass={loginStyles.error}
                />
                <div className={loginStyles.password_container}>
                    <InputFieldComponent
                        id='password'
                        name='password'
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        placeholder=' '
                        label='Password'
                        autoComplete='password'
                        onChange={handleInputChange}
                        error={errors.password}
                        containerClass={loginStyles.inputGroup}
                        inputClass={loginStyles.input}
                        labelClass={loginStyles.label}
                        errorClass={loginStyles.error}
                    />
                    <span
                        onClick={togglePasswordVisibility}
                        className={loginStyles.eyeIcon}>
                        {showPassword ? (
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
                                className='lucide lucide-eye'>
                                <path d='M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0' />
                                <circle cx='12' cy='12' r='3' />
                            </svg>
                        ) : (
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
                                className='lucide lucide-eye-off'>
                                <path d='M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49' />
                                <path d='M14.084 14.158a3 3 0 0 1-4.242-4.242' />
                                <path d='M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143' />
                                <path d='m2 2 20 20' />
                            </svg>
                        )}
                    </span>
                </div>
                <Link to='/request-otp' className={loginStyles.forgot_password}>
                    Forgot password?
                </Link>
                <ButtonComponent type='submit' className={loginStyles.loginButton}>
                    {isLoading ? 'Logging in...' : 'Login'}
                </ButtonComponent>
            </form>
        </div>
    )
}

export default LoginComponent
