import { Link } from 'react-router-dom'
import { ArrowRight, ChevronRight, Star } from 'lucide-react'
import { PopularChoices, HireDesignersBlock, ProductCard } from '../components/Shared'


// import images --->
import heroBanner from '../assets/hero img 1.png'
import heroBottom from '../assets/Frame hero bottom.png'
import hellow from '../assets/hero sub-img 1.png'
import CategoryPills from '../components/HomePage/CategoryPills'
import MostPopularProducts from '../components/HomePage/MostPopularProducts'
import UniqueEdge from '../components/HomePage/UniqueEdge'
import StarProducts from '../components/HomePage/StarProducts'
import CoreServices from '../components/HomePage/CoreServices'
import HeroSlider from '../components/HeroSlider'





const testimonials = [
  { name: 'Sarah T.', role: 'Founder', text: 'Amazing quality and super fast delivery. Highly recommend!' },
  { name: 'James K.', role: 'Marketing Dir.', text: 'Professional designs that exceeded our expectations.' },
  { name: 'Maria L.', role: 'Designer', text: 'The best design agency I have worked with.' },
]

const Home = () => {
  return (
    <div className="bg-[#f5f5ff] w-full h-full">
      {/* Hero */}
      <section className="w-full md:h-full">
        <HeroSlider />
      </section>

      {/* Category Pills */}
      <section className="w-11/12 mx-auto  py-8 md:py-16 lg:py-20">
        <CategoryPills />
      </section>

      {/* Most Popular Products */}
      <section className="w-11/12 mx-auto  pb-8 ">
        <MostPopularProducts />
      </section>

      {/* New Arrivals */}
      <section className="w-11/12 mx-auto  pb-8 ">

        <div className="flex gap-8">
          <div className="hidden lg:block w-1/4 flex-shrink-0 ">

          </div>
          <div className="w-full">
            <h2 className="text-2xl md:text-3xl font-bold text-[#09164B] mb-8 ">New Arrival</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Array.from({ length: 8 }).map((_, i) => (
                <ProductCard key={i} name="Packaging Products" price={`€ ${(25 + i * 3).toFixed(2)}`} qty={`${50 + i * 10} pcs`} />
              ))}
            </div>
          </div>
        </div >


      </section >

      {/* Special Offers */}
      <section className="w-11/12 mx-auto  pb-8 md:pb-16 lg:pb-20">

        <div className="flex gap-8">
          <div className="hidden lg:block w-1/4 flex-shrink-0 ">

          </div>
          <div className="w-full">
            <h2 className="text-2xl md:text-3xl font-bold text-[#09164B] mb-8 ">Special Offers</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Array.from({ length: 8 }).map((_, i) => (
                <ProductCard key={i} name="Packaging Products" price={`€ ${(25 + i * 3).toFixed(2)}`} qty={`${50 + i * 10} pcs`} />
              ))}
            </div>
          </div>
        </div >


      </section >

      {/* Unique Edge */}
      <section>
        <UniqueEdge />
      </section>

      {/* Star Products */}
      <section>
        <StarProducts />
      </section>

      {/* Core Services */}
      <section>
        <CoreServices />
      </section>
      <PopularChoices />
      <HireDesignersBlock />
    </div >
  )
}

export default Home
