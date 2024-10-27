import React from 'react'
import InputFieldComponent from '../InputFieldComponent/InputFieldComponent'
import otpInputStyles from './OtpInputComponent.module.css'

function OtpInputComponent({ value, onChange }) {
    if (!Array.isArray(value)) {
        console.error('Value prop should be an array')
        return null
    }

    const handleInputChange = (index, newValue) => {
        if (/^[0-9]?$/.test(newValue)) {
            const newOtp = [...value]
            newOtp[index] = newValue
            onChange(newOtp)

            if (newValue && index < value.length - 1) {
                const nextInput = document.getElementById(`otp-${index + 1}`)
                nextInput.focus()
            }
        }
    }

    const handleKeyDown = (index, e) => {
        // Handle backspace
        if (e.key === 'Backspace' && !value[index]) {
            if (index > 0) {
                const prevInput = document.getElementById(`otp-${index - 1}`)
                prevInput.focus()
            }
        }
    }

    return (
        <div className={otpInputStyles.otpInputContainer}>
            {value.map((digit, index) => (
                <InputFieldComponent
                    key={index}
                    id={`otp-${index}`}
                    name={`otp-${index}`}
                    type='text'
                    value={digit}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    maxLength={1}
                    containerClass={otpInputStyles.inputFieldContainer}
                    inputClass={otpInputStyles.otpInput}
                />
            ))}
        </div>
    )
}

export default OtpInputComponent
