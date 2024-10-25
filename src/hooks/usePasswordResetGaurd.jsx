import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePasswordResetFlow } from '../context/passwordResetFlowContext'

const usePasswordResetGuard = (requiredStep) => {
    const { currentStep } = usePasswordResetFlow()
    const navigate = useNavigate()

    useEffect(() => {
        if (currentStep < requiredStep) {
            navigate('/request-otp')
        }
    }, [currentStep, requiredStep, navigate])
}

export default usePasswordResetGuard
