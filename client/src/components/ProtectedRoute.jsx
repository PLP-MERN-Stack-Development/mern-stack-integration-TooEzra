import { Navigate } from 'react-router-dom'
import { authService } from '../services/api'

export default function ProtectedRoute({ children }) {
  const user = authService.getCurrentUser()
  return user ? children : <Navigate to="/login" />
}