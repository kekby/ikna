import { useState } from 'react'
import { AuthProvider } from './app/providers/AuthProvider'
import { useAuth } from './app/providers/useAuth'
import { DashboardPage } from './pages/DashboardPage/DashboardPage'
import { LoginPage } from './pages/LoginPage/LoginPage'
import { RegisterPage } from './pages/RegisterPage/RegisterPage'

type AuthScreen = 'login' | 'register'

const AppContent = () => {
  const { user } = useAuth()
  const [authScreen, setAuthScreen] = useState<AuthScreen>('login')

  if (user) {
    return <DashboardPage />
  }

  return authScreen === 'login' ? (
    <LoginPage onRegisterClick={() => setAuthScreen('register')} />
  ) : (
    <RegisterPage onLoginClick={() => setAuthScreen('login')} />
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
