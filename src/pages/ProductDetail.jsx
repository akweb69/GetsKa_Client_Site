import { useEffect, useState } from 'react'
import { Star, ShoppingCart, ChevronDown, ChevronUp } from 'lucide-react'
import { PopularChoices, HireDesignersBlock, ProductCard } from '../components/Shared'
import useProducts from '../AdminCode/Hooks/useProducts'

const reviews = [
  { name: 'Sarah Tucker', date: 'Feb 12, 2024', stars: 5, text: 'Excellent quality! Could not be more pleased. The prints came out perfect and exactly as described.' },
  { name: 'Sarah Tucker', date: 'Jan 24, 2024', stars: 5, text: "I'll say, what a design anyway! The customization options are fantastic." },
  { name: 'Sarah Tucker', date: 'Jan 20, 2024', stars: 5, text: 'I must certainly buy this again and keep my order in! Great service and packaging.' },
]

const ProductDetail = () => {
  const { products, isLoading } = useProducts()
  const productId = "69cc9e24aceb76101974b25c"
  const [product, setProduct] = useState(null)

  useEffect(() => {
    const found = products.find(item => item._id === productId)
    setProduct(found)
  }, [products, productId])

  const [qty, setQty] = useState(1)
  const [activeTab, setActiveTab] = useState('Details & Info')
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState(null)
  const [selectedSide, setSelectedSide] = useState(null)
  const [selectedLamination, setSelectedLamination] = useState('')
  const [selectedDelivery, setSelectedDelivery] = useState('')
  const [openFaq, setOpenFaq] = useState(null)

  // Set defaults once product loads
  useEffect(() => {
    if (product) {
      if (product.priceBySize?.length) setSelectedSize(product.priceBySize[0])
      if (product.PriceBySidesPrint?.length) setSelectedSide(product.PriceBySidesPrint[0])
      if (product.Laminations?.length) setSelectedLamination(product.Laminations[0])
      if (product.deliveryTypes?.length) setSelectedDelivery(product.deliveryTypes[0])
    }
  }, [product])

  const tabs = ['Details & Info', 'FAQ', 'Color', 'Paper', 'Speciality']

  // Compute total price
  const basePrice = selectedSize ? parseFloat(selectedSize.price) : (product?.price || 0)
  const sideExtra = selectedSide ? parseFloat(selectedSide.price) : 0
  const totalPrice = (basePrice + sideExtra) * qty

  const allImages = product?.images?.length ? product.images : [product?.mainImage].filter(Boolean)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f5f5ff] flex items-center justify-center">
        <p className="text-gray-400 text-sm animate-pulse">Loading product...</p>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#f5f5ff] flex items-center justify-center">
        <p className="text-gray-400 text-sm">Product not found.</p>
      </div>
    )
  }

  return (
    <div className="bg-[#f5f5ff]">
      {/* Product Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-10">

          {/* Image Gallery */}
          <div className="flex gap-4 lg:w-1/2">
            <div className="flex flex-col gap-3">
              {allImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-colors ${selectedImage === i ? 'border-primary' : 'border-gray-200'}`}
                >
                  <img src={img} alt={`thumb-${i}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            <div className="flex-1 bg-white rounded-2xl flex items-center justify-center h-96 shadow-sm overflow-hidden">
              {allImages[selectedImage] ? (
                <img
                  src={allImages[selectedImage]}
                  alt={product.title}
                  className="w-full h-full object-contain p-4"
                />
              ) : (
                <div className="text-8xl">🎴</div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 font-display">{product.title}</h1>
                  {product.sub_title && (
                    <p className="text-gray-400 text-sm mt-0.5">{product.sub_title}</p>
                  )}
                  <p className="text-primary font-bold text-xl mt-1">
                    € {selectedSize ? selectedSize.price : product.price}
                  </p>
                  <p className="text-gray-400 text-xs mt-0.5">{product.priceSlug}</p>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Star size={14} className="text-yellow-400 fill-yellow-400" />
                  <span className="font-semibold">4.9/5</span>
                  <span className="text-gray-400">(221 jobs)</span>
                </div>
              </div>

              {/* Options */}
              <div className="space-y-4 mb-6 mt-5">
                <div className="flex gap-4">
                  {/* Size */}
                  <div className="flex-1">
                    <label className="text-xs font-semibold text-gray-700 block mb-1.5">Size</label>
                    <div className="relative">
                      <select
                        value={selectedSize?.size || ''}
                        onChange={e => {
                          const found = product.priceBySize.find(s => s.size === e.target.value)
                          setSelectedSize(found)
                        }}
                        className="w-full bg-[#f5f5ff] border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 appearance-none focus:outline-none focus:border-primary"
                      >
                        {product.priceBySize?.map((s, i) => (
                          <option key={i} value={s.size}>{s.size}</option>
                        ))}
                      </select>
                      <ChevronDown size={14} className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Sides */}
                  <div className="flex-1">
                    <label className="text-xs font-semibold text-gray-700 block mb-1.5">Sides</label>
                    <div className="relative">
                      <select
                        value={selectedSide?.sides || ''}
                        onChange={e => {
                          const found = product.PriceBySidesPrint.find(s => s.sides === e.target.value)
                          setSelectedSide(found)
                        }}
                        className="w-full bg-[#f5f5ff] border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 appearance-none focus:outline-none focus:border-primary"
                      >
                        {product.PriceBySidesPrint?.map((s, i) => (
                          <option key={i} value={s.sides}>{s.sides}</option>
                        ))}
                      </select>
                      <ChevronDown size={14} className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  {/* Lamination */}
                  <div className="flex-1">
                    <label className="text-xs font-semibold text-gray-700 block mb-1.5">Lamination</label>
                    <div className="relative">
                      <select
                        value={selectedLamination}
                        onChange={e => setSelectedLamination(e.target.value)}
                        className="w-full bg-[#f5f5ff] border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 appearance-none focus:outline-none focus:border-primary"
                      >
                        {product.Laminations?.map((l, i) => (
                          <option key={i} value={l}>{l}</option>
                        ))}
                      </select>
                      <ChevronDown size={14} className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Delivery */}
                  <div className="flex-1">
                    <label className="text-xs font-semibold text-gray-700 block mb-1.5">Delivery</label>
                    <div className="relative">
                      <select
                        value={selectedDelivery}
                        onChange={e => setSelectedDelivery(e.target.value)}
                        className="w-full bg-[#f5f5ff] border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 appearance-none focus:outline-none focus:border-primary"
                      >
                        {product.deliveryTypes?.map((d, i) => (
                          <option key={i} value={d}>{d}</option>
                        ))}
                      </select>
                      <ChevronDown size={14} className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {/* Quantity */}
                  <div className="flex-1">
                    <label className="text-xs font-semibold text-gray-700 block mb-1.5">
                      Quantity <span className="text-gray-400 font-normal">(min {product.min_quantity})</span>
                    </label>
                    <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-[#f5f5ff]">
                      <button
                        onClick={() => setQty(Math.max(product.min_quantity || 1, qty - 1))}
                        className="px-4 py-2.5 text-lg font-bold text-gray-500 hover:bg-gray-100"
                      >-</button>
                      <span className="flex-1 text-center text-sm font-semibold">{qty}</span>
                      <button
                        onClick={() => setQty(qty + 1)}
                        className="px-4 py-2.5 text-lg font-bold text-gray-500 hover:bg-gray-100"
                      >+</button>
                    </div>
                  </div>

                  {/* Upload */}
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
                <span className="text-2xl font-black text-primary">€ {totalPrice.toFixed(2)}</span>
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
        <div className="flex gap-1 bg-white rounded-2xl p-1.5 shadow-sm w-fit overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition-colors whitespace-nowrap ${activeTab === tab ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </section>

      {/* Tab Content */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-10">
        <div className="bg-white rounded-2xl p-8 shadow-sm">

          {/* Details & Info */}
          {activeTab === 'Details & Info' && (
            <>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Overview</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6 whitespace-pre-line">
                {product.productDetails?.Overview}
              </p>

              {product.productDetails?.Features && (
                <>
                  <h4 className="font-bold text-gray-900 mb-3">Features:</h4>
                  <ul className="text-gray-500 text-sm space-y-1.5 mb-6">
                    {Object.values(product.productDetails.Features).map((f, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-primary mt-0.5">-</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {product.productDetails?.Specifications && (
                <div className="grid grid-cols-3 gap-6 text-sm border-t border-gray-100 pt-6">
                  {Object.entries(product.productDetails.Specifications).map(([key, val]) => (
                    <div key={key}>
                      <p className="text-gray-700 text-xs font-semibold mb-0.5">{key.trim()}</p>
                      <p className="text-gray-400 text-xs">{val}</p>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* FAQ */}
          {activeTab === 'FAQ' && (
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Frequently Asked Questions</h3>
              {product.faq?.map((item, i) => (
                <div key={i} className="border border-gray-100 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left"
                  >
                    <span className="font-semibold text-gray-800 text-sm">{item.question}</span>
                    {openFaq === i
                      ? <ChevronUp size={16} className="text-primary flex-shrink-0" />
                      : <ChevronDown size={16} className="text-gray-400 flex-shrink-0" />
                    }
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-4 text-gray-500 text-sm leading-relaxed border-t border-gray-100 pt-3">
                      {item.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Color */}
          {activeTab === 'Color' && (
            <>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Available Colors</h3>
              <div className="flex gap-4 flex-wrap">
                {product.color?.map((c, i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <div
                      className="w-12 h-12 rounded-full border-2 border-white shadow-md cursor-pointer hover:scale-110 transition-transform"
                      style={{ backgroundColor: c.color }}
                    />
                    <span className="text-xs text-gray-400">{c.color}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Paper */}
          {activeTab === 'Paper' && (
            <>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Paper Details</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{product.paperDetails}</p>
            </>
          )}

          {/* Speciality */}
          {activeTab === 'Speciality' && (
            <>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Speciality</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{product.speciality}</p>
            </>
          )}
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
          {Array.from({ length: 10 }).map((_, i) => (
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