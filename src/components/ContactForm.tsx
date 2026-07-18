import { useState } from 'react'
import { Send, Paperclip } from 'lucide-react'
import { supabase } from '../lib/supabase'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: '',
  })
  const [attachments, setAttachments] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.email) return
    setLoading(true)
    try {
      await supabase.from('contacts').insert({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        notes: formData.notes,
      })
      setSubmitted(true)
      setFormData({ name: '', email: '', phone: '', notes: '' })
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-sm text-center">
        <h3 className="text-2xl font-serif text-brand-dark mb-2">Thank you!</h3>
        <p className="text-gray-600">We have received your message and will be in touch soon.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm space-y-4">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
        <input
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Other notes</label>
        <textarea
          rows={4}
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold resize-none"
        />
      </div>

      <div className="mb-4">
        <button
          type="button"
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-brand-gold transition-colors"
          onClick={() => setAttachments((a) => a + 1)}
        >
          <Paperclip size={16} />
          Attach Files
        </button>
        {attachments > 0 && (
          <span className="text-xs text-gray-500 mt-1 block">Attachments ({attachments})</span>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-brand-dark text-white py-3 px-6 rounded font-medium uppercase tracking-wider hover:bg-black transition-colors flex items-center justify-center gap-2"
      >
        <Send size={16} />
        {loading ? 'Sending...' : 'Send'}
      </button>

      <p className="text-xs text-gray-400 mt-3 text-center">
        This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
      </p>
    </form>
  )
}
