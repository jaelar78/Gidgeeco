import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Plus, Pencil, Trash2, LogOut, ShoppingBag, DollarSign } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CookieBanner from '../components/CookieBanner'
import { supabase, type Product } from '../lib/supabase'

type Order = {
  id: string
  customer_email: string
  customer_name: string
  shipping_address: string
  items: { id: string; name: string; price: number; quantity: number; image_url?: string }[]
  total: number
  status: string
  created_at: string
}

export default function Admin() {
  const [products, setProducts] = useState<Product[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [activeTab, setActiveTab] = useState<'products' | 'orders'>('products')

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession()
      if (data.session) setIsAuthenticated(true)
    }
    checkSession()
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts()
      fetchOrders()
    }
  }, [isAuthenticated])

  const fetchProducts = async () => {
    setLoading(true)
    const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false })
    if (data) setProducts(data)
    setLoading(false)
  }

  const fetchOrders = async () => {
    const { data } = await supabase.from('orders').select('*').order('created_at', { ascending: false })
    if (data) setOrders(data as Order[])
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setLoginError(error.message)
    } else {
      setIsAuthenticated(true)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setIsAuthenticated(false)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingProduct?.name) return

    if (editingProduct.id) {
      await supabase.from('products').update({
        name: editingProduct.name,
        description: editingProduct.description,
        price: editingProduct.price,
        image_url: editingProduct.image_url,
        category: editingProduct.category,
        stock: editingProduct.stock,
        coming_soon: editingProduct.coming_soon,
      }).eq('id', editingProduct.id)
    } else {
      await supabase.from('products').insert({
        name: editingProduct.name,
        description: editingProduct.description,
        price: editingProduct.price || 0,
        image_url: editingProduct.image_url,
        category: editingProduct.category || 'hats',
        stock: editingProduct.stock || 0,
        coming_soon: editingProduct.coming_soon ?? true,
      })
    }

    setShowForm(false)
    setEditingProduct(null)
    fetchProducts()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return
    await supabase.from('products').delete().eq('id', id)
    fetchProducts()
  }

  const updateOrderStatus = async (orderId: string, status: string) => {
    await supabase.from('orders').update({ status }).eq('id', orderId)
    fetchOrders()
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-brand-light flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-lg shadow-sm max-w-md w-full">
          <Link to="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-brand-gold transition-colors mb-6">
            <ArrowLeft size={18} />
            Back to Home
          </Link>
          <h1 className="text-2xl font-serif text-brand-dark mb-6">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold"
              />
            </div>
            {loginError && <p className="text-red-500 text-sm">{loginError}</p>}
            <button
              type="submit"
              className="w-full bg-brand-dark text-white py-3 rounded font-medium hover:bg-black transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-28 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-brand-gold transition-colors">
              <ArrowLeft size={18} />
              Back to Home
            </Link>
            <h1 className="text-2xl font-serif text-brand-dark">Admin Dashboard</h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b">
          <button
            onClick={() => setActiveTab('products')}
            className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'products'
                ? 'border-brand-gold text-brand-gold'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <span className="flex items-center gap-2">
              <ShoppingBag size={16} />
              Products
            </span>
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'orders'
                ? 'border-brand-gold text-brand-gold'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <span className="flex items-center gap-2">
              <DollarSign size={16} />
              Orders ({orders.length})
            </span>
          </button>
        </div>

        {activeTab === 'products' && (
          <>
            <button
              onClick={() => {
                setEditingProduct({
                  name: '',
                  description: '',
                  price: 0,
                  image_url: '',
                  category: 'hats',
                  stock: 0,
                  coming_soon: true,
                })
                setShowForm(true)
              }}
              className="mb-6 flex items-center gap-2 bg-brand-dark text-white px-4 py-2 rounded hover:bg-black transition-colors"
            >
              <Plus size={18} />
              Add Product
            </button>

            {showForm && editingProduct && (
              <div className="bg-brand-light p-6 rounded-lg mb-8">
                <h2 className="text-xl font-serif text-brand-dark mb-4">{editingProduct.id ? 'Edit Product' : 'Add Product'}</h2>
                <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                    <input
                      type="text"
                      required
                      value={editingProduct.name || ''}
                      onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      rows={3}
                      value={editingProduct.description || ''}
                      onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                    <input
                      type="number"
                      step="0.01"
                      value={editingProduct.price || 0}
                      onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                    <input
                      type="number"
                      value={editingProduct.stock || 0}
                      onChange={(e) => setEditingProduct({ ...editingProduct, stock: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                    <input
                      type="url"
                      value={editingProduct.image_url || ''}
                      onChange={(e) => setEditingProduct({ ...editingProduct, image_url: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold"
                    />
                  </div>
                  <div className="md:col-span-2 flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="coming_soon"
                      checked={editingProduct.coming_soon ?? true}
                      onChange={(e) => setEditingProduct({ ...editingProduct, coming_soon: e.target.checked })}
                      className="w-4 h-4"
                    />
                    <label htmlFor="coming_soon" className="text-sm text-gray-700">Coming Soon</label>
                  </div>
                  <div className="md:col-span-2 flex gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setShowForm(false)
                        setEditingProduct(null)
                      }}
                      className="px-6 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-brand-dark text-white rounded hover:bg-black transition-colors"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            )}

            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-gold"></div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Image</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Name</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Price</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Stock</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Status</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <img
                            src={product.image_url}
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                        </td>
                        <td className="py-3 px-4 text-sm">{product.name}</td>
                        <td className="py-3 px-4 text-sm">
                          {product.price > 0 ? `$${product.price.toFixed(2)}` : '—'}
                        </td>
                        <td className="py-3 px-4 text-sm">{product.stock}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                              product.coming_soon
                                ? 'bg-yellow-100 text-yellow-700'
                                : product.stock > 0
                                ? 'bg-green-100 text-green-700'
                                : 'bg-red-100 text-red-700'
                            }`}
                          >
                            {product.coming_soon ? 'Coming Soon' : product.stock > 0 ? 'Active' : 'Out of Stock'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => {
                                setEditingProduct(product)
                                setShowForm(true)
                              }}
                              className="p-2 text-gray-600 hover:text-brand-gold transition-colors"
                            >
                              <Pencil size={16} />
                            </button>
                            <button
                              onClick={() => handleDelete(product.id)}
                              className="p-2 text-gray-600 hover:text-red-500 transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

        {activeTab === 'orders' && (
          <div className="overflow-x-auto">
            {orders.length === 0 ? (
              <div className="text-center py-20 text-gray-500">
                <ShoppingBag size={48} className="mx-auto mb-4 text-gray-300" />
                <p>No orders yet.</p>
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Date</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Customer</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Items</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Total</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Status</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm whitespace-nowrap">
                        {new Date(order.created_at).toLocaleDateString('en-AU')}
                      </td>
                      <td className="py-3 px-4 text-sm">
                        <div className="font-medium">{order.customer_name}</div>
                        <div className="text-gray-500 text-xs">{order.customer_email}</div>
                      </td>
                      <td className="py-3 px-4 text-sm">
                        <div className="space-y-1">
                          {order.items?.map((item, i) => (
                            <div key={i} className="text-xs">
                              {item.name} x{item.quantity}
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm font-medium text-brand-gold">
                        ${order.total?.toFixed(2)}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                            order.status === 'completed'
                              ? 'bg-green-100 text-green-700'
                              : order.status === 'shipped'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                          className="text-sm border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-brand-gold/50"
                        >
                          <option value="pending_payment">Pending Payment</option>
                          <option value="paid">Paid</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>

      <Footer />
      <CookieBanner />
    </div>
  )
}
