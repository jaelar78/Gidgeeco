import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#F5F0E8] mt-auto">
      <div className="max-w-5xl mx-auto px-4 py-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-3 text-[12px]">
          <Link to="/privacy" className="text-[#8B6914] hover:underline">
            Privacy Policy
          </Link>
          <Link to="/terms" className="text-[#8B6914] hover:underline">
            Terms and Conditions
          </Link>
        </div>

        <p className="font-medium text-[#3a2a1a] text-[13px] mb-1">Gidgee & Co</p>
        <p className="text-[#999] text-[11px]">Copyright © 2023 Gidgee & Co - All Rights Reserved.</p>
      </div>
    </footer>
  )
}
