import { Link } from 'react-router-dom'
import { useContext, useState } from 'react'
import { validateLoginInputs } from '../../utils/authenticationFieldsValidation'
import { UserContext } from '../../context/userContext'

import loginStyles from './LoginComponent.module.css'
import AppLogo from '../../../src/assets/images/better_auth_favicon.webp'
import handleLoginService from '../../service/handleLoginService'
import toast from 'react-hot-toast'

function LoginComponent() {
    const { setIsLoggedIn, setUserProfile } = useContext(UserContext)
    const [formData, setFormData] = useState({
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
        const { isValid, errors: validationErrors } = validateLoginInputs(
            formData.email,
            formData.password
        )

        if (isValid) {
            try {
                const response = await handleLoginService(formData)
                console.log(response)

                if (response.status === 200) {
                    const userProfile = response.data.userProfile
                    setIsLoggedIn(true)
                    setUserProfile(userProfile)
                    localStorage.setItem(
                        'userProfile',
                        JSON.stringify(userProfile)
                    )
                    localStorage.setItem('isLoggedIn', 'true')
                    toast.success('Login successful')
                }
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    toast.error('Incorrect Password.')
                } else if (error.response && error.response.status === 404) {
                    toast.error('User not found, please sign up.')
                } else {
                    console.error('Error during login:', error)
                    toast.error('An error occurred during login. Please try again.')
                }
            } finally {
                setIsLoading(false)
            }
        } else {
            setErrors(validationErrors)
            setIsLoading(false)
        }
    }

    const inputFields = [
        {
            id: 'email',
            name: 'email',
            type: 'email',
            placeholder: ' ',
            label: 'Email',
        },
        {
            id: 'password',
            name: 'password',
            type: 'password',
            placeholder: ' ',
            label: 'Password',
        },
    ]

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
                {inputFields.map(({ id, name, type, placeholder, label }) => (
                    <div key={id} className={loginStyles.inputGroup}>
                        <input
                            type={type}
                            id={id}
                            name={name}
                            className={loginStyles.input}
                            value={formData[name]}
                            placeholder={placeholder}
                            onChange={handleInputChange}
                        />
                        <label htmlFor={id} className={loginStyles.label}>
                            {label}
                        </label>
                        {errors[name] && (
                            <p className={loginStyles.error}>{errors[name]}</p>
                        )}
                    </div>
                ))}
                <p className={loginStyles.forgot_password}>Forgot password?</p>
                <button type='submit' className={loginStyles.loginButton}>
                    {isLoading ? 'Logging in...' : ' Login'}
                </button>
                {/* <button type='button' className={loginStyles.googleButton}>
                    Login with Google
                </button> */}
            </form>
        </div>
    )
}

export default LoginComponent
