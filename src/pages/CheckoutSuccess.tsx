import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ShieldCheck, ShoppingBag } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CookieBanner from '../components/CookieBanner'
import { useCart } from '../context/CartContext'

export default function CheckoutSuccess() {
  const { clearCart } = useCart()

  useEffect(() => {
    clearCart()
  }, [clearCart])

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-28 pb-20 max-w-xl mx-auto px-4 text-center">
        <div className="bg-brand-light rounded-lg p-12">
          <ShieldCheck size={48} className="mx-auto text-brand-gold mb-4" />
          <h1 className="text-3xl font-serif text-brand-dark mb-4">
            Thank You!
          </h1>
          <p className="text-gray-600 mb-4">
            Your order has been placed successfully. You will receive a confirmation email from Stripe shortly.
          </p>
          <p className="text-sm text-gray-500 mb-8">
            Each item is numbered 1/87, 2/87... crafted just for you. Premium packaging included.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-brand-dark text-white px-8 py-3 rounded font-medium hover:bg-black transition-colors"
          >
            <ShoppingBag size={18} />
            Continue Shopping
          </Link>
        </div>
      </div>
      <Footer />
      <CookieBanner />
    </div>
  )
}
