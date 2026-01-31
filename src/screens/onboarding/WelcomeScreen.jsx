import { Link } from 'react-router-dom'

export default function WelcomeScreen() {
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
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            <span>Every piece of</span>
            <br />
            <span className="font-bold">land</span>
            <br />
            <span className="italic">carries a</span>
            <br />
            <span className="italic">future.</span>
          </h1>
          
          <p className="text-gray-400 text-sm leading-relaxed mt-4">
            Not just a location. A decision. A commitment. A legacy.
          </p>
        </div>

        {/* Images Section */}
        <div className="flex-1 flex flex-col gap-4 my-8">
          {/* Top row - two images side by side */}
          <div className="flex gap-3">
            <div className="flex-1 aspect-[4/3] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop&q=80"
                alt="Developed plots"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 aspect-[4/3] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=600&fit=crop&q=80"
                alt="Agricultural fields"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* Bottom image - larger */}
          <div className="w-full aspect-[16/9] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1541888946425-d81bb19241f5?w=800&h=600&fit=crop&q=80"
              alt="Land development"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* CTA Button */}
        <div className="pb-8">
          <Link
            to="/onboarding/account"
            className="btn-primary block w-full text-center py-4"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  )
}
