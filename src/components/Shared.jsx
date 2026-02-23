import { Link } from 'react-router-dom'
import { ArrowRight, Star } from 'lucide-react'
import hiredesigner from '../assets/hire-designer--1.png'

// ─── Hero Banner (purple with decorative arcs) ───────────────────────────────
export const HeroBanner = ({ title, subtitle, cta = 'Customized now' }) => (
  <div className="bg-primary rounded-3xl text-white relative overflow-hidden mx-4 my-6 md:mx-6">
    {/* Decorative arcs */}
    <div className="absolute -top-8 -left-8 w-32 h-32 border-[12px] border-white/20 rounded-full" />
    <div className="absolute -bottom-8 -right-8 w-40 h-40 border-[12px] border-white/20 rounded-full" />
    <div className="absolute top-4 right-20 w-16 h-16 border-[8px] border-white/10 rounded-full" />
    <div className="relative z-10 py-16 px-8 text-center max-w-2xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 ">{title}</h1>
      {subtitle && <p className="text-purple-200 mb-8 text-sm leading-relaxed max-w-md mx-auto">{subtitle}</p>}
      <button className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-colors">
        {cta}
      </button>
    </div>
  </div>
)

// ─── Product Card ─────────────────────────────────────────────────────────────
export const ProductCard = ({ name = 'Packaging Products', price = '€ 20.00', qty = '100 pcs', img = "https://i.ibb.co/tp1qw7vj/Product-Label-1.png" }) => (
  <Link to="/product/1" className="bg-white rounded-2xl overflow-hidden hover:shadow-md transition-all duration-200 group">
    <div className="bg-gray-50 h-40 flex items-center justify-center overflow-hidden">
      {img
        ? <img src={img} alt={name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300" />
        : <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl opacity-60" />
        </div>
      }
    </div>
    <div className="p-3">
      <p className="text-xs md:text-base text-[#050C29] mb-0.5">{name}</p>
      <p className="text-xs text-[#3A456F">Starting from</p>
      <div className="flex items-center justify-between mt-1">
        <span className="font-bold text-[#5A33B4] text-sm">{price}</span>
        {qty && <span className="text-xs text-[#3A456F">{qty}</span>}
      </div>
    </div>
  </Link>
)

// ─── Popular Choices Section ──────────────────────────────────────────────────
export const PopularChoices = () => {
  const tabs = ['All', 'Business Cards', 'Calendars', 'ID Card', 'Stationary', 'Sticker']
  const products = [
    { name: 'Corporate Trifold Package', price: '€ 20.00' },
    { name: 'Elegant Business Card', price: '€ 25.00' },
    { name: 'Wedding Invitation', price: '€ 30.00' },
    { name: 'Corporate Trifold Brochure', price: '€ 50.00' },
    { name: 'Plastic Bag', price: '€ 15.00' },
    { name: 'Carry Bag', price: '€ 33.00' },
    { name: 'Invitation Card', price: '€ 20.00' },
    { name: 'Paper Box', price: '€ 40.00' },
  ]

  return (
    <section className="py-16 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900  mb-2">Popular Choices</h2>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            Check out the products everyone is raving about. Handpicked and highly rated, these are must-haves for your collection.
          </p>
        </div>
        <div className="flex gap-2 flex-wrap mb-8 justify-center">
          {tabs.map((tab, i) => (
            <button key={tab} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${i === 0 ? 'bg-primary text-white' : 'bg-white text-gray-600 hover:bg-primary-light border border-gray-200'}`}>
              {tab}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((p) => (
            <ProductCard key={p.name} name={p.name} price={p.price} qty={null} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Hire Designers Block ─────────────────────────────────────────────────────
export const HireDesignersBlock = () => (
  <section className="w-11/12 mx-auto my-16 md:my-24">
    <img src={hiredesigner} alt="Hire Designers" className="w-full object-cover rounded-xl" />
  </section>
)

// ─── Designer Card ────────────────────────────────────────────────────────────
export const DesignerCard = ({ name, role, rating = '4.9', jobs = '300', skills = [], id = '1' }) => (
  <div className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex flex-col items-center text-center">
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-200 to-purple-400 mb-3 overflow-hidden">
        <div className="w-full h-full bg-gradient-to-br from-orange-200 to-pink-300" />
      </div>
      <h3 className="font-bold text-gray-900 text-sm">{name}</h3>
      <p className="text-gray-500 text-xs mb-2">{role}</p>
      <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
        <Star size={11} className="text-yellow-400 fill-yellow-400" />
        <span className="font-semibold">{rating}/5</span>
        <span>({jobs} jobs)</span>
      </div>
      <div className="flex flex-wrap gap-1 justify-center mb-4">
        {skills.slice(0, 3).map(s => (
          <span key={s} className="bg-primary-light text-primary text-[10px] px-2 py-0.5 rounded-full">{s}</span>
        ))}
      </div>
      <Link to={`/hire-designer/${id}`} className="w-full bg-primary hover:bg-primary-hover text-white py-2 rounded-full text-sm font-semibold transition-colors text-center">
        Hire Now
      </Link>
    </div>
  </div>
)
