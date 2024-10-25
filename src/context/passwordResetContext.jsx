import { createContext, useContext, useState } from 'react'

const PasswordResetContext = createContext()

const PasswordResetProvider = ({ children }) => {
    const [email, setEmail] = useState('')
    const [newUserPassword, setNewUserPassword] = useState('')
    const [currentPassword, setCurrentPassword] = useState('')

    return (
        <PasswordResetContext.Provider
            value={{
                email,
                setEmail,
                newUserPassword,
                setNewUserPassword,
                currentPassword,
                setCurrentPassword,
            }}>
            {children}
        </PasswordResetContext.Provider>
    )
}

const usePasswordResetContext = () => {
    return useContext(PasswordResetContext)
}

export { PasswordResetContext, PasswordResetProvider, usePasswordResetContext }
