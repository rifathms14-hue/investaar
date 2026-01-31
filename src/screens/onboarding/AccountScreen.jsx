import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AccountScreen() {
  const navigate = useNavigate()
  const [phone, setPhone] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleContinue = async (e) => {
    e.preventDefault()
    if (!phone || phone.length < 10) return
    
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      navigate('/onboarding/otp', { state: { phone } })
    }, 500)
  }

  const handleGoogleSignIn = () => {
    // Handle Google sign in
    console.log('Google sign in')
  }

  return (
    <div 
      className="min-h-screen flex flex-col"
      style={{
        background: 'linear-gradient(154deg, #010101 -5.72%, #1B1000 15.2%, #0A0A0A 25.8%)'
      }}
    >
      <div className="flex-1 flex flex-col justify-between p-6 max-w-lg mx-auto w-full">
        {/* Header */}
        <div className="pt-12">
          <div className="flex items-center gap-3 mb-12">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M16 4 L20 12 L28 12 L22 16 L24 24 L16 20 L8 24 L10 16 L4 12 L12 12 Z"
                stroke="#D4AF37"
                strokeWidth="2"
                fill="none"
              />
            </svg>
            <span className="text-white text-xl font-semibold">Investaar</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            <span className="font-medium">To begin, you'll need</span>
            <br />
            <span className="font-medium">an account.</span>
          </h1>
          
          <p className="text-gray-400 text-sm leading-relaxed mt-4">
            This becomes your private record of bookings, documents, and ownership milestones.
          </p>
        </div>

        {/* Form Section */}
        <div className="pb-8 w-full">
          <form onSubmit={handleContinue} className="space-y-4">
            {/* Phone Input */}
            <div>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                placeholder="+91 9876543210"
                className="w-full bg-surface border border-border px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gold transition-colors"
                required
              />
            </div>

            {/* Continue Button */}
            <button
              type="submit"
              disabled={!phone || phone.length < 10 || isLoading}
              className="btn-primary w-full py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Processing...' : 'Continue Securely'}
            </button>

            {/* Google Sign In */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="btn-secondary w-full py-3 flex items-center justify-center gap-3"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M19.6 10.227c0-.709-.064-1.39-.182-2.045H10v3.868h5.382a4.6 4.6 0 01-1.996 3.018v2.51h3.232c1.891-1.742 2.982-4.305 2.982-7.35z" fill="#4285F4"/>
                <path d="M10 20c2.7 0 4.964-.9 6.618-2.423l-3.232-2.509c-.9.6-2.054.955-3.386.955-2.605 0-4.81-1.76-5.595-4.123H1.064v2.59A9.996 9.996 0 0010 20z" fill="#34A853"/>
                <path d="M4.405 11.9c-.2-.6-.314-1.24-.314-1.9 0-.66.114-1.3.314-1.9V5.51H1.064A9.996 9.996 0 000 10c0 1.614.386 3.14 1.064 4.49l3.34-2.59z" fill="#FBBC05"/>
                <path d="M10 3.977c1.468 0 2.786.505 3.823 1.496l2.868-2.868C14.959.99 12.695 0 10 0 6.09 0 2.71 2.24 1.064 5.51l3.34 2.59C5.19 5.736 7.395 3.977 10 3.977z" fill="#EA4335"/>
              </svg>
              Sign in using Google
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
