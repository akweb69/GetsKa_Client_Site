import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Search, Heart, ShoppingBag, Menu, X, Phone, Mail } from 'lucide-react'
import logo from '../assets/Button.png'

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Products', path: '/products' },
  { name: 'Custom Design', path: '/branding' },
  { name: 'About', path: '/about' },
  { name: 'Contract', path: '/contact' },
  { name: 'Hire Designer', path: '/hire-designer' },
]

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top Bar */}
      <div className="top-bar text-white text-xs py-2 px-4">
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
      <nav className="bg-[#f0edff] ">
        <div className="w-11/12 mx-auto">
          <div className="flex items-center justify-between h-16 gap-6">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0 max-w-32">
              <img src={logo} alt="" className='w-full' />
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === '/'}
                  className={({ isActive }) =>
                    `px-3 py-2 text-sm font-medium rounded-lg transition-colors ${isActive
                      ? 'text-primary font-semibold'
                      : 'text-gray-600 hover:text-primary hover:bg-primary-light'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              <button className="hidden lg:flex p-2 rounded-lg text-gray-500 hover:text-primary hover:bg-primary-light transition-colors">
                <Search size={18} />
              </button>
              <button className="hidden lg:flex p-2 rounded-lg text-gray-500 hover:text-primary hover:bg-primary-light transition-colors">
                <Heart size={18} />
              </button>
              <button className="hidden lg:flex p-2 rounded-lg text-gray-500 hover:text-primary hover:bg-primary-light transition-colors">
                <ShoppingBag size={18} />
              </button>
              <Link to="/login" className="hidden lg:block text-sm font-semibold text-gray-700 hover:text-primary px-3 py-2 transition-colors">
                Log in
              </Link>
              <Link to="/signup" className="bg-[#5216E7] text-white rounded-md p-2 px-3 text-sm hidden lg:flex">
                Sign up
              </Link>
              <button
                className="lg:hidden p-2 rounded-lg text-gray-600"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${isActive ? 'bg-primary text-white' : 'text-gray-700 hover:bg-primary-light'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            <div className="pt-3 flex gap-3">
              <Link to="/login" className="flex-1 text-center py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700">Log in</Link>
              <Link to="/signup" className="flex-1 text-center py-2.5 bg-primary rounded-xl text-sm font-semibold text-white">Sign up</Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Navbar
