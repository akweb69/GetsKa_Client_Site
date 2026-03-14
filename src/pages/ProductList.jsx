import { useParams } from 'react-router-dom'
import { HeroBanner, PopularChoices, HireDesignersBlock, ProductCard } from '../components/Shared'

const ProductList = () => {
  const { category } = useParams()
  const title = category ? category.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : 'Business Card'

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
    <div className="bg-[#f5f5ff]">
      <HeroBanner
        title={title}
        subtitle={`Make a lasting impression with custom ${title.toLowerCase()}, designed to reflect your brand's identity and professionalism.`}
      />

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {
            demoProducts.map((product, index) => (
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
        {/* Pagination */}
        <div className="flex justify-center mt-8 gap-2">
          {['<', 1, 2, 3, '...', 8, '>'].map((p, i) => (
            <button key={i} className={`w-8 h-8 rounded-lg text-sm font-medium border transition-colors ${p === 1 ? 'bg-primary text-white border-primary' : 'bg-white text-gray-600 border-gray-200 hover:border-primary hover:text-primary'}`}>
              {p}
            </button>
          ))}
        </div>
      </section>

      <PopularChoices />
      <HireDesignersBlock />
    </div>
  )
}

export default ProductList
