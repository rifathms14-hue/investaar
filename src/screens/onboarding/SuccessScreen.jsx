import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ONBOARDING_COMPLETE_KEY = 'investaar_onboarding_complete'

export default function SuccessScreen() {
  const navigate = useNavigate()
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(null)

  // Only after check: returning user → redirect; first-time → show page
  useEffect(() => {
    const completed = localStorage.getItem(ONBOARDING_COMPLETE_KEY) === 'true'
    if (completed) {
      navigate('/', { replace: true })
    } else {
      setIsFirstTimeUser(true)
    }
  }, [navigate])

  const handleVerifyAndContinue = () => {
    localStorage.setItem(ONBOARDING_COMPLETE_KEY, 'true')
    navigate('/', { replace: true })
  }

  // Don't render success content until we know user is first-time (avoids flash for returning users)
  if (isFirstTimeUser !== true) {
    return null
  }

  return (
    <div 
      className="min-h-screen flex flex-col items-center p-6"
      style={{
        background: 'linear-gradient(154deg, #010101 -5.72%, #1B1000 15.2%, #0A0A0A 25.8%)'
      }}
    >
      {/* Decorative glow effect */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      </div>

      {/* Centered content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center max-w-md text-center">
        {/* Golden Star Icon */}
        <div className="mb-8 animate-pulse">
          <img
            src="/Success Star.png"
            alt="Success"
            width={308}
            className="h-auto"
          />
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-light text-white mb-6">
          You're verified
        </h1>

        {/* Description */}
        <p className="text-gray-300 text-base leading-relaxed max-w-sm">
          Your access is now verified. Every booking, document, and milestone from here on will be tied to you.
        </p>
      </div>

      {/* Verify & Continue — pinned to bottom with 24px margin */}
      <div className="relative z-10 w-full flex justify-center mt-auto">
        <button
          onClick={handleVerifyAndContinue}
          className="btn-primary w-full max-w-sm py-4 mb-6"
        >
          Verify & Continue
        </button>
      </div>
    </div>
  )
}
