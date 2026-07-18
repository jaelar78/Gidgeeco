import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CookieBanner from '../components/CookieBanner'

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-28 pb-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-brand-gold transition-colors mb-8">
          <ArrowLeft size={18} />
          Back to Home
        </Link>

        <div className="relative h-80 rounded-lg overflow-hidden mb-12">
          <img
            src="https://img1.wsimg.com/isteam/getty/1269854923/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:600,cg:true"
            alt="Australian outback"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <h1 className="text-4xl md:text-5xl font-serif text-white">About Us</h1>
          </div>
        </div>

        <div className="space-y-6 text-gray-600 leading-relaxed">
          <h2 className="text-2xl font-serif text-brand-dark">Our Story</h2>
          <p>
            Gidgee & Co was born from a love of the Australian outback and a passion for quality craftsmanship. We believe that the perfect hat is more than just an accessory — it's a companion for life's adventures.
          </p>
          <p>
            Our founders spent years exploring the rugged landscapes of Australia, from the red deserts of the centre to the tropical north. Along the way, they discovered that the best hats were those made by local artisans who understood the unique demands of the Australian climate.
          </p>

          <h2 className="text-2xl font-serif text-brand-dark pt-4">Our Mission</h2>
          <p>
            We are committed to bringing the finest Australian hats to the world while supporting local communities and sustainable practices. Every hat we sell is crafted with care, using materials that are kind to the environment.
          </p>
          <p>
            Our eco-friendly storage boxes are made from recycled and sustainable materials, reflecting our dedication to preserving the landscapes that inspire our designs.
          </p>

          <h2 className="text-2xl font-serif text-brand-dark pt-4">Why Gidgee & Co?</h2>
          <ul className="space-y-2 list-disc list-inside">
            <li>Australian owned and operated</li>
            <li>Sustainable and eco-friendly materials</li>
            <li>Handcrafted by local artisans</li>
            <li>Designed for the Australian climate</li>
            <li>Premium quality at fair prices</li>
          </ul>
        </div>
      </div>

      <Footer />
      <CookieBanner />
    </div>
  )
}
