import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { HeroBanner, PopularChoices, HireDesignersBlock, ProductCard } from '../components/Shared'
import CategoryPills from '../components/HomePage/CategoryPills'
import MostPopularProducts from '../components/HomePage/MostPopularProducts'



const sideCategories = ['Business Essentials', 'Marketing Materials', 'Labels & Stickers', 'Promotional Items', 'Banners, Poster & Signs', 'Apparel LIM', 'Forms & Packages']

const Products = () => {
  return (
    <div className="bg-[#f5f5ff]">
      <HeroBanner
        title="Products"
        subtitle="Discover our range of expertly crafted products, designed to elevate your brand with precision and quality."
      />

      {/* Category Icons */}
      <div className="w-11/12 mx-auto my-4">
        <CategoryPills />
      </div>


      {/* Main Content with Sidebar */}
      <div className="w-11/12 mx-auto">
        <MostPopularProducts />

      </div>

      <PopularChoices />
      <HireDesignersBlock />
    </div>
  )
}

export default Products
