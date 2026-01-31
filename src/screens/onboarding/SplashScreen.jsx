import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SplashScreen() {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/onboarding/welcome')
    }, 2000)

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center"
      style={{
        background: 'linear-gradient(154deg, #010101 -5.72%, #1B1000 15.2%, #0A0A0A 25.8%)'
      }}
    >
      {/* Decorative background pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1/2 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
            <path
              d="M0,100 Q100,50 200,80 T400,60 L400,0 L0,0 Z"
              fill="url(#gradient-wave)"
              opacity="0.3"
            />
            <defs>
              <linearGradient id="gradient-wave" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.05" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Logo */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="mb-6">
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Outer star */}
            <path
              d="M40 10 L48 30 L68 30 L52 42 L60 62 L40 50 L20 62 L28 42 L12 30 L32 30 Z"
              stroke="white"
              strokeWidth="2"
              fill="none"
            />
            {/* Middle star */}
            <path
              d="M40 18 L45 32 L58 32 L47 40 L52 54 L40 46 L28 54 L33 40 L22 32 L35 32 Z"
              stroke="white"
              strokeWidth="1.5"
              fill="none"
            />
            {/* Inner star */}
            <path
              d="M40 24 L43 34 L52 34 L45 38 L48 48 L40 44 L32 48 L35 38 L28 34 L37 34 Z"
              fill="white"
              opacity="0.3"
            />
          </svg>
        </div>

        {/* App Name */}
        <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Investaar</h1>
        
        {/* Tagline */}
        <p className="text-gray-400 text-lg">Where ownership begins.</p>
      </div>
    </div>
  )
}
