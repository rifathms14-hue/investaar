import { Navigate } from 'react-router-dom'

const ONBOARDING_COMPLETE_KEY = 'investaar_onboarding_complete'

export default function ProtectedRoute({ children }) {
  const isOnboardingComplete = localStorage.getItem(ONBOARDING_COMPLETE_KEY) === 'true'

  // If onboarding not complete, redirect to splash
  if (!isOnboardingComplete) {
    return <Navigate to="/onboarding/splash" replace />
  }

  return children
}
