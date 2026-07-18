import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase, type Product } from '../lib/supabase'
import { Clock } from 'lucide-react'
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
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[75vh] min-h-[550px] flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1527431293370-0fd6b297b54a?w=1920&h=1080&fit=crop"
            alt="Australian outback"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 mx-4">
          <div className="bg-white/95 px-10 py-10 md:px-14 md:py-12 text-center max-w-[460px]">
            <p className="text-sm text-[#5a4a3a] mb-3 tracking-wide">Sales@gidgeeco.au</p>
            <h1 className="font-serif text-[42px] md:text-[48px] text-[#8B6914] mb-1 leading-tight">
              Gidgee & Co
            </h1>
            <h2 className="font-serif text-[28px] md:text-[32px] text-[#8B6914] mb-5">
              Premium Australian Hats
            </h2>
            <p className="text-[#5a4a3a] text-[13px] md:text-[14px] mb-7 leading-relaxed max-w-sm mx-auto">
              Explore our range of Australian inspired hats, eco friendly storage boxes and an all round great Australian experience.
            </p>
            <Link 
              to="/shop" 
              className="inline-block bg-[#8B6914] text-white px-10 py-3 text-[11px] tracking-[0.2em] uppercase font-medium rounded-full hover:bg-[#6b5010] transition"
            >
              SHOP NOW
            </Link>
          </div>
        </div>
      </section>

      {/* Our Passion Section */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-center mb-14">
            <div className="h-px bg-[#8B6914]/30 w-[100px]"></div>
            <h2 className="font-serif text-[28px] text-[#8B6914] mx-6">Our Passion</h2>
            <div className="h-px bg-[#8B6914]/30 w-[100px]"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-4xl mx-auto">
            <div>
              <img
                src="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=500&h=600&fit=crop"
                alt="Australian outback lifestyle"
                className="w-full h-auto"
              />
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-[15px] text-[#3a2a1a] mb-3 font-normal">Why Hats?</h3>
              <p className="text-[13px] text-[#5a4a3a] leading-[1.7]">
                At Gidgee & Co, we believe that hats are more than just an accessory. They are a way to express yourself and show the world who you are. That's why we are passionate about hats and everything they represent.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-[#FAF5ED]">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-center mb-10">
            <div className="h-px bg-[#8B6914]/30 w-[100px]"></div>
            <h2 className="font-serif text-[28px] text-[#8B6914] mx-6">Featured Products</h2>
            <div className="h-px bg-[#8B6914]/30 w-[100px]"></div>
          </div>

          <p className="text-center text-[13px] text-[#5a4a3a] mb-10">New products are coming soon!</p>

          {loading ? (
            <p className="text-center text-[13px] text-[#5a4a3a]">Loading...</p>
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
                    <h3 className="font-serif text-[#8B6914] text-[15px] mb-1">{product.name}</h3>
                    <p className="text-[11px] text-[#5a4a3a] mb-2">{product.short_description}</p>
                    <div className="flex items-center justify-center gap-2">
                      {product.sale_price ? (
                        <>
                          <span className="text-[#5a4a3a] line-through text-[11px]">A${product.price}</span>
                          <span className="text-[#8B6914] font-medium text-[13px]">A${product.sale_price}</span>
                        </>
                      ) : (
                        <span className="text-[#8B6914] font-medium text-[13px]">A${product.price}</span>
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
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-center mb-14">
            <div className="h-px bg-[#8B6914]/30 w-[100px]"></div>
            <h2 className="font-serif text-[28px] text-[#8B6914] mx-6">Explore Our Hat Collection</h2>
            <div className="h-px bg-[#8B6914]/30 w-[100px]"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
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
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <ContactForm />
            </div>
            <div className="flex flex-col justify-start">
              <div className="mb-8">
                <p className="text-[15px] text-[#3a2a1a] mb-6 leading-relaxed">
                  For sale inquiries, please contact us; we will respond during business hours.
                </p>
                <div className="space-y-1.5 text-[13px] text-[#5a4a3a]">
                  <div className="flex items-center gap-2">
                    <span>Mon</span>
                    <span>09:00 am – 05:00 pm</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>Tue</span>
                    <span>09:00 am – 05:00 pm</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>Wed</span>
                    <span>09:00 am – 05:00 pm</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>Thu</span>
                    <span>09:00 am – 05:00 pm</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>Fri</span>
                    <span>09:00 am – 05:00 pm</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>Sat</span>
                    <span>09:00 am – 05:00 pm</span>
                  </div>
                  <div className="flex items-center gap-2 font-semibold">
                    <span>Sun</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social */}
      <section className="py-16 bg-white border-t border-[#F5F0E8]">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-10">
            <div className="h-px bg-[#8B6914]/30 flex-1 max-w-[150px]"></div>
            <h2 className="font-serif text-[28px] text-[#8B6914] mx-6">Social</h2>
            <div className="h-px bg-[#8B6914]/30 flex-1 max-w-[150px]"></div>
          </div>
          <div className="flex justify-center gap-8">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="transition hover:opacity-80">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="transition hover:opacity-80">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="#E4405F">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Keep in Touch */}
      <section className="py-16 bg-white border-t border-[#F5F0E8]">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <h2 className="font-serif text-[24px] text-[#8B6914] md:w-[200px] md:text-right">Keep in Touch</h2>
            <form onSubmit={handleNewsletter} className="flex flex-1 gap-0 max-w-md w-full">
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 border border-[#8B6914]/20 bg-[#FAF5ED] text-[13px] text-[#5a4a3a] placeholder-[#5a4a3a]/50 focus:outline-none focus:border-[#8B6914] transition"
                required
              />
              <button
                type="submit"
                disabled={subscribeStatus === 'submitting'}
                className="px-8 py-3 bg-[#8B6914] text-white text-[11px] tracking-[0.2em] uppercase font-medium rounded-r-full hover:bg-[#6b5010] transition disabled:opacity-50"
              >
                SIGN UP
              </button>
            </form>
          </div>
          {subscribeStatus === 'success' && (
            <p className="text-green-600 text-[12px] mt-3 text-center">Get 10% off your first purchase when you sign up for our newsletter!</p>
          )}
        </div>
      </section>
    </div>
  )
}
