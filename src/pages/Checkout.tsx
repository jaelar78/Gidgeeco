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
  const [email, setEmail] = useState('')

  useEffect(() => {
    if (items.length === 0) {
      navigate('/shop')
    }
  }, [items, navigate])

  const handleStripeCheckout = async () => {
    if (!email) {
      alert('Please enter your email address')
      return
    }
    setLoading(true)

    try {
      const { data: sessionData } = await supabase.auth.getSession()
      const token = sessionData.session?.access_token

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-checkout`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token ? `Bearer ${token}` : '',
          },
          body: JSON.stringify({
            items: items.map((i) => ({
              name: i.name,
              price: i.price,
              quantity: i.quantity,
              image_url: i.image_url,
            })),
            customer_email: email,
            success_url: `${window.location.origin}/checkout/success`,
            cancel_url: `${window.location.origin}/checkout`,
          }),
        }
      )

      const data = await response.json()

      if (data.url) {
        // Save cart to Supabase for abandoned cart recovery before redirect
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

        window.location.href = data.url
      } else {
        alert(data.error || 'Something went wrong. Please try again.')
        setLoading(false)
      }
    } catch (err) {
      alert('Failed to start checkout. Please try again.')
      setLoading(false)
    }
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
          <div>
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
                  <span className="font-medium">Calculated at payment</span>
                </div>
                <div className="flex justify-between text-lg font-medium pt-2 border-t">
                  <span className="text-brand-dark">Total</span>
                  <span className="text-brand-gold">${totalPrice.toFixed(2)} AUD</span>
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

          {/* Payment Section */}
          <div>
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-serif text-brand-dark mb-4 flex items-center gap-2">
                  <CreditCard size={20} />
                  Contact Information
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
                      placeholder="For receipts & abandoned cart recovery"
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-sm text-gray-600 mb-4">
                  You will be redirected to Stripe to complete your payment securely. 
                  We never store your card details.
                </p>
                <button
                  onClick={handleStripeCheckout}
                  disabled={loading}
                  className="w-full bg-brand-dark text-white py-4 rounded font-medium hover:bg-black transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <CreditCard size={18} />
                  {loading ? 'Loading Stripe...' : 'Pay with Stripe'}
                </button>
              </div>

              <p className="text-xs text-gray-500 text-center">
                By completing your order, you agree to our{' '}
                <Link to="/terms" className="text-brand-gold hover:underline">
                  Terms & Conditions
                </Link>{' '}
                including our refund policy. Your email will be used for order confirmation and, if you don't complete checkout, up to two abandoned cart reminder emails.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <CookieBanner />
    </div>
  )
}
