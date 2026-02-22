import { useState } from 'react'
import { Star, ShoppingCart, Heart, ChevronDown } from 'lucide-react'
import { PopularChoices, HireDesignersBlock, ProductCard } from '../components/Shared'

const reviews = [
  { name: 'Sarah Tucker', date: 'Feb 12, 2024', stars: 5, text: 'Excellent quality! Could not be more pleased. The prints came out perfect and exactly as described.' },
  { name: 'Sarah Tucker', date: 'Jan 24, 2024', stars: 5, text: "I'll say, what a design anyway! The customization options are fantastic." },
  { name: 'Sarah Tucker', date: 'Jan 20, 2024', stars: 5, text: 'I must certainly buy this again and keep my order in! Great service and packaging.' },
]

const ProductDetail = () => {
  const [qty, setQty] = useState(1)
  const [activeTab, setActiveTab] = useState('Details & Info')
  const [selectedImage, setSelectedImage] = useState(0)

  const tabs = ['Details & Info', 'FAQ', 'Color', 'Paper', 'Speciality']

  return (
    <div className="bg-[#f5f5ff]">
      {/* Product Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Image Gallery */}
          <div className="flex gap-4 lg:w-1/2">
            <div className="flex flex-col gap-3">
              {[0,1,2,3].map(i => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-colors ${selectedImage === i ? 'border-primary' : 'border-gray-200'}`}
                >
                  <div className={`w-full h-full bg-gradient-to-br ${i % 2 === 0 ? 'from-blue-100 to-blue-200' : 'from-gray-100 to-gray-200'} flex items-center justify-center`}>
                    <span className="text-lg">🎴</span>
                  </div>
                </button>
              ))}
            </div>
            <div className="flex-1 bg-white rounded-2xl flex items-center justify-center h-96 shadow-sm">
              <div className="text-8xl">🎴</div>
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 font-display">Modern Business Card</h1>
                  <p className="text-primary font-bold text-xl mt-1">€ 30.00</p>
                  <p className="text-gray-400 text-xs mt-0.5">Premium per standard</p>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Star size={14} className="text-yellow-400 fill-yellow-400" />
                  <span className="font-semibold">4.9/5</span>
                  <span className="text-gray-400">(221 jobs)</span>
                </div>
              </div>

              <p className="text-gray-500 text-sm leading-relaxed mb-5">
                Impress everyone you meet with our premium business cards — clean, memorable and built to keep you top of mind.
              </p>

              {/* Options */}
              <div className="space-y-4 mb-6">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="text-xs font-semibold text-gray-700 block mb-1.5">Size</label>
                    <div className="relative">
                      <select className="w-full bg-[#f5f5ff] border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 appearance-none focus:outline-none focus:border-primary">
                        <option>3.5'' x 2'' - Standard Size</option>
                        <option>3.5'' x 2.5''</option>
                      </select>
                      <ChevronDown size={14} className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <label className="text-xs font-semibold text-gray-700 block mb-1.5">Sides</label>
                    <div className="relative">
                      <select className="w-full bg-[#f5f5ff] border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 appearance-none focus:outline-none focus:border-primary">
                        <option>Printed Single Side</option>
                        <option>Printed Both Sides</option>
                      </select>
                      <ChevronDown size={14} className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="text-xs font-semibold text-gray-700 block mb-1.5">Lamination</label>
                    <div className="relative">
                      <select className="w-full bg-[#f5f5ff] border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 appearance-none focus:outline-none focus:border-primary">
                        <option>Gloss Lamination</option>
                        <option>Matt Lamination</option>
                      </select>
                      <ChevronDown size={14} className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <label className="text-xs font-semibold text-gray-700 block mb-1.5">Delivery</label>
                    <div className="relative">
                      <select className="w-full bg-[#f5f5ff] border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 appearance-none focus:outline-none focus:border-primary">
                        <option>Standart Delivery</option>
                        <option>Express Delivery</option>
                      </select>
                      <ChevronDown size={14} className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <label className="text-xs font-semibold text-gray-700 block mb-1.5">Quantity</label>
                    <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-[#f5f5ff]">
                      <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-2.5 text-lg font-bold text-gray-500 hover:bg-gray-100">-</button>
                      <span className="flex-1 text-center text-sm font-semibold">{qty}</span>
                      <button onClick={() => setQty(qty + 1)} className="px-4 py-2.5 text-lg font-bold text-gray-500 hover:bg-gray-100">+</button>
                    </div>
                  </div>
                  <div className="flex-1">
                    <label className="text-xs font-semibold text-gray-700 block mb-1.5">Upload File</label>
                    <button className="w-full border-2 border-dashed border-gray-300 rounded-xl py-2.5 text-sm text-gray-400 hover:border-primary hover:text-primary transition-colors">
                      ↑ Upload File
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mb-5">
                <span className="text-gray-500 text-sm">Total</span>
                <span className="text-2xl font-black text-primary">€ {(30 * qty).toFixed(2)}</span>
              </div>

              <button className="w-full bg-primary hover:bg-primary-hover text-white py-3.5 rounded-xl font-bold text-base transition-colors flex items-center justify-center gap-2">
                <ShoppingCart size={18} />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-4">
        <div className="flex gap-1 bg-white rounded-2xl p-1.5 shadow-sm w-fit">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition-colors ${activeTab === tab ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </section>

      {/* Tab Content */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-10">
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Overview</h3>
          <p className="text-gray-500 text-sm leading-relaxed mb-6">
            Standard business cards come in two of the most effective, time-efficient options: offer a glossy dye cut and a matte. It must display your brand's professionalism while on the site.
          </p>
          <h4 className="font-bold text-gray-900 mb-3">Features:</h4>
          <ul className="text-gray-500 text-sm space-y-1.5 mb-6">
            {[
              'Standard Rounded Corners: 3.5" x 2" or 3.62" x 2" or 3.62" x 2.5"',
              'High quality paper options available in Matte, Gloss, UV Gloss, and Standard.',
              'Ultra-thick Premium menu with a Raise. These fit on every Business card.',
              'Customize logo content & templates by selecting to 50 to custom quote.',
            ].map(f => (
              <li key={f} className="flex gap-2">
                <span className="text-primary mt-0.5">-</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
          <div className="grid grid-cols-3 gap-6 text-sm border-t border-gray-100 pt-6">
            <div>
              <p className="text-gray-400 text-xs mb-1">Bleed Area: 3.64" x 2.46"</p>
              <p className="text-gray-400 text-xs">Trim: 3.50" x 2.40"</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs mb-1">Trim: 3.50" x 2"</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs mb-1">Safe Area: 3.44" x 1.64"</p>
              <p className="text-gray-400 text-xs">Make sure the content of your design can not design within a mode of the safe area, otherwise they may cut off.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-10">
        <h2 className="text-2xl font-bold text-gray-900 font-display mb-6">Reviews</h2>
        <div className="space-y-4">
          {reviews.map((r, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex text-yellow-400 mb-2">
                {[...Array(r.stars)].map((_, j) => <Star key={j} size={14} fill="currentColor" />)}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">"{r.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-100 to-gray-300"></div>
                <div>
                  <p className="font-semibold text-sm text-gray-900">{r.name}</p>
                  <p className="text-xs text-gray-400">{r.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="mt-4 border border-gray-200 text-gray-600 px-6 py-2.5 rounded-xl text-sm font-medium hover:border-primary hover:text-primary transition-colors">
          Load more
        </button>
      </section>

      {/* Related Products */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-10">
        <h2 className="text-2xl font-bold text-gray-900 font-display mb-6">Related Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {Array.from({length:10}).map((_, i) => (
            <ProductCard key={i} name="Packaging Products" price={`€ ${(20 + i * 2).toFixed(2)}`} qty="100 pcs" />
          ))}
        </div>
      </section>

      <PopularChoices />
      <HireDesignersBlock />
    </div>
  )
}

export default ProductDetail
