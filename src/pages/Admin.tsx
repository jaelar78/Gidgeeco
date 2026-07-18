import { useState, useEffect } from 'react'
import { supabase, type Product } from '../lib/supabase'
import { Plus, Edit, Trash2, Save, X, Image } from 'lucide-react'

export default function Admin() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [formData, setFormData] = useState<Partial<Product>>({})

  useEffect(() => {
    fetchProducts()
  }, [])

  async function fetchProducts() {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*, category:categories(name, slug)')
        .order('created_at', { ascending: false })

      if (error) throw error
      setProducts(data || [])
    } catch (err) {
      console.error('Error fetching products:', err)
    } finally {
      setLoading(false)
    }
  }

  async function handleSave() {
    try {
      if (isCreating) {
        const { error } = await supabase
          .from('products')
          .insert([formData])

        if (error) throw error
      } else if (editingProduct) {
        const { error } = await supabase
          .from('products')
          .update(formData)
          .eq('id', editingProduct.id)

        if (error) throw error
      }

      setEditingProduct(null)
      setIsCreating(false)
      setFormData({})
      fetchProducts()
    } catch (err) {
      console.error('Error saving product:', err)
      alert('Error saving product. Please check the console.')
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this product?')) return

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id)

      if (error) throw error
      fetchProducts()
    } catch (err) {
      console.error('Error deleting product:', err)
      alert('Error deleting product.')
    }
  }

  function startEdit(product: Product) {
    setEditingProduct(product)
    setIsCreating(false)
    setFormData({ ...product })
  }

  function startCreate() {
    setIsCreating(true)
    setEditingProduct(null)
    setFormData({
      name: '',
      slug: '',
      description: '',
      short_description: '',
      price: 0,
      sale_price: null,
      sku: '',
      status: 'draft',
      featured: false,
      inventory_count: 0,
      tags: []
    })
  }

  function cancelEdit() {
    setEditingProduct(null)
    setIsCreating(false)
    setFormData({})
  }

  return (
    <div className="min-h-screen bg-gidgee-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-serif text-3xl text-gidgee-brown">Admin Dashboard</h1>
          <button
            onClick={startCreate}
            className="btn-primary flex items-center gap-2"
          >
            <Plus size={16} />
            Add Product
          </button>
        </div>

        {(isCreating || editingProduct) && (
          <div className="bg-white p-6 rounded-sm shadow-sm mb-8">
            <h2 className="font-serif text-xl text-gidgee-brown mb-4">
              {isCreating ? 'Create Product' : 'Edit Product'}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Product Name*"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-gidgee-sand rounded-sm bg-gidgee-cream focus:outline-none focus:border-gidgee-brown"
              />
              <input
                type="text"
                placeholder="Slug (URL)*"
                value={formData.slug || ''}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full px-4 py-3 border border-gidgee-sand rounded-sm bg-gidgee-cream focus:outline-none focus:border-gidgee-brown"
              />
            </div>

            <input
              type="text"
              placeholder="Short Description"
              value={formData.short_description || ''}
              onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
              className="w-full px-4 py-3 border border-gidgee-sand rounded-sm bg-gidgee-cream focus:outline-none focus:border-gidgee-brown mb-4"
            />

            <textarea
              placeholder="Full Description"
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 border border-gidgee-sand rounded-sm bg-gidgee-cream focus:outline-none focus:border-gidgee-brown mb-4 resize-none"
            />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <input
                type="number"
                placeholder="Price*"
                value={formData.price || ''}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                className="w-full px-4 py-3 border border-gidgee-sand rounded-sm bg-gidgee-cream focus:outline-none focus:border-gidgee-brown"
              />
              <input
                type="number"
                placeholder="Sale Price"
                value={formData.sale_price || ''}
                onChange={(e) => setFormData({ ...formData, sale_price: e.target.value ? parseFloat(e.target.value) : null })}
                className="w-full px-4 py-3 border border-gidgee-sand rounded-sm bg-gidgee-cream focus:outline-none focus:border-gidgee-brown"
              />
              <input
                type="text"
                placeholder="SKU"
                value={formData.sku || ''}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                className="w-full px-4 py-3 border border-gidgee-sand rounded-sm bg-gidgee-cream focus:outline-none focus:border-gidgee-brown"
              />
              <input
                type="number"
                placeholder="Inventory"
                value={formData.inventory_count || ''}
                onChange={(e) => setFormData({ ...formData, inventory_count: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-3 border border-gidgee-sand rounded-sm bg-gidgee-cream focus:outline-none focus:border-gidgee-brown"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <select
                value={formData.status || 'draft'}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as Product['status'] })}
                className="w-full px-4 py-3 border border-gidgee-sand rounded-sm bg-gidgee-cream focus:outline-none focus:border-gidgee-brown"
              >
                <option value="draft">Draft</option>
                <option value="active">Active</option>
                <option value="coming_soon">Coming Soon</option>
                <option value="sold_out">Sold Out</option>
                <option value="archived">Archived</option>
              </select>

              <div className="flex items-center gap-2 px-4 py-3">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured || false}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4"
                />
                <label htmlFor="featured" className="text-gidgee-dark">Featured Product</label>
              </div>
            </div>

            <div className="flex gap-4">
              <button onClick={handleSave} className="btn-primary flex items-center gap-2">
                <Save size={16} />
                Save
              </button>
              <button onClick={cancelEdit} className="btn-outline flex items-center gap-2">
                <X size={16} />
                Cancel
              </button>
            </div>
          </div>
        )}

        {loading ? (
          <p className="text-gidgee-dark">Loading products...</p>
        ) : (
          <div className="bg-white rounded-sm shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gidgee-sand">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gidgee-brown">Product</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gidgee-brown">Price</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gidgee-brown">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gidgee-brown">Inventory</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gidgee-brown">Featured</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gidgee-brown">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gidgee-sand">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-gidgee-cream/50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gidgee-sand rounded-sm flex items-center justify-center">
                            <Image size={16} className="text-gidgee-brown" />
                          </div>
                          <div>
                            <p className="font-medium text-gidgee-dark">{product.name}</p>
                            <p className="text-xs text-gidgee-dark/60">{product.sku}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gidgee-dark">
                        {product.sale_price ? (
                          <>
                            <span className="line-through text-sm">A${product.price}</span>
                            <span className="text-gidgee-brown font-medium ml-2">A${product.sale_price}</span>
                          </>
                        ) : (
                          <span>A${product.price}</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                          product.status === 'active' ? 'bg-green-100 text-green-700' :
                          product.status === 'coming_soon' ? 'bg-yellow-100 text-yellow-700' :
                          product.status === 'sold_out' ? 'bg-red-100 text-red-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {product.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gidgee-dark">{product.inventory_count}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-block w-2 h-2 rounded-full ${
                          product.featured ? 'bg-green-500' : 'bg-gray-300'
                        }`}></span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => startEdit(product)}
                            className="p-2 text-gidgee-brown hover:bg-gidgee-sand rounded-sm transition"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-sm transition"
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
          </div>
        )}
      </div>
    </div>
  )
}
