import { useState, useEffect } from 'react'

export default function CookieBanner() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const accepted = localStorage.getItem('gidgee-cookies-accepted')
    if (!accepted) setShow(true)
  }, [])

  function accept() {
    localStorage.setItem('gidgee-cookies-accepted', 'true')
    setShow(false)
  }

  if (!show) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-[#8B6914] text-white p-6 max-w-sm shadow-lg">
      <h3 className="font-serif text-lg mb-2">This website uses cookies.</h3>
      <p className="text-sm opacity-90 mb-4 leading-relaxed">
        We use cookies to analyze website traffic and optimize your website experience. By accepting our use of cookies, your data will be aggregated with all other user data.
      </p>
      <button
        onClick={accept}
        className="w-full bg-white text-[#8B6914] py-2 text-sm font-medium tracking-wider uppercase hover:bg-[#FAF5ED] transition"
      >
        ACCEPT
      </button>
    </div>
  )
}
