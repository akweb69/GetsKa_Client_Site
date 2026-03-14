import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Search, Heart, ShoppingBag, Menu, X, Phone, Mail, ChevronDown, ArrowRight, Sparkles, Palette, Package, Megaphone, Brush, Globe } from 'lucide-react'
import logo from '../assets/Getska-design-Logo-Color-Variation-green-without-BG.png'

const navLinks = [
  { name: 'Home', path: '/' },
  {
    name: 'Services',
    path: '/services',
    subCategories: [
      { label: 'Branding', icon: Sparkles, desc: 'Build a memorable brand identity' },
      { label: 'Custom Design', icon: Palette, desc: 'Tailored designs just for you' },
      { label: 'Design Consultation', icon: Brush, desc: 'Expert advice & strategy' },
      { label: 'Printing Services', icon: Package, desc: 'High-quality print production' },
      { label: 'Packaging Solutions', icon: Package, desc: 'Packaging that stands out' },
      { label: 'Digital Marketing', icon: Megaphone, desc: 'Grow your online presence' },
      { label: 'Creative Workshops', icon: Globe, desc: 'Learn from design professionals' },
    ],
    featured: { label: 'New: AI-powered Branding', desc: 'Let our AI tools jumpstart your brand in minutes.', cta: 'Try it free' },
  },
  {
    name: 'Products',
    path: '/products',
    subCategories: [
      { label: 'Business Essentials', icon: Package, desc: 'Cards, letterheads & more' },
      { label: 'Marketing Materials', icon: Megaphone, desc: 'Flyers, brochures, catalogs' },
      { label: 'Labels & Stickers', icon: Sparkles, desc: 'Custom shapes & finishes' },
      { label: 'Promotional Items', icon: Brush, desc: 'Branded merchandise' },
      { label: 'Banners, Poster & Signs', icon: Globe, desc: 'Large-format printing' },
      { label: 'Apparel LIM', icon: Palette, desc: 'Custom clothing & uniforms' },
      { label: 'Forms & Packages', icon: Package, desc: 'Document & kit solutions' },
    ],
    featured: { label: 'Bundle & Save 30%', desc: 'Mix and match any 3 products for an instant discount.', cta: 'Shop bundles' },
  },
  {
    name: 'Custom Design',
    path: '/branding',
    subCategories: [
      { label: 'Logo Design', icon: Sparkles, desc: 'Icons that define your brand' },
      { label: 'Brand Identity', icon: Palette, desc: 'Cohesive visual systems' },
      { label: 'Packaging Design', icon: Package, desc: 'Unboxing experiences' },
      { label: 'Marketing Collateral', icon: Megaphone, desc: 'Print & digital assets' },
      { label: 'Custom Illustrations', icon: Brush, desc: 'One-of-a-kind artwork' },
      { label: 'Web & App Design', icon: Globe, desc: 'Interfaces people love' },
    ],
    featured: { label: 'Portfolio Showcase', desc: 'See 200+ recent projects from our award-winning designers.', cta: 'View work' },
  },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
  { name: 'Hire Designer', path: '/hire-designer' },
]

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [searchValue, setSearchValue] = useState('')

  const activeLink = navLinks.find((l) => l.name === activeDropdown)

  return (
    <header className="sticky top-0 z-50 w-full font-sans">

      {/* ── Top bar ── */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-700 text-white text-[11px] py-2 px-4">
        <div className="w-11/12 mx-auto flex items-center justify-between">
          <div className="flex items-center gap-1.5 opacity-90">
            <Phone size={11} /><span>+806 000 88 99</span>
          </div>
          <span className="font-semibold tracking-wider hidden sm:block">🎉 Get 25% off your first purchase!</span>
          <div className="flex items-center gap-1.5 opacity-90">
            <Mail size={11} /><span>contact@getskadesign.com</span>
          </div>
        </div>
      </div>

      {/* ── Main nav ── */}
      <nav
        className="relative w-full"
        onMouseLeave={() => setActiveDropdown(null)}
        style={{
          background: 'linear-gradient(135deg, #1e1b6e 0%, #2d1b8e 25%, #3b1fa8 50%, #4c1dbf 70%, #5b21d4 100%)',
          boxShadow: '0 4px 32px rgba(91,33,212,0.35)',
        }}
      >
        {/* shimmer top */}
        <div className="absolute top-0 inset-x-0 h-px pointer-events-none"
          style={{ background: 'linear-gradient(90deg,transparent,rgba(167,139,250,.6),rgba(96,165,250,.6),transparent)' }} />

        <div className="w-11/12 mx-auto ">
          <div className="flex items-center justify-between h-[68px] gap-4">

            {/* Logo */}
            <Link to="/" className="flex-shrink-0 w-28">
              <img src={logo} alt="Getska Design" className="w-full drop-shadow-md" />
            </Link>

            {/* Nav links */}
            <div className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <div
                  key={link.path}
                  className="relative"
                  onMouseEnter={() => link.subCategories ? setActiveDropdown(link.name) : setActiveDropdown(null)}
                >
                  <NavLink
                    to={link.path}
                    end={link.path === '/'}
                    className={({ isActive }) =>
                      `px-3 py-2 text-[13px] font-medium rounded-lg transition-all duration-150 flex items-center gap-1 whitespace-nowrap ${isActive || activeDropdown === link.name
                        ? 'text-white bg-white/15 font-semibold'
                        : 'text-blue-100/80 hover:text-white hover:bg-white/10'
                      }`
                    }
                  >
                    {link.name}
                    {link.subCategories && (
                      <ChevronDown size={13}
                        className={`transition-transform duration-200 ${activeDropdown === link.name ? 'rotate-180' : ''}`}
                      />
                    )}
                  </NavLink>
                </div>
              ))}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              {/* Always-visible search */}
              <div
                className="hidden lg:flex items-center gap-2 rounded-full px-3.5 py-[9px] w-52 xl:w-64 transition-all duration-300 focus-within:w-72 xl:focus-within:w-80 group"
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(10px)',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 0 2px rgba(167,139,250,0.5)'
                  e.currentTarget.style.borderColor = 'rgba(167,139,250,0.5)'
                }}
                onBlur={(e) => {
                  e.currentTarget.style.boxShadow = 'none'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'
                }}
              >
                <Search size={14} className="text-blue-200/50 flex-shrink-0 group-focus-within:text-violet-300 transition-colors" />
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Search products, services…"
                  className="flex-1 bg-transparent text-[13px] text-white placeholder:text-blue-200/35 outline-none min-w-0"
                />
                {searchValue ? (
                  <button onClick={() => setSearchValue('')} className="text-blue-200/50 hover:text-white transition-colors flex-shrink-0">
                    <X size={13} />
                  </button>
                ) : (
                  <span className="text-[10px] text-blue-200/35 font-mono flex-shrink-0 px-1.5 py-0.5 rounded"
                    style={{ border: '1px solid rgba(255,255,255,0.12)' }}>⌘K</span>
                )}
              </div>

              <button className="hidden lg:flex items-center justify-center w-9 h-9 rounded-full text-blue-200/65 hover:text-white hover:bg-white/10 transition-all">
                <Heart size={17} />
              </button>
              <button className="hidden lg:flex items-center justify-center w-9 h-9 rounded-full text-blue-200/65 hover:text-white hover:bg-white/10 transition-all relative">
                <ShoppingBag size={17} />
                <span className="absolute -top-0.5 -right-0.5 w-[18px] h-[18px] rounded-full text-[9px] font-bold text-white flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg,#60a5fa,#a78bfa)' }}>3</span>
              </button>

              <div className="hidden lg:block w-px h-5 bg-white/15 mx-1" />

              <Link to="/login"
                className="hidden lg:block text-[13px] font-medium text-blue-100/75 hover:text-white px-3 py-2 rounded-lg hover:bg-white/10 transition-all whitespace-nowrap">
                Log in
              </Link>
              <Link to="/signup"
                className="hidden lg:flex items-center whitespace-nowrap text-[13px] font-semibold text-white px-5 py-2.5 rounded-full transition-all hover:scale-[1.03] active:scale-[0.97]"
                style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', boxShadow: '0 4px 16px rgba(139,92,246,.5)' }}>
                Sign up
              </Link>

              <button className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg text-blue-200/80 hover:bg-white/10 transition-colors"
                onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* ── Full-width Mega Dropdown ── */}
        {activeLink?.subCategories && (
          <div
            className="absolute left-0 right-0 top-full z-50 overflow-hidden"
            style={{
              background: 'linear-gradient(160deg, #12104a 0%, #1e1b6e 40%, #2e1d96 100%)',
              boxShadow: '0 24px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(167,139,250,0.15)',
              borderTop: '1px solid rgba(167,139,250,0.2)',
            }}
          >
            {/* inner glow strip */}
            <div className="absolute top-0 inset-x-0 h-px"
              style={{ background: 'linear-gradient(90deg,transparent,rgba(167,139,250,.5),rgba(96,165,250,.5),transparent)' }} />

            <div className="max-w-[1320px] mx-auto px-6 py-8">
              <div className="grid grid-cols-12 gap-8">

                {/* Category label + grid */}
                <div className="col-span-9">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-blue-300/50 mb-5">
                    {activeLink.name}
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {activeLink.subCategories.map((sub) => {
                      const Icon = sub.icon
                      return (
                        <Link
                          key={sub.label}
                          to={`${activeLink.path}/${sub.label.toLowerCase().replace(/\s+/g, '-')}`}
                          onClick={() => setActiveDropdown(null)}
                          className="group/item flex items-start gap-3 px-4 py-3.5 rounded-xl transition-all duration-150 hover:bg-white/8"
                          style={{ border: '1px solid transparent' }}
                          onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(167,139,250,0.2)'}
                          onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}
                        >
                          {/* icon bubble */}
                          <div
                            className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center mt-0.5"
                            style={{ background: 'rgba(139,92,246,0.18)', border: '1px solid rgba(167,139,250,0.2)' }}
                          >
                            <Icon size={15} className="text-violet-300" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-[13.5px] font-medium text-blue-100 group-hover/item:text-white transition-colors">
                                {sub.label}
                              </span>
                              <ArrowRight size={11} className="text-violet-400/0 group-hover/item:text-violet-400/80 transition-all -translate-x-1 group-hover/item:translate-x-0" />
                            </div>
                            <p className="text-[12px] text-blue-200/45 mt-0.5 leading-relaxed">{sub.desc}</p>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                </div>

                {/* Featured card */}
                <div className="col-span-3 flex flex-col justify-between">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-blue-300/50 mb-5">Featured</p>
                  <div
                    className="flex-1 rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, rgba(99,102,241,0.25), rgba(139,92,246,0.18))',
                      border: '1px solid rgba(167,139,250,0.25)',
                    }}
                  >
                    {/* bg orb */}
                    <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full pointer-events-none"
                      style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)' }} />

                    <div>
                      <span
                        className="inline-block text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-3"
                        style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: '#fff' }}
                      >
                        ✦ Spotlight
                      </span>
                      <h4 className="text-[15px] font-semibold text-white leading-snug mb-2">
                        {activeLink.featured.label}
                      </h4>
                      <p className="text-[12.5px] text-blue-200/60 leading-relaxed">
                        {activeLink.featured.desc}
                      </p>
                    </div>

                    <Link
                      to={activeLink.path}
                      onClick={() => setActiveDropdown(null)}
                      className="mt-5 inline-flex items-center gap-2 text-[13px] font-semibold text-white px-4 py-2.5 rounded-xl self-start transition-all hover:gap-3"
                      style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', boxShadow: '0 4px 14px rgba(139,92,246,0.4)' }}
                    >
                      {activeLink.featured.cta}
                      <ArrowRight size={14} />
                    </Link>
                  </div>

                  {/* View all link */}
                  <Link
                    to={activeLink.path}
                    onClick={() => setActiveDropdown(null)}
                    className="mt-4 flex items-center justify-center gap-1.5 text-[12.5px] font-medium text-blue-300/60 hover:text-blue-200 transition-colors py-2"
                  >
                    View all {activeLink.name.toLowerCase()}
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </div>

            {/* bottom shimmer */}
            <div className="h-px"
              style={{ background: 'linear-gradient(90deg,transparent,rgba(96,165,250,.3),rgba(167,139,250,.3),transparent)' }} />
          </div>
        )}

        {/* shimmer bottom */}
        <div className="absolute bottom-0 inset-x-0 h-px pointer-events-none"
          style={{ background: 'linear-gradient(90deg,transparent,rgba(96,165,250,.35),rgba(167,139,250,.35),transparent)' }} />
      </nav>

      {/* ── Mobile Menu ── */}
      {menuOpen && (
        <div
          className="lg:hidden border-t border-white/10 px-4 py-5 space-y-1"
          style={{ background: 'linear-gradient(160deg, #1e1b6e, #3b1fa8)' }}
        >
          <div
            className="flex items-center gap-2.5 rounded-xl px-4 py-3 mb-4"
            style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}
          >
            <Search size={15} className="text-blue-200/50 flex-shrink-0" />
            <input type="text" placeholder="Search products, services…"
              className="flex-1 bg-transparent text-sm text-white placeholder:text-blue-200/35 outline-none" />
          </div>

          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/'}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center px-4 py-3.5 rounded-xl text-[15px] font-medium transition-all ${isActive ? 'bg-white/20 text-white' : 'text-blue-100/70 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

          <div className="pt-4 flex gap-3 px-1">
            <Link to="/login"
              className="flex-1 text-center py-3 rounded-xl text-blue-100 font-medium hover:bg-white/10 transition-colors"
              style={{ border: '1px solid rgba(255,255,255,0.2)' }}>
              Log in
            </Link>
            <Link to="/signup"
              className="flex-1 text-center py-3 rounded-xl text-white font-semibold"
              style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', boxShadow: '0 4px 14px rgba(139,92,246,0.4)' }}>
              Sign up
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar