import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    try {
      await supabase.from('newsletter').insert({ email })
      setSubscribed(true)
      setEmail('')
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="bg-brand-light py-16">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-serif text-brand-dark mb-2">Keep in Touch</h2>
        <p className="text-gray-600 mb-8">Sign up for our newsletter to hear about new arrivals and special offers.</p>

        {subscribed ? (
          <div className="bg-white p-6 rounded-lg shadow-sm inline-block">
            <p className="text-brand-gold font-medium">Thank you for subscribing!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Email Address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-brand-dark text-white py-3 px-8 rounded font-medium uppercase tracking-wider hover:bg-black transition-colors"
            >
              {loading ? '...' : 'Sign Up'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
