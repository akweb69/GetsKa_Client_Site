import { Link } from 'react-router-dom'
import { Star, ArrowLeft } from 'lucide-react'
import { PopularChoices, HireDesignersBlock } from '../components/Shared'

const portfolioItems = [
  { title: 'Interior Landing Page', tags: ['Branding','UI Design'] },
  { title: 'Appointment App UI Design', tags: ['Branding','UI Design'] },
  { title: 'Course Web UI Design', tags: ['Web Design','UI Design'] },
  { title: 'Real Estate Landing Page', tags: ['UI Design','Web Design'] },
  { title: 'Online Course UI Design', tags: ['Product Design','Online Course','UI Design'] },
  { title: 'SAAS Product UI Design', tags: ['UI Design','App Design'] },
  { title: 'Ecommerce App Design', tags: ['Ecommerce','Product Design'] },
  { title: 'Education Dashboard Design', tags: ['UI Design','Dashboard Design'] },
]

const skills = ['UI Design','UI Design','Content Design','Social Design','Web Design','CSS Guide','Tool Design','Typography','UI Tool','Brand Design','UI Tool 2','UI Design 3','Experience & Development']
const tools = ['Figma','Adobe XD','Sketch','Adobe Illustrator','Adobe Photoshop','Framer']

const HireDesignerDetail = () => {
  return (
    <div className="bg-[#f5f5ff]">
      {/* Profile Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        <Link to="/hire-designer" className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary mb-6 transition-colors">
          <ArrowLeft size={16} /> Back to designers
        </Link>

        <div className="bg-white rounded-2xl p-8 shadow-sm mb-6">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-200 to-orange-400 flex-shrink-0"></div>
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 font-display">Rakib Hasan</h1>
                  <p className="text-gray-500 text-sm mb-2">UX Designer</p>
                  <div className="flex items-center gap-1 text-sm">
                    <Star size={14} className="text-yellow-400 fill-yellow-400" />
                    <span className="font-semibold">4.9/5</span>
                    <span className="text-gray-400">(221 jobs)</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-3">
                  <span className="text-2xl font-black text-primary">€20.00/hr</span>
                  <div className="flex gap-3">
                    <button className="bg-primary hover:bg-primary-hover text-white px-5 py-2 rounded-full text-sm font-semibold transition-colors">
                      Hire Now
                    </button>
                    <Link to="/portfolio" className="border border-gray-200 text-gray-700 hover:border-primary hover:text-primary px-5 py-2 rounded-full text-sm font-semibold transition-colors">
                      View Portfolio
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Role & Bio */}
        <div className="bg-white rounded-2xl p-8 shadow-sm mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-1">UI/UX Designer | Product Designer</h2>
          <h3 className="text-lg font-bold text-gray-900 mb-4">Web Designer | App Designer</h3>
          <p className="text-gray-500 text-sm leading-relaxed mb-3">Hello, I'm Jamil, a professional UI/UX Designer.</p>
          <p className="text-gray-500 text-sm leading-relaxed mb-3">
            Driven by a passion for user-centric design and captivating digital journeys, I bring creativity and a problem-solving mindset to every project. With a focus on crafting user-friendly interfaces, I'm dedicated to blending artistic innovation with meticulous attention to detail.
          </p>
          <p className="text-gray-500 text-sm leading-relaxed mb-6">
            I am a highly qualified individual for this position with hands-on experience in user research, usability testing, and user journey mapping. My ability to collaborate effectively with cross-functional teams, passion for continuous learning, and experiencing working remotely and onsite make me well-equipped to create exceptional user experiences.
          </p>

          <h4 className="font-bold text-gray-900 text-sm mb-3">Skills</h4>
          <div className="flex flex-wrap gap-2 mb-5">
            {skills.map(s => (
              <span key={s} className="bg-primary-light text-primary text-xs px-3 py-1 rounded-full">{s}</span>
            ))}
          </div>

          <h4 className="font-bold text-gray-900 text-sm mb-3">Tools</h4>
          <div className="flex flex-wrap gap-2">
            {tools.map(t => (
              <span key={t} className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">{t}</span>
            ))}
          </div>
        </div>

        {/* Portfolio */}
        <h2 className="text-2xl font-bold text-gray-900 font-display mb-6 mt-10">Portfolios</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {portfolioItems.map((p, i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className={`h-52 flex items-center justify-center ${i % 3 === 0 ? 'bg-gray-900' : i % 3 === 1 ? 'bg-[#f5f5ff]' : 'bg-gray-800'}`}>
                <span className="text-5xl">🎨</span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-900 mb-2">{p.title}</h3>
                <div className="flex gap-2">
                  {p.tags.map(tag => (
                    <span key={tag} className="bg-primary-light text-primary text-xs px-2.5 py-1 rounded-full">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-2 mb-10">
          {['<', 1, 2, 3, '>'].map((p, i) => (
            <button key={i} className={`w-8 h-8 rounded-lg text-sm font-medium border transition-colors ${p === 1 ? 'bg-primary text-white border-primary' : 'bg-white text-gray-600 border-gray-200 hover:border-primary'}`}>
              {p}
            </button>
          ))}
        </div>
      </section>

      <HireDesignersBlock />
    </div>
  )
}

export default HireDesignerDetail
