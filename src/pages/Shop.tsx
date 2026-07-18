import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { supabase, type Product } from '../lib/supabase'
import { Filter, ShoppingBag } from 'lucide-react'

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<{ id: string; name: string; slug: string }[]>([])
  const [loading, setLoading] = useState(true)
  const [searchParams] = useSearchParams()
  const categoryFilter = searchParams.get('category')

  useEffect(() => {
    fetchCategories()
    fetchProducts()
  }, [categoryFilter])

  async function fetchCategories() {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('id, name, slug')
        .order('sort_order', { ascending: true })

      if (error) throw error
      setCategories(data || [])
    } catch (err) {
      console.error('Error fetching categories:', err)
    }
  }

  async function fetchProducts() {
    setLoading(true)
    try {
      let query = supabase
        .from('products')
        .select('*, category:categories(name, slug), images:product_images(*)')
        .in('status', ['active', 'coming_soon'])
        .order('created_at', { ascending: false })

      if (categoryFilter) {
        query = query.eq('category.slug', categoryFilter)
      }

      const { data, error } = await query

      if (error) throw error
      setProducts(data || [])
    } catch (err) {
      console.error('Error fetching products:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gidgee-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="h-px w-16 bg-gidgee-brown/30"></div>
          <h1 className="font-serif text-4xl text-gidgee-brown">Shop</h1>
          <div className="h-px w-16 bg-gidgee-brown/30"></div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          <Link
            to="/shop"
            className={`px-4 py-2 rounded-sm text-sm font-medium transition ${
              !categoryFilter
                ? 'bg-gidgee-brown text-white'
                : 'bg-white text-gidgee-brown hover:bg-gidgee-brown/10'
            }`}
          >
            <Filter size={14} className="inline mr-1" />
            All
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/shop?category=${cat.slug}`}
              className={`px-4 py-2 rounded-sm text-sm font-medium transition ${
                categoryFilter === cat.slug
                  ? 'bg-gidgee-brown text-white'
                  : 'bg-white text-gidgee-brown hover:bg-gidgee-brown/10'
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-12 text-gidgee-dark">Loading products...</div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Link
                key={product.id}
                to={`/shop/${product.slug}`}
                className="group bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-md transition"
              >
                <div className="relative aspect-square overflow-hidden bg-gidgee-sand">
                  <img
                    src={product.images?.[0]?.image_url || 'https://via.placeholder.com/400?text=Coming+Soon'}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  {product.status === 'coming_soon' && (
                    <div className="absolute top-3 left-3 bg-gidgee-brown text-white text-xs px-2 py-1 rounded-sm">
                      Coming Soon
                    </div>
                  )}
                  {product.sale_price && (
                    <div className="absolute top-3 right-3 bg-red-500 text-white text-xs px-2 py-1 rounded-sm">
                      Sale
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <p className="text-xs text-gidgee-brown/60 uppercase tracking-wider mb-1">
                    {product.category?.name}
                  </p>
                  <h3 className="font-serif text-gidgee-brown text-xl mb-2">{product.name}</h3>
                  <p className="text-sm text-gidgee-dark mb-3 line-clamp-2">{product.short_description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {product.sale_price ? (
                        <>
                          <span className="text-gidgee-dark/50 line-through text-sm">A${product.price}</span>
                          <span className="text-gidgee-brown font-bold text-lg">A${product.sale_price}</span>
                        </>
                      ) : (
                        <span className="text-gidgee-brown font-bold text-lg">A${product.price}</span>
                      )}
                    </div>
                    <span className="text-gidgee-brown hover:text-gidgee-gold transition">
                      <ShoppingBag size={20} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gidgee-dark text-lg mb-4">No products available yet.</p>
            <p className="text-gidgee-dark/60">New products are coming soon! Sign up for our newsletter to be notified.</p>
          </div>
        )}
      </div>
    </div>
  )
}
