import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Search, Heart, ShoppingBag, Menu, X, Phone, Mail, ChevronDown } from 'lucide-react'
import logo from '../assets/Getska-design-Logo-Color-Variation-green-without-BG.png'

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services', subCategories: ['Branding', 'Custom Design', 'Design Consultation', 'Printing Services', 'Packaging Solutions', 'Digital Marketing', 'Creative Workshops'] },
  { name: 'Products', path: '/products', subCategories: ['Business Essentials', 'Marketing Materials', 'Labels & Stickers', 'Promotional Items', 'Banners, Poster & Signs', 'Apparel LIM', 'Forms & Packages'] },
  { name: 'Custom Design', path: '/branding', subCategories: ['Logo Design', 'Brand Identity', 'Packaging Design', 'Marketing Collateral', 'Custom Illustrations', 'Web & App Design'] },
  { name: 'About', path: '/about' },
  { name: 'Contract', path: '/contact' },
  { name: 'Hire Designer', path: '/hire-designer' },
]

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)   // which menu is open

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top Bar */}
      <div className="top-bar text-white text-[7px] md:text-xs py-2 px-4 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="w-11/12 mx-auto flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Phone size={11} />
            <span>+806 000 88 99</span>
          </div>
          <span className="font-semibold tracking-wide">Get 25% off purchase product!</span>
          <div className="flex items-center gap-1">
            <Mail size={11} />
            <span>contact@getskadesign.com</span>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="bg-[#f0edff] shadow-sm">
        <div className="w-11/12 mx-auto">
          <div className="flex items-center justify-between h-16 gap-6">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0 max-w-32">
              <img src={logo} alt="Logo" className="w-full" />
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-1 relative">
              {navLinks.map((link) => (
                <div
                  key={link.path}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(link.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <NavLink
                    to={link.path}
                    end={link.path === '/'}
                    className={({ isActive }) =>
                      `px-3 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-1 ${isActive
                        ? 'text-primary font-semibold'
                        : 'text-gray-700 hover:text-primary hover:bg-primary/10'
                      }`
                    }
                  >
                    {link.name}
                    {link.subCategories && <ChevronDown size={14} />}
                  </NavLink>

                  {/* Dropdown */}
                  {link.subCategories && activeDropdown === link.name && (
                    <div className="absolute left-0 top-full pt-2 w-64 z-50">
                      <div className="bg-white rounded-lg shadow-xl border border-gray-200 py-2 text-sm">
                        {link.subCategories.map((sub) => (
                          <Link
                            key={sub}
                            to={`${link.path}/${sub.toLowerCase().replace(/\s+/g, '-')}`}
                            className="block px-5 py-2.5 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                            onClick={() => setActiveDropdown(null)}
                          >
                            {sub}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              <button className="hidden lg:flex p-2 rounded-lg text-gray-500 hover:text-primary hover:bg-primary/10 transition-colors">
                <Search size={18} />
              </button>
              <button className="hidden lg:flex p-2 rounded-lg text-gray-500 hover:text-primary hover:bg-primary/10 transition-colors">
                <Heart size={18} />
              </button>
              <button className="hidden lg:flex p-2 rounded-lg text-gray-500 hover:text-primary hover:bg-primary/10 transition-colors">
                <ShoppingBag size={18} />
              </button>
              <Link to="/login" className="hidden lg:block text-sm font-semibold text-gray-700 hover:text-primary px-3 py-2 transition-colors">
                Log in
              </Link>
              <Link to="/signup" className="bg-[#5216E7] text-white rounded-md px-4 py-2 text-sm font-medium hidden lg:flex hover:bg-[#4a14d0] transition-colors">
                Sign up
              </Link>
              <button
                className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 px-4 py-5 space-y-1.5">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-5 py-3.5 rounded-xl text-base font-medium transition-colors ${isActive ? 'bg-indigo-600 text-white' : 'text-gray-800 hover:bg-indigo-50'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            <div className="pt-4 flex gap-4 px-2">
              <Link to="/login" className="flex-1 text-center py-3 border border-gray-300 rounded-xl text-gray-800 font-medium hover:bg-gray-50">
                Log in
              </Link>
              <Link to="/signup" className="flex-1 text-center py-3 bg-[#5216E7] rounded-xl text-white font-medium hover:bg-[#4a14d0]">
                Sign up
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Navbar