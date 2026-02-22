import { Link } from 'react-router-dom'
import { Facebook, Linkedin, Twitter, Instagram } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-navy text-white">
      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xs">
              <h3 className="text-3xl font-bold mb-3 font-display">Stay Informed</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Join our newsletter for insider tips, product updates, and special promotions. Be the first to know what's new and trending.
              </p>
              <div className="flex gap-2 mt-5">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-white/10 border border-white/20 text-white placeholder-gray-500 px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:border-primary"
                />
                <button className="bg-primary hover:bg-primary-hover px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
            {/* Decorative product image area */}
            <div className="hidden md:block w-80 h-48 relative">
              <div className="absolute inset-0 flex items-center justify-center opacity-30">
                <div className="w-32 h-40 bg-gradient-to-b from-white/20 to-transparent rounded-xl"></div>
                <div className="w-32 h-40 bg-gradient-to-b from-primary/30 to-transparent rounded-xl -ml-8"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <div className="mb-4">
              <div className="text-2xl font-black text-white" style={{ fontFamily: 'Syne, sans-serif', letterSpacing: '-1px' }}>getska</div>
              <div className="text-[9px] font-semibold text-gray-500 tracking-widest uppercase">Design</div>
            </div>

            <div className="space-y-3 text-sm text-gray-400">
              <div>
                <p className="font-semibold text-white text-xs mb-1">Malaysia</p>
                <p className="leading-relaxed text-xs">Kenanga Point Apartment, Jalan Gelugor, Off Jalan Hung Tuan, 55200, Wp Kuala Lumpur, Malaysia</p>
                <p className="mt-1">+60 10-664 6821</p>
              </div>
              <div>
                <p className="font-semibold text-white text-xs mb-1">Belgium</p>
                <p className="text-xs">Zinniastraat 4, 9000 Gent</p>
                <p>+32 499 87 79 85</p>
              </div>
            </div>

            <div className="mt-5">
              <p className="text-xs font-semibold text-white mb-3">Social Media</p>
              <div className="flex gap-2">
                {[Facebook, Linkedin, Twitter, Instagram].map((Icon, i) => (
                  <button key={i} className="w-8 h-8 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors">
                    <Icon size={14} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-4">Products</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              {['Logo Design','Poster Design','Bill Book','Money Pocket','ID Card Design','Letter Head Design','Brochure Design','Mug Printing','Banner Design'].map(item => (
                <li key={item}><Link to="/products" className="hover:text-white transition-colors">{item}</Link></li>
              ))}
            </ul>
          </div>

          {/* More Products */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-4 opacity-0">_</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              {['Calendar Design','Product Box','Product Label','Business Card','Sticker Design','Flyer & Leaflets','Stationary Design','Invitation Card','Certificate Design'].map(item => (
                <li key={item}><Link to="/products" className="hover:text-white transition-colors">{item}</Link></li>
              ))}
            </ul>
          </div>

          {/* Company & Help */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-4">Our Company</h4>
            <ul className="space-y-2 text-xs text-gray-400 mb-6">
              {['About','Careers','Media','Blog','FAQ'].map(item => (
                <li key={item}><Link to="/about" className="hover:text-white transition-colors">{item}</Link></li>
              ))}
            </ul>
            <h4 className="font-semibold text-white text-sm mb-4">Help Center</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              {['Contact & Support','Accessibility','Privacy Policy','Terms & Condition','Shipping & Delivery'].map(item => (
                <li key={item}><Link to="/contact" className="hover:text-white transition-colors">{item}</Link></li>
              ))}
            </ul>
          </div>

          {/* Design Services & Info */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-4">Design Services</h4>
            <ul className="space-y-2 text-xs text-gray-400 mb-6">
              {['Logo Design','Graphic Design','Print Design','Motion Design','UI/UX Design','App Design','Web Design','Web Development','Digital Marketing'].map(item => (
                <li key={item}><Link to="/services" className="hover:text-white transition-colors">{item}</Link></li>
              ))}
            </ul>
            <h4 className="font-semibold text-white text-sm mb-4">Information</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              {['My Account','Print Provider','Become A Partner','Affiliate Program','Referral Program'].map(item => (
                <li key={item}><Link to="#" className="hover:text-white transition-colors">{item}</Link></li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <div className="flex gap-2 opacity-60">
              <div className="bg-green-500 rounded px-2 py-1 text-[9px] font-bold">Google Play</div>
              <div className="bg-gray-600 rounded px-2 py-1 text-[9px] font-bold">App Store</div>
            </div>
          </div>
          <p className="text-gray-500 text-xs">Full Copyright & Design By @Getska Design - 2024</p>
          <div className="flex gap-2">
            {['MC','AMEX','VISA','PP'].map(card => (
              <div key={card} className="bg-white/10 rounded px-2 py-1 text-[9px] font-bold text-gray-400">{card}</div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
