import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { HeroBanner, PopularChoices, HireDesignersBlock, ProductCard } from '../components/Shared'

const categories = [
  { name: 'Business Card', icon: '🎴' },
  { name: 'Sticker Design', icon: '🏷️' },
  { name: 'Flyer & Leaflets', icon: '📄' },
  { name: 'Stationery Design', icon: '✏️' },
  { name: 'Letter Head Design', icon: '📋' },
  { name: 'Banner Design', icon: '🖼️' },
  { name: 'Product Label', icon: '🏪' },
]

const sideCategories = ['Business Essentials','Marketing Materials','Labels & Stickers','Promotional Items','Banners, Poster & Signs','Apparel LIM','Forms & Packages']

const Products = () => {
  return (
    <div className="bg-[#f5f5ff]">
      <HeroBanner
        title="Products"
        subtitle="Discover our range of expertly crafted products, designed to elevate your brand with precision and quality."
      />

      {/* Category Icons */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-6">
        <div className="flex gap-4 overflow-x-auto pb-2">
          {categories.map(c => (
            <Link key={c.name} to={`/products/${c.name.toLowerCase().replace(/ /g, '-')}`}
              className="flex flex-col items-center gap-2 min-w-fit bg-white rounded-2xl px-5 py-3 shadow-sm hover:border-primary border border-transparent transition-all text-center">
              <span className="text-2xl">{c.icon}</span>
              <span className="text-xs font-medium text-gray-700 whitespace-nowrap">{c.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Main Content with Sidebar */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-8 flex gap-6">
        {/* Sidebar */}
        <div className="hidden lg:block w-52 flex-shrink-0">
          <div className="bg-white rounded-2xl p-4 shadow-sm sticky top-24">
            <h3 className="text-sm font-bold text-gray-900 mb-3">Most Popular Product</h3>
            <ul className="space-y-1">
              {sideCategories.map(item => (
                <li key={item}>
                  <Link to="/products" className="flex items-center justify-between py-2 text-xs text-gray-600 hover:text-primary transition-colors">
                    <span>{item}</span>
                    <ChevronRight size={12} className="text-gray-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex-1">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Array.from({length: 12}).map((_, i) => (
              <ProductCard key={i} name="Packaging Products" price={`€ ${(20 + i * 3).toFixed(2)}`} qty="100 pcs" />
            ))}
          </div>

          <h2 className="text-xl font-bold text-gray-900 font-display mt-10 mb-4">New Arrival</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Array.from({length: 8}).map((_, i) => (
              <ProductCard key={i} name="Packaging Products" price={`€ ${(15 + i * 4).toFixed(2)}`} qty={`${50 + i * 10} pcs`} />
            ))}
          </div>

          <h2 className="text-xl font-bold text-gray-900 font-display mt-10 mb-4">Special Offers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Array.from({length: 8}).map((_, i) => (
              <ProductCard key={i} name="Packaging Products" price={`€ ${(10 + i * 5).toFixed(2)}`} qty={`${30 + i * 5} pcs`} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-8 gap-2">
            {['<', 1, 2, 3, '...', 9, '>'].map((p, i) => (
              <button key={i} className={`w-8 h-8 rounded-lg text-sm font-medium border transition-colors ${p === 1 ? 'bg-primary text-white border-primary' : 'bg-white text-gray-600 border-gray-200 hover:border-primary hover:text-primary'}`}>
                {p}
              </button>
            ))}
          </div>
        </div>
      </section>

      <PopularChoices />
      <HireDesignersBlock />
    </div>
  )
}

export default Products
