import { Link, useParams } from 'react-router-dom'
import { Star, ArrowLeft } from 'lucide-react'
import { HireDesignersBlock } from '../components/Shared'
import useGetDesignerBy_Id from '../AdminCode/Hooks/useGetDesignerBy_Id'
import AdminLoader from '../AdminCode/Components/AdminLoader'

const HireDesignerDetail = () => {
  const { id } = useParams()
  const { DesignerDataLoading, DesignerData } = useGetDesignerBy_Id({ id })

  // Backend থেকে আসা data (আপনি যে structure দিয়েছেন exact সেইটা)
  const designer = DesignerData

  // যদি data না আসে তাহলে loading দেখাবে
  if (DesignerDataLoading) {
    return (
      <AdminLoader />
    )
  }

  if (!designer) {
    return (
      <div className="bg-[#f5f5ff] min-h-screen flex items-center justify-center">
        <p className="text-lg text-red-500">Designer data not found</p>
      </div>
    )
  }

  // About text এ newline কে break line এ convert
  const aboutText = designer.about ? designer.about.replace(/\n/g, '<br />') : ''

  // Tags string কে array তে convert করার helper function
  const processTags = (tagsStr) => {
    if (!tagsStr) return []
    return tagsStr.split(',').map(tag => tag.trim()).filter(Boolean)
  }

  return (
    <div className="bg-[#f5f5ff]">
      {/* Profile Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        <Link to="/hire-designer" className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary mb-6 transition-colors">
          <ArrowLeft size={16} /> Back to designers
        </Link>

        <div className="bg-white rounded-2xl p-8 shadow-sm mb-6">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <img
              src={designer.profileImage}
              alt={designer.name}
              className="w-20 h-20 rounded-full object-cover flex-shrink-0 border-2 border-white shadow"
              onError={(e) => {
                e.target.onerror = null
                e.target.src = 'https://via.placeholder.com/80?text=Profile'
              }}
            />

            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 font-display">{designer.name}</h1>
                  <p className="text-gray-500 text-sm mb-2 capitalize">{designer.role}</p>
                  <div className="flex items-center gap-1 text-sm">
                    <Star size={14} className="text-yellow-400 fill-yellow-400" />
                    <span className="font-semibold">{designer.rating}/5</span>
                    <span className="text-gray-400">({designer.jobs} jobs)</span>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-3">
                  <span className="text-2xl font-black text-primary">
                    €{designer.PricePerHour}.00/hr
                  </span>
                  <div className="flex gap-3">
                    <button className="bg-primary hover:bg-primary-hover text-white px-5 py-2 rounded-full text-sm font-semibold transition-colors">
                      Hire Now
                    </button>

                    {designer.portfolio_link && (
                      <a
                        href={designer.portfolio_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border border-gray-200 text-gray-700 hover:border-primary hover:text-primary px-5 py-2 rounded-full text-sm font-semibold transition-colors"
                      >
                        View Portfolio
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Role & Bio */}
        <div className="bg-white rounded-2xl p-8 shadow-sm mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-1">Full Stack Web Developer</h2>
          <h3 className="text-lg font-bold text-gray-900 mb-4">React • JavaScript • Modern Web Solutions</h3>

          <div
            className="text-gray-500 text-sm leading-relaxed mb-6 whitespace-pre-line"
            dangerouslySetInnerHTML={{ __html: aboutText }}
          />

          <h4 className="font-bold text-gray-900 text-sm mb-3">Skills</h4>
          <div className="flex flex-wrap gap-2 mb-5">
            {designer.skills?.map((skill, index) => (
              <span
                key={index}
                className="bg-primary-light text-primary text-xs px-3 py-1 rounded-full capitalize"
              >
                {skill}
              </span>
            ))}
          </div>

          <h4 className="font-bold text-gray-900 text-sm mb-3">Tools</h4>
          <div className="flex flex-wrap gap-2">
            {designer.tools?.map((tool, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full capitalize"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Portfolio Section */}
        <h2 className="text-2xl font-bold text-gray-900 font-display mb-6 mt-10">Portfolios</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {designer.portfolios?.map((portfolio, i) => {
            const tags = processTags(portfolio.tags)

            return (
              <div
                key={i}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div
                  className="h-52 bg-cover bg-center relative"
                  style={{
                    backgroundImage: portfolio.image
                      ? `url(${portfolio.image})`
                      : 'none',
                    backgroundColor: '#f3f4f6'
                  }}
                >
                  {!portfolio.image && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-6xl opacity-30">🌐</span>
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-2">{portfolio.title}</h3>

                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="bg-primary-light text-primary text-xs px-2.5 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {portfolio.link && (
                    <a
                      href={portfolio.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary text-sm inline-flex items-center gap-1 hover:underline"
                    >
                      Visit Project →
                    </a>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Pagination - UI unchanged */}
        <div className="flex justify-center gap-2 mb-10">
          {['<', 1, 2, 3, '>'].map((p, i) => (
            <button
              key={i}
              className={`w-8 h-8 rounded-lg text-sm font-medium border transition-colors 
                ${p === 1 ? 'bg-primary text-white border-primary' : 'bg-white text-gray-600 border-gray-200 hover:border-primary'}`}
            >
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