import { useState, useMemo, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Star, Sparkles, ChevronRight } from 'lucide-react'
import {
  motion,
  AnimatePresence,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'
import hiredesigner from '../assets/hhhhhhhhhhhhhhhhhhhhhhhhh.png'
import productImage from '../assets/Image.png'
import useAllCategories from '../AdminCode/Hooks/useAllCategories'
import useProducts from '../AdminCode/Hooks/useProducts'

/* ═══════════════════════════════════════════════════
   SHARED VARIANTS
═══════════════════════════════════════════════════ */

const fadeUpVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1, y: 0,
    transition: { type: 'spring', stiffness: 280, damping: 26, delay },
  }),
}

const staggerContainer = (stagger = 0.08, delay = 0) => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
})

/* ═══════════════════════════════════════════════════
   HERO BANNER
═══════════════════════════════════════════════════ */

export const HeroBanner = ({ title, subtitle, cta = 'Customized now' }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32, scale: 0.97 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ type: 'spring', stiffness: 240, damping: 28 }}
      className="bg-primary rounded-3xl text-white relative overflow-hidden w-11/12 mx-auto my-6"
    >
      {/* Animated decorative arcs */}
      <motion.div
        className="absolute -bottom-8 -left-8 w-40 h-40 border-[20px] border-white/25 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute -top-8 -right-8 w-40 h-40 border-[20px] border-white/25 rounded-full"
        animate={{ rotate: -360 }}
        transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
      />

      {/* Extra floating orbs */}
      <motion.div
        className="absolute top-6 left-12 w-5 h-5 rounded-full bg-white/15"
        animate={{ y: [-6, 6, -6], opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-10 right-16 w-3 h-3 rounded-full bg-white/20"
        animate={{ y: [5, -5, 5], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      <motion.div
        className="relative z-10 py-16 px-8 text-center max-w-2xl mx-auto"
        variants={staggerContainer(0.12, 0.2)}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <motion.h1
          variants={fadeUpVariants}
          custom={0}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            variants={fadeUpVariants}
            custom={0.08}
            className="text-purple-200 mb-8 text-sm leading-relaxed max-w-md mx-auto"
          >
            {subtitle}
          </motion.p>
        )}

        <motion.div variants={fadeUpVariants} custom={0.16}>
          <motion.button
            className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-colors inline-flex items-center gap-2"
            whileHover={{ scale: 1.06, y: -2, boxShadow: '0 8px 24px rgba(0,0,0,0.3)' }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            {cta}
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowRight size={14} />
            </motion.span>
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════
   PRODUCT CARD
═══════════════════════════════════════════════════ */

export const ProductCard = ({
  name = 'Packaging Products',
  price = '€ 20.00',
  qty = '100 pcs',
  img = productImage,
}) => {
  const [hovered, setHovered] = useState(false)
  const cardRef = useRef(null)

  // Magnetic tilt
  const rotX = useSpring(0, { stiffness: 300, damping: 30 })
  const rotY = useSpring(0, { stiffness: 300, damping: 30 })

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    rotX.set(((e.clientY - cy) / rect.height) * -8)
    rotY.set(((e.clientX - cx) / rect.width) * 8)
  }

  const handleMouseLeave = () => {
    rotX.set(0)
    rotY.set(0)
    setHovered(false)
  }

  return (
    <motion.div style={{ perspective: 700 }}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX: rotX, rotateY: rotY }}
        whileTap={{ scale: 0.97 }}
      >
        <Link
          to={`/product/${name}`}
          className="bg-white rounded-2xl overflow-hidden block"
          style={{
            boxShadow: hovered
              ? '0 16px 40px rgba(90,51,180,0.14), 0 4px 12px rgba(0,0,0,0.06)'
              : '0 2px 8px rgba(0,0,0,0.05)',
            transition: 'box-shadow 0.25s ease',
            border: hovered ? '1px solid rgba(90,51,180,0.12)' : '1px solid transparent',
          }}
        >
          {/* Image */}
          <div className="bg-gray-50 h-40 md:h-46 lg:h-52 flex w-full items-center justify-center overflow-hidden relative">
            {img ? (
              <motion.img
                src={img}
                referrerPolicy="no-referrer"
                alt={name}
                className="w-full h-full object-cover"
                animate={{ scale: hovered ? 1.08 : 1 }}
                transition={{ type: 'spring', stiffness: 280, damping: 26 }}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl opacity-60" />
              </div>
            )}

            {/* Hover overlay shimmer */}
            <AnimatePresence>
              {hovered && (
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(110deg, transparent 20%, rgba(90,51,180,0.07) 50%, transparent 80%)',
                  }}
                  initial={{ x: '-100%' }}
                  animate={{ x: '200%' }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                />
              )}
            </AnimatePresence>
          </div>

          {/* Info */}
          <div className="p-3">
            <p className="text-xs md:text-base text-[#050C29] mb-0.5 line-clamp-1">{name}</p>
            <p className="text-xs text-[#3A456F]">Starting from</p>
            <div className="flex items-center justify-between mt-1">
              <motion.span
                className="font-bold text-[#5A33B4] text-sm"
                animate={{ color: hovered ? '#3b1fa8' : '#5A33B4' }}
                transition={{ duration: 0.2 }}
              >
                {price}
              </motion.span>
              {qty && <span className="text-xs text-[#3A456F]">{qty}</span>}
            </div>

            {/* CTA row — slides up on hover */}
            <AnimatePresence>
              {hovered && (
                <motion.div
                  className="mt-2 overflow-hidden"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                >
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-primary pt-1 border-t border-primary/10">
                    <span>View product</span>
                    <motion.span
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 1.2, repeat: Infinity }}
                    >
                      <ChevronRight size={11} />
                    </motion.span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════
   POPULAR CHOICES — TAB BUTTON
═══════════════════════════════════════════════════ */

const TabButton = ({ tab, isActive, onClick, index }) => (
  <motion.button
    onClick={() => onClick(tab)}
    className="relative px-5 py-2 rounded-full text-sm font-semibold outline-none bg-white/30 shadow focus-visible:ring-2 focus-visible:ring-primary/50 select-none"
    initial={{ opacity: 0, y: 12, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ type: 'spring', stiffness: 380, damping: 26, delay: 0.1 + index * 0.045 }}
    whileHover={{ scale: 1.06, y: -1.5 }}
    whileTap={{ scale: 0.95 }}
  >
    {/* Sliding active pill */}
    {isActive && (
      <motion.span
        layoutId="popular-tab-pill"
        className="absolute inset-0 rounded-full z-0"
        style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', boxShadow: '0 4px 18px rgba(99,102,241,0.38)' }}
        transition={{ type: 'spring', stiffness: 420, damping: 32 }}
      />
    )}

    {/* Inactive hover bg */}
    {!isActive && (
      <span className="absolute inset-0 rounded-full bg-primary/0 hover:bg-primary/6 transition-colors duration-200 z-0" />
    )}

    <span className={`relative z-10 flex items-center gap-1.5 transition-colors duration-200 ${isActive ? 'text-white' : 'text-gray-500'}`}>
      {tab.cat_img && (
        <motion.img
          src={tab.cat_img}
          alt=""
          className="w-4 h-4 object-contain rounded-sm flex-shrink-0"
          animate={isActive ? { rotate: [-6, 5, 0] } : { rotate: 0 }}
          transition={{ duration: 0.4 }}
        />
      )}
      {tab.cat_name}
    </span>

    {/* Active underline dot */}
    <AnimatePresence>
      {isActive && (
        <motion.span
          className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 25, delay: 0.08 }}
        />
      )}
    </AnimatePresence>
  </motion.button>
)

/* ─── Skeleton Card ── */
const SkeletonCard = ({ index }) => (
  <motion.div
    initial={{ opacity: 0, y: 14 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.05, type: 'spring', stiffness: 300, damping: 26 }}
    className="rounded-2xl overflow-hidden border border-gray-100 bg-white"
  >
    <div className="h-44 bg-gray-100 animate-pulse" />
    <div className="p-3 space-y-2">
      <div className="h-3.5 bg-gray-100 rounded-full animate-pulse w-3/4" />
      <div className="h-3 bg-gray-100 rounded-full animate-pulse w-1/2" />
      <div className="h-3 bg-gray-100 rounded-full animate-pulse w-1/3" />
    </div>
  </motion.div>
)

/* ─── Empty State ── */
const EmptyState = ({ categoryName }) => (
  <motion.div
    key="empty"
    initial={{ opacity: 0, scale: 0.94, y: 18 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.94, y: -10 }}
    transition={{ type: 'spring', stiffness: 300, damping: 26 }}
    className="col-span-full flex flex-col items-center justify-center py-20 text-center"
  >
    <motion.div
      className="w-16 h-16 rounded-2xl bg-primary/8 flex items-center justify-center mb-4"
      animate={{ rotate: [0, -8, 7, -4, 3, 0] }}
      transition={{ duration: 0.65, delay: 0.2 }}
    >
      <svg className="w-8 h-8 text-primary/35" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
      </svg>
    </motion.div>
    <p className="text-gray-700 font-semibold text-base mb-1">No products yet</p>
    <p className="text-gray-400 text-sm">
      Nothing in <span className="font-medium text-gray-500">{categoryName}</span> right now. Check back soon!
    </p>
  </motion.div>
)

/* ─── Count Badge ── */
const CountBadge = ({ count }) => (
  <AnimatePresence mode="wait">
    <motion.span
      key={count}
      initial={{ opacity: 0, y: -7, scale: 0.75 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 7, scale: 0.75 }}
      transition={{ type: 'spring', stiffness: 500, damping: 26 }}
      className="inline-flex items-center justify-center ml-2 px-2 py-0.5 rounded-full text-xs font-bold bg-primary/10 text-primary"
    >
      {count}
    </motion.span>
  </AnimatePresence>
)

/* ═══════════════════════════════════════════════════
   POPULAR CHOICES — MAIN
═══════════════════════════════════════════════════ */

export const PopularChoices = () => {
  const { isLoading: catLoading, allCategories = [] } = useAllCategories()
  const { isLoading: productLoading, products = [] } = useProducts()

  const ALL_TAB = { _id: '__all__', cat_name: 'All' }
  const tabs = useMemo(() => [ALL_TAB, ...allCategories], [allCategories])

  const [selectedTab, setSelectedTab] = useState(ALL_TAB)

  // Filter products by selected category
  const filteredProducts = useMemo(() => {
    if (selectedTab._id === '__all__') return products
    return products.filter((p) =>
      p.p_category.includes(selectedTab.cat_name)
    )
  }, [products, selectedTab])

  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })
  const isLoading = catLoading || productLoading

  return (
    <section ref={sectionRef} className="py-20 relative overflow-hidden">

      {/* Background breathing orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.06), transparent)' }}
          animate={{ scale: [1, 1.1, 1], rotate: [0, 20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.05), transparent)' }}
          animate={{ scale: [1, 1.14, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        />
      </div>

      <motion.div
        className="w-11/12 mx-auto"
        variants={staggerContainer(0.12, 0.1)}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >

        {/* ── HEADING ── */}
        <motion.div variants={fadeUpVariants} custom={0} className="text-center mb-10">
          <motion.span
            className="inline-block text-xs font-bold tracking-widest text-primary/60 uppercase mb-3 px-3 py-1 rounded-full border border-primary/15 bg-primary/5"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ type: 'spring', stiffness: 400, damping: 24, delay: 0.05 }}
          >
            Trending Now
          </motion.span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 tracking-tight">
            Popular Choices
          </h2>
          <p className="text-gray-400 text-sm max-w-md mx-auto leading-relaxed">
            Handpicked and highly rated — these are the must-haves everyone is raving about.
          </p>
        </motion.div>

        {/* ── TABS ── */}
        <motion.div
          variants={fadeUpVariants}
          custom={0.1}
          className="flex gap-2 flex-wrap mb-4 justify-center"
        >
          {catLoading
            ? Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={i}
                className="h-9 rounded-full bg-gray-100 animate-pulse"
                style={{ width: 72 + i * 14 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
              />
            ))
            : tabs.map((tab, i) => (
              <TabButton
                key={tab._id}
                tab={tab}
                isActive={selectedTab._id === tab._id}
                onClick={setSelectedTab}
                index={i}
              />
            ))
          }
        </motion.div>

        {/* ── COUNT LABEL ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTab._id + '-label'}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center mb-8"
          >
            <span className="text-sm text-gray-400">
              {selectedTab.cat_name === 'All' ? 'All products' : selectedTab.cat_name}
            </span>
            {!isLoading && <CountBadge count={filteredProducts.length} />}
          </motion.div>
        </AnimatePresence>

        {/* ── PRODUCT GRID ── */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {Array.from({ length: 10 }).map((_, i) => <SkeletonCard key={i} index={i} />)}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTab._id}
              className="grid grid-cols-2 md:grid-cols-5 gap-4"
              variants={staggerContainer(0.07, 0.04)}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
            >
              {filteredProducts.length === 0 ? (
                <EmptyState categoryName={selectedTab.cat_name} />
              ) : (
                filteredProducts.map((product) => (
                  <motion.div
                    key={product._id}
                    variants={fadeUpVariants}
                    layout
                    custom={0}
                  >
                    <ProductCard
                      name={product.title}
                      price={`€ ${product.price.toFixed(2)}`}
                      qty={product.min_quantity}
                      img={product.mainImage}
                    />
                  </motion.div>
                ))
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </motion.div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════
   HIRE DESIGNERS BLOCK
═══════════════════════════════════════════════════ */

export const HireDesignersBlock = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.section
      ref={ref}
      className="w-11/12 mx-auto my-16 md:my-24 bg-[#09164B] rounded-3xl text-white overflow-hidden"
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ type: 'spring', stiffness: 220, damping: 28 }}
    >
      <div className="w-full grid md:grid-cols-2 gap-4 items-center h-full">

        {/* Left — image */}
        <motion.div
          className="w-full flex justify-center items-center p-10 lg:p-16"
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ type: 'spring', stiffness: 240, damping: 28, delay: 0.15 }}
        >
          <motion.img
            src={hiredesigner}
            alt="Hire a designer"
            className="w-full h-full"
            whileHover={{ scale: 1.03, rotate: 1 }}
            transition={{ type: 'spring', stiffness: 280, damping: 22 }}
          />
        </motion.div>

        {/* Right — content */}
        <motion.div
          className="p-8 md:p-0 md:pr-12"
          variants={staggerContainer(0.1, 0.25)}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.h1
            variants={fadeUpVariants}
            custom={0}
            className="text-5xl lg:text-6xl font-bold mb-4 leading-tight"
          >
            Hire{' '}
            <motion.span
              className="text-[#C4ABFE] inline-block"
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              Designers
            </motion.span>
          </motion.h1>

          <motion.p
            variants={fadeUpVariants}
            custom={0.05}
            className="w-full md:max-w-md mb-6 text-[#F2EDFF]/80 leading-relaxed"
          >
            Find skilled designers for both freelance projects and full-time opportunities.
            Enhance your brand with expert design solutions.
          </motion.p>

          <motion.div
            variants={fadeUpVariants}
            custom={0.1}
            className="flex gap-4 md:flex-row flex-col items-start"
          >
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/hire-designer"
                className="inline-block px-6 py-2.5 bg-[#5216E7] rounded-lg text-sm font-semibold transition-all hover:bg-[#4310c0]"
              >
                Hire Designers
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/services"
                className="inline-flex items-center gap-1.5 text-[#C4ABFE] border border-[#C4ABFE] rounded-lg px-6 py-2.5 text-sm font-semibold transition-all hover:bg-[#5216E7] hover:text-white hover:border-transparent"
              >
                Explore services
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <ArrowRight size={14} />
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={fadeUpVariants}
            custom={0.18}
            className="flex gap-8 mt-8 pt-8 border-t border-white/10"
          >
            {[
              { value: '500+', label: 'Designers' },
              { value: '10k+', label: 'Projects Done' },
              { value: '4.9★', label: 'Avg Rating' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.45 + i * 0.1, type: 'spring', stiffness: 320, damping: 26 }}
              >
                <p className="text-xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-white/50 mt-0.5">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}

/* ═══════════════════════════════════════════════════
   DESIGNER CARD
═══════════════════════════════════════════════════ */

export const DesignerCard = ({
  name,
  role,
  rating = '4.9',
  jobs = '300',
  skills = [],
  _id,
  profileImage
}) => {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 360, damping: 24 }}
      className="bg-white rounded-2xl p-5 relative overflow-hidden"
      style={{
        boxShadow: hovered
          ? '0 20px 48px rgba(90,51,180,0.16), 0 4px 12px rgba(0,0,0,0.06)'
          : '0 2px 12px rgba(0,0,0,0.06)',
        transition: 'box-shadow 0.25s ease',
      }}
    >
      {/* Hover glow bg */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              background: 'radial-gradient(ellipse at 50% 0%, rgba(90,51,180,0.06) 0%, transparent 70%)',
            }}
          />
        )}
      </AnimatePresence>

      <div className="flex flex-col items-center text-center relative z-10">
        {/* Avatar */}
        <motion.div
          className="w-16 h-16 rounded-full mb-3 overflow-hidden relative"
          animate={hovered ? { scale: 1.1, rotate: 3 } : { scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 380, damping: 22 }}
        >
          {/* <div className="w-full h-full bg-gradient-to-br from-orange-200 to-pink-300" /> */}
          <img className='w-full h-full object-cover' src={profileImage} alt="" />
          {/* Online dot */}
          <motion.div
            className="absolute bottom-0.5 right-0.5 w-3 h-3 rounded-full bg-green-400 border-2 border-white"
            animate={hovered ? { scale: 1.2 } : { scale: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          />
        </motion.div>

        <motion.h3
          className="font-bold text-gray-900 text-sm"
          animate={{ color: hovered ? '#5A33B4' : '#111827' }}
          transition={{ duration: 0.2 }}
        >
          {name}
        </motion.h3>
        <p className="text-gray-500 text-xs mb-2">{role}</p>

        {/* Rating */}
        <motion.div
          className="flex items-center gap-1 text-xs text-gray-500 mb-3"
          animate={hovered ? { scale: 1.04 } : { scale: 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 22 }}
        >
          <Star size={11} className="text-yellow-400 fill-yellow-400" />
          <span className="font-semibold">{rating}/5</span>
          <span>({jobs} jobs)</span>
        </motion.div>

        {/* Skills */}
        <div className="flex flex-wrap gap-1 justify-center mb-4">
          {skills.slice(0, 3).map((s, i) => (
            <motion.span
              key={s}
              className="bg-primary/80 text-white text-[10px] px-2 py-0.5 rounded-full"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.06, type: 'spring', stiffness: 400, damping: 22 }}
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(90,51,180,0.15)' }}
            >
              {s}
            </motion.span>
          ))}
        </div>

        {/* CTA */}
        <motion.div className="w-full" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
          <Link
            to={`/hire-designer/${_id}`}
            className="w-full bg-primary hover:bg-primary/90 text-white py-2 rounded-full text-sm font-semibold transition-colors text-center block"
          >
            Hire Now
          </Link>
        </motion.div>
      </div>
    </motion.div>
  )
}