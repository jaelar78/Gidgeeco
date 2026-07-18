import { useState } from 'react'
import { supabase, type ContactSubmission } from '../lib/supabase'

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
      <input
        type="email"
        placeholder="Email*"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        className="w-full px-4 py-3 border border-[#ddd] bg-white text-[13px] text-[#5a4a3a] placeholder-[#999] focus:outline-none focus:border-[#8B6914] transition"
        required
      />

      <input
        type="tel"
        placeholder="Phone"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        className="w-full px-4 py-3 border border-[#ddd] bg-white text-[13px] text-[#5a4a3a] placeholder-[#999] focus:outline-none focus:border-[#8B6914] transition"
      />

      <textarea
        placeholder="Other notes"
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        rows={6}
        className="w-full px-4 py-3 border border-[#ddd] bg-white text-[13px] text-[#5a4a3a] placeholder-[#999] focus:outline-none focus:border-[#8B6914] transition resize-none"
        required
      />

      <div className="flex items-center justify-between text-[12px]">
        <button type="button" className="text-[#8B6914] hover:underline flex items-center gap-1">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
          </svg>
          Attach Files
        </button>
        <span className="text-[#999]">Attachments (0)</span>
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full bg-[#8B6914] text-white py-4 text-[12px] tracking-[0.15em] uppercase font-medium rounded-full hover:bg-[#6b5010] transition disabled:opacity-50"
      >
        {status === 'submitting' ? 'Sending...' : 'SEND'}
      </button>

      <p className="text-[11px] text-[#999] text-center leading-relaxed">
        This site is protected by reCAPTCHA and the Google<span className="text-[#8B6914]"> Privacy Policy</span> and<span className="text-[#8B6914]"> Terms of Service</span> apply.
      </p>

      {status === 'success' && (
        <div className="text-green-600 text-[12px] text-center bg-green-50 p-3">
          Thank you! We'll be in touch soon.
        </div>
      )}

      {status === 'error' && (
        <div className="text-red-600 text-[12px] text-center bg-red-50 p-3">
          Something went wrong. Please try again.
        </div>
      )}
    </form>
  )
}
