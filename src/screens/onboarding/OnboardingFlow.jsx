import { Routes, Route, Navigate } from 'react-router-dom'
import SplashScreen from './SplashScreen'
import WelcomeScreen from './WelcomeScreen'
import AccountScreen from './AccountScreen'
import OTPScreen from './OTPScreen'
import SuccessScreen from './SuccessScreen'

export default function OnboardingFlow() {
  return (
    <Routes>
      <Route index element={<Navigate to="splash" replace />} />
      <Route path="splash" element={<SplashScreen />} />
      <Route path="welcome" element={<WelcomeScreen />} />
      <Route path="account" element={<AccountScreen />} />
      <Route path="otp" element={<OTPScreen />} />
      <Route path="success" element={<SuccessScreen />} />
      <Route path="*" element={<Navigate to="splash" replace />} />
    </Routes>
  )
}
