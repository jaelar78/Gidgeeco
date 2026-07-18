import { Link } from 'react-router-dom'
import { Facebook, Instagram, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gidgee-sand mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center md:text-left">
            <div className="w-14 h-14 rounded-full border-2 border-gidgee-brown flex items-center justify-center bg-gidgee-cream mx-auto md:mx-0 mb-4">
              <span className="font-serif text-gidgee-brown text-[10px] font-bold tracking-widest text-center leading-tight">
                GIDGEE
                <br />& CO.
              </span>
            </div>
            <p className="text-sm text-gidgee-dark">
              Premium Australian Hats <br />
              Est. 2020
            </p>
          </div>

          <div className="text-center">
            <h4 className="font-serif text-gidgee-brown mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gidgee-dark hover:text-gidgee-brown transition">Home</Link>
              </li>
              <li>
                <Link to="/shop" className="text-gidgee-dark hover:text-gidgee-brown transition">Shop</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gidgee-dark hover:text-gidgee-brown transition">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="text-gidgee-dark hover:text-gidgee-brown transition">Terms & Conditions</Link>
              </li>
            </ul>
          </div>

          <div className="text-center md:text-right">
            <h4 className="font-serif text-gidgee-brown mb-4">Contact</h4>
            <p className="text-sm text-gidgee-dark mb-2">
              <a href="mailto:Sales@gidgeeco.au" className="flex items-center justify-center md:justify-end gap-2 hover:text-gidgee-brown transition">
                <Mail size={16} />
                Sales@gidgeeco.au
              </a>
            </p>
            <div className="flex justify-center md:justify-end gap-4 mt-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gidgee-brown hover:text-gidgee-gold transition">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gidgee-brown hover:text-gidgee-gold transition">
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gidgee-sand mt-8 pt-8 text-center text-sm text-gidgee-dark">
          <p>Copyright © 2023 Gidgee & Co - All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}
