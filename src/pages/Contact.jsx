import { HeroBanner, HireDesignersBlock } from '../components/Shared'

const Contact = () => {
  return (
    <div className="bg-[#f5f5ff]">
      <HeroBanner
        title="Contact"
        subtitle="Let's discuss how we can bring your vision to life with our tailored design and printing solutions."
      />

      {/* Contact Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-14">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Info */}
          <div className="space-y-8">
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">Email</p>
              <p className="text-gray-700 font-medium text-sm">contact@getskadesign.com</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Malaysia</p>
              <p className="text-gray-600 text-sm leading-relaxed">
                Kenanga Point Apartment, Jalan Gelugor,<br />
                Off Jalan Hung Tuah,<br />
                55200, Wp Kuala Lumpur, Malaysia
              </p>
              <p className="text-gray-600 text-sm mt-2">+60 10-664 6821</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Belgium</p>
              <p className="text-gray-600 text-sm">Zinniastraat 4, 9000 Gent</p>
              <p className="text-gray-600 text-sm mt-1">+32 499 87 79 85</p>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1.5">Full Name</label>
                <input type="text" placeholder="Ahmed Sharjil" className="w-full bg-[#f5f5ff] border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1.5">Company Name</label>
                <input type="text" placeholder="Ex. Jackob Inc" className="w-full bg-[#f5f5ff] border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1.5">Email*</label>
                <input type="email" placeholder="yourpersonal@email.com" className="w-full bg-[#f5f5ff] border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1.5">Phone*</label>
                <input type="tel" placeholder="+880 5656 8926" className="w-full bg-[#f5f5ff] border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1.5">Required Service*</label>
                <select className="w-full bg-[#f5f5ff] border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary">
                  <option>Select Your Service</option>
                  <option>Branding</option>
                  <option>Web Design</option>
                  <option>Print Design</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1.5">Project Budget*</label>
                <select className="w-full bg-[#f5f5ff] border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary">
                  <option>Select Your Range</option>
                  <option>$500 - $1000</option>
                  <option>$1000 - $5000</option>
                </select>
              </div>
            </div>
            <div className="mb-4">
              <label className="text-xs font-semibold text-gray-700 block mb-1.5">Project Details*</label>
              <textarea placeholder="Tell us more about your idea" rows={4} className="w-full bg-[#f5f5ff] border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary resize-none"></textarea>
            </div>
            <button className="w-full bg-primary hover:bg-primary-hover text-white py-3.5 rounded-xl font-bold text-base transition-colors">
              Submit
            </button>
          </div>
        </div>
      </section>

      <HireDesignersBlock />
    </div>
  )
}

export default Contact
