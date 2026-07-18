import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase, type Product } from '../lib/supabase'
import { ArrowRight, Clock, MapPin } from 'lucide-react'
import ContactForm from '../components/ContactForm'
import Newsletter from '../components/Newsletter'

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

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

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1527431293370-0fd6b297b54a?w=1920&h=1080&fit=crop")'
          }}
        >
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        <div className="relative z-10 text-center text-white px-4 max-w-3xl mx-auto">
          <p className="text-sm tracking-widest mb-4 opacity-90">Sales@gidgeeco.au</p>
          <h1 className="font-serif text-5xl md:text-7xl mb-4 leading-tight">
            Gidgee & Co
            <br />
            <span className="text-3xl md:text-5xl">Premium Australian Hats</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90 leading-relaxed">
            Explore our range of Australian inspired hats, eco friendly storage boxes and an all round great Australian experience.
          </p>
          <Link to="/shop" className="btn-primary inline-block">
            SHOP NOW
          </Link>
        </div>
      </section>

      {/* Our Passion Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="h-px w-16 bg-gidgee-brown/30"></div>
            <h2 className="section-title mb-0">Our Passion</h2>
            <div className="h-px w-16 bg-gidgee-brown/30"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
              <img
                src="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&h=1000&fit=crop"
                alt="Australian outback landscape"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center md:text-left">
              <h3 className="font-serif text-2xl text-gidgee-brown mb-4">Why Hats?</h3>
              <p className="text-gidgee-dark leading-relaxed mb-6">
                At Gidgee & Co, we believe that hats are more than just an accessory. They are a way to express yourself and show the world who you are. That's why we are passionate about hats and everything they represent.
              </p>
              <p className="text-gidgee-dark leading-relaxed">
                From the rugged outback to the bustling city streets, our hats are designed to complement every Australian lifestyle. We source the finest materials and work with skilled artisans to create pieces that last a lifetime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gidgee-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="h-px w-16 bg-gidgee-brown/30"></div>
            <h2 className="section-title mb-0">Featured Products</h2>
            <div className="h-px w-16 bg-gidgee-brown/30"></div>
          </div>

          {loading ? (
            <div className="text-center text-gidgee-dark">Loading products...</div>
          ) : featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/shop/${product.slug}`}
                  className="group bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-md transition"
                >
                  <div className="aspect-square overflow-hidden bg-gidgee-sand">
                    <img
                      src={product.images?.[0]?.image_url || 'https://via.placeholder.com/400?text=Coming+Soon'}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="font-serif text-gidgee-brown text-lg mb-1">{product.name}</h3>
                    <p className="text-sm text-gidgee-dark mb-2">{product.short_description}</p>
                    <div className="flex items-center justify-center gap-2">
                      {product.sale_price ? (
                        <>
                          <span className="text-gidgee-dark line-through text-sm">A${product.price}</span>
                          <span className="text-gidgee-brown font-bold">A${product.sale_price}</span>
                        </>
                      ) : (
                        <span className="text-gidgee-brown font-bold">A${product.price}</span>
                      )}
                    </div>
                    {product.status === 'coming_soon' && (
                      <span className="inline-block mt-2 text-xs bg-gidgee-brown/10 text-gidgee-brown px-2 py-1 rounded">
                        Coming Soon
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center text-gidgee-dark">
              <p>New products are coming soon!</p>
              <Link to="/shop" className="inline-flex items-center gap-2 text-gidgee-brown hover:text-gidgee-gold transition mt-4">
                View All Products <ArrowRight size={16} />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="h-px w-12 bg-gidgee-brown/30"></div>
                <h2 className="font-serif text-3xl text-gidgee-brown">Get in Touch</h2>
                <div className="h-px w-12 bg-gidgee-brown/30"></div>
              </div>
              <ContactForm />
            </div>
            <div className="flex flex-col justify-center">
              <div className="bg-gidgee-cream p-8 rounded-sm">
                <h3 className="font-serif text-xl text-gidgee-brown mb-4">Business Hours</h3>
                <div className="space-y-2 text-gidgee-dark">
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-gidgee-brown" />
                    <span>Mon - Sat: 9:00 am - 5:00 pm</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-gidgee-brown" />
                    <span className="font-medium">Sun: Closed</span>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="font-serif text-xl text-gidgee-brown mb-4">Visit Us</h3>
                  <div className="flex items-center gap-2 text-gidgee-dark">
                    <MapPin size={16} className="text-gidgee-brown" />
                    <span>Australia</span>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="font-serif text-xl text-gidgee-brown mb-4">Email</h3>
                  <a href="mailto:Sales@gidgeeco.au" className="text-gidgee-dark hover:text-gidgee-brown transition">
                    Sales@gidgeeco.au
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <Newsletter />
    </div>
  )
}
