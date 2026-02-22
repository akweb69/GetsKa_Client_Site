import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { HeroBanner, PopularChoices, HireDesignersBlock } from '../components/Shared'

const services = [
  { title: 'Branding', icon: '✏️', desc: 'Craft a powerful brand presence with designs that capture your vision and resonate with audience.' },
  { title: 'Graphic Design', icon: '🎨', desc: 'Creating impactful and engaging graphic designs tailored to your needs.' },
  { title: 'Print Design', icon: '🖨️', desc: 'Transforming your concepts into high-impact print designs with precision and style.' },
  { title: 'Motion Graphic', icon: '🎬', desc: 'Transforming concepts into captivating motion infographics that engage and resonate.' },
  { title: 'Video Editing', icon: '🎞️', desc: 'Crafting seamless and engaging video edits that tell your story with precision.' },
  { title: 'Digital Marketing', icon: '📢', desc: "Boosting your brand's online presence with targeted digital marketing strategies." },
  { title: 'UI/UX Design', icon: '🖥️', desc: 'Creating user-centric UI/UX designs for web and app that blend aesthetics with functionality.' },
  { title: 'Web Development', icon: '💻', desc: 'Crafting custom websites that combine stunning visuals with seamless functionality.' },
  { title: 'App Development', icon: '📱', desc: 'Creating custom apps that blend cutting-edge technology with user-friendly design.' },
]

const Services = () => {
  return (
    <div className="bg-[#f5f5ff]">
      <HeroBanner
        title="Services"
        subtitle="Our services are tailored for excellence and precision. Designed to elevate your brand with quality and innovation."
      />

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {services.map((s) => (
            <div key={s.title} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all group">
              <div className="text-3xl mb-4">{s.icon}</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 font-display">{s.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">{s.desc}</p>
              <Link to="/branding" className="text-primary text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                Explore more <ArrowUpRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Hire Designers Banner */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-10">
        <div className="bg-navy rounded-3xl flex flex-col md:flex-row items-center gap-6 px-10 py-10 relative overflow-hidden">
          <div className="flex gap-3 flex-shrink-0">
            <div className="w-24 h-28 bg-white/10 rounded-2xl overflow-hidden">
              <div className="w-full h-full bg-gradient-to-b from-orange-200 to-orange-400" />
            </div>
            <div className="w-20 h-20 bg-white/10 rounded-full overflow-hidden self-end mb-4">
              <div className="w-full h-full bg-gradient-to-b from-gray-200 to-gray-400" />
            </div>
          </div>
          <div>
            <h2 className="text-white text-3xl font-bold font-display mb-3">Hire Designers</h2>
            <p className="text-gray-400 text-sm mb-5 max-w-sm">
              Find skilled designers for both freelance projects and full-time opportunities. Enhance your brand with expert design solutions.
            </p>
            <div className="flex gap-3">
              <Link to="/hire-designer" className="bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-colors">
                Hire Designers
              </Link>
              <Link to="/services" className="border border-white/30 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-white/10 transition-colors">
                Explore services
              </Link>
            </div>
          </div>
        </div>
      </section>

      <PopularChoices />
      <HireDesignersBlock />
    </div>
  )
}

export default Services
