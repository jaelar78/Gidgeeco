import { Link } from 'react-router-dom'
import { ArrowLeft, Leaf, TreePine, Package, Heart } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CookieBanner from '../components/CookieBanner'

const PASSION_IMAGE = 'https://img1.wsimg.com/isteam/getty/1269854923/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:600,cg:true'

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-28 pb-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-brand-gold transition-colors mb-8">
          <ArrowLeft size={18} />
          Back to Home
        </Link>

        <div className="relative h-80 rounded-lg overflow-hidden mb-12">
          <img
            src={PASSION_IMAGE}
            alt="Australian outback"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <h1 className="text-4xl md:text-5xl font-serif text-white">About Us</h1>
          </div>
        </div>

        <div className="space-y-10 text-gray-600 leading-relaxed">
          <section>
            <h2 className="text-2xl font-serif text-brand-dark mb-4">Our Story</h2>
            <p>
              Gidgee & Co was born from a love of the Australian outback and a passion for quality craftsmanship. We believe that the perfect hat is more than just an accessory — it's a companion for life's adventures.
            </p>
            <p className="mt-4">
              I was born and raised in the Australian outback. As I got older, my love for our country grew so much I couldn't ignore the passion I had for putting it on items. These aren't just pictures. They are feelings. The feeling of standing on red dirt at sunset, watching the sky turn from gold to purple. The feeling of hearing a kookaburra in the morning. The feeling of knowing that somewhere out there, a gidgee tree is standing tall, waiting for the next rain.
            </p>
          </section>

          <section className="bg-brand-light rounded-lg p-8">
            <div className="flex items-center gap-3 mb-4">
              <Leaf size={28} className="text-brand-gold" />
              <h2 className="text-2xl font-serif text-brand-dark">The Number 87</h2>
            </div>
            <p>
              Every single item we create is part of a limited run of just <strong className="text-brand-dark">87 pieces</strong>. No more, no less. Each hat, bag, wallet, and accessory is individually numbered — 1/87, 2/87, 3/87, all the way to 87/87. Once they're gone, that design is retired forever.
            </p>
            <p className="mt-4">
              Why 87? It is the number of native Australian wildflower species that bloom in the red dust of the outback after a single good rain. A reminder that scarcity and beauty go hand in hand. When you own a Gidgee & Co piece, you own something truly rare.
            </p>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <TreePine size={28} className="text-brand-gold" />
              <h2 className="text-2xl font-serif text-brand-dark">The Hidden Gidgee Tree</h2>
            </div>
            <p>
              Hidden somewhere in every single design is a tiny <strong className="text-brand-dark">gidgee tree</strong>. It is the true mark of our brand. The gidgee tree is the silent guardian of the Australian outback, surviving decades of drought and flood with nothing but stubborn roots and deep patience.
            </p>
            <p className="mt-4">
              Some customers spend hours searching for it. Others stumble across it by accident. However you find it, the hidden gidgee is our promise that every piece carries a piece of the Australian soul.
            </p>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <Package size={28} className="text-brand-gold" />
              <h2 className="text-2xl font-serif text-brand-dark">Premium Packaging</h2>
            </div>
            <p>
              Your limited edition piece deserves more than a plastic mailer. Every Gidgee & Co order is packaged in custom, premium materials designed to protect your hat, bag, or wallet from the moment it leaves our hands to the moment it reaches yours.
            </p>
            <p className="mt-4">
              Our boxes are rigid, recyclable, and branded with the same care we put into the products inside. Hats arrive shaped and protected. Leather goods are wrapped in tissue and sealed with a wax stamp. It is not just packaging — it is the first impression of something special.
            </p>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <Heart size={28} className="text-brand-gold" />
              <h2 className="text-2xl font-serif text-brand-dark">Australian Wildlife & Wildflower</h2>
            </div>
            <p>
              Our designs are inspired by the wildlife and wildflowers of the Australian outback — kangaroos at dawn, emus on the horizon, desert peas pushing through red soil, and the ghost gums that stand like silver sentinels against the sky.
            </p>
            <p className="mt-4">
              These are not generic animal prints. They are stories from a land that does not give up. The same land that raised me. Every time you wear a Gidgee & Co hat, carry our bag, or use our wallet, you carry a piece of that feeling with you. You carry the outback.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-brand-dark mb-4">Why Gidgee & Co?</h2>
            <ul className="space-y-2 list-disc list-inside">
              <li>Australian owned and operated</li>
              <li>Only 87 of each design ever made</li>
              <li>Sustainable and eco-friendly materials</li>
              <li>Handcrafted with local inspiration</li>
              <li>Designed for the Australian climate</li>
              <li>Premium packaging on every order</li>
              <li>Hidden gidgee tree in every design</li>
            </ul>
          </section>
        </div>
      </div>

      <Footer />
      <CookieBanner />
    </div>
  )
}
