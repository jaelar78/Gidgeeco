import { useState } from 'react'
import { supabase, type NewsletterSubscriber } from '../lib/supabase'
import { Mail, CheckCircle, AlertCircle } from 'lucide-react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('submitting')

    try {
      const data: NewsletterSubscriber = {
        email,
        first_name: firstName,
        source: 'website'
      }

      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert([data])

      if (error) throw error

      setStatus('success')
      setEmail('')
      setFirstName('')
      setTimeout(() => setStatus('idle'), 5000)
    } catch (err) {
      console.error('Error subscribing:', err)
      setStatus('error')
    }
  }

  return (
    <section className="py-20 bg-gidgee-brown text-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px w-12 bg-white/30"></div>
          <h2 className="font-serif text-3xl">Keep in Touch</h2>
          <div className="h-px w-12 bg-white/30"></div>
        </div>

        <p className="mb-8 opacity-90">
          Get 10% off your first purchase when you sign up for our newsletter!
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="flex-1 px-4 py-3 rounded-sm bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:border-white/50 transition"
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-4 py-3 rounded-sm bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:border-white/50 transition"
            required
          />
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="px-6 py-3 bg-white text-gidgee-brown font-medium rounded-sm hover:bg-gidgee-cream transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Mail size={16} />
            SIGN UP
          </button>
        </form>

        {status === 'success' && (
          <div className="flex items-center justify-center gap-2 mt-4 text-green-300">
            <CheckCircle size={16} />
            <span>Welcome! Check your inbox for your discount code.</span>
          </div>
        )}

        {status === 'error' && (
          <div className="flex items-center justify-center gap-2 mt-4 text-red-300">
            <AlertCircle size={16} />
            <span>Something went wrong. Please try again.</span>
          </div>
        )}
      </div>
    </section>
  )
}
