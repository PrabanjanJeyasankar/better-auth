import { PasswordResetProvider } from './context/passwordResetContext'
import { UserProvider } from './context/userContext'
import AppRoutes from './routes/appRoutes'
import { Toaster } from 'react-hot-toast'

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
