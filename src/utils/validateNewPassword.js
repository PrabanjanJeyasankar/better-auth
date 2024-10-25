import { validateField } from './authenticationFieldsValidation'

const validateNewPassword = (newPassword, confirmPassword) => {
    const errors = {}
    let isValid = true

    const passwordError = validateField('New Password', newPassword, true, 6)
    if (passwordError) {
        errors.newPassword = passwordError
        isValid = false
    }

    const confirmPasswordError = validateField(
        'Confirm Password',
        confirmPassword,
        true,
        6
    )
    if (confirmPasswordError) {
        errors.confirmPassword = confirmPasswordError
        isValid = false
    }

    if (newPassword !== confirmPassword) {
        errors.confirmPassword = '*Passwords do not match.'
        isValid = false
    }

    return { isValid, errors }
}

export default validateNewPassword
