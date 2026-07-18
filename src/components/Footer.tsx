import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#F5F0E8] mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8 text-center">
        <div className="flex items-center justify-center gap-4 mb-4 text-sm">
          <Link to="/privacy" className="text-[#5a4a3a] hover:text-[#8B6914] transition">
            Privacy Policy
          </Link>
          <Link to="/terms" className="text-[#5a4a3a] hover:text-[#8B6914] transition">
            Terms and Conditions
          </Link>
        </div>

        <p className="font-medium text-[#5a4a3a] text-sm mb-1">Gidgee & Co</p>
        <p className="text-[#5a4a3a]/60 text-sm">Copyright © 2023 Gidgee & Co - All Rights Reserved.</p>
      </div>
    </footer>
  )
}
