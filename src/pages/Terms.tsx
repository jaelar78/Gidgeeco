import { Link } from 'react-router-dom'
import { ArrowLeft, FileText, Shield, RefreshCw, Truck, Mail } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CookieBanner from '../components/CookieBanner'

export default function Terms() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-28 pb-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-brand-gold transition-colors mb-8"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>

        <div className="flex items-center gap-3 mb-8">
          <FileText size={28} className="text-brand-gold" />
          <h1 className="text-3xl md:text-4xl font-serif text-brand-dark">
            Terms & Conditions
          </h1>
        </div>

        <div className="prose prose-gray max-w-none">
          <p className="text-gray-500 text-sm mb-8">
            Last updated: {new Date().toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>

          <section className="mb-10">
            <h2 className="text-xl font-serif text-brand-dark mb-4 flex items-center gap-2">
              <Shield size={20} className="text-brand-gold" />
              1. Overview
            </h2>
            <p className="text-gray-600 leading-relaxed">
              These Terms and Conditions govern your use of the Gidgee & Co website
              and your purchase of products from us. By accessing our website or
              placing an order, you agree to be bound by these terms. If you do not
              agree, please do not use our site.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-serif text-brand-dark mb-4 flex items-center gap-2">
              <Truck size={20} className="text-brand-gold" />
              2. Shipping & Delivery
            </h2>
            <div className="text-gray-600 leading-relaxed space-y-3">
              <p>
                We ship Australia-wide and internationally. Standard delivery
                times within Australia are 5–10 business days. International orders
                may take 10–20 business days depending on the destination and
                customs processing.
              </p>
              <p>
                All items are packaged in our premium, protective packaging to ensure
                your hat, bag, or wallet arrives in perfect condition. We are not
                responsible for delays caused by postal services or customs.
              </p>
              <p>
                Once your order is dispatched, you will receive a tracking number via
                email. If you do not receive tracking within 3 business days of
                ordering, please contact us at sales@gidgeeco.au.
              </p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-serif text-brand-dark mb-4 flex items-center gap-2">
              <RefreshCw size={20} className="text-brand-gold" />
              3. Refunds & Returns
            </h2>
            <div className="text-gray-600 leading-relaxed space-y-3">
              <p>
                <strong className="text-brand-dark">30-Day Return Policy:</strong>{' '}
                We accept returns within 30 days of delivery for items that are
                unused, unworn, and in their original packaging with all tags
                attached. Because each item is part of a limited run of 87, we
                cannot accept returns for items that show signs of wear, damage, or
                use.
              </p>
              <p>
                <strong className="text-brand-dark">How to Return:</strong> To
                initiate a return, email us at sales@gidgeeco.au with your order
                number and reason for return. We will provide a return address and
                instructions. Return shipping costs are the responsibility of the
                customer unless the item was defective or incorrectly sent.
              </p>
              <p>
                <strong className="text-brand-dark">Refunds:</strong> Once we
                receive and inspect your returned item, we will notify you of the
                approval or rejection of your refund. Approved refunds are processed
                to the original payment method within 5–10 business days.
              </p>
              <p>
                <strong className="text-brand-dark">Exchanges:</strong> Because
                each design is limited to 87 pieces, we cannot guarantee exchanges for
                the same item in a different size or colour. If an exchange is
                possible, we will arrange it. Otherwise, a refund will be offered.
              </p>
              <p>
                <strong className="text-brand-dark">Non-Returnable Items:</strong>{' '}
                Gift cards, sale items, and personalised or custom orders cannot be
                returned.
              </p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-serif text-brand-dark mb-4">
              4. Limited Edition Policy
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Every Gidgee & Co product is part of a limited run of 87 pieces,
              individually numbered. Once a design sells out, it will not be
              restocked or reproduced. This is part of our commitment to exclusivity
              and quality. All sales of limited edition items are final unless the
              item is defective or damaged upon arrival.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-serif text-brand-dark mb-4">
              5. Abandoned Cart Policy
            </h2>
            <p className="text-gray-600 leading-relaxed">
              If you add items to your cart and provide your email address but do not
              complete your purchase, we may send you a friendly reminder email
              within 24 hours. We may send up to two follow-up emails over the
              following week. You can unsubscribe from abandoned cart reminders at
              any time by clicking the unsubscribe link in the email or contacting us
              at sales@gidgeeco.au. Your cart information is stored securely and is
              never shared with third parties.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-serif text-brand-dark mb-4">
              6. Pricing & Payment
            </h2>
            <p className="text-gray-600 leading-relaxed">
              All prices are listed in Australian Dollars (AUD) and include GST where
              applicable. We accept payment via Stripe, including major credit and
              debit cards. Payment is processed securely through Stripe's encrypted
              payment gateway. Your card details are never stored on our servers.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-serif text-brand-dark mb-4">
              7. Privacy Policy
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We respect your privacy. Personal information collected during your
              purchase (name, email, shipping address, phone number) is used solely for
              order fulfillment, delivery, and occasional marketing communications
              (if you opt in). We do not sell, rent, or share your personal data with
              third parties except where necessary for shipping (e.g., postal
              services). For full details, please contact us at{' '}
              <a href="mailto:sales@gidgeeco.au" className="text-brand-gold hover:underline">
                sales@gidgeeco.au
              </a>.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-serif text-brand-dark mb-4">
              8. Intellectual Property
            </h2>
            <p className="text-gray-600 leading-relaxed">
              All designs, images, logos, and content on this website are the
              exclusive property of Gidgee & Co. The hidden gidgee tree motif, the
              87/87 numbering system, and all Australian wildlife and wildflower
              artwork are protected by copyright. Unauthorised use, reproduction, or
              distribution is strictly prohibited.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-serif text-brand-dark mb-4">
              9. Contact
            </h2>
            <div className="text-gray-600 leading-relaxed space-y-2">
              <p className="flex items-center gap-2">
                <Mail size={18} className="text-brand-gold" />
                <a href="mailto:sales@gidgeeco.au" className="text-brand-gold hover:underline">
                  sales@gidgeeco.au
                </a>
              </p>
              <p>Gidgee & Co</p>
              <p>Australia</p>
            </div>
          </section>
        </div>
      </div>

      <Footer />
      <CookieBanner />
    </div>
  )
}
