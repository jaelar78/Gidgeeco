import { useState } from 'react'
import { supabase, type ContactSubmission } from '../lib/supabase'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactSubmission>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('submitting')

    try {
      const { error } = await supabase
        .from('contacts')
        .insert([formData])

      if (error) throw error

      setStatus('success')
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
      setTimeout(() => setStatus('idle'), 5000)
    } catch (err) {
      console.error('Error submitting contact:', err)
      setStatus('error')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-3 border border-gidgee-sand rounded-sm bg-gidgee-cream focus:outline-none focus:border-gidgee-brown transition"
          required
        />
        <input
          type="email"
          placeholder="Email*"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-3 border border-gidgee-sand rounded-sm bg-gidgee-cream focus:outline-none focus:border-gidgee-brown transition"
          required
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="tel"
          placeholder="Phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full px-4 py-3 border border-gidgee-sand rounded-sm bg-gidgee-cream focus:outline-none focus:border-gidgee-brown transition"
        />
        <input
          type="text"
          placeholder="Subject"
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          className="w-full px-4 py-3 border border-gidgee-sand rounded-sm bg-gidgee-cream focus:outline-none focus:border-gidgee-brown transition"
        />
      </div>

      <textarea
        placeholder="Your message*"
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        rows={5}
        className="w-full px-4 py-3 border border-gidgee-sand rounded-sm bg-gidgee-cream focus:outline-none focus:border-gidgee-brown transition resize-none"
        required
      />

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {status === 'submitting' ? (
          'Sending...'
        ) : (
          <>
            <Send size={16} />
            SEND
          </>
        )}
      </button>

      {status === 'success' && (
        <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-sm">
          <CheckCircle size={16} />
          <span>Thank you! We'll be in touch soon.</span>
        </div>
      )}

      {status === 'error' && (
        <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-sm">
          <AlertCircle size={16} />
          <span>Something went wrong. Please try again.</span>
        </div>
      )}
    </form>
  )
}
