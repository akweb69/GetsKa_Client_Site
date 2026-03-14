import { Link } from 'react-router-dom'
import { ArrowRight, Star } from 'lucide-react'
import hiredesigner from '../assets/hire-designer--1.png'
import productImage from '../assets/Image.png'

// ─── Hero Banner (purple with decorative arcs) ───────────────────────────────
export const HeroBanner = ({ title, subtitle, cta = 'Customized now' }) => (
  <div className="bg-primary rounded-3xl text-white relative overflow-hidden w-11/12 mx-auto  my-6 ">
    {/* Decorative arcs */}
    <div className="absolute -bottom-8 -left-8 w-40 h-40 border-[20px] border-white rounded-full" />
    <div className="absolute -top-8 -right-8 w-40 h-40 border-[20px] border-white rounded-full" />
    <div className="relative z-10 py-16 px-8 text-center max-w-2xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 ">{title}</h1>
      {subtitle && <p className="text-purple-200 mb-8 text-sm leading-relaxed max-w-md mx-auto">{subtitle}</p>}
      <button className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-colors">
        {cta}
      </button>
    </div>
  </div>
)

// ─── Product Card ─────────────────────────────────────────────────────────────
export const ProductCard = ({ name = 'Packaging Products', price = '€ 20.00', qty = '100 pcs', img = productImage }) => (
  <Link to="/product/1" className="bg-white rounded-2xl overflow-hidden hover:shadow-md transition-all duration-200 group">
    <div className="bg-gray-50 h-40 md:h-46 lg:h-52 flex w-full items-center justify-center overflow-hidden">
      {img
        ? <img src={img} referrerPolicy='no-referrer' alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        : <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl opacity-60" />
        </div>
      }
    </div>
    <div className="p-3">
      <p className="text-xs md:text-base text-[#050C29] mb-0.5">{name}</p>
      <p className="text-xs text-[#3A456F">Starting from</p>
      <div className="flex items-center justify-between mt-1">
        <span className="font-bold text-[#5A33B4] text-sm">{price}</span>
        {qty && <span className="text-xs text-[#3A456F">{qty}</span>}
      </div>
    </div>
  </Link>
)

// ─── Popular Choices Section ──────────────────────────────────────────────────
export const PopularChoices = () => {
  const tabs = ['All', 'Business Cards', 'Calendars', 'ID Card', 'Stationary', 'Sticker']
  const demoProducts = [
    {
      name: 'Packaging Products',
      price: 29.99,
      qty: '100 pcs',
      img: 'https://i.ibb.co/jPWTgWr1/Image.png'
    },
    {
      name: 'Business Card',
      price: 19.99,
      qty: '200 pcs',
      img: 'https://images.unsplash.com/photo-1503602642458-232111445657?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60'
    },
    {
      name: 'Custom Stickers (Roll)',
      price: 24.50,
      qty: '500 pcs',
      img: 'https://www.rainbowprint.com/assets/images/ALEX/Category-pictures/Stickers/StickersRoll.jpg'
    },
    {
      name: 'Tri-Fold Brochure',
      price: 39.99,
      qty: '100 pcs',
      img: 'https://goodmockups.com/wp-content/uploads/2022/07/Free-Clean-Tri-Fold-Brochure-Mockup-PSD-Set-1.jpg'
    },
    {
      name: 'A4 Flyer Printing',
      price: 14.99,
      qty: '250 pcs',
      img: 'https://www.bargainprinting.com/file_manager/files/flyers-printing.jpg'
    },
    {
      name: 'Custom T-Shirt',
      price: 12.99,
      qty: '50 pcs',
      img: 'https://m.media-amazon.com/images/I/61zqN87gjTL._AC_UY1000_.jpg'
    },
    {
      name: 'Paper Shopping Bag',
      price: 45.00,
      qty: '50 pcs',
      img: 'https://pixpine.com/wp-content/uploads/2024/05/Free-Shopping-Bag-with-Box-Mockup-1.jpg'
    },
    {
      name: 'White Cardboard Box',
      price: 34.99,
      qty: '100 pcs',
      img: 'https://pixpine.com/wp-content/uploads/2024/05/Free-Shopping-Bag-with-Box-Mockup-2.jpg'
    },
    {
      name: 'Kraft Paper Bag',
      price: 28.50,
      qty: '200 pcs',
      img: 'https://creatsy.com/api/v1/image/akhoihdockljehcifpgmflklncooaiml/fast-food-packaging-burger%2C-menu%2C-paper-bag-mockup-1.jpg?width=850'
    },
    {
      name: 'Premium Name Card',
      price: 24.99,
      qty: '300 pcs',
      img: 'https://mckups.com/wp-content/uploads/2023/05/image.png'
    },
    {
      name: 'Event Flyer (A5)',
      price: 18.75,
      qty: '500 pcs',
      img: 'https://rapidcolor.com/wp-content/uploads/elementor/thumbs/flyer-printing-1-r5r24kien470950tedije24xf4hq344dey76kzi5u4.jpg'
    },
    {
      name: 'Die-Cut Sticker',
      price: 22.00,
      qty: '1000 pcs',
      img: 'https://api.totallypromotional.com/Data/Media/2026550f-1e32-4622-a49b-4e0dce6e7010Z-TP-PLP-BottomContentDesign_IntroGraphic-720x580px-RollStickers-lossy.png?v=0'
    },
    {
      name: 'DL Brochure',
      price: 32.50,
      qty: '150 pcs',
      img: 'https://graphicburger.com/wp-content/uploads/2014/01/Tri-Fold-Brochure-MockUp-full.jpg'
    },
    {
      name: 'Corrugated Mailer Box',
      price: 55.00,
      qty: '50 pcs',
      img: 'https://www.pacagemockup.com/wp-content/uploads/2020/01/free-packaging-mockup.jpg'
    },
    {
      name: 'Colorful Business Card',
      price: 21.99,
      qty: '400 pcs',
      img: 'https://asset.gecdesigns.com/img/visiting-card-templates/professional-business-card-template-with-a-creative-flair-1680968361386-cover.webp'
    },
    {
      name: 'Poster Printing (A3)',
      price: 49.99,
      qty: '20 pcs',
      img: 'https://slash1.printingbrooklyn.com/wp-content/uploads/standard-flyers-02.jpg'
    },
    {
      name: 'Custom Hoodie',
      price: 24.99,
      qty: '30 pcs',
      img: 'https://cdn.ugp.io/pages/ugp-all-products-printing-assortment.png'
    },
    {
      name: 'Vinyl Sticker Sheet',
      price: 19.50,
      qty: '100 sheets',
      img: 'https://img.drz.lazcdn.com/static/bd/p/56c130780208ecce8b334eef67255545.jpg_720x720q80.jpg'
    },
    {
      name: 'Gift Box Packaging',
      price: 59.99,
      qty: '50 sets',
      img: 'https://images.unsplash.com/photo-1606857521015-7f9fcf423740?auto=format&fit=crop&w=800&q=60'
    },
    {
      name: 'Letterhead Printing',
      price: 34.99,
      qty: '500 pcs',
      img: 'https://neixo.com/auploads/3-application/06-leather/leather-pu-printer-49.jpg'
    }
  ];
  return (
    <section className="py-16 ">
      <div className="w-11/12 mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900  mb-2">Popular Choices</h2>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            Check out the products everyone is raving about. Handpicked and highly rated, these are must-haves for your collection.
          </p>
        </div>
        <div className="flex gap-2 flex-wrap mb-8 justify-center">
          {tabs.map((tab, i) => (
            <button key={tab} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${i === 0 ? 'bg-primary text-white' : 'bg-white text-gray-600 hover:bg-primary-light border border-gray-200'}`}>
              {tab}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {
            demoProducts.slice(2, 14).map((product, index) => (
              <ProductCard
                key={index}
                name={product.name}
                price={product.price}
                qty={product.qty}
                img={product.img}
              />
            ))
          }
        </div>
      </div>
    </section>
  )
}

// ─── Hire Designers Block ─────────────────────────────────────────────────────
export const HireDesignersBlock = () => (
  <section className="w-11/12 mx-auto my-16 md:my-24">
    <img src={hiredesigner} alt="Hire Designers" className="w-full object-cover rounded-xl" />
  </section>
)

// ─── Designer Card ────────────────────────────────────────────────────────────
export const DesignerCard = ({ name, role, rating = '4.9', jobs = '300', skills = [], id = '1' }) => (
  <div className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex flex-col items-center text-center">
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-200 to-purple-400 mb-3 overflow-hidden">
        <div className="w-full h-full bg-gradient-to-br from-orange-200 to-pink-300" />
      </div>
      <h3 className="font-bold text-gray-900 text-sm">{name}</h3>
      <p className="text-gray-500 text-xs mb-2">{role}</p>
      <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
        <Star size={11} className="text-yellow-400 fill-yellow-400" />
        <span className="font-semibold">{rating}/5</span>
        <span>({jobs} jobs)</span>
      </div>
      <div className="flex flex-wrap gap-1 justify-center mb-4">
        {skills.slice(0, 3).map(s => (
          <span key={s} className="bg-primary-light text-primary text-[10px] px-2 py-0.5 rounded-full">{s}</span>
        ))}
      </div>
      <Link to={`/hire-designer/${id}`} className="w-full bg-primary hover:bg-primary-hover text-white py-2 rounded-full text-sm font-semibold transition-colors text-center">
        Hire Now
      </Link>
    </div>
  </div>
)
