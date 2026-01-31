import { useState } from 'react'
import { Link } from 'react-router-dom'

// ——— Mock Data ———
const regions = [
  { id: 'bangalore', name: 'Bangalore', image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=100&h=100&fit=crop', isNew: true },
  { id: 'hyderabad', name: 'Hyderabad', image: 'https://images.unsplash.com/photo-1504244648668-89000185ea9b?w=100&h=100&fit=crop&auto=format', isNew: false },
  { id: 'chennai', name: 'Chennai', image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=100&h=100&fit=crop', isNew: true },
  { id: 'pune', name: 'Pune', image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=100&h=100&fit=crop', isNew: false },
  { id: 'mumbai', name: 'Mumbai', image: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=100&h=100&fit=crop', isNew: false },
  { id: 'delhi', name: 'Delhi NCR', image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=100&h=100&fit=crop', isNew: true },
]

const PLOT_IMAGE = 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=300&fit=crop&q=80'

const newlyLaunchedPlots = [
  { id: 'BLR-S14', region: 'Bangalore', area: 'Sarjapur', size: '1200 sqft', price: '₹18,50,000', image: PLOT_IMAGE },
  { id: 'HYD-N07', region: 'Hyderabad', area: 'Shamshabad', size: '1500 sqft', price: '₹22,00,000', image: PLOT_IMAGE },
  { id: 'CHN-E22', region: 'Chennai', area: 'OMR', size: '1000 sqft', price: '₹15,20,000', image: PLOT_IMAGE },
  { id: 'PUN-W09', region: 'Pune', area: 'Hinjewadi', size: '1200 sqft', price: '₹18,50,000', image: PLOT_IMAGE },
  { id: 'BLR-K02', region: 'Bangalore', area: 'Whitefield', size: '1400 sqft', price: '₹21,00,000', image: PLOT_IMAGE },
  { id: 'MUM-P11', region: 'Mumbai', area: 'Panvel', size: '1100 sqft', price: '₹28,50,000', image: PLOT_IMAGE },
  { id: 'DEL-G08', region: 'Delhi NCR', area: 'Greater Noida', size: '1300 sqft', price: '₹24,00,000', image: PLOT_IMAGE },
  { id: 'CHN-A15', region: 'Chennai', area: 'Anna Nagar', size: '900 sqft', price: '₹14,20,000', image: PLOT_IMAGE },
  { id: 'HYD-G04', region: 'Hyderabad', area: 'Gachibowli', size: '1600 sqft', price: '₹26,00,000', image: PLOT_IMAGE },
  { id: 'PUN-K12', region: 'Pune', area: 'Kharadi', size: '1250 sqft', price: '₹19,75,000', image: PLOT_IMAGE },
]

const registrationSteps = [
  { step: 1, title: 'Select Region', desc: 'Choose your preferred city and area', icon: 'M15 10.5a3 3 0 11-6 0 3 3 0 016 0z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z' },
  { step: 2, title: 'Browse Plots', desc: 'Explore available plots with filters', icon: 'M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z' },
  { step: 3, title: 'Pre-Book Plot', desc: 'Reserve with a nominal booking amount', icon: 'M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  { step: 4, title: 'Complete Registration', desc: 'Submit documents and finalize purchase', icon: 'M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z' },
]

// ——— Hero Banner: Pre-Booking ———
function PreBookingHero() {
  return (
    <section className="relative overflow-hidden w-full">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold/20 via-surface to-violet/10" />
      
      <div className="relative w-full px-6 py-8 box-border">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-green-400 text-xs font-medium uppercase tracking-wider">Pre-Booking Open</span>
        </div>
        
        <h1 className="text-2xl font-bold tracking-tight mb-2">
          Secure Your Plot Today
        </h1>
        <p className="text-gray-400 text-sm mb-6 max-w-xs">
          Book plots across premium locations with just ₹10,000 and complete registration at your pace.
        </p>
        
        <Link
          to="/pre-booking"
          className="inline-flex items-center gap-2 btn-primary px-6 py-3"
        >
          Start Pre-Booking
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
        
        {/* Stats row */}
        <div className="flex gap-6 mt-6 pt-6 border-t border-border/50">
          <div>
            <p className="text-xl font-bold text-gold">250+</p>
            <p className="text-gray-500 text-xs">Plots Available</p>
          </div>
          <div>
            <p className="text-xl font-bold text-white">6</p>
            <p className="text-gray-500 text-xs">Regions</p>
          </div>
          <div>
            <p className="text-xl font-bold text-white">₹10K</p>
            <p className="text-gray-500 text-xs">Min. Booking</p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ——— Ownership Star Frame (Hero Utility Card) ———
// Placement: directly below Pre-Booking, above Active & Upcoming Regions.
// States: new_user | emi_active | unlocked (driven by ownership/EMI when wired).
const STAR_FRAME_STATES = {
  new_user: {
    status: 'locked',
    statusLabel: 'Locked',
    title: 'Ownership Star Frame',
    subline: 'Unlock this milestone by completing your first purchase',
    contextLine: 'Available after registration or EMI completion',
    primaryCta: 'Explore Plots',
    primaryTo: '/regions',
  },
  emi_active: {
    status: 'locked',
    statusLabel: 'Locked',
    title: 'Ownership Star Frame',
    subline: 'Complete EMI to unlock your ownership frame',
    contextLine: 'Available after registration or EMI completion',
    progressText: '6 of 24 payments completed',
    primaryCta: 'View EMI Progress',
    primaryTo: '/portfolio',
  },
  unlocked: {
    status: 'unlocked',
    statusLabel: 'Unlocked',
    title: 'Ownership Star Frame',
    subline: 'Verified ownership milestone achieved',
    contextLine: 'Linked to Plot S14 · Verified Ownership Record',
    primaryCta: 'Create Star Frame',
    primaryTo: '/star-frame/S14',
  },
}

function OwnershipStarFrame({ state = 'new_user' }) {
  const config = STAR_FRAME_STATES[state] || STAR_FRAME_STATES.new_user
  const isLocked = config.status === 'locked'

  return (
    <section className="px-4 py-4" aria-label="Ownership Star Frame">
      {/* Hero Utility Card: ~30–35vh, frosted glass, 24px internal, 16px external */}
      <div className="card-hero-utility relative overflow-hidden flex flex-col p-6 border border-border">
        {/* 1. Status chip — top right, absolute */}
        <div
          className={`absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider ${
            isLocked ? 'bg-gray-600/80 text-gray-300' : 'bg-gold/20 text-gold border border-gold/40'
          }`}
        >
          {isLocked ? (
            <>
              <span aria-hidden>🔒</span>
              <span>{config.statusLabel}</span>
            </>
          ) : (
            <>
              <span aria-hidden>✨</span>
              <span>{config.statusLabel}</span>
            </>
          )}
        </div>

        {/* 2. Header — primary text */}
        <div className="flex-shrink-0 pr-20">
          <h2 className="text-lg font-semibold tracking-tight text-white">
            {config.title}
          </h2>
          <p className="text-gray-400 text-sm mt-0.5">
            {config.subline}
          </p>
        </div>

        {/* 3. Visual anchor — large star, center */}
        <div className="flex-1 flex items-center justify-center min-h-[80px] my-2 relative">
          <div
            className={`relative flex items-center justify-center w-20 h-20 ${
              isLocked ? 'opacity-60' : ''
            }`}
          >
            {isLocked && (
              <div
                className="absolute inset-0 z-10 rounded-full"
                style={{
                  backdropFilter: 'blur(6px)',
                  WebkitBackdropFilter: 'blur(6px)',
                  background: 'rgba(0,0,0,0.2)',
                }}
              />
            )}
            <div
              className={`absolute inset-0 rounded-full ${
                isLocked ? 'bg-violet/5' : 'bg-gradient-to-br from-gold/20 to-violet/20'
              }`}
              style={
                !isLocked
                  ? { boxShadow: '0 0 40px rgba(212,175,55,0.15), 0 0 60px rgba(139,92,246,0.1)' }
                  : undefined
              }
            />
            <svg
              className="w-12 h-12 relative z-[2] text-violet"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
        </div>

        {/* 4. Context line */}
        <p className="text-gray-500 text-xs flex-shrink-0">
          {config.contextLine}
        </p>
        {config.progressText && (
          <p className="text-gold/90 text-xs mt-0.5 font-medium">
            {config.progressText}
          </p>
        )}

        {/* 5. Primary CTA — full width */}
        <div className="flex-shrink-0 mt-3">
          <Link
            to={config.primaryTo}
            className="block w-full btn-primary text-center py-3 text-sm"
          >
            {config.primaryCta}
          </Link>
        </div>

        {/* 6. Secondary action — always visible */}
        <Link
          to="/records"
          className="flex items-center justify-center gap-1.5 text-gray-500 text-xs mt-2 hover:text-gray-400 transition-colors"
        >
          View Digital Certificate
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </Link>
      </div>
    </section>
  )
}

// ——— Region Selection heading only (scroll strip is rendered below as sibling) ———
function RegionSelector() {
  return (
    <section className="py-4">
      <div className="px-6 mb-3">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Select Region</h2>
      </div>
    </section>
  )
}

// ——— Region avatar: image with fallback to initial ———
function RegionAvatar({ region, isSelected }) {
  const [imgError, setImgError] = useState(false)
  const initial = (region.name || region.id || '?').charAt(0).toUpperCase()

  return (
    <div className={`relative p-0.5 rounded-full transition-all ${
      isSelected
        ? 'bg-gradient-to-br from-gold via-gold/80 to-violet'
        : 'bg-gradient-to-br from-gray-600 to-gray-700'
    }`}>
      <div className="w-16 h-16 rounded-full overflow-hidden bg-surface flex items-center justify-center">
        {!imgError && region.image ? (
          <img
            src={region.image}
            alt={region.name}
            className="w-full h-full object-cover rounded-full min-w-full min-h-full"
            loading="lazy"
            decoding="async"
            onError={() => setImgError(true)}
          />
        ) : (
          <span className="text-xl font-bold text-gold/80 select-none" aria-hidden>
            {initial}
          </span>
        )}
      </div>
    </div>
  )
}

// ——— Region scroll strip: entry points to region-specific plot pages ———
function RegionScrollStrip() {
  return (
    <div className="flex gap-4 px-6 overflow-x-auto overflow-y-hidden pb-2 scrollbar-hide">
      {regions.map((region) => (
        <Link
          key={region.id}
          to={`/regions/${region.id}/plots`}
          className="flex flex-col items-center gap-2 flex-shrink-0"
        >
          <RegionAvatar region={region} isSelected={false} />
          <span className="text-xs font-medium text-gray-400 hover:text-gold transition-colors">
            {region.name}
          </span>
        </Link>
      ))}
    </div>
  )
}

// ——— Newly Launched Plots ———
function NewlyLaunchedPlots() {
  return (
    <section className="py-6">
      <div className="px-6 mb-4">
        <h2 className="text-lg font-semibold">Newly Launched</h2>
        <p className="text-gray-500 text-xs mt-0.5">Fresh plots across all regions</p>
      </div>
      
      <div className="grid grid-cols-2 gap-3 px-6">
        {newlyLaunchedPlots.map((plot) => (
          <Link
            key={plot.id}
            to={`/plot/${plot.id}`}
            className="card overflow-hidden hover:border-gold/50 transition-colors"
          >
            <div className="aspect-[4/3] bg-surface-elevated overflow-hidden relative">
              <img
                src={plot.image}
                alt={`Plot ${plot.id}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute top-2 right-2 bg-black/70 px-2 py-0.5 rounded">
                <span className="text-xs font-bold text-gold">{plot.id}</span>
              </div>
            </div>
            <div className="p-3">
              <p className="text-gold text-[10px] uppercase tracking-wider flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                {plot.region} · {plot.area}
              </p>
              <p className="font-semibold text-sm mt-0.5">{plot.price}</p>
              <p className="text-gray-400 text-xs">{plot.size}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

// ——— 4-Step Registration Flow ———
function RegistrationFlow() {
  return (
    <section className="px-6 py-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">How It Works</h2>
        <p className="text-gray-500 text-xs mt-0.5">Simple 4-step registration process</p>
      </div>
      
      <div className="space-y-3">
        {registrationSteps.map((item, index) => (
          <div key={item.step} className="card p-4 flex items-start gap-4">
            {/* Step number with connector */}
            <div className="relative flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center">
                <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                </svg>
              </div>
              {index < registrationSteps.length - 1 && (
                <div className="w-0.5 h-6 bg-border mt-2" />
              )}
            </div>
            
            {/* Content */}
            <div className="flex-1 pt-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-gold text-xs font-bold">STEP {item.step}</span>
              </div>
              <h3 className="font-semibold text-white">{item.title}</h3>
              <p className="text-gray-500 text-sm mt-0.5">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
      
    </section>
  )
}

// ——— Main Market Screen ———
export default function Market() {
  return (
    <div className="w-full max-w-lg mx-auto pb-8">
      {/* 1. Hero: Pre-Booking Banner */}
      <PreBookingHero />
      
      {/* 2. Ownership Star Frame — emotional anchor between Pre-Booking and Regions */}
      <OwnershipStarFrame state="new_user" />
      
      {/* 3. Region Selection (Instagram Story Circles) */}
      <RegionSelector />

      {/* Region scroll strip — direct child of container, before Newly Launched */}
      <RegionScrollStrip />
      
      {/* 4. Newly Launched Plots */}
      <NewlyLaunchedPlots />
      
      {/* 5. 4-Step Registration Flow */}
      <RegistrationFlow />
    </div>
  )
}
