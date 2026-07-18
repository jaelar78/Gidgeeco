import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ShoppingBag, Search, User, Menu, X } from 'lucide-react'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  const navLinks = [
    { label: 'HOME', path: '/' },
    { label: 'SHOP', path: '/shop' },
  ]

  return (
    <header className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top row: social | logo | icons */}
        <div className="flex items-center justify-between h-24">
          {/* Social links - left */}
          <div className="hidden md:flex items-center space-x-3 w-32">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="transition hover:opacity-80">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="transition hover:opacity-80">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#E4405F">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>
          </div>

          {/* Logo - center */}
          <Link to="/" className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full border border-[#8B6914]/40 flex items-center justify-center bg-white">
              <div className="text-center">
                <div className="flex justify-center mb-0.5">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8B6914" strokeWidth="1.5">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
                    <path d="M12 6c-2 2-4 4-4 7s2 5 4 5 4-2 4-5-2-5-4-7z"/>
                    <path d="M12 6v12"/>
                  </svg>
                </div>
                <span className="font-serif text-[#5a4a3a] text-[9px] font-medium tracking-[0.15em] text-center leading-none block">
                  GIDGEE
                </span>
                <span className="font-serif text-[#5a4a3a] text-[9px] font-medium tracking-[0.15em] text-center leading-none block">
                  & CO.
                </span>
                <div className="w-6 h-px bg-[#8B6914]/40 mx-auto my-0.5"></div>
                <span className="text-[7px] tracking-[0.2em] text-[#8B6914]/70">EST. 2020</span>
              </div>
            </div>
          </Link>

          {/* Right icons */}
          <div className="hidden md:flex items-center justify-end space-x-4 w-32">
            <button className="text-[#5a4a3a] hover:text-[#8B6914] transition">
              <Search size={18} strokeWidth={1.5} />
            </button>
            <button className="text-[#5a4a3a] hover:text-[#8B6914] transition">
              <ShoppingBag size={18} strokeWidth={1.5} />
            </button>
            <button className="text-[#5a4a3a] hover:text-[#8B6914] transition">
              <User size={18} strokeWidth={1.5} />
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-[#5a4a3a]"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Navigation links */}
        <nav className="hidden md:flex justify-center space-x-8 pb-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-[11px] tracking-[0.25em] font-normal transition ${
                location.pathname === link.path
                  ? 'text-[#8B6914]'
                  : 'text-[#5a4a3a] hover:text-[#8B6914]'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-[#F5F0E8]">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block text-xs tracking-[0.25em] ${
                  location.pathname === link.path ? 'text-[#8B6914]' : 'text-[#5a4a3a]'
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
