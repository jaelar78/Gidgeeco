import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ShoppingBag } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [location])

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/shop', label: 'Shop' },
    { to: '/about', label: 'About' },
    { to: '/#contact', label: 'Contact' },
  ]

  const isActive = (to: string) => {
    if (to.startsWith('/#')) return location.pathname === '/' && location.hash === to.replace('/', '')
    return location.pathname === to
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-sm shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center">
            <img
              src="/images/logo.png"
              alt="Gidgee & Co"
              className="h-14 w-auto object-contain"
            />
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium tracking-wide uppercase transition-colors ${
                  isActive(link.to)
                    ? scrolled
                      ? 'text-brand-gold'
                      : 'text-white'
                    : scrolled
                    ? 'text-gray-700 hover:text-brand-gold'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/shop"
              className={`p-2 rounded-full transition-colors ${
                scrolled
                  ? 'text-gray-700 hover:text-brand-gold'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              <ShoppingBag size={20} />
            </Link>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X size={24} className={scrolled ? 'text-gray-800' : 'text-white'} />
            ) : (
              <Menu size={24} className={scrolled ? 'text-gray-800' : 'text-white'} />
            )}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden bg-white border-t shadow-lg">
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`block text-sm font-medium tracking-wide uppercase ${
                    isActive(link.to) ? 'text-brand-gold' : 'text-gray-700 hover:text-brand-gold'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/shop"
                className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-brand-gold"
              >
                <ShoppingBag size={18} />
                Shop
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
