import { UserProvider } from './context/userContext'
import AppRoutes from './routes/appRoutes'
import { Toaster } from 'react-hot-toast'

function App() {
    return (
        <>
            <UserProvider>
                <AppRoutes />
            </UserProvider>
            <Toaster position='bottom-right' />
        </>
    )
}

export default App
