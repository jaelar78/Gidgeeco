import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase, type Product } from '../lib/supabase'
import { ArrowRight, Clock, MapPin, Facebook, Instagram } from 'lucide-react'
import ContactForm from '../components/ContactForm'

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  useEffect(() => {
    fetchFeaturedProducts()
  }, [])

  async function fetchFeaturedProducts() {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*, category:categories(name, slug), images:product_images(*)')
        .eq('featured', true)
        .in('status', ['active', 'coming_soon'])
        .order('created_at', { ascending: false })
        .limit(4)

      if (error) throw error
      setFeaturedProducts(data || [])
    } catch (err) {
      console.error('Error fetching products:', err)
    } finally {
      setLoading(false)
    }
  }

  async function handleNewsletter(e: React.FormEvent) {
    e.preventDefault()
    setSubscribeStatus('submitting')
    try {
      const { error } = await supabase.from('newsletter_subscribers').insert([{ email, source: 'website' }])
      if (error) throw error
      setSubscribeStatus('success')
      setEmail('')
      setTimeout(() => setSubscribeStatus('idle'), 5000)
    } catch (err) {
      console.error('Error subscribing:', err)
      setSubscribeStatus('error')
    }
  }

  return (
    <div>
      {/* Hero Section - Exact match to original */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1527431293370-0fd6b297b54a?w=1920&h=1080&fit=crop"
            alt="Australian outback"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        <div className="relative z-10 mx-4">
          <div className="bg-white/90 backdrop-blur-sm px-8 py-10 md:px-16 md:py-14 text-center max-w-xl">
            <p className="text-sm text-[#5a4a3a] mb-3 tracking-wide">Sales@gidgeeco.au</p>
            <h1 className="font-serif text-4xl md:text-5xl text-[#8B6914] mb-1 leading-tight">
              Gidgee & Co
            </h1>
            <h2 className="font-serif text-2xl md:text-3xl text-[#8B6914] mb-4">
              Premium Australian Hats
            </h2>
            <p className="text-[#5a4a3a] text-sm md:text-base mb-6 leading-relaxed max-w-md mx-auto">
              Explore our range of Australian inspired hats, eco friendly storage boxes and an all round great Australian experience.
            </p>
            <Link to="/shop" className="inline-block bg-[#8B6914] text-white px-10 py-3 text-sm tracking-widest uppercase font-medium hover:bg-[#6b5010] transition">
              SHOP NOW
            </Link>
          </div>
        </div>
      </section>

      {/* Our Passion Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-6 mb-14">
            <div className="h-px w-24 bg-[#8B6914]/30"></div>
            <h2 className="font-serif text-3xl text-[#8B6914] text-center">Our Passion</h2>
            <div className="h-px w-24 bg-[#8B6914]/30"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div className="relative overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&h=750&fit=crop"
                alt="Australian outback lifestyle"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="text-center md:text-left">
              <h3 className="font-serif text-2xl text-[#5a4a3a] mb-4">Why Hats?</h3>
              <p className="text-[#5a4a3a] leading-relaxed mb-4 text-sm">
                At Gidgee & Co, we believe that hats are more than just an accessory. They are a way to express yourself and show the world who you are. That's why we are passionate about hats and everything they represent.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-[#FAF5ED]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-6 mb-14">
            <div className="h-px w-24 bg-[#8B6914]/30"></div>
            <h2 className="font-serif text-3xl text-[#8B6914] text-center">Featured Products</h2>
            <div className="h-px w-24 bg-[#8B6914]/30"></div>
          </div>

          <p className="text-center text-[#5a4a3a] text-sm mb-10">New products are coming soon!</p>

          {loading ? (
            <p className="text-center text-[#5a4a3a]">Loading...</p>
          ) : featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/shop/${product.slug}`}
                  className="group bg-white overflow-hidden shadow-sm hover:shadow-md transition"
                >
                  <div className="aspect-square overflow-hidden bg-[#F5F0E8]">
                    <img
                      src={product.images?.[0]?.image_url || 'https://via.placeholder.com/400?text=Coming+Soon'}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="font-serif text-[#8B6914] text-base mb-1">{product.name}</h3>
                    <p className="text-xs text-[#5a4a3a] mb-2">{product.short_description}</p>
                    <div className="flex items-center justify-center gap-2">
                      {product.sale_price ? (
                        <>
                          <span className="text-[#5a4a3a] line-through text-sm">A${product.price}</span>
                          <span className="text-[#8B6914] font-bold">A${product.sale_price}</span>
                        </>
                      ) : (
                        <span className="text-[#8B6914] font-bold">A${product.price}</span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      {/* Explore Our Hat Collection */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-6 mb-14">
            <div className="h-px w-24 bg-[#8B6914]/30"></div>
            <h2 className="font-serif text-3xl text-[#8B6914] text-center">Explore Our Hat Collection</h2>
            <div className="h-px w-24 bg-[#8B6914]/30"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1,2,3,4].map((i) => (
              <div key={i} className="aspect-square bg-[#F5F0E8] overflow-hidden">
                <img
                  src={`https://images.unsplash.com/photo-${i === 1 ? '1521369909024-e0c7f3c603e4' : i === 2 ? '1572308000758-8fbe1e8ad9f8' : i === 3 ? '1514327602112-1f66118c0d11' : '1544967082-d68e7c5b7d8d'}?w=400&h=400&fit=crop`}
                  alt={`Hat collection ${i}`}
                  className="w-full h-full object-cover hover:scale-105 transition duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-[#FAF5ED]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <ContactForm />
            </div>
            <div className="flex flex-col justify-start">
              <div className="mb-8">
                <p className="text-[#5a4a3a] mb-6">
                  For sale inquiries, please contact us; we will respond during business hours.
                </p>
                <div className="space-y-2 text-sm text-[#5a4a3a]">
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-[#8B6914]" />
                    <span>Mon 09:00 am – 05:00 pm</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-[#8B6914]" />
                    <span>Tue 09:00 am – 05:00 pm</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-[#8B6914]" />
                    <span>Wed 09:00 am – 05:00 pm</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-[#8B6914]" />
                    <span>Thu 09:00 am – 05:00 pm</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-[#8B6914]" />
                    <span>Fri 09:00 am – 05:00 pm</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-[#8B6914]" />
                    <span>Sat 09:00 am – 05:00 pm</span>
                  </div>
                  <div className="flex items-center gap-2 font-medium">
                    <Clock size={14} className="text-[#8B6914]" />
                    <span>Sun Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social */}
      <section className="py-12 bg-white border-t border-[#F5F0E8]">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-6 mb-8">
            <div className="h-px w-24 bg-[#8B6914]/30"></div>
            <h2 className="font-serif text-3xl text-[#8B6914]">Social</h2>
            <div className="h-px w-24 bg-[#8B6914]/30"></div>
          </div>
          <div className="flex justify-center gap-6">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-[#1877F2] hover:opacity-80 transition">
              <Facebook size={32} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[#E4405F] hover:opacity-80 transition">
              <Instagram size={32} />
            </a>
          </div>
        </div>
      </section>

      {/* Keep in Touch / Newsletter */}
      <section className="py-16 bg-white border-t border-[#F5F0E8]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-serif text-2xl text-[#8B6914] mb-2">Keep in Touch</h2>
          <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto mt-6">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 border border-[#8B6914]/20 bg-[#FAF5ED] text-[#5a4a3a] placeholder-[#5a4a3a]/50 focus:outline-none focus:border-[#8B6914] transition"
              required
            />
            <button
              type="submit"
              disabled={subscribeStatus === 'submitting'}
              className="px-8 py-3 bg-[#8B6914] text-white text-sm tracking-widest uppercase font-medium hover:bg-[#6b5010] transition disabled:opacity-50"
            >
              SIGN UP
            </button>
          </form>
          {subscribeStatus === 'success' && (
            <p className="text-green-600 text-sm mt-3">Get 10% off your first purchase when you sign up for our newsletter!</p>
          )}
        </div>
      </section>
    </div>
  )
}
