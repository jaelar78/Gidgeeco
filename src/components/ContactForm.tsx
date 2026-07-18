import { useState } from 'react'
import { supabase, type ContactSubmission } from '../lib/supabase'
import { Send } from 'lucide-react'

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
        className="w-full px-4 py-3 border border-[#8B6914]/20 bg-[#FAF5ED] text-[#5a4a3a] placeholder-[#5a4a3a]/50 focus:outline-none focus:border-[#8B6914] transition"
        required
      />

      <input
        type="tel"
        placeholder="Phone"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        className="w-full px-4 py-3 border border-[#8B6914]/20 bg-[#FAF5ED] text-[#5a4a3a] placeholder-[#5a4a3a]/50 focus:outline-none focus:border-[#8B6914] transition"
      />

      <textarea
        placeholder="Other notes"
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        rows={5}
        className="w-full px-4 py-3 border border-[#8B6914]/20 bg-[#FAF5ED] text-[#5a4a3a] placeholder-[#5a4a3a]/50 focus:outline-none focus:border-[#8B6914] transition resize-none"
        required
      />

      <div className="flex items-center justify-between text-sm">
        <button type="button" className="text-[#8B6914] hover:underline flex items-center gap-1">
          <span>🔗 Attach Files</span>
        </button>
        <span className="text-[#5a4a3a]/50">Attachments (0)</span>
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full bg-[#8B6914] text-white py-4 text-sm tracking-widest uppercase font-medium hover:bg-[#6b5010] transition disabled:opacity-50 flex items-center justify-center gap-2"
      >
        <Send size={16} />
        {status === 'submitting' ? 'Sending...' : 'SEND'}
      </button>

      <p className="text-xs text-[#5a4a3a]/50 text-center">
        This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
      </p>

      {status === 'success' && (
        <div className="text-green-600 text-sm text-center bg-green-50 p-3">
          Thank you! We'll be in touch soon.
        </div>
      )}

      {status === 'error' && (
        <div className="text-red-600 text-sm text-center bg-red-50 p-3">
          Something went wrong. Please try again.
        </div>
      )}
    </form>
  )
}
