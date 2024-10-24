import { createContext, useContext, useState } from 'react'

const UserContext = createContext()

const UserProvider = ({ children }) => {
    const storedUserProfile = localStorage.getItem('userProfile')
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn')

    const [isLoggedIn, setIsLoggedIn] = useState(storedIsLoggedIn === 'true')
    const [userProfile, setUserProfile] = useState(
        storedUserProfile ? JSON.parse(storedUserProfile) : null
    )

    return (
        <UserContext.Provider
            value={{ isLoggedIn, userProfile, setIsLoggedIn, setUserProfile }}>
            {children}
        </UserContext.Provider>
    )
}

const useUserContext = () => {
    return useContext(UserContext)
}

export { UserContext, UserProvider, useUserContext }
