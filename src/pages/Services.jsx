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
      <section className="w-11/12 mx-auto py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {services.map((s) => (
            <div key={s.title} className=" rounded-2xl p-6 shadow-sm hover:shadow-md transition-all border border-primary/20 bg-white group">
              <div className="text-3xl mb-4">{s.icon}</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 ">{s.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">{s.desc}</p>
              <Link to="/branding" className="text-primary text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                Explore more <ArrowUpRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      </section>

      <HireDesignersBlock />

      <PopularChoices />
    </div>
  )
}

export default Services
