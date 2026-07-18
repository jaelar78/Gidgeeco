import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase, type Product, type ProductInterest } from '../lib/supabase'
import { ArrowLeft, ShoppingBag, Bell, CheckCircle, AlertCircle } from 'lucide-react'

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [notifyEmail, setNotifyEmail] = useState('')
  const [notifyName, setNotifyName] = useState('')
  const [notifyStatus, setNotifyStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  useEffect(() => {
    if (slug) fetchProduct()
  }, [slug])

  async function fetchProduct() {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*, category:categories(name, slug), images:product_images(*)')
        .eq('slug', slug)
        .single()

      if (error) throw error
      setProduct(data)
    } catch (err) {
      console.error('Error fetching product:', err)
    } finally {
      setLoading(false)
    }
  }

  async function handleNotifyMe(e: React.FormEvent) {
    e.preventDefault()
    if (!product) return

    setNotifyStatus('submitting')
    try {
      const interest: ProductInterest = {
        product_id: product.id,
        email: notifyEmail,
        name: notifyName
      }

      const { error } = await supabase
        .from('product_interests')
        .insert([interest])

      if (error) throw error

      setNotifyStatus('success')
      setNotifyEmail('')
      setNotifyName('')
      setTimeout(() => setNotifyStatus('idle'), 5000)
    } catch (err) {
      console.error('Error submitting interest:', err)
      setNotifyStatus('error')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gidgee-cream">
        <p className="text-gidgee-dark">Loading product...</p>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gidgee-cream">
        <div className="text-center">
          <p className="text-gidgee-dark text-lg mb-4">Product not found.</p>
          <Link to="/shop" className="btn-primary">
            Back to Shop
          </Link>
        </div>
      </div>
    )
  }

  const isComingSoon = product.status === 'coming_soon'
  const primaryImage = product.images?.find(img => img.is_primary) || product.images?.[0]

  return (
    <div className="min-h-screen bg-gidgee-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link to="/shop" className="inline-flex items-center gap-2 text-gidgee-brown hover:text-gidgee-gold transition mb-8">
          <ArrowLeft size={16} />
          Back to Shop
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-sm bg-gidgee-sand">
              <img
                src={primaryImage?.image_url || 'https://via.placeholder.com/600?text=Coming+Soon'}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((img) => (
                  <div key={img.id} className="aspect-square overflow-hidden rounded-sm bg-gidgee-sand">
                    <img
                      src={img.image_url}
                      alt={img.alt_text || product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <p className="text-sm text-gidgee-brown/60 uppercase tracking-wider mb-2">
              {product.category?.name}
            </p>
            <h1 className="font-serif text-4xl text-gidgee-brown mb-4">{product.name}</h1>

            <div className="flex items-center gap-3 mb-6">
              {product.sale_price ? (
                <>
                  <span className="text-gidgee-dark/50 line-through text-xl">A${product.price}</span>
                  <span className="text-gidgee-brown font-bold text-3xl">A${product.sale_price}</span>
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-sm">SALE</span>
                </>
              ) : (
                <span className="text-gidgee-brown font-bold text-3xl">A${product.price}</span>
              )}
            </div>

            <p className="text-gidgee-dark leading-relaxed mb-8">
              {product.description}
            </p>

            {product.tags && product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {product.tags.map((tag) => (
                  <span key={tag} className="bg-gidgee-sand text-gidgee-dark text-xs px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {isComingSoon ? (
              <div className="bg-gidgee-sand p-6 rounded-sm">
                <div className="flex items-center gap-2 text-gidgee-brown mb-4">
                  <Bell size={20} />
                  <span className="font-medium">Coming Soon - Notify Me</span>
                </div>
                <p className="text-sm text-gidgee-dark mb-4">
                  This product is not yet available. Leave your details and we'll let you know when it's ready!
                </p>

                <form onSubmit={handleNotifyMe} className="space-y-3">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={notifyName}
                    onChange={(e) => setNotifyName(e.target.value)}
                    className="w-full px-4 py-3 border border-gidgee-brown/20 rounded-sm bg-white focus:outline-none focus:border-gidgee-brown transition"
                  />
                  <input
                    type="email"
                    placeholder="Your Email*"
                    value={notifyEmail}
                    onChange={(e) => setNotifyEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gidgee-brown/20 rounded-sm bg-white focus:outline-none focus:border-gidgee-brown transition"
                    required
                  />
                  <button
                    type="submit"
                    disabled={notifyStatus === 'submitting'}
                    className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Bell size={16} />
                    {notifyStatus === 'submitting' ? 'Submitting...' : 'NOTIFY ME'}
                  </button>
                </form>

                {notifyStatus === 'success' && (
                  <div className="flex items-center gap-2 text-green-600 mt-3">
                    <CheckCircle size={16} />
                    <span>We'll notify you when this product is available!</span>
                  </div>
                )}

                {notifyStatus === 'error' && (
                  <div className="flex items-center gap-2 text-red-600 mt-3">
                    <AlertCircle size={16} />
                    <span>Something went wrong. Please try again.</span>
                  </div>
                )}
              </div>
            ) : (
              <>
                <div className="flex items-center gap-4 mb-6">
                  <label className="text-sm text-gidgee-dark">Quantity:</label>
                  <input
                    type="number"
                    min={1}
                    max={product.inventory_count}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-20 px-3 py-2 border border-gidgee-brown/20 rounded-sm bg-white text-center"
                  />
                  <span className="text-sm text-gidgee-dark/60">
                    {product.inventory_count} in stock
                  </span>
                </div>

                <div className="flex gap-4">
                  <button className="btn-primary flex-1 flex items-center justify-center gap-2">
                    <ShoppingBag size={16} />
                    BUY NOW
                  </button>
                  <button className="btn-outline flex-1 flex items-center justify-center gap-2">
                    <ShoppingBag size={16} />
                    ADD TO CART
                  </button>
                </div>
              </>
            )}

            <div className="mt-8 pt-8 border-t border-gidgee-sand">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gidgee-dark/60">SKU: </span>
                  <span className="text-gidgee-dark">{product.sku || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-gidgee-dark/60">Category: </span>
                  <span className="text-gidgee-dark">{product.category?.name}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
