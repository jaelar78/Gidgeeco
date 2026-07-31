import { Link } from 'react-router-dom'

const LOGO_URL = 'https://img1.wsimg.com/isteam/ip/2fb33577-001e-4278-a586-77640575c5d7/logo/temp_logo_1777976760283.png'

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <img
              src={LOGO_URL}
              alt="Gidgee & Co"
              className="h-12 w-auto object-contain mb-4 invert"
            />
            <p className="text-gray-400 text-sm">
              Premium Australian hats and eco-friendly products. Limited to 87 of each design.
            </p>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/shop" className="hover:text-white transition-colors">Shop</Link></li>
              <li><Link to="/our-craft" className="hover:text-white transition-colors">Our Craft</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/#contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>sales@gidgeeco.au</li>
              <li>Australia</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Gidgee & Co. All rights reserved. Each piece numbered 1/87 to 87/87.</p>
        </div>
      </div>
    </footer>
  )
}
