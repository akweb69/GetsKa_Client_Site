import { HireDesignersBlock } from '../components/Shared'

const projects = [
  { title: 'Crafting Elegance', sub: 'Interior Design', color: 'bg-gray-900' },
  { title: 'Designing Dreams', sub: 'Architecture', color: 'bg-gray-800' },
  { title: 'Why Choose Us', sub: 'Branding', color: 'bg-gray-700' },
  { title: 'Visual Inspirations', sub: 'Photography', color: 'bg-gray-600' },
  { title: 'Featured Projects', sub: 'Portfolio', color: 'bg-gray-900' },
  { title: 'Envision Space', sub: 'Interior', color: 'bg-gray-800' },
  { title: 'Meet Our Creatives', sub: 'Team', color: 'bg-gray-700' },
  { title: 'Join Newsletter', sub: 'Marketing', color: 'bg-gray-600' },
]

const Portfolio = () => {
  return (
    <div className="bg-[#f5f5ff]">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pt-8">
        <div className="bg-primary rounded-3xl text-white relative overflow-hidden p-10 md:p-14 text-center">
          <div className="absolute -top-8 -left-8 w-32 h-32 border-[12px] border-white/20 rounded-full" />
          <div className="absolute -bottom-8 -right-8 w-40 h-40 border-[12px] border-white/20 rounded-full" />
          <div className="relative z-10">
            <h1 className="text-4xl font-bold font-display mb-4">Our Portfolio</h1>
            <p className="text-purple-200 text-sm max-w-md mx-auto">
              Explore our collection of stunning design work across branding, web, print, and more.
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <div key={i} className={`${p.color} rounded-2xl h-64 flex flex-col justify-end p-6 cursor-pointer group hover:scale-[1.01] transition-transform`}>
              <span className="text-white/50 text-xs mb-1">{p.sub}</span>
              <h3 className="text-white text-2xl font-bold font-display">{p.title}</h3>
            </div>
          ))}
        </div>
      </section>

      <HireDesignersBlock />
    </div>
  )
}

export default Portfolio
