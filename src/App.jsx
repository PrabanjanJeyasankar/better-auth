import { Toaster } from 'react-hot-toast'

import { UserProvider } from './context/userContext'
import { PasswordResetProvider } from './context/passwordResetContext'
import AppRoutes from './routes/appRoutes'


function App() {
    return (
        <>
            <UserProvider>
                <PasswordResetProvider>
                    <AppRoutes />
                </PasswordResetProvider>
            </UserProvider>
            <Toaster position='bottom-right' />
        </>
    )
}

export default App
