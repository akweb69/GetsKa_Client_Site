import { useState, useMemo, useRef, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
} from 'framer-motion'
import {
  Search, Heart, ShoppingBag, Menu, X,
  Phone, Mail, ChevronDown, ChevronRight,
} from 'lucide-react'
import logo from '../assets/Getska-design-Logo-Color-Variation-green-without-BG.png'
import useAllCategories from '../AdminCode/Hooks/useAllCategories'

/* ─────────────────────── animation variants ─────────────────────── */

const megaVariants = {
  hidden: { opacity: 0, y: -10, scaleY: 0.96, transformOrigin: 'top' },
  visible: {
    opacity: 1, y: 0, scaleY: 1,
    transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0, y: -8, scaleY: 0.97,
    transition: { duration: 0.16, ease: 'easeIn' },
  },
}

const gridContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.045, delayChildren: 0.05 },
  },
}

const catItemVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.95 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { type: 'spring', stiffness: 380, damping: 26 },
  },
}

const mobileMenuVariants = {
  hidden: { height: 0, opacity: 0 },
  visible: {
    height: 'auto', opacity: 1,
    transition: { height: { duration: 0.38, ease: [0.4, 0, 0.2, 1] }, opacity: { duration: 0.25, delay: 0.08 } },
  },
  exit: {
    height: 0, opacity: 0,
    transition: { height: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }, opacity: { duration: 0.15 } },
  },
}

const mobileSubVariants = {
  hidden: { height: 0, opacity: 0 },
  visible: {
    height: 'auto', opacity: 1,
    transition: { height: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }, opacity: { duration: 0.2, delay: 0.06 } },
  },
  exit: {
    height: 0, opacity: 0,
    transition: { duration: 0.22, ease: [0.4, 0, 0.2, 1] },
  },
}

const mobileLinkVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.055, delayChildren: 0.08 } },
}

const mobileLinkItemVariants = {
  hidden: { opacity: 0, x: -18 },
  visible: {
    opacity: 1, x: 0,
    transition: { type: 'spring', stiffness: 340, damping: 28 },
  },
}

const mobileSubItemVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: {
    opacity: 1, x: 0,
    transition: { type: 'spring', stiffness: 320, damping: 26 },
  },
}

const badgeVariants = {
  hidden: { opacity: 0, y: -5, scale: 0.8 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { type: 'spring', stiffness: 500, damping: 22, delay: 0.06 },
  },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.1 } },
}

const arrowVariants = {
  hidden: { opacity: 0, x: -7 },
  visible: {
    opacity: 1, x: 0,
    transition: { type: 'spring', stiffness: 450, damping: 22 },
  },
  exit: { opacity: 0, x: -5, transition: { duration: 0.1 } },
}

/* ─────────────────────── Animated sub-cat card ─────────────────────── */

const CatCard = ({ cat, to, onClick, badge }) => {
  const [hovered, setHovered] = useState(false)

  /* magnetic tilt */
  const cardRef = useRef(null)
  const rotX = useSpring(0, { stiffness: 300, damping: 30 })
  const rotY = useSpring(0, { stiffness: 300, damping: 30 })

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    rotX.set(((e.clientY - cy) / rect.height) * -10)
    rotY.set(((e.clientX - cx) / rect.width) * 10)
  }

  const handleMouseLeave = () => {
    rotX.set(0); rotY.set(0); setHovered(false)
  }

  return (
    <motion.div variants={catItemVariants} style={{ perspective: 600 }}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX: rotX, rotateY: rotY }}
        whileTap={{ scale: 0.97 }}
      >
        <Link
          to={to}
          onClick={onClick}
          className="relative flex items-center gap-3 px-3 py-3 rounded-[13px] overflow-hidden group"
          style={{
            border: hovered
              ? '1px solid rgba(139,92,246,0.5)'
              : '1px solid rgba(167,139,250,0.1)',
            background: hovered
              ? 'rgba(99,102,241,0.16)'
              : 'rgba(255,255,255,0.04)',
            transition: 'border-color 0.22s ease, background 0.22s ease',
          }}
        >
          {/* shimmer sweep */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(110deg,transparent 20%,rgba(167,139,250,0.14) 50%,transparent 80%)',
                  borderRadius: 'inherit',
                }}
                initial={{ x: '-100%' }}
                animate={{ x: '200%' }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55, ease: 'easeInOut' }}
              />
            )}
          </AnimatePresence>

          {/* inner glow border */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                className="absolute inset-0 pointer-events-none rounded-[13px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{ boxShadow: 'inset 0 0 0 1px rgba(139,92,246,0.45)' }}
              />
            )}
          </AnimatePresence>

          {/* HOT / NEW badge */}
          <AnimatePresence>
            {hovered && badge && (
              <motion.span
                className="absolute top-[7px] right-2 text-[9px] font-bold tracking-wider px-[7px] py-[2px] rounded-full pointer-events-none z-10"
                style={{
                  color: 'rgba(196,181,253,0.95)',
                  background: 'rgba(139,92,246,0.25)',
                  border: '1px solid rgba(139,92,246,0.35)',
                }}
                variants={badgeVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {badge}
              </motion.span>
            )}
          </AnimatePresence>

          {/* Thumbnail */}
          <motion.div
            className="w-[38px] h-[38px] rounded-[10px] flex-shrink-0 flex items-center justify-center overflow-hidden"
            style={{
              background: hovered ? 'rgba(139,92,246,0.22)' : 'rgba(255,255,255,0.07)',
              border: hovered ? '1px solid rgba(167,139,250,0.4)' : '1px solid rgba(255,255,255,0.1)',
              transition: 'background 0.22s ease, border-color 0.22s ease',
            }}
            animate={hovered
              ? { scale: 1.18, rotate: -6 }
              : { scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 380, damping: 22 }}
          >
            {cat.cat_img
              ? <img src={cat.cat_img} alt={cat.cat_name} className="w-full h-full object-contain" />
              : <span style={{ fontSize: 18 }}>{cat.cat_emoji || '🎨'}</span>
            }
          </motion.div>

          {/* Text */}
          <div className="flex-1 min-w-0">
            <motion.p
              className="text-[12.5px] font-semibold truncate"
              animate={{ color: hovered ? '#ffffff' : 'rgba(191,219,254,0.85)' }}
              transition={{ duration: 0.18 }}
            >
              {cat.cat_name}
            </motion.p>
            {cat.cat_sort_desc && (
              <motion.p
                className="text-[11px] mt-0.5 truncate"
                animate={{ color: hovered ? 'rgba(196,181,253,0.78)' : 'rgba(167,139,250,0.5)' }}
                transition={{ duration: 0.18 }}
              >
                {cat.cat_sort_desc}
              </motion.p>
            )}
          </div>

          {/* Arrow slides in */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                variants={arrowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex-shrink-0"
                style={{ color: 'rgba(167,139,250,0.75)' }}
              >
                <ChevronRight size={14} />
              </motion.div>
            )}
          </AnimatePresence>
        </Link>
      </motion.div>
    </motion.div>
  )
}

/* ─────────────────────── Mobile sub-item ─────────────────────── */

const MobileCatItem = ({ cat, to, onClick }) => {
  return (
    <motion.div variants={mobileSubItemVariants}>
      <Link
        to={to}
        onClick={onClick}
        className="flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-150 hover:bg-white/10"
      >
        <div
          className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.09)', border: '1px solid rgba(255,255,255,0.15)' }}
        >
          {cat.cat_img
            ? <img src={cat.cat_img} alt={cat.cat_name} className="w-full h-full object-contain" />
            : <span style={{ fontSize: 15 }}>{cat.cat_emoji || '🎨'}</span>
          }
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[13.5px] font-semibold text-blue-100/90 truncate">{cat.cat_name}</p>
          {cat.cat_sort_desc && (
            <p className="text-[11px] text-purple-300/55 mt-0.5 truncate">{cat.cat_sort_desc}</p>
          )}
        </div>
        <ChevronRight size={14} className="text-blue-300/45 flex-shrink-0" />
      </Link>
    </motion.div>
  )
}

/* ─────────────────────── Main Navbar ─────────────────────── */

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [activeMobileDropdown, setActiveMobileDropdown] = useState(null)
  const [searchValue, setSearchValue] = useState('')
  const navRef = useRef(null)

  const { allCategories = [] } = useAllCategories()

  const navLinks = useMemo(() => [
    { name: 'Home', path: '/' },
    {
      name: 'Services', path: '/services',
      subCategories: allCategories.slice(3, -1) || [],
      featured: { label: 'New: AI-powered Branding', desc: 'Let our AI tools jumpstart your brand in minutes.', cta: 'Try it free' },
    },
    {
      name: 'Products', path: '/products',
      subCategories: allCategories || [],
      featured: { label: 'Bundle & Save 30%', desc: 'Mix and match any 3 for instant discount.', cta: 'Shop bundles' },
    },
    {
      name: 'Custom Design', path: '/branding',
      subCategories: allCategories.slice(0, 4) || [],
      featured: { label: 'Portfolio Showcase', desc: 'See 200+ projects from award-winning designers.', cta: 'View work' },
    },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Hire Designer', path: '/hire-designer' },
  ], [allCategories])

  /* close on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (navRef.current && !navRef.current.contains(e.target))
        setActiveDropdown(null)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const toggleMobileDropdown = (name) =>
    setActiveMobileDropdown(prev => prev === name ? null : name)

  /* Hamburger bar spring */
  const hamSpring = { type: 'spring', stiffness: 420, damping: 28 }

  return (
    <header className="sticky top-0 z-50 w-full font-sans">

      {/* TOP BAR */}
      <motion.div
        initial={{ y: -32, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="text-white text-[11px] py-[7px] px-4"
        style={{ background: 'linear-gradient(90deg,#1d4ed8,#4f46e5,#7c3aed)' }}
      >
        <div className="w-11/12 mx-auto flex items-center justify-between">
          <div className="flex items-center gap-1.5 opacity-90">
            <Phone size={11} /><span>+806 000 88 99</span>
          </div>
          <span className="font-semibold tracking-wider hidden sm:block">🎉 Get 25% off your first purchase!</span>
          <div className="flex items-center gap-1.5 opacity-90">
            <Mail size={11} /><span>contact@getskadesign.com</span>
          </div>
        </div>
      </motion.div>

      {/* MAIN NAV */}
      <motion.nav
        ref={navRef}
        className="relative w-full"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background: 'linear-gradient(135deg,#1e1b6e 0%,#2d1b8e 25%,#3b1fa8 50%,#4c1dbf 70%,#5b21d4 100%)',
          boxShadow: '0 4px 32px rgba(91,33,212,0.35)',
        }}
      >
        <div className="absolute top-0 inset-x-0 h-px pointer-events-none"
          style={{ background: 'linear-gradient(90deg,transparent,rgba(167,139,250,.6),rgba(96,165,250,.6),transparent)' }} />

        <div className="w-11/12 mx-auto">
          <div className="flex items-center justify-between h-[68px] gap-4">

            {/* LOGO */}
            <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 400, damping: 20 }}>
              <Link to="/" className="flex-shrink-0 block w-28">
                <img src={logo} alt="Getska Design" className="w-full drop-shadow-md" />
              </Link>
            </motion.div>

            {/* DESKTOP LINKS */}
            <div className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  className="relative"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 + i * 0.05, type: 'spring', stiffness: 340, damping: 26 }}
                  onMouseEnter={() => link.subCategories?.length ? setActiveDropdown(link.name) : setActiveDropdown(null)}
                >
                  <NavLink
                    to={link.path}
                    end={link.path === '/'}
                    className={({ isActive }) =>
                      `px-3 py-2 text-[13px] font-medium rounded-lg flex items-center gap-1 whitespace-nowrap transition-colors duration-150 ${isActive || activeDropdown === link.name
                        ? 'text-white bg-white/15 font-semibold'
                        : 'text-blue-100/80 hover:text-white hover:bg-white/10'
                      }`
                    }
                  >
                    {link.name}
                    {link.subCategories?.length > 0 && (
                      <motion.span
                        animate={{ rotate: activeDropdown === link.name ? 180 : 0 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                        style={{ display: 'flex' }}
                      >
                        <ChevronDown size={13} />
                      </motion.span>
                    )}
                  </NavLink>
                </motion.div>
              ))}
            </div>

            {/* RIGHT ACTIONS */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <motion.div
                className="hidden lg:flex items-center gap-2 rounded-full px-3.5 py-[9px]"
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}
                initial={false}
                animate={{ width: searchValue ? 260 : 210 }}
                transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              >
                <Search size={14} className="text-blue-200/50 flex-shrink-0" />
                <input
                  type="text" value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Search products, services…"
                  className="flex-1 bg-transparent text-[13px] text-white placeholder:text-blue-200/35 outline-none min-w-0"
                />
                <AnimatePresence>
                  {searchValue && (
                    <motion.button
                      onClick={() => setSearchValue('')}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                      className="text-blue-200/60 hover:text-white"
                    >
                      <X size={13} />
                    </motion.button>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Heart */}
              <motion.button
                className="hidden lg:flex items-center justify-center w-9 h-9 rounded-full text-blue-200/65 hover:text-white hover:bg-white/10"
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                <Heart size={17} />
              </motion.button>

              {/* Cart */}
              <div className="hidden lg:block relative">
                <motion.button
                  className="flex items-center justify-center w-9 h-9 rounded-full text-blue-200/65 hover:text-white hover:bg-white/10"
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                  <ShoppingBag size={17} />
                </motion.button>
                <motion.span
                  className="absolute -top-0.5 -right-0.5 w-[18px] h-[18px] rounded-full text-[9px] font-bold text-white flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg,#60a5fa,#a78bfa)' }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 20, delay: 0.5 }}
                >
                  3
                </motion.span>
              </div>

              <Link to="/login"
                className="hidden lg:block text-[13px] font-medium text-blue-100/75 hover:text-white px-3 py-2 rounded-lg hover:bg-white/10 transition-colors duration-150">
                Log in
              </Link>

              <motion.div
                className="hidden lg:block"
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                <Link to="/signup"
                  className="flex items-center text-[13px] font-semibold text-white px-5 py-2.5 rounded-full"
                  style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}>
                  Sign up
                </Link>
              </motion.div>

              {/* HAMBURGER */}
              <button
                className="lg:hidden flex flex-col justify-center items-center w-9 h-9 rounded-lg hover:bg-white/10 transition-colors gap-[5px]"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
              >
                <motion.span
                  className="block h-0.5 bg-blue-200/80 rounded-full origin-center"
                  animate={menuOpen
                    ? { width: 20, y: 7, rotate: 45 }
                    : { width: 20, y: 0, rotate: 0 }}
                  transition={hamSpring}
                />
                <motion.span
                  className="block h-0.5 bg-blue-200/80 rounded-full"
                  animate={menuOpen ? { width: 0, opacity: 0 } : { width: 20, opacity: 1 }}
                  transition={hamSpring}
                />
                <motion.span
                  className="block h-0.5 bg-blue-200/80 rounded-full origin-center"
                  animate={menuOpen
                    ? { width: 20, y: -7, rotate: -45 }
                    : { width: 20, y: 0, rotate: 0 }}
                  transition={hamSpring}
                />
              </button>
            </div>
          </div>
        </div>

        {/* ── DESKTOP MEGA DROPDOWN ── */}
        <AnimatePresence>
          {navLinks.map((link) => {
            if (!link.subCategories?.length || activeDropdown !== link.name) return null
            return (
              <motion.div
                key={link.name}
                variants={megaVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute left-0 right-0 top-full z-50"
                style={{
                  background: 'linear-gradient(160deg,#12104a 0%,#1e1b6e 40%,#2e1d96 100%)',
                  boxShadow: '0 24px 64px rgba(0,0,0,0.55)',
                  borderTop: '1px solid rgba(167,139,250,0.15)',
                }}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <div className="w-11/12 mx-auto py-6">
                  <motion.div
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-5"
                    variants={gridContainerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {link.subCategories.map((cat, idx) => (
                      <CatCard
                        key={cat._id || idx}
                        cat={cat}
                        to={`/products?category=${encodeURIComponent(cat.cat_name)}`}
                        onClick={() => setActiveDropdown(null)}
                        badge={idx === 0 ? 'HOT' : idx === 1 ? 'NEW' : null}
                      />
                    ))}
                  </motion.div>

                  {/* Featured */}
                  {link.featured && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.18, duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      className="flex items-center justify-between px-5 py-4 rounded-xl"
                      style={{
                        background: 'linear-gradient(135deg,rgba(99,102,241,0.22),rgba(139,92,246,0.18))',
                        border: '1px solid rgba(167,139,250,0.2)',
                      }}
                    >
                      <div>
                        <p className="text-sm font-semibold text-purple-300">{link.featured.label}</p>
                        <p className="text-xs text-blue-200/60 mt-1">{link.featured.desc}</p>
                      </div>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                        <Link
                          to={link.path}
                          className="text-xs font-semibold text-white px-4 py-2 rounded-full whitespace-nowrap ml-6"
                          style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}
                        >
                          {link.featured.cta} →
                        </Link>
                      </motion.div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>

        <div className="absolute bottom-0 inset-x-0 h-px pointer-events-none"
          style={{ background: 'linear-gradient(90deg,transparent,rgba(96,165,250,.35),rgba(167,139,250,.35),transparent)' }} />
      </motion.nav>

      {/* ── MOBILE MENU ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="lg:hidden overflow-hidden"
            style={{
              background: 'linear-gradient(160deg,#1e1b6e,#3b1fa8)',
              borderTop: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <div className="px-4 py-5">

              {/* Mobile Search */}
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12, type: 'spring', stiffness: 300, damping: 26 }}
                className="flex items-center gap-2.5 rounded-xl px-4 py-3 mb-5"
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}
              >
                <Search size={15} className="text-blue-200/50 flex-shrink-0" />
                <input type="text" placeholder="Search products, services…"
                  className="flex-1 bg-transparent text-sm text-white placeholder:text-blue-200/35 outline-none" />
              </motion.div>

              {/* Mobile Links */}
              <motion.div variants={mobileLinkVariants} initial="hidden" animate="visible">
                {navLinks.map((link) => {
                  const hasSub = link.subCategories?.length > 0
                  const isOpen = activeMobileDropdown === link.name

                  return (
                    <motion.div
                      key={link.path}
                      variants={mobileLinkItemVariants}
                      className="border-b border-white/[0.07] last:border-none"
                    >
                      {hasSub ? (
                        <>
                          <button
                            onClick={() => toggleMobileDropdown(link.name)}
                            className="w-full flex items-center justify-between px-4 py-4 text-[15px] font-medium text-white hover:bg-white/8 rounded-xl transition-colors duration-150"
                          >
                            <span>{link.name}</span>
                            <motion.span
                              animate={{ rotate: isOpen ? 180 : 0 }}
                              transition={{ type: 'spring', stiffness: 400, damping: 26 }}
                              style={{ color: 'rgba(196,181,253,0.7)', display: 'flex' }}
                            >
                              <ChevronDown size={18} />
                            </motion.span>
                          </button>

                          <AnimatePresence>
                            {isOpen && (
                              <motion.div
                                variants={mobileSubVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="overflow-hidden"
                              >
                                <motion.div
                                  className="pl-4 pr-2 pb-3 flex flex-col gap-1"
                                  variants={{ visible: { transition: { staggerChildren: 0.05, delayChildren: 0.06 } } }}
                                  initial="hidden"
                                  animate="visible"
                                >
                                  {link.subCategories.map((cat, idx) => (
                                    <MobileCatItem
                                      key={cat._id || idx}
                                      cat={cat}
                                      to={`/products?category=${encodeURIComponent(cat.cat_name)}`}
                                      onClick={() => { setMenuOpen(false); setActiveMobileDropdown(null) }}
                                    />
                                  ))}
                                </motion.div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <NavLink
                          to={link.path}
                          end={link.path === '/'}
                          onClick={() => setMenuOpen(false)}
                          className={({ isActive }) =>
                            `block px-4 py-4 text-[15px] font-medium rounded-xl transition-colors duration-150 ${link.name === 'Hire Designer'
                              ? 'text-violet-300 font-semibold'
                              : isActive
                                ? 'bg-white/15 text-white'
                                : 'text-blue-100/80 hover:bg-white/8 hover:text-white'
                            }`
                          }
                        >
                          {link.name}
                        </NavLink>
                      )}
                    </motion.div>
                  )
                })}
              </motion.div>

              {/* Auth buttons */}
              <motion.div
                className="pt-5 flex gap-3 px-1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32, type: 'spring', stiffness: 300, damping: 26 }}
              >
                <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                  <Link to="/login" onClick={() => setMenuOpen(false)}
                    className="block text-center py-3.5 rounded-xl text-blue-100 font-medium border border-white/20 hover:bg-white/10 transition-colors duration-150">
                    Log in
                  </Link>
                </motion.div>
                <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                  <Link to="/signup" onClick={() => setMenuOpen(false)}
                    className="block text-center py-3.5 rounded-xl text-white font-semibold"
                    style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}>
                    Sign up
                  </Link>
                </motion.div>
              </motion.div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar