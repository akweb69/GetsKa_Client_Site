import { Link } from 'react-router-dom'
import { Check, ArrowRight } from 'lucide-react'
import { HeroBanner, HireDesignersBlock } from '../components/Shared'
import recte30 from '../assets/Rectangle 30.png'
import abouttt from '../assets/about-11.png'
import aboutvalue from '../assets/about-value.png'
import aboutpayment from '../assets/about-payment.png'
import aboutslide from '../assets/about-slide.png'

const brands = ['Spherule', 'Samsung', 'VISA', 'Amazon Pay', 'PayPal', 'Atipso', 'Spherule', 'Amazon Pay', 'VISA', 'Alipay', 'PayPal', 'UNIVERSIRY']

const faqs = [
  'What services does GetskaDesign agency offer?',
  'Do you provide only branding design or also digital media?',
  'What is the typical turnaround time for a project?',
  'Can creative work to my specific design?',
  'Do you offer design services for both online and print media?',
  'What is your process for onboarding new clients?',
]

const About = () => {
  return (
    <div className="bg-[#f5f5ff]">
      <HeroBanner
        title="About"
        subtitle="Committed to Delivering Top Design Quality. Our Expertise Enhances Your Brand with Every Solution."
        cta="Explore our work"
      />

      {/* Precision Section */}
      <section className="w-11/12 mx-auto py-14">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900  mb-3">Precision and Quality<br />in Every Solution</h2>
          <p className="text-gray-500 text-sm max-w-lg mx-auto">
            Getska delivers top-tier design and printing solutions, blending precision and creativity to bring your vision to life and elevate your brand.
          </p>
        </div>
        <div className="w-full ">
          <img src={recte30} className='w-full h-full' alt="Precision and Quality in Every Solution" />
        </div>
      </section>

      {/* Agency Story */}
      <section className="w-11/12 mx-auto pb-14">
        <div className="bg-white rounded-3xl p-10 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900  mb-4">Getska Design Agency<br />precision meets creativity</h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-4">
            Founded in 2013, Getska Design Agency excels in providing exceptional design services with a global reach. Our team combines creativity and passion to elevate businesses worldwide, driving innovation and creativity to elevate brands and achieve outstanding results.
          </p>
          <p className="text-gray-500 text-sm leading-relaxed mb-6">
            At Getska, we uphold integrity and transparency as the core values of our work. Our commitment to ethical practices ensure clear communication between our team and collaborators with our clients. This foundation of trust has been crucial to our success. Fostering strong relationships and delivering results to customers 0% customer satisfaction rating. This is our foundation, consistently striving for excellence in every project we undertake.
          </p>
          <div className="flex gap-4">
            <Link to="/contact" className="btn-primary">Get in touch <ArrowRight size={16} /></Link>
            <Link to="/portfolio" className="btn-outline">Portfolio view</Link>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="w-full pb-14">
        <img src={abouttt} className='w-full h-full' alt="" />
      </section>

      {/* Values */}

      <section className="w-full pb-14">
        <img src={aboutvalue} className='w-full h-full' alt="" />
      </section>

      {/* Trusted Brands */}
      <section className="w-full pb-14">
        <img src={aboutpayment} className='w-full h-full' alt="" />
      </section>

      {/* FAQ */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-14">
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-900  mb-3">Have Question?</h2>
            <p className="text-gray-500 text-sm">We've answered some of your most frequently asked questions and innovative solutions.</p>
          </div>
          <div className="space-y-3">
            {faqs.map((q, i) => (
              <div key={i} className="bg-white rounded-xl px-5 py-4 flex items-center justify-between shadow-sm cursor-pointer hover:border-primary border border-transparent transition-colors">
                <span className="text-sm text-gray-700">{q}</span>
                <span className="text-gray-400 text-lg ml-4">+</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* slider */}
      <section className="w-full pb-14">
        <img src={aboutslide} className='w-full h-full' alt="" />
      </section>
      {/* Project Idea Form */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-14">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900  mb-3">Project Idea?</h2>
            <p className="text-gray-500 text-sm">We're always looking for partners like you. And we would love to work with you on your next big project.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">Full Name</label>
                <input type="text" placeholder="Ahmed Sharjil" className="w-full bg-[#f5f5ff] border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">Company Name</label>
                <input type="text" placeholder="Ex. Jackob Inc" className="w-full bg-[#f5f5ff] border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">Email*</label>
                <input type="email" placeholder="yourpersonal@email.com" className="w-full bg-[#f5f5ff] border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">Phone*</label>
                <input type="tel" placeholder="+880 5656 8926" className="w-full bg-[#f5f5ff] border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">Required Service*</label>
                <select className="w-full bg-[#f5f5ff] border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary">
                  <option>Select Your Service</option>
                  <option>Branding</option>
                  <option>Graphic Design</option>
                  <option>Web Development</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">Project Budget*</label>
                <select className="w-full bg-[#f5f5ff] border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary">
                  <option>Select Your Range</option>
                  <option>$500 - $1000</option>
                  <option>$1000 - $5000</option>
                  <option>$5000+</option>
                </select>
              </div>
            </div>
            <div className="mb-4">
              <label className="text-xs font-semibold text-gray-700 block mb-1">Project Details*</label>
              <textarea placeholder="Tell us more about your idea" rows={3} className="w-full bg-[#f5f5ff] border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary resize-none"></textarea>
            </div>
            <button className="w-full bg-primary hover:bg-primary-hover text-white py-3 rounded-xl font-semibold transition-colors">
              Submit
            </button>
          </div>
        </div>
      </section>

      <HireDesignersBlock />
    </div>
  )
}

export default About
