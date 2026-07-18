import { useState, useEffect } from 'react'

export default function CookieBanner() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const accepted = localStorage.getItem('cookies_accepted')
    if (!accepted) setShow(true)
  }, [])

  const accept = () => {
    localStorage.setItem('cookies_accepted', 'true')
    setShow(false)
  }

  if (!show) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50 p-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-600">
          We use cookies to improve your experience. By continuing, you agree to our use of cookies.
        </p>
        <button
          onClick={accept}
          className="bg-brand-dark text-white px-6 py-2 rounded text-sm font-medium hover:bg-black transition-colors"
        >
          Accept
        </button>
      </div>
    </div>
  )
}
