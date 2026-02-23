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





const testimonials = [
  { name: 'Sarah T.', role: 'Founder', text: 'Amazing quality and super fast delivery. Highly recommend!' },
  { name: 'James K.', role: 'Marketing Dir.', text: 'Professional designs that exceeded our expectations.' },
  { name: 'Maria L.', role: 'Designer', text: 'The best design agency I have worked with.' },
]

const Home = () => {
  return (
    <div className="bg-[#f5f5ff] w-full h-full">
      {/* Hero */}
      <section className="w-full md:h-full px-4 sm:px-6 lg:px-0">
        <div className="bg-[#f0edff] rounded-3xl h-full grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 relative overflow-hidden">

          {/* Left column - Text content */}
          <div className="flex flex-col w-full md:w-10/12 mx-auto justify-center z-10 order-2 md:order-1 py-8 md:py-12">

            <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-gray-900 mb-4 md:mb-5 leading-tight text-center md:text-left">
              Design Your Vision,<br />
              <span className="text-primary">Print Your Success</span>
            </h1>

            <p className="text-gray-600 mb-6 md:mb-8 max-w-md leading-relaxed text-center md:text-left mx-auto md:mx-0">
              Elevate your brand with expert design and printing solutions, crafted to make a lasting impression.
            </p>

            <div className="flex gap-3 flex-wrap justify-center md:justify-start">
              <Link to="/services" className="btn-primary flex items-center gap-2">
                Explore Services <ArrowRight size={16} />
              </Link>

              <Link to="/hire-designer" className="btn-outline">
                Hire Designer
              </Link>
            </div>

          </div>

          {/* Right column - Image */}
          <div className="relative order-1 md:order-2 flex items-center justify-center pt-8 md:pt-0">

            <img
              src={heroBanner}
              alt="Hero banner"
              className="w-[90%] sm:w-[80%] z-30 md:w-full h-auto object-contain mx-auto"
            />

          </div>

        </div>

        {/* Hero bottom */}
        <div className="w-full relative mt-6 md:-mt-6 lg:-mt-14">

          <img
            src={heroBottom}
            alt=""
            className="w-full h-auto object-cover"
          />

          {/* hello */}
          <div className="absolute hidden xl:block bottom-0 left-0">
            <img src={hellow} alt="" className='' />
          </div>

        </div>

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
