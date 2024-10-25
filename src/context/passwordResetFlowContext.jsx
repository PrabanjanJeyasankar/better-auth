import { createContext, useContext, useState } from 'react'

const PasswordResetFlowContext = createContext()

const PasswordResetFlowProvider = ({ children }) => {
    const [currentStep, setCurrentStep] = useState(0)

    const advanceStep = () => setCurrentStep((prevStep) => prevStep + 1)
    const resetFlow = () => setCurrentStep(0)

    return (
        <PasswordResetFlowContext.Provider
            value={{ currentStep, advanceStep, resetFlow }}>
            {children}
        </PasswordResetFlowContext.Provider>
    )
}

const usePasswordResetFlow = () => {
    return useContext(PasswordResetFlowContext)
}

export {
    PasswordResetFlowContext,
    PasswordResetFlowProvider,
    usePasswordResetFlow,
}
