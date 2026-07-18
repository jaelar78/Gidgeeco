import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ShoppingBag, Search, User, Menu, X, Facebook, Instagram } from 'lucide-react'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  const navLinks = [
    { label: 'HOME', path: '/' },
    { label: 'SHOP', path: '/shop' },
  ]

  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="hidden md:flex items-center space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gidgee-brown hover:text-gidgee-gold transition">
              <Facebook size={20} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gidgee-brown hover:text-gidgee-gold transition">
              <Instagram size={20} />
            </a>
          </div>

          <Link to="/" className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full border-2 border-gidgee-brown flex items-center justify-center bg-gidgee-cream">
              <span className="font-serif text-gidgee-brown text-xs font-bold tracking-widest text-center leading-tight">
                GIDGEE
                <br />& CO.
              </span>
            </div>
            <span className="text-[10px] tracking-[0.3em] text-gidgee-brown mt-1">EST. 2020</span>
          </Link>

          <div className="hidden md:flex items-center space-x-4">
            <button className="text-gidgee-brown hover:text-gidgee-gold transition">
              <Search size={20} />
            </button>
            <button className="text-gidgee-brown hover:text-gidgee-gold transition">
              <ShoppingBag size={20} />
            </button>
            <button className="text-gidgee-brown hover:text-gidgee-gold transition">
              <User size={20} />
            </button>
          </div>

          <button
            className="md:hidden text-gidgee-brown"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <nav className="hidden md:flex justify-center space-x-8 pb-3">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm tracking-widest font-medium transition ${
                location.pathname === link.path
                  ? 'text-gidgee-brown border-b-2 border-gidgee-brown'
                  : 'text-gidgee-dark hover:text-gidgee-brown'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gidgee-sand">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block text-sm tracking-widest font-medium ${
                  location.pathname === link.path ? 'text-gidgee-brown' : 'text-gidgee-dark'
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
