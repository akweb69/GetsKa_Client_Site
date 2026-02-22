import { Link } from 'react-router-dom'
import { ArrowRight, ChevronRight } from 'lucide-react'
import { HireDesignersBlock } from '../components/Shared'

const processSteps = [
  { title: 'Identifying your target audience', desc: 'We research your target customers to understand their needs, preferences, and pain points, creating a strategy that appeals to them.' },
  { title: 'Competitor Analysis & User Research', desc: 'We get granular insight into the competition by conducting an in-depth analysis of your key competitors in the market space.' },
  { title: 'Brand/Mobile Design Strategy', desc: 'We create a design strategy that encompasses your brand personality, making strong, compelling visuals for your brand identity.' },
  { title: 'Iteration and Brand Presentation', desc: 'The client team presents the initial brand guidelines during typography and guidelines style for your brand.' },
  { title: 'Design Approach, Deliver & Starter Insights', desc: 'The creative team determines the visual elements and design approach to establish brand guidelines that are aligned to the brand.' },
  { title: 'Final Design Iteration & Implementation', desc: 'Find the most comprehensive online resource for brands. We curate the best of our themes and implement accordingly.' },
]

const industryList = ['Technology','Healthcare','Finance','Government & Policy','Tours and Community','Hospitality','Education','Branding For Groups','Non-profit']

const faqs = [
  { q: 'What is a logo?', a: 'A logo is a unique symbol, mark, or icon used to identify a company, product, or brand. It is typically combined with a business name and other visual elements.' },
  { q: 'How much does a Branding agency typically cost?', a: 'Branding costs vary widely based on the scope of work, agency reputation, and market. Typical projects range from $500 to $50,000+.' },
  { q: 'Do You Offer Branding Strategy to your businesses?', a: 'Yes! We offer comprehensive branding strategy services tailored to businesses of all sizes.' },
  { q: 'What Is the Road to Find the Professionals?', a: 'Browse our Hire Designer section to find qualified professionals matching your specific needs and budget.' },
]

const Branding = () => {
  return (
    <div className="bg-[#f5f5ff]">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pt-8">
        <div className="bg-primary rounded-3xl text-white relative overflow-hidden p-10 md:p-14">
          <div className="absolute -top-8 -left-8 w-32 h-32 border-[12px] border-white/20 rounded-full" />
          <div className="absolute -bottom-8 -right-8 w-40 h-40 border-[12px] border-white/20 rounded-full" />
          <div className="relative z-10 max-w-xl">
            <h1 className="text-4xl font-bold font-display mb-4">Brand Design &<br />Consulting Services</h1>
            <p className="text-purple-200 text-sm leading-relaxed mb-6">
              From brand strategy to visual identity, we craft comprehensive brand experiences that make your business memorable, impactful, and scalable.
            </p>
            <button className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-colors">
              Hire a Designer
            </button>
          </div>
        </div>
      </section>

      {/* Trusted Brands */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        <h2 className="text-2xl font-bold text-gray-900 font-display text-center mb-8">Trusted Global Brand</h2>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
            {['Spherule','Samsung','VISA','Amazon Pay','PayPal','Atipso','Spherule','Amazon Pay','VISA','Alipay','PayPal','UNIVERSIRY'].map((b, i) => (
              <div key={i} className="flex items-center justify-center h-8 opacity-40 hover:opacity-70 transition-opacity">
                <span className="text-gray-600 text-xs font-bold">{b}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Design Speaks Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-12">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 font-display mb-4">Design Speaks<br />Louder Than Words</h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Your visual brand is often the first impression customers have of your business. Great design builds trust, communicates values, and makes your brand unforgettable.
            </p>
            <button className="btn-primary">Find out more <ArrowRight size={16} /></button>
          </div>
          <div className="bg-white rounded-3xl p-8 h-64 flex items-center justify-center shadow-sm">
            <div className="text-center">
              <div className="text-6xl mb-3">🔤</div>
              <p className="text-gray-400 text-sm">Brand Identity Mockup</p>
            </div>
          </div>
        </div>
      </section>

      {/* Design Process */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-12">
        <div className="bg-white rounded-3xl p-10 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 font-display text-center mb-3">Design Process</h2>
          <p className="text-gray-500 text-sm text-center mb-10 max-w-md mx-auto">
            Our proven 6-step design process ensures every project is delivered with quality and precision.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {processSteps.map((step, i) => (
              <div key={i} className="bg-[#f5f5ff] rounded-2xl p-5">
                <div className="w-8 h-8 bg-primary rounded-lg mb-3 flex items-center justify-center text-white text-xs font-bold">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="font-bold text-gray-900 text-sm mb-2">{step.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-12">
        <div className="bg-navy rounded-3xl p-10 flex flex-col md:flex-row items-center gap-10">
          <div className="hidden md:block w-36 h-36 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex-shrink-0 opacity-80"></div>
          <div>
            <h2 className="text-3xl font-bold text-white font-display mb-4">Empowering<br />Success Stories.</h2>
            <p className="text-gray-400 text-sm mb-6 max-w-md leading-relaxed">
              Over the years, we've partnered with businesses of all sizes, delivering brand strategies that not only look great but also drive real business results.
            </p>
            <div className="flex gap-10">
              {[['9+','Years Branding'],['40+','Creative Members'],['500+','Companies Served']].map(([num, label]) => (
                <div key={label}>
                  <p className="text-3xl font-black text-white">{num}</p>
                  <p className="text-gray-400 text-xs mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Brand Design Services */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-12">
        <div className="bg-primary rounded-3xl p-10 text-white flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <h2 className="text-2xl font-bold font-display mb-4">Brand Design<br />Services</h2>
            <p className="text-purple-200 text-sm leading-relaxed mb-6">
              End-to-end branding services from strategy to execution — logos, style guides, brand voice, and more.
            </p>
            <button className="bg-white text-primary hover:bg-gray-100 px-6 py-2.5 rounded-full text-sm font-semibold transition-colors">
              Get started
            </button>
          </div>
          <div className="flex-1 h-48 bg-white/10 rounded-2xl flex items-center justify-center">
            <span className="text-5xl">🎨</span>
          </div>
        </div>
      </section>

      {/* Tailored for Industry */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-12">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 font-display mb-4">Tailored Brand<br />Design for Industry</h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              We specialize in branding for specific industries, understanding the unique challenges and opportunities each sector presents.
            </p>
            <button className="btn-primary">Get started now <ArrowRight size={16} /></button>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            {industryList.map(item => (
              <div key={item} className="flex items-center justify-between py-2.5 border-b border-gray-100 last:border-0">
                <span className="text-sm text-gray-700">{item}</span>
                <ChevronRight size={14} className="text-gray-400" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-12">
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 font-display mb-3">FAQs for Branding<br />Design Services</h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Find answers to your most common questions about our branding services and how we can help your business grow.
            </p>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm">
                <div className="flex items-center justify-between p-4 cursor-pointer">
                  <span className="text-sm font-medium text-gray-800">{faq.q}</span>
                  <span className="text-gray-400 ml-4">+</span>
                </div>
                {i === 0 && (
                  <div className="px-4 pb-4">
                    <p className="text-gray-500 text-xs leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Let's Collaborate Form */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-12">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 font-display mb-3">Let's<br />Collaborate</h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              This initiative provides services to millions and brings them together for rapid design growing results.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1.5">Name</label>
                <input type="text" placeholder="Ahmed Sharjil" className="w-full bg-[#f5f5ff] border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1.5">Company Name</label>
                <input type="text" placeholder="Company Inc" className="w-full bg-[#f5f5ff] border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1.5">Email*</label>
                <input type="email" placeholder="yourpersonal@email.com" className="w-full bg-[#f5f5ff] border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1.5">Phone</label>
                <input type="tel" placeholder="+880 5656 8926" className="w-full bg-[#f5f5ff] border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary" />
              </div>
            </div>
            <div className="mb-4">
              <label className="text-xs font-semibold text-gray-700 block mb-1.5">Project Detail*</label>
              <textarea rows={3} placeholder="Tell us more about your idea" className="w-full bg-[#f5f5ff] border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary resize-none"></textarea>
            </div>
            <div className="mb-4 flex items-start gap-2">
              <input type="checkbox" id="agree" className="mt-1 accent-primary" />
              <label htmlFor="agree" className="text-xs text-gray-500">I agree to the Terms of Service and Privacy Policy</label>
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

export default Branding
