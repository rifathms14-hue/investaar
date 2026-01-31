import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const OTP_STATES = {
  NORMAL: 'normal',
  ERROR: 'error',
  EXPIRED: 'expired',
  TOO_MANY_ATTEMPTS: 'too_many_attempts'
}

export default function OTPScreen() {
  const navigate = useNavigate()
  const location = useLocation()
  const phone = location.state?.phone || '+91 98765 43210'
  
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [state, setState] = useState(OTP_STATES.NORMAL)
  const [timer, setTimer] = useState(59)
  const [attemptTimer, setAttemptTimer] = useState({ minutes: 59, seconds: 54 })
  const [canResend, setCanResend] = useState(false)
  const inputRefs = useRef([])

  useEffect(() => {
    if (timer > 0 && state === OTP_STATES.NORMAL) {
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true)
            return 0
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [timer, state])

  useEffect(() => {
    if (state === OTP_STATES.TOO_MANY_ATTEMPTS) {
      const interval = setInterval(() => {
        setAttemptTimer((prev) => {
          if (prev.seconds > 0) {
            return { ...prev, seconds: prev.seconds - 1 }
          } else if (prev.minutes > 0) {
            return { minutes: prev.minutes - 1, seconds: 59 }
          } else {
            setState(OTP_STATES.NORMAL)
            setTimer(59)
            return { minutes: 0, seconds: 0 }
          }
        })
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [state])

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return
    
    const newOtp = [...otp]
    newOtp[index] = value.slice(-1)
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }

    // Clear error state when user starts typing
    if (state === OTP_STATES.ERROR) {
      setState(OTP_STATES.NORMAL)
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').slice(0, 6)
    if (/^\d+$/.test(pastedData)) {
      const newOtp = pastedData.split('').concat(Array(6 - pastedData.length).fill(''))
      setOtp(newOtp.slice(0, 6))
      inputRefs.current[Math.min(pastedData.length, 5)]?.focus()
    }
  }

  const handleVerify = () => {
    const otpString = otp.join('')
    
    if (otpString.length !== 6) return

    // Simulate verification
    if (otpString === '123456') {
      navigate('/onboarding/success')
    } else if (otpString === '999999') {
      setState(OTP_STATES.EXPIRED)
    } else if (otpString === '888888') {
      setState(OTP_STATES.TOO_MANY_ATTEMPTS)
    } else {
      setState(OTP_STATES.ERROR)
    }
  }

  const handleResend = () => {
    if (!canResend && state !== OTP_STATES.EXPIRED) return
    setOtp(['', '', '', '', '', ''])
    setTimer(59)
    setCanResend(false)
    setState(OTP_STATES.NORMAL)
    inputRefs.current[0]?.focus()
  }

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
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
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
            Confirm it's you
          </h1>
          
          <div className="text-center mb-8">
            <p className="text-[#A2A2A2] text-sm mb-2">
              We've sent a 6 digit OTP to your mobile number
            </p>
            <p className="text-[#A2A2A2] text-sm">
              <span className="font-bold">{phone}</span>
              <button
                onClick={() => navigate('/onboarding/account')}
                className="ml-2 text-gold underline hover:text-gold/80"
              >
                Change
              </button>
            </p>
          </div>

          {/* Error Messages */}
          {state === OTP_STATES.ERROR && (
            <div className="mb-6 text-center">
              <p className="text-red-500 text-sm mb-2">
                That code doesn't seem to match. Please check and try again.
              </p>
            </div>
          )}

          {state === OTP_STATES.EXPIRED && (
            <div className="mb-6 text-center">
              <p className="text-red-500 text-sm font-medium mb-2">
                This code has expired.
              </p>
              <p className="text-gray-400 text-sm">
                You can request a new one to continue.
              </p>
            </div>
          )}

          {state === OTP_STATES.TOO_MANY_ATTEMPTS && (
            <div className="mb-6 text-center">
              <p className="text-red-500 text-sm font-medium mb-2">
                Too Many Attempts!
              </p>
              <p className="text-gray-400 text-sm mb-1">
                For security, verification is temporarily paused.
              </p>
              <p className="text-gray-400 text-sm">
                Try again in {formatTimer(attemptTimer.minutes * 60 + attemptTimer.seconds)}
              </p>
            </div>
          )}

          {/* OTP Input */}
          <div className="flex justify-center gap-2 mb-4">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className={`
                  w-12 h-12 text-center text-white text-xl font-bold
                  bg-surface border-2
                  focus:outline-none focus:ring-2 focus:ring-gold/50
                  transition-colors
                  ${state === OTP_STATES.ERROR || 
                    state === OTP_STATES.EXPIRED || 
                    state === OTP_STATES.TOO_MANY_ATTEMPTS
                    ? 'border-red-500' 
                    : 'border-gold/50 focus:border-gold'
                  }
                `}
                disabled={state === OTP_STATES.TOO_MANY_ATTEMPTS}
              />
            ))}
          </div>

          {/* Resend Code */}
          <div className="text-center mb-8">
            {state === OTP_STATES.TOO_MANY_ATTEMPTS ? (
              <p className="text-gray-500 text-sm">Resend Code</p>
            ) : (
              <>
                {!canResend && state !== OTP_STATES.EXPIRED ? (
                  <p className="text-[#A2A2A2] text-sm">
                    You can resend code in <span className="text-[#A77A2C]">{formatTimer(timer)}</span>
                  </p>
                ) : (
                  <button
                    onClick={handleResend}
                    className="text-gold underline text-sm hover:text-gold/80"
                  >
                    {state === OTP_STATES.EXPIRED ? 'Resend Code' : 'Resend'}
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="pb-8 w-full">
          <p className="text-gold text-sm text-center mb-6">
            This helps us keep your ownership record secure and tied to you.
          </p>

          <button
            onClick={handleVerify}
            disabled={otp.join('').length !== 6 || state === OTP_STATES.TOO_MANY_ATTEMPTS}
            className="btn-primary w-full py-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Verify & Continue
          </button>
        </div>
      </div>
    </div>
  )
}
