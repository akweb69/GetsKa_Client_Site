import { useParams } from 'react-router-dom'
import { HeroBanner, PopularChoices, HireDesignersBlock, ProductCard } from '../components/Shared'

const ProductList = () => {
  const { category } = useParams()
  const title = category ? category.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : 'Business Card'

  return (
    <div className="bg-[#f5f5ff]">
      <HeroBanner
        title={title}
        subtitle={`Make a lasting impression with custom ${title.toLowerCase()}, designed to reflect your brand's identity and professionalism.`}
      />

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {Array.from({length: 20}).map((_, i) => (
            <ProductCard key={i} name="Packaging Products" price={`€ ${(20 + i * 2).toFixed(2)}`} qty="100 pcs" />
          ))}
        </div>
        {/* Pagination */}
        <div className="flex justify-center mt-8 gap-2">
          {['<', 1, 2, 3, '...', 8, '>'].map((p, i) => (
            <button key={i} className={`w-8 h-8 rounded-lg text-sm font-medium border transition-colors ${p === 1 ? 'bg-primary text-white border-primary' : 'bg-white text-gray-600 border-gray-200 hover:border-primary hover:text-primary'}`}>
              {p}
            </button>
          ))}
        </div>
      </section>

      <PopularChoices />
      <HireDesignersBlock />
    </div>
  )
}

export default ProductList
