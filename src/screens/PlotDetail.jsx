import { useState, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'

const plotData = {
  S14: {
    id: 'S14',
    layout: 'Greenfield Layout · Phase 1',
    price: '₹18,50,000',
    emi: '₹12,400',
    status: 'Open',
    size: '1200 sqft',
    facing: 'East',
    roadWidth: '30 ft',
    distanceToRoad: '50 m',
    zoneType: 'Residential',
    location: [
      { label: 'School', dist: '2 km' },
      { label: 'Hospital', dist: '4 km' },
      { label: 'Metro', dist: '3 km' },
    ],
    trust: ['Layout approval', 'Ownership chain', 'Booking terms', 'Registration sample'],
  },
  N07: {
    id: 'N07',
    layout: 'Greenfield Layout · Phase 1',
    price: '₹22,00,000',
    emi: '₹14,800',
    status: 'High Interest',
    size: '1500 sqft',
    facing: 'North',
    roadWidth: '40 ft',
    distanceToRoad: '30 m',
    zoneType: 'Residential',
    location: [
      { label: 'School', dist: '1.5 km' },
      { label: 'Hospital', dist: '3 km' },
    ],
    trust: ['Layout approval', 'Ownership chain', 'Booking terms', 'Registration sample'],
  },
}

const defaultPlot = plotData.S14

export default function PlotDetail() {
  const { id } = useParams()
  const plot = plotData[id] || { ...defaultPlot, id: id || 'S14' }
  const [currentIndex, setCurrentIndex] = useState(0)
  const carouselRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [currentX, setCurrentX] = useState(0)
  
  const blueprints = ['Master', 'Plot', 'Road']
  
  const goToSlide = (index) => {
    setCurrentIndex(index)
  }
  
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % blueprints.length)
  }
  
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + blueprints.length) % blueprints.length)
  }
  
  // Handle touch/mouse drag
  const handleStart = (e) => {
    setIsDragging(true)
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    setStartX(clientX)
    setCurrentX(clientX)
  }
  
  const handleMove = (e) => {
    if (!isDragging) return
    e.preventDefault()
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    setCurrentX(clientX)
  }
  
  const handleEnd = () => {
    if (!isDragging) return
    
    const diff = startX - currentX
    const threshold = 50
    
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        nextSlide()
      } else {
        prevSlide()
      }
    }
    
    setIsDragging(false)
    setStartX(0)
    setCurrentX(0)
  }

  return (
    <div className="max-w-lg mx-auto min-h-screen pb-32">
      <header className="sticky top-0 bg-base/95 backdrop-blur border-b border-border z-10">
        <Link to="/" className="flex items-center gap-2 p-4 text-gray-400 hover:text-white transition-colors">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </Link>
      </header>

      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{plot.id}</h1>
          <p className="text-gray-400 mt-1">{plot.layout}</p>
          <div className="flex flex-wrap gap-4 mt-3">
            <span className="text-xl font-semibold">{plot.price}</span>
            <span className="text-gray-400">EMI from {plot.emi}/mo</span>
          </div>
          <span className={`inline-block mt-3 chip ${
            plot.status === 'Open' ? 'border-gray-500 text-gray-400' :
            plot.status === 'High Interest' ? 'border-gold text-gold' : 'border-gray-600 text-gray-600'
          }`}>
            {plot.status}
          </span>
        </div>

        <div className="card overflow-hidden">
          {/* Carousel Container */}
          <div 
            ref={carouselRef}
            className="relative overflow-hidden select-none"
            onMouseDown={handleStart}
            onMouseMove={handleMove}
            onMouseUp={handleEnd}
            onMouseLeave={handleEnd}
            onTouchStart={handleStart}
            onTouchMove={handleMove}
            onTouchEnd={handleEnd}
          >
            <div 
              className="flex transition-transform duration-300 ease-in-out"
              style={{ 
                transform: `translateX(calc(-${currentIndex * 100}% + ${isDragging ? (startX - currentX) : 0}px))`
              }}
            >
              {blueprints.map((blueprint, index) => (
                <div 
                  key={blueprint}
                  className="w-full flex-shrink-0 aspect-video bg-surface-elevated flex items-center justify-center"
                >
                  <div className="text-center">
                    <span className="text-4xl font-bold text-gold/30">{plot.id}</span>
                    <p className="text-gray-600 text-sm mt-1">{blueprint} Blueprint</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Navigation Arrows */}
            {blueprints.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-surface/90 backdrop-blur border border-border flex items-center justify-center text-gray-400 hover:text-gold hover:border-gold transition-colors z-10 shadow-lg"
                  aria-label="Previous blueprint"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-surface/90 backdrop-blur border border-border flex items-center justify-center text-gray-400 hover:text-gold hover:border-gold transition-colors z-10 shadow-lg"
                  aria-label="Next blueprint"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
          </div>
          
          {/* Carousel Indicators */}
          <div className="flex items-center justify-center gap-2 py-3 border-t border-border">
            {blueprints.map((blueprint, index) => (
              <button
                key={blueprint}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 ${
                  currentIndex === index
                    ? 'w-8 h-1.5 bg-gold'
                    : 'w-1.5 h-1.5 bg-gray-600 hover:bg-gray-500'
                } rounded-full`}
                aria-label={`Go to ${blueprint} blueprint`}
              />
            ))}
          </div>
          
          {/* Blueprint Labels */}
          <div className="flex border-t border-border">
            {blueprints.map((blueprint, index) => (
              <div
                key={blueprint}
                className={`flex-1 py-3 text-xs font-medium uppercase tracking-wider text-center transition-colors cursor-pointer ${
                  currentIndex === index
                    ? 'text-gold'
                    : 'text-gray-500'
                }`}
                onClick={() => goToSlide(index)}
              >
                {blueprint}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="card p-4">
            <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Size</p>
            <p className="font-medium">{plot.size}</p>
          </div>
          <div className="card p-4">
            <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Facing</p>
            <p className="font-medium">{plot.facing}</p>
          </div>
          <div className="card p-4">
            <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Road width</p>
            <p className="font-medium">{plot.roadWidth}</p>
          </div>
          <div className="card p-4">
            <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">To main road</p>
            <p className="font-medium">{plot.distanceToRoad}</p>
          </div>
          <div className="card p-4 col-span-2">
            <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Zone type</p>
            <p className="font-medium">{plot.zoneType}</p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-3">Location Context</h3>
          <div className="flex flex-wrap gap-2">
            {plot.location.map(({ label, dist }) => (
              <span key={label} className="chip border-border text-gray-400">
                {label} {dist}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {plot.trust.map((item) => (
            <div key={item} className="flex items-center gap-2 text-sm">
              <span className="text-success">✔</span>
              <span className="text-gray-300">{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-surface-elevated border-t border-border p-6 max-w-lg mx-auto">
        <div className="flex gap-3 mb-4">
          <Link
            to={`/allocation/${plot.id}`}
            className="btn-primary flex-1 text-center py-3"
          >
            Start Pre-Booking
          </Link>
          <button className="btn-secondary flex-1 text-center py-3">
            Check for EMI Plans
          </button>
        </div>
        <p className="text-gray-400 text-sm text-center leading-relaxed max-w-sm mx-auto">
          Allocation initiates a legal land ownership process, not an instant transfer.
        </p>
      </div>
    </div>
  )
}
