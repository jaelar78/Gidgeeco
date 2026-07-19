import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, CreditCard, Truck, ShieldCheck } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CookieBanner from '../components/CookieBanner'
import { useCart } from '../context/CartContext'
import { supabase } from '../lib/supabase'

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [email, setEmail] = useState('')
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    postcode: '',
    country: 'Australia',
    phone: '',
  })

  useEffect(() => {
    if (items.length === 0 && !submitted) {
      navigate('/shop')
    }
  }, [items, submitted, navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const shippingAddress = `${form.firstName} ${form.lastName}\n${form.address}\n${form.city}, ${form.state} ${form.postcode}\n${form.country}`

    const { error } = await supabase.from('orders').insert({
      customer_email: email,
      customer_name: `${form.firstName} ${form.lastName}`,
      shipping_address: shippingAddress,
      items: items.map((i) => ({
        id: i.id,
        name: i.name,
        price: i.price,
        quantity: i.quantity,
        image_url: i.image_url,
      })),
      total: totalPrice,
      status: 'pending_payment',
    })

    // Also save email for abandoned cart recovery
    await supabase.from('carts').upsert({
      email,
      items: items.map((i) => ({
        id: i.id,
        name: i.name,
        price: i.price,
        quantity: i.quantity,
        image_url: i.image_url,
      })),
    }, { onConflict: 'email' })

    setLoading(false)

    if (!error) {
      setSubmitted(true)
      clearCart()
    } else {
      alert('Something went wrong. Please try again.')
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-28 pb-20 max-w-xl mx-auto px-4 text-center">
          <div className="bg-brand-light rounded-lg p-12">
            <ShieldCheck size={48} className="mx-auto text-brand-gold mb-4" />
            <h1 className="text-3xl font-serif text-brand-dark mb-4">
              Order Received
            </h1>
            <p className="text-gray-600 mb-6">
              Thank you! Your order has been placed. You will receive a confirmation email shortly. Once payment is confirmed, we'll begin crafting your limited edition piece.
            </p>
            <p className="text-sm text-gray-500 mb-8">
              Each item is numbered 1/87, 2/87... crafted just for you. Premium packaging included.
            </p>
            <Link
              to="/shop"
              className="inline-block bg-brand-dark text-white px-8 py-3 rounded font-medium hover:bg-black transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
        <Footer />
        <CookieBanner />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-28 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-brand-gold transition-colors mb-8"
        >
          <ArrowLeft size={18} />
          Back to Shop
        </Link>

        <h1 className="text-3xl md:text-4xl font-serif text-brand-dark mb-8">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Order Summary */}
          <div className="order-2 lg:order-1">
            <div className="bg-brand-light rounded-lg p-6">
              <h2 className="text-xl font-serif text-brand-dark mb-6 flex items-center gap-2">
                <Truck size={20} />
                Order Summary
              </h2>
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded flex-shrink-0"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-brand-dark">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-medium text-brand-gold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">Calculated at next step</span>
                </div>
                <div className="flex justify-between text-lg font-medium pt-2 border-t">
                  <span className="text-brand-dark">Total</span>
                  <span className="text-brand-gold">${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-6 bg-white rounded p-4 text-sm text-gray-600 space-y-2">
                <p className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-brand-gold" />
                  Premium packaging on every order
                </p>
                <p>Each item is numbered from our limited run of 87.</p>
                <p>Find the hidden gidgee tree in every design.</p>
              </div>
            </div>
          </div>

          {/* Shipping Form */}
          <div className="order-1 lg:order-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h2 className="text-xl font-serif text-brand-dark mb-4 flex items-center gap-2">
                  <CreditCard size={20} />
                  Contact & Shipping
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="For order confirmation & abandoned cart reminders"
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.firstName}
                        onChange={(e) =>
                          setForm({ ...form, firstName: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.lastName}
                        onChange={(e) =>
                          setForm({ ...form, lastName: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.address}
                      onChange={(e) =>
                        setForm({ ...form, address: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.city}
                        onChange={(e) =>
                          setForm({ ...form, city: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        State *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.state}
                        onChange={(e) =>
                          setForm({ ...form, state: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Postcode *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.postcode}
                        onChange={(e) =>
                          setForm({ ...form, postcode: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Country *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.country}
                        onChange={(e) =>
                          setForm({ ...form, country: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-brand-dark text-white py-4 rounded font-medium hover:bg-black transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <CreditCard size={18} />
                {loading ? 'Processing...' : 'Complete Order'}
              </button>

              <p className="text-xs text-gray-500 text-center">
                By completing your order, you agree to our{' '}
                <Link to="/terms" className="text-brand-gold hover:underline">
                  Terms & Conditions
                </Link>{' '}
                including our refund policy.
              </p>
            </form>
          </div>
        </div>
      </div>

      <Footer />
      <CookieBanner />
    </div>
  )
}
