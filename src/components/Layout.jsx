import { Outlet, NavLink, useLocation } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Home', title: 'Home', icon: 'M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25' },
  { to: '/portfolio', label: 'Portfolio', title: 'Portfolio', icon: 'M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941' },
  { to: '/records', label: 'Records', title: 'Records', icon: 'M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z' },
  { to: '/account', label: 'Account', title: 'Account', icon: 'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z' },
]

function getPageTitle(pathname) {
  const navItem = navItems.find(item => item.to === pathname)
  return navItem?.title || null
}

export default function Layout() {
  const location = useLocation()
  const pathname = location.pathname
  const hideNav = ['/plot/', '/purchase/', '/pre-booking', '/regions/', '/star-frame/'].some(p =>
    pathname.startsWith(p)
  ) || /^\/portfolio\/emi\//.test(pathname)

  return (
    <div 
      className="h-screen flex flex-col safe-area overflow-hidden fixed inset-0"
      style={{
        background: 'linear-gradient(154deg, #010101 -5.72%, #1B1000 15.2%, #0A0A0A 25.8%)'
      }}
    >
      <main className="flex-1 pb-20 overflow-auto scrollbar-hide">
        {/* Header: Welcome note on home, page title on other pages */}
        {!hideNav && (
          <header className="shrink-0 px-6 pt-6 pb-2 max-w-lg mx-auto w-full">
            {pathname === '/' ? (
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-white/90 font-light" style={{ fontSize: '28px' }}>
                    Welcome Back!
                  </p>
                  <p className="text-white font-semibold truncate" style={{ fontSize: '28px' }}>
                    Nakul
                  </p>
                </div>
                {/* Verified badge */}
                <span
                  className="shrink-0 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-transparent border border-gold text-gold shadow-none"
                  title="Verified"
                  aria-label="Verified"
                >
                  <span className="text-xs font-medium uppercase tracking-wide">VERIFIED</span>
                </span>
              </div>
            ) : (
              <h1 className="text-2xl font-bold tracking-tight">{getPageTitle(pathname)}</h1>
            )}
          </header>
        )}
        <Outlet />
      </main>

      {!hideNav && (
        <nav className="fixed bottom-0 left-0 right-0 bg-surface border-t border-border z-50">
          {/* SVG gradient definition for active state */}
          <svg width="0" height="0" className="absolute">
            <defs>
              <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E8D48B" />
                <stop offset="25%" stopColor="#D4AF37" />
                <stop offset="50%" stopColor="#B8860B" />
                <stop offset="75%" stopColor="#D4AF37" />
                <stop offset="100%" stopColor="#E5C65C" />
              </linearGradient>
            </defs>
          </svg>
          <div className="flex justify-around items-center h-16 max-w-lg mx-auto">
            {navItems.map(({ to, label, icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors ${
                    isActive ? '' : 'text-gray-500 hover:text-gray-400'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2}>
                      <path 
                        strokeLinecap="square" 
                        strokeLinejoin="miter" 
                        d={icon} 
                        stroke={isActive ? 'url(#gold-gradient)' : 'currentColor'}
                      />
                    </svg>
                    <span 
                      className="text-[10px] font-medium uppercase tracking-wider"
                      style={isActive ? {
                        background: 'linear-gradient(135deg, #E8D48B 0%, #D4AF37 25%, #B8860B 50%, #D4AF37 75%, #E5C65C 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                      } : {}}
                    >
                      {label}
                    </span>
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </div>
  )
}
