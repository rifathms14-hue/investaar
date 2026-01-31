import { useState, useRef, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getPlot } from '../data/locations'

const defaultDetail = {
  layout: 'Greenfield Layout · Phase 1',
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
}

export default function PlotDetail() {
  const { id, regionId, areaId, plotId } = useParams()
  const plotKey = plotId || id
  const locationPlot = getPlot(plotKey)
  const plot = locationPlot
    ? {
        ...defaultDetail,
        ...locationPlot,
        emi: locationPlot.emi?.replace('/mo', '') ?? locationPlot.emi,
      }
    : {
        ...defaultDetail,
        id: plotKey || 'M-22',
        areaName: 'Melur',
        regionName: 'Madurai',
        price: '₹18,50,000',
        emi: '12,400',
        status: 'Open',
        size: '1200 sqft',
      }
  const contextLabel = plot.areaName && plot.regionName
    ? `${plot.id} · ${plot.areaName}, ${plot.regionName}`
    : plot.id
  const backTo = regionId && areaId ? `/regions/${regionId}/areas/${areaId}/plots` : '/'
  const [currentIndex, setCurrentIndex] = useState(0)
  const carouselRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [currentX, setCurrentX] = useState(0)
  
  // Zoom and pan state for plot layout
  const [zoom, setZoom] = useState(1)
  const [panX, setPanX] = useState(0)
  const [panY, setPanY] = useState(0)
  const [isPanning, setIsPanning] = useState(false)
  const [panStart, setPanStart] = useState({ x: 0, y: 0 })
  const plotLayoutRef = useRef(null)
  
  const blueprints = ['Master', 'Plot', 'Road', 'Satellite']
  
  // Sample plot layout data (like a seat map)
  const plotLayout = [
    ['S01', 'S02', 'S03', 'S04', 'S05'],
    ['S06', 'S07', 'S08', 'S09', 'S10'],
    ['S11', 'S12', 'S13', 'S14', 'S15'],
    ['S16', 'S17', 'S18', 'S19', 'S20'],
    ['N01', 'N02', 'N03', 'N04', 'N05'],
    ['N06', 'N07', 'N08', 'N09', 'N10'],
    ['E01', 'E02', 'E03', 'E04', 'E05'],
    ['W01', 'W02', 'W03', 'W04', 'W05'],
  ]
  
  const getPlotStatus = (plotId) => {
    if (plotId === plot.id) return 'selected'
    if (plotId === 'E22' || plotId === 'S18') return 'booked'
    if (plotId === 'N07' || plotId === 'S14') return 'high-interest'
    return 'available'
  }
  
  const handleZoom = (delta) => {
    setZoom(prev => Math.max(0.5, Math.min(3, prev + delta)))
  }
  
  const handlePanStart = (e) => {
    setIsPanning(true)
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    const clientY = e.touches ? e.touches[0].clientY : e.clientY
    setPanStart({ x: clientX - panX, y: clientY - panY })
  }
  
  const handlePanMove = (e) => {
    if (!isPanning) return
    e.preventDefault()
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    const clientY = e.touches ? e.touches[0].clientY : e.clientY
    setPanX(clientX - panStart.x)
    setPanY(clientY - panStart.y)
  }
  
  const handlePanEnd = () => {
    setIsPanning(false)
  }
  
  // Reset zoom/pan on plot change
  useEffect(() => {
    setZoom(1)
    setPanX(0)
    setPanY(0)
  }, [plot.id])
  
  // Blueprint images for each type - architectural/plan style images
  const blueprintImages = {
    Master: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop&q=80&auto=format', // Master site plan
    Plot: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&h=600&fit=crop&q=80&auto=format', // Plot layout
    Road: 'https://images.unsplash.com/photo-1541888946425-d81bb19241f5?w=800&h=600&fit=crop&q=80&auto=format', // Road access
    Satellite: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop&q=80&auto=format', // Satellite view
  }
  
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
        <Link to={backTo} className="flex items-center gap-2 p-4 text-gray-400 hover:text-white transition-colors">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </Link>
      </header>

      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{contextLabel}</h1>
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
                  className="w-full flex-shrink-0 aspect-video bg-surface-elevated relative overflow-hidden"
                >
                  {blueprint === 'Road' ? (
                    /* Custom Road Access View */
                    <div className="w-full h-full relative">
                      {/* Background grid pattern */}
                      <div className="absolute inset-0 opacity-30" style={{
                        backgroundImage: `
                          linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
                        `,
                        backgroundSize: '24px 24px',
                      }} />
                      
                      {/* Main Road - Horizontal */}
                      <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2">
                        <div className="h-12 bg-gray-700 relative">
                          {/* Road markings */}
                          <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-0.5 flex gap-4 px-2">
                            {[...Array(12)].map((_, i) => (
                              <div key={i} className="flex-1 h-full bg-yellow-500/60" />
                            ))}
                          </div>
                          {/* Road label */}
                          <div className="absolute -top-6 left-4 text-[10px] text-gray-400 uppercase tracking-wider">
                            {plot.roadWidth} Wide Road
                          </div>
                        </div>
                      </div>
                      
                      {/* Access Road - Vertical */}
                      <div className="absolute top-0 left-1/3 bottom-1/2 w-8 bg-gray-600">
                        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 flex flex-col gap-2 py-2">
                          {[...Array(6)].map((_, i) => (
                            <div key={i} className="flex-1 w-full bg-yellow-500/40" />
                          ))}
                        </div>
                      </div>
                      
                      {/* Plot Position */}
                      <div className="absolute top-8 left-1/3 ml-12 w-24 h-16 border-2 border-gold bg-gold/10 flex items-center justify-center">
                        <div className="text-center">
                          <span className="text-lg font-bold text-gold">{plot.id}</span>
                          <p className="text-[10px] text-gray-400">Your Plot</p>
                        </div>
                      </div>
                      
                      {/* Adjacent Plots */}
                      <div className="absolute top-8 left-1/3 ml-40 w-20 h-16 border border-gray-600 bg-gray-800/50 flex items-center justify-center">
                        <span className="text-xs text-gray-500">S15</span>
                      </div>
                      <div className="absolute top-8 right-8 w-20 h-16 border border-gray-600 bg-gray-800/50 flex items-center justify-center">
                        <span className="text-xs text-gray-500">S16</span>
                      </div>
                      
                      {/* Distance marker */}
                      <div className="absolute bottom-1/2 left-1/3 ml-4 translate-y-8">
                        <div className="flex items-center gap-1">
                          <div className="w-6 h-px bg-violet" />
                          <span className="text-[10px] text-violet font-medium">{plot.distanceToRoad}</span>
                        </div>
                        <p className="text-[9px] text-gray-500 mt-0.5">to main road</p>
                      </div>
                      
                      {/* Compass */}
                      <div className="absolute top-4 right-4 w-8 h-8 border border-gray-600 flex items-center justify-center bg-surface/80">
                        <span className="text-xs text-gray-400 font-medium">N</span>
                      </div>
                      
                      {/* Road label bottom */}
                      <div className="absolute bottom-4 left-4 bg-black/70 px-3 py-1.5 rounded backdrop-blur-sm">
                        <p className="text-xs font-medium text-white uppercase tracking-wider">Road Access View</p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <img
                        src={blueprintImages[blueprint]}
                        alt={`${blueprint} Blueprint for ${plot.id}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback if image fails to load
                          e.target.style.display = 'none'
                          e.target.parentElement.innerHTML = `
                            <div class="w-full h-full flex items-center justify-center">
                              <div class="text-center">
                                <span class="text-4xl font-bold text-gold/30">${plot.id}</span>
                                <p class="text-gray-600 text-sm mt-1">${blueprint} Blueprint</p>
                              </div>
                            </div>
                          `
                        }}
                      />
                      {/* Overlay with plot ID */}
                      <div className="absolute top-4 left-4 bg-black/70 px-3 py-1.5 rounded backdrop-blur-sm">
                        <span className="text-sm font-bold text-gold">{plot.id}</span>
                      </div>
                      {/* Blueprint label overlay */}
                      <div className="absolute bottom-4 left-4 bg-black/70 px-3 py-1.5 rounded backdrop-blur-sm">
                        <p className="text-xs font-medium text-white uppercase tracking-wider">{blueprint} Blueprint</p>
                      </div>
                    </>
                  )}
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
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-3">Location Highlights</h3>
          <div className="flex flex-wrap gap-2">
            {plot.location.map(({ label, dist }) => (
              <span key={label} className="chip border-border text-gray-400">
                {label} {dist}
              </span>
            ))}
          </div>
        </div>

        {/* Trust Snapshot */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-3">Trust Snapshot</h3>
          <div className="grid grid-cols-2 gap-2">
            {plot.trust.map((item) => (
              <div key={item} className="card p-4 flex items-center gap-2 text-sm">
                <span className="text-success">✔</span>
                <span className="text-gray-300">{item}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Plots Layout Blueprint */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Plots Layout</h3>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleZoom(-0.1)}
                className="w-7 h-7 rounded border border-border bg-surface flex items-center justify-center text-gray-400 hover:text-gold hover:border-gold transition-colors"
                aria-label="Zoom out"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
                </svg>
              </button>
              <span className="text-xs text-gray-500 min-w-[3rem] text-center">{Math.round(zoom * 100)}%</span>
              <button
                onClick={() => handleZoom(0.1)}
                className="w-7 h-7 rounded border border-border bg-surface flex items-center justify-center text-gray-400 hover:text-gold hover:border-gold transition-colors"
                aria-label="Zoom in"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                </svg>
              </button>
              <button
                onClick={() => { setZoom(1); setPanX(0); setPanY(0); }}
                className="w-7 h-7 rounded border border-border bg-surface flex items-center justify-center text-gray-400 hover:text-gold hover:border-gold transition-colors ml-1"
                aria-label="Reset view"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="card overflow-hidden">
            <div
              ref={plotLayoutRef}
              className="relative overflow-hidden bg-surface-elevated border border-border select-none"
              style={{ height: '300px', cursor: isPanning ? 'grabbing' : 'grab', userSelect: 'none' }}
              onMouseDown={handlePanStart}
              onSelectStart={(e) => e.preventDefault()}
              onContextMenu={(e) => e.preventDefault()}
              onMouseMove={handlePanMove}
              onMouseUp={handlePanEnd}
              onMouseLeave={handlePanEnd}
              onTouchStart={handlePanStart}
              onTouchMove={handlePanMove}
              onTouchEnd={handlePanEnd}
              onWheel={(e) => {
                e.preventDefault()
                handleZoom(e.deltaY > 0 ? -0.1 : 0.1)
              }}
            >
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center select-none"
                  style={{
                    transform: `translate(${panX}px, ${panY}px) scale(${zoom})`,
                    transformOrigin: 'center center',
                    transition: isPanning ? 'none' : 'transform 0.1s ease-out',
                    padding: '12px',
                  }}
                >
                  {/* Main horizontal road at top */}
                  <div className="w-full h-4 bg-gray-600/50 rounded-sm flex items-center justify-center relative border border-gray-500/30 mb-1">
                    <div className="absolute inset-0 flex items-center justify-center gap-3">
                      <div className="h-0.5 w-12 bg-gray-400/60" />
                      <div className="h-0.5 w-12 bg-gray-400/60" />
                    </div>
                    <span className="text-[9px] text-gray-400 font-medium absolute right-2">Main Road</span>
                  </div>
                  
                  {plotLayout.map((row, rowIndex) => (
                    <div key={rowIndex} className="w-full">
                      <div className="flex gap-1">
                        {/* Main vertical road on left */}
                        <div className="w-4 h-12 bg-gray-600/50 rounded-sm flex flex-col items-center justify-center relative border border-gray-500/30">
                          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                            <div className="w-0.5 h-6 bg-gray-400/60" />
                            <div className="w-0.5 h-6 bg-gray-400/60" />
                          </div>
                        </div>
                        
                        {/* Plots row */}
                        <div className="flex gap-1 flex-1">
                          {row.map((plotId, colIndex) => {
                            const status = getPlotStatus(plotId)
                            
                            return (
                              <div key={plotId} className="flex items-center">
                                <div
                                  className={`
                                    w-12 h-12 flex items-center justify-center text-[10px] font-bold
                                    border-2 transition-all cursor-pointer relative z-10 pointer-events-auto
                                    ${status === 'selected' 
                                      ? 'bg-gold/20 border-gold text-gold shadow-lg shadow-gold/20' 
                                      : status === 'booked'
                                      ? 'bg-gray-700 border-gray-600 text-gray-500 opacity-50'
                                      : status === 'high-interest'
                                      ? 'bg-gold/10 border-gold/50 text-gold/70 hover:bg-gold/20'
                                      : 'bg-surface border-border text-gray-400 hover:border-gold/50 hover:text-gold'
                                    }
                                  `}
                                  title={plotId}
                                >
                                  {plotId}
                                </div>
                                {/* Vertical lane separator between plots */}
                                {colIndex < row.length - 1 && (
                                  <div className="w-2 h-12 bg-gray-600/40 flex items-center justify-center relative">
                                    <div className="w-0.5 h-full bg-gray-500/50" />
                                  </div>
                                )}
                              </div>
                            )
                          })}
                        </div>
                        
                        {/* Main vertical road on right */}
                        <div className="w-4 h-12 bg-gray-600/50 rounded-sm flex flex-col items-center justify-center relative border border-gray-500/30">
                          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                            <div className="w-0.5 h-6 bg-gray-400/60" />
                            <div className="w-0.5 h-6 bg-gray-400/60" />
                          </div>
                        </div>
                      </div>
                      
                      {/* Horizontal road separator after each row */}
                      {rowIndex < plotLayout.length - 1 && (
                        <div className="w-full h-3 bg-gray-600/40 flex items-center justify-center relative mt-1 mb-1">
                          <div className="absolute inset-0 flex items-center justify-center gap-2">
                            <div className="h-0.5 w-8 bg-gray-400/50" />
                            <div className="h-0.5 w-8 bg-gray-400/50" />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {/* Main horizontal road at bottom */}
                  <div className="w-full h-4 bg-gray-600/50 rounded-sm flex items-center justify-center relative border border-gray-500/30 mt-1">
                    <div className="absolute inset-0 flex items-center justify-center gap-3">
                      <div className="h-0.5 w-12 bg-gray-400/60" />
                      <div className="h-0.5 w-12 bg-gray-400/60" />
                    </div>
                  </div>
                </div>
                
                {/* Legend */}
                <div className="absolute bottom-2 left-2 right-2 flex flex-wrap gap-3 text-[10px] bg-surface/95 backdrop-blur-sm p-2 rounded border border-border">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 border-2 border-gold bg-gold/20" />
                    <span className="text-gray-300">Selected</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 border-2 border-border bg-surface" />
                    <span className="text-gray-300">Available</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 border-2 border-gray-600 bg-gray-700 opacity-50" />
                    <span className="text-gray-300">Booked</span>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-surface-elevated border-t border-border p-6 max-w-lg mx-auto">
        <div className="flex gap-3 mb-4">
          <Link
            to={`/purchase/${plot.id}`}
            state={{ purchaseType: 'full', regionId, areaId }}
            className="btn-primary flex-1 text-center py-3"
          >
            Proceed to Purchase
          </Link>
          <Link
            to={`/purchase/${plot.id}`}
            state={{ purchaseType: 'emi', regionId, areaId }}
            className="btn-secondary flex-1 text-center py-3"
          >
            Apply for EMI
          </Link>
        </div>
        <p className="text-gray-400 text-sm text-center leading-relaxed max-w-sm mx-auto">
          Purchase initiates a legal land ownership process, not an instant transfer.
        </p>
      </div>
    </div>
  )
}
