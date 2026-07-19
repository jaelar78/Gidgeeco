import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Bell, ShoppingBag } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CookieBanner from '../components/CookieBanner'
import { useCart } from '../context/CartContext'
import { supabase, type Product } from '../lib/supabase'

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

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([])
  const [notifyEmail, setNotifyEmail] = useState('')
  const [notifyProduct, setNotifyProduct] = useState<string | null>(null)
  const [notifySent, setNotifySent] = useState(false)
  const { addItem } = useCart()

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase.from('products').select('*')
      if (data && data.length > 0) {
        setProducts(data)
      } else {
        const placeholders: Product[] = HAT_NAMES.map((name, i) => ({
          id: `placeholder-${i}`,
          name,
          description: 'Premium Australian quality. Coming soon.',
          price: 0,
          image_url: HAT_IMAGES[i],
          category: 'hats',
          stock: 0,
          coming_soon: true,
          created_at: '',
        }))
        setProducts(placeholders)
      }
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

  const handleAddToCart = (product: Product) => {
    if (product.coming_soon || product.stock <= 0) return
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url || HAT_IMAGES[0],
    })
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-28 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-brand-gold transition-colors mb-8">
          <ArrowLeft size={18} />
          Back to Home
        </Link>

        <h1 className="text-4xl md:text-5xl font-serif text-brand-dark mb-2">Shop</h1>
        <p className="text-gray-600 mb-12">Explore our range of Australian inspired hats and eco-friendly products. Limited to 87 of each design.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div key={product.id} className="group">
              <Link to={`/product/${product.id}`}>
                <div className="relative overflow-hidden rounded-lg bg-brand-light">
                  <img
                    src={product.image_url || HAT_IMAGES[index % HAT_IMAGES.length]}
                    alt={product.name}
                    className="w-full h-72 object-cover transition-transform group-hover:scale-105"
                  />
                  {product.coming_soon && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <span className="text-white text-sm font-medium uppercase tracking-wider">Coming Soon</span>
                    </div>
                  )}
                  {!product.coming_soon && product.stock > 0 && (
                    <div className="absolute top-3 right-3 bg-brand-gold text-white text-xs font-bold px-2 py-1 rounded">
                      Limited: 87
                    </div>
                  )}
                </div>
              </Link>
              <div className="mt-4">
                <Link to={`/product/${product.id}`}>
                  <h3 className="text-lg font-medium text-brand-dark hover:text-brand-gold transition-colors">{product.name}</h3>
                </Link>
                <p className="text-sm text-gray-500 mt-1">{product.description}</p>
                {product.price > 0 ? (
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-lg font-medium text-brand-gold">${product.price.toFixed(2)}</p>
                    {product.stock > 0 ? (
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="flex items-center gap-2 bg-brand-dark text-white px-4 py-2 rounded text-sm hover:bg-black transition-colors"
                      >
                        <ShoppingBag size={14} />
                        Add to Cart
                      </button>
                    ) : (
                      <span className="text-xs text-red-500">Out of Stock</span>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => setNotifyProduct(product.name)}
                    className="mt-2 text-sm text-brand-gold hover:underline flex items-center gap-1"
                  >
                    <Bell size={14} />
                    Notify Me
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">Products coming soon. Check back shortly!</p>
          </div>
        )}
      </div>

      {/* Notify Modal */}
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

      <Footer />
      <CookieBanner />
    </div>
  )
}
