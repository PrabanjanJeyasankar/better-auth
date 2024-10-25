const validateField = (field, value, required, minimumLength) => {
    if (required && !value) {
        return `*${field} is required`
    }

    if (minimumLength && value.length < minimumLength) {
        return `*${field} must be at least ${minimumLength} characters.`
    }

    return ''
}

const validateEmail = (email) => {
    if (!email) {
        return '*email is required'
    }

    if (!email.includes('@')) {
        return '*Just @ is missing.'
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    if (!emailPattern.test(email)) {
        return '*Please enter a valid email address.'
    }

    return ''
}

const validateInputs = (inputs, validations) => {
    const errors = {}
    let isValid = true

    for (const [field, value] of Object.entries(inputs)) {
        const error = validateField(
            field,
            value,
            validations[field]?.required,
            validations[field]?.minimumLength
        )

        if (error) {
            errors[field] = error
            isValid = false
        }
    }
    const emailError = validateEmail(inputs.email)
    if (emailError) {
        errors.email = emailError
        isValid = false
    }

    return { isValid, errors }
}

const validateSignupInputs = (name, email, password) => {
    const inputs = { name, email, password }
    const validations = {
        name: { required: true },
        email: { required: true },
        password: { required: true, minimumLength: 6 },
    }
    return validateInputs(inputs, validations)
}

const validateLoginInputs = (email, password) => {
    const inputs = { email, password }
    const validations = {
        email: { required: true },
        password: { required: true, minimumLength: 6 },
    }
    return validateInputs(inputs, validations)
}

export {
    validateField,
    validateSignupInputs,
    validateLoginInputs,
    validateEmail,
}
