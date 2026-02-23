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
      <section section className="max-w-7xl mx-auto px-4 md:px-6 pb-12" >
        <h2 className="text-2xl font-bold text-gray-900  mb-6">Core Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-primary rounded-2xl p-6 text-white">
            <h3 className="text-xl font-bold mb-2 ">Custom Design</h3>
            <p className="text-purple-200 text-sm">Unique, personalized designs that bring your vision to life.</p>
            <Link to="/branding" className="mt-4 inline-block text-sm font-semibold underline">Learn more</Link>
          </div>
          <div className="col-span-1 md:col-span-2 bg-white rounded-2xl overflow-hidden shadow-sm">
            <div className="h-40 bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center">
              <span className="text-4xl">🖨️</span>
            </div>
            <div className="p-5">
              <h3 className="text-xl font-bold mb-2 ">Printing</h3>
              <p className="text-gray-500 text-sm">Premium printing services for all your business needs, delivered with precision.</p>
            </div>
          </div>
        </div>
      </section >

      {/* Discover Us */}
      <section section className="max-w-7xl mx-auto px-4 md:px-6 pb-12" >
        <div className="bg-white rounded-3xl p-10 flex flex-col md:flex-row items-center gap-10 shadow-sm">
          <div className="flex-1">
            <p className="text-primary text-sm font-semibold mb-2">About Us</p>
            <h2 className="text-3xl font-bold text-gray-900  mb-4">Discover Us</h2>
            <p className="text-gray-500 leading-relaxed mb-4">
              We are a creative design agency passionate about helping brands stand out. From concept to print, we deliver exceptional results.
            </p>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Our team of expert designers and print specialists work together to bring your vision to life with unmatched quality and attention to detail.
            </p>
            <Link to="/about" className="btn-primary">Learn More <ArrowRight size={16} /></Link>
          </div>
          <div className="flex-1 h-56 bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl flex items-center justify-center">
            <span className="text-6xl">🎯</span>
          </div>
        </div>
      </section >

      {/* Client Insights */}
      <section section className="max-w-7xl mx-auto px-4 md:px-6 pb-12" >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 ">Client Insights</h2>
          <Link to="#" className="text-primary text-sm font-semibold hover:underline">See all</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {testimonials.map(t => (
            <div key={t.name} className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex text-yellow-400 mb-3">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-200 to-pink-200"></div>
                <div>
                  <p className="font-semibold text-sm text-gray-900">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section >

      <PopularChoices />
      <HireDesignersBlock />
    </div >
  )
}

export default Home
