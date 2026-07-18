import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, Clock, Mail, MapPin, Bell } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Newsletter from '../components/Newsletter'
import ContactForm from '../components/ContactForm'
import CookieBanner from '../components/CookieBanner'
import { supabase } from '../lib/supabase'
import type { Product } from '../lib/supabase'

const HAT_IMAGES = [
  '/images/hat-1.jpg',
  '/images/hat-2.jpg',
  '/images/hat-3.jpg',
  '/images/hat-4.jpg',
  '/images/hat-5.jpg',
]

const HAT_NAMES = [
  'Classic Australian Outback Hat',
  'Eco Friendly Storage Box',
  'Premium Leather Hat',
  'Wide Brim Sun Hat',
  'Canvas Adventure Hat',
]

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [notifyEmail, setNotifyEmail] = useState('')
  const [notifyProduct, setNotifyProduct] = useState<string | null>(null)
  const [notifySent, setNotifySent] = useState(false)

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase.from('products').select('*').limit(10)
      if (data) setProducts(data)
    }
    fetchProducts()
  }, [])

  const handleNotify = async (e: React.FormEvent, productName: string) => {
    e.preventDefault()
    if (!notifyEmail) return
    await supabase.from('interests').insert({
      email: notifyEmail,
      product_name: productName,
    })
    setNotifySent(true)
    setNotifyEmail('')
    setTimeout(() => {
      setNotifyProduct(null)
      setNotifySent(false)
    }, 2000)
  }

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  const featuredProducts = products.length > 0 ? products.slice(0, 5) : HAT_NAMES.map((name, i) => ({
    id: `placeholder-${i}`,
    name,
    description: 'Coming soon - premium Australian quality.',
    price: 0,
    image_url: HAT_IMAGES[i],
    category: 'hats',
    stock: 0,
    coming_soon: true,
    created_at: '',
  }))

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/images/hero.jpg')`,
          }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-serif mb-4">Gidgee & Co</h1>
          <p className="text-xl md:text-2xl font-light mb-2">Premium Australian Hats</p>
          <p className="text-base md:text-lg font-light opacity-90 max-w-2xl mx-auto">
            Explore our range of Australian inspired hats, eco friendly storage boxes and an all round great Australian experience.
          </p>
          <button
            onClick={scrollToContact}
            className="mt-8 bg-white/10 backdrop-blur-sm border border-white/30 text-white px-8 py-3 rounded-full hover:bg-white/20 transition-all flex items-center gap-2 mx-auto"
          >
            Explore Now
            <ChevronDown size={18} />
          </button>
        </div>
      </section>

      {/* Our Passion Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                src="/images/our-passion.jpg"
                alt="Australian outback passion"
                className="w-full h-[500px] object-cover rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-serif text-brand-dark mb-6">Our Passion</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  At Gidgee & Co, we are passionate about bringing the best of Australian craftsmanship to the world. Our hats are inspired by the rugged beauty of the Australian outback, designed for those who appreciate quality, durability, and style.
                </p>
                <p>
                  Every hat tells a story of the land it comes from. From the sun-baked deserts to the lush coastal ranges, our designs capture the essence of Australia's diverse landscapes. We believe in sustainable practices and work with local artisans who share our commitment to excellence.
                </p>
                <p>
                  Our eco-friendly storage boxes are crafted from recycled materials, reflecting our dedication to preserving the environment that inspires us. When you choose Gidgee & Co, you're not just buying a hat — you're becoming part of an Australian tradition.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products - First Instance */}
      <section className="py-20 bg-brand-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-serif text-brand-dark text-center mb-12">Featured Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {featuredProducts.map((product, index) => (
              <div key={`featured-1-${product.id}`} className="group relative">
                <div className="relative overflow-hidden rounded-lg bg-white shadow-sm">
                  <img
                    src={product.image_url || HAT_IMAGES[index % HAT_IMAGES.length]}
                    alt={product.name}
                    className="w-full h-64 object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white text-sm font-medium uppercase tracking-wider">Coming Soon</span>
                  </div>
                </div>
                <div className="mt-3 text-center">
                  <p className="text-sm font-medium text-brand-dark">{product.name}</p>
                  {product.coming_soon && (
                    <>
                      <p className="text-xs text-gray-500 mt-1">Coming Soon</p>
                      <button
                        onClick={() => setNotifyProduct(product.name)}
                        className="mt-2 text-xs text-brand-gold hover:underline"
                      >
                        Notify Me
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products - Second Instance */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-serif text-brand-dark text-center mb-12">Featured Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {featuredProducts.map((product, index) => (
              <div key={`featured-2-${product.id}`} className="group relative">
                <div className="relative overflow-hidden rounded-lg bg-white shadow-sm border border-gray-100">
                  <img
                    src={product.image_url || HAT_IMAGES[index % HAT_IMAGES.length]}
                    alt={product.name}
                    className="w-full h-64 object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white text-sm font-medium uppercase tracking-wider">Coming Soon</span>
                  </div>
                </div>
                <div className="mt-3 text-center">
                  <p className="text-sm font-medium text-brand-dark">{product.name}</p>
                  {product.coming_soon && (
                    <>
                      <p className="text-xs text-gray-500 mt-1">Coming Soon</p>
                      <button
                        onClick={() => setNotifyProduct(product.name)}
                        className="mt-2 text-xs text-brand-gold hover:underline"
                      >
                        Notify Me
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notify Me Modal */}
      {notifyProduct && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            {notifySent ? (
              <div className="text-center">
                <Bell className="mx-auto mb-4 text-brand-gold" size={32} />
                <h3 className="text-xl font-serif text-brand-dark mb-2">You're on the list!</h3>
                <p className="text-gray-600">We'll notify you when {notifyProduct} is available.</p>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-serif text-brand-dark mb-4">Notify Me</h3>
                <p className="text-gray-600 mb-4">Be the first to know when {notifyProduct} is in stock.</p>
                <form onSubmit={(e) => handleNotify(e, notifyProduct)}>
                  <input
                    type="email"
                    placeholder="Email Address"
                    required
                    value={notifyEmail}
                    onChange={(e) => setNotifyEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold"
                  />
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setNotifyProduct(null)}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-3 bg-brand-dark text-white rounded hover:bg-black transition-colors"
                    >
                      Notify Me
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* Hear What Our Customers Say */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif text-brand-dark mb-8">Hear What Our Customers Say</h2>
          <div className="bg-white py-12 px-8 rounded-lg shadow-sm max-w-3xl mx-auto">
            <p className="text-gray-500 text-lg italic">Reviews coming soon!</p>
          </div>
        </div>
      </section>

      {/* Contact Us */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif text-brand-dark mb-2">Contact Us</h2>
              <p className="text-gray-500 mb-8">Drop us a line!</p>
              <ContactForm />
            </div>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-serif text-brand-dark mb-4">Gidgee & Co</h3>
                <div className="space-y-3 text-gray-600">
                  <div className="flex items-center gap-3">
                    <Mail size={18} className="text-brand-gold" />
                    <span>sales@gidgeeco.au</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin size={18} className="text-brand-gold" />
                    <span>Australia</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-serif text-brand-dark mb-4">Business Hours</h3>
                <div className="space-y-2 text-gray-600">
                  <div className="flex items-center gap-3">
                    <Clock size={18} className="text-brand-gold" />
                    <div>
                      <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
                      <p>Saturday - Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Newsletter />
      <Footer />
      <CookieBanner />
    </div>
  )
}
