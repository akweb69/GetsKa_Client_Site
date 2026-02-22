import { Link } from 'react-router-dom'
import { Check, ArrowRight } from 'lucide-react'
import { HeroBanner, HireDesignersBlock } from '../components/Shared'

const brands = ['Spherule','Samsung','VISA','Amazon Pay','PayPal','Atipso','Spherule','Amazon Pay','VISA','Alipay','PayPal','UNIVERSIRY']

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
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-14">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 font-display mb-3">Precision and Quality<br />in Every Solution</h2>
          <p className="text-gray-500 text-sm max-w-lg mx-auto">
            Getska delivers top-tier design and printing solutions, blending precision and creativity to bring your vision to life and elevate your brand.
          </p>
        </div>
        <div className="w-full h-72 bg-white rounded-3xl shadow-sm overflow-hidden flex items-center justify-center">
          <div className="flex gap-4 items-center">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-4xl">👥</div>
            <div className="w-48 h-48 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center text-5xl">🎨</div>
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center text-4xl">💡</div>
          </div>
        </div>
      </section>

      {/* Agency Story */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-14">
        <div className="bg-white rounded-3xl p-10 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 font-display mb-4">Getska Design Agency<br />precision meets creativity</h2>
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
      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-14">
        <div className="bg-navy rounded-3xl p-10 flex flex-col md:flex-row items-center gap-10">
          <div className="hidden md:block w-40 h-40 flex-shrink-0">
            <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-80"></div>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white font-display mb-4">Empowering<br />Success Stories.</h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-md">
              Over the years, we've partnered with businesses of all sizes, delivering design strategies that not only look great but also drive real results. Our designs have helped clients overcome challenges, reach milestones, and establish their voices.
            </p>
            <div className="flex gap-10">
              {[['9+','Years Branding'],['40+','Creative Member'],['500+','Companies Served']].map(([num, label]) => (
                <div key={label} className="text-center">
                  <p className="text-3xl font-black text-white">{num}</p>
                  <p className="text-gray-400 text-xs mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-14">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 font-display mb-6">Values That<br />Sets Us Apart</h2>
            <div className="space-y-4">
              {['Meticulous Detail','Innovative Excellence','Precision Management','Transparent Communication'].map(v => (
                <div key={v} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <Check size={12} className="text-white" />
                  </div>
                  <span className="text-gray-700 font-medium text-sm">{v}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="h-64 bg-white rounded-3xl shadow-sm flex items-center justify-center">
            <span className="text-6xl">💼</span>
          </div>
        </div>
      </section>

      {/* Trusted Brands */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-14">
        <h2 className="text-2xl font-bold text-gray-900 font-display text-center mb-8">Trusted Global Brand</h2>
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <div className="grid grid-cols-4 md:grid-cols-6 gap-6">
            {brands.map((b, i) => (
              <div key={i} className="flex items-center justify-center h-10 opacity-40 hover:opacity-70 transition-opacity">
                <span className="text-gray-600 text-xs font-bold">{b}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-14">
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 font-display mb-3">Have Question?</h2>
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

      {/* Project Idea Form */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-14">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 font-display mb-3">Project Idea?</h2>
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
