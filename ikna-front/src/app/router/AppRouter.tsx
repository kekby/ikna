import type { ReactNode } from 'react'
import {
  Navigate,
  Route,
  Routes,
  useNavigate,
  useParams,
} from 'react-router-dom'
import { useAuth } from '../providers/useAuth'
import { DashboardPage } from '../../pages/DashboardPage/DashboardPage'
import { LoginPage } from '../../pages/LoginPage/LoginPage'
import { RegisterPage } from '../../pages/RegisterPage/RegisterPage'
import { ReviewPage } from '../../pages/ReviewPage/ReviewPage'

const DEFAULT_DECK_ID = 'js-basics'

const PublicOnlyRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth()

  return user ? <Navigate replace to="/dashboard" /> : children
}

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth()

  return user ? children : <Navigate replace to="/login" />
}

const RootRedirect = () => {
  const { user } = useAuth()

  return <Navigate replace to={user ? '/dashboard' : '/login'} />
}

const LoginRoute = () => {
  const navigate = useNavigate()

  return (
    <PublicOnlyRoute>
      <LoginPage onRegisterClick={() => navigate('/register')} />
    </PublicOnlyRoute>
  )
}

const RegisterRoute = () => {
  const navigate = useNavigate()

  return (
    <PublicOnlyRoute>
      <RegisterPage onLoginClick={() => navigate('/login')} />
    </PublicOnlyRoute>
  )
}

const DashboardRoute = () => {
  const navigate = useNavigate()

  return (
    <ProtectedRoute>
      <DashboardPage
        onStartReview={() => navigate(`/review/${DEFAULT_DECK_ID}`)}
      />
    </ProtectedRoute>
  )
}

const ReviewRoute = () => {
  const { deckId = DEFAULT_DECK_ID } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()

  return (
    <ProtectedRoute>
      <ReviewPage
        deckId={deckId}
        onBack={() => navigate('/dashboard')}
        userId={user?.id ?? ''}
      />
    </ProtectedRoute>
  )
}

export const AppRouter = () => {
  return (
    <Routes>
      <Route element={<RootRedirect />} path="/" />
      <Route element={<LoginRoute />} path="/login" />
      <Route element={<RegisterRoute />} path="/register" />
      <Route element={<DashboardRoute />} path="/dashboard" />
      <Route element={<ReviewRoute />} path="/review/:deckId" />
      <Route element={<Navigate replace to="/" />} path="*" />
    </Routes>
  )
}
