import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Bell, Share2, Heart, ShoppingBag, Package } from 'lucide-react'
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

export default function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [notifyEmail, setNotifyEmail] = useState('')
  const [notifySent, setNotifySent] = useState(false)
  const [loading, setLoading] = useState(true)
  const { addItem } = useCart()

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return
      setLoading(true)
      const { data } = await supabase.from('products').select('*').eq('id', id).single()
      if (data) {
        setProduct(data)
      } else {
        const index = parseInt(id?.replace('placeholder-', '') || '0')
        const names = [
          'Classic Australian Outback Hat',
          'Eco Friendly Storage Box',
          'Premium Leather Hat',
          'Wide Brim Sun Hat',
          'Canvas Adventure Hat',
        ]
        const descriptions = [
          'A timeless outback hat crafted from premium Australian wool. Water-resistant and built to last through any adventure.',
          'Sustainable storage solutions made from recycled materials. Perfect for organizing your gear while being kind to the planet.',
          'Handcrafted leather hat with a wide brim for maximum sun protection. Ages beautifully with every wear.',
          'Lightweight and breathable sun hat with UPF 50+ protection. Ideal for long days under the Australian sun.',
          'Durable canvas hat designed for the modern explorer. Features adjustable sizing and ventilation for all-day comfort.',
        ]
        if (index >= 0 && index < 5) {
          setProduct({
            id,
            name: names[index],
            description: descriptions[index],
            price: 0,
            image_url: HAT_IMAGES[index],
            category: 'hats',
            stock: 0,
            coming_soon: true,
            created_at: '',
          })
        }
      }
      setLoading(false)
    }
    fetchProduct()
  }, [id])

  const handleNotify = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!notifyEmail || !product) return
    await supabase.from('interests').insert({
      email: notifyEmail,
      product_name: product.name,
    })
    setNotifySent(true)
    setNotifyEmail('')
    setTimeout(() => setNotifySent(false), 3000)
  }

  const handleAddToCart = () => {
    if (!product || product.coming_soon || product.stock <= 0) return
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url || HAT_IMAGES[0],
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-28 flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-gold"></div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-28 max-w-7xl mx-auto px-4 text-center py-20">
          <h1 className="text-2xl font-serif text-brand-dark mb-4">Product not found</h1>
          <Link to="/shop" className="text-brand-gold hover:underline">Back to Shop</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-28 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/shop" className="inline-flex items-center gap-2 text-gray-600 hover:text-brand-gold transition-colors mb-8">
          <ArrowLeft size={18} />
          Back to Shop
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="relative rounded-lg overflow-hidden bg-brand-light">
            <img
              src={product.image_url || HAT_IMAGES[0]}
              alt={product.name}
              className="w-full h-[500px] object-cover"
            />
            {product.coming_soon && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <span className="text-white text-lg font-medium uppercase tracking-wider">Coming Soon</span>
              </div>
            )}
            {!product.coming_soon && product.stock > 0 && (
              <div className="absolute top-4 left-4 bg-brand-gold text-white px-3 py-1 rounded text-sm font-bold">
                Limited Edition: 87 Pieces
              </div>
            )}
          </div>

          <div className="space-y-6">
            <h1 className="text-3xl md:text-4xl font-serif text-brand-dark">{product.name}</h1>
            <p className="text-gray-600 leading-relaxed">{product.description}</p>

            {!product.coming_soon && product.stock > 0 && (
              <div className="bg-brand-light p-4 rounded-lg">
                <p className="text-sm text-gray-600 flex items-center gap-2">
                  <Package size={16} className="text-brand-gold" />
                  Premium packaging included. Each item individually numbered 1/87 to 87/87.
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Hidden gidgee tree in every design — the true mark of our brand.
                </p>
              </div>
            )}

            {product.price > 0 ? (
              <div className="space-y-4">
                <p className="text-3xl font-medium text-brand-gold">${product.price.toFixed(2)}</p>
                {product.stock > 0 ? (
                  <button
                    onClick={handleAddToCart}
                    className="w-full bg-brand-dark text-white py-4 rounded font-medium hover:bg-black transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingBag size={18} />
                    Add to Cart
                  </button>
                ) : (
                  <p className="text-red-500 font-medium">Out of Stock</p>
                )}
              </div>
            ) : (
              <div className="bg-brand-light p-6 rounded-lg">
                <p className="text-brand-dark font-medium mb-2">Coming Soon</p>
                <p className="text-gray-600 text-sm mb-4">This product is not yet available. Be the first to know when it launches.</p>

                {notifySent ? (
                  <div className="flex items-center gap-2 text-brand-gold">
                    <Bell size={18} />
                    <span>We'll notify you when it's available!</span>
                  </div>
                ) : (
                  <form onSubmit={handleNotify} className="flex gap-3">
                    <input
                      type="email"
                      placeholder="Email Address"
                      required
                      value={notifyEmail}
                      onChange={(e) => setNotifyEmail(e.target.value)}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold"
                    />
                    <button
                      type="submit"
                      className="px-6 py-3 bg-brand-dark text-white rounded hover:bg-black transition-colors flex items-center gap-2"
                    >
                      <Bell size={16} />
                      Notify Me
                    </button>
                  </form>
                )}
              </div>
            )}

            <div className="flex gap-4">
              <button className="flex items-center gap-2 text-gray-600 hover:text-brand-gold transition-colors">
                <Heart size={18} />
                Save
              </button>
              <button className="flex items-center gap-2 text-gray-600 hover:text-brand-gold transition-colors">
                <Share2 size={18} />
                Share
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <CookieBanner />
    </div>
  )
}
