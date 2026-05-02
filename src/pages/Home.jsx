import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import HeroSlider from '../components/HeroSlider';
import CategoryPills from '../components/HomePage/CategoryPills';
import MostPopularProducts from '../components/HomePage/MostPopularProducts';
import UniqueEdge from '../components/HomePage/UniqueEdge';
import StarProducts from '../components/HomePage/StarProducts';
import CoreServices from '../components/HomePage/CoreServices';

import { PopularChoices, HireDesignersBlock, ProductCard } from '../components/Shared';
import useProducts from '../AdminCode/Hooks/useProducts';
import { Link } from 'react-router-dom';

// Animation Variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const Home = () => {
  const { products, isLoading } = useProducts();

  const [newArrivals, setNewArrivals] = useState([]);
  const [specialOffers, setSpecialOffers] = useState([]);

  // Process products when data loads
  useEffect(() => {
    if (!products || products.length === 0) return;

    // Sort by newest (assuming you have createdAt or id for sorting)
    const sortedByNew = [...products]
      .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
      .slice(0, 8);

    // Random special offers (you can improve this logic later)
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    const offers = shuffled.slice(0, 8);

    setNewArrivals(sortedByNew);
    setSpecialOffers(offers);
  }, [products]);

  return (
    <div className="bg-[#f5f5ff] min-h-screen">
      {/* Hero Section */}
      <section className="w-full">
        <HeroSlider />
      </section>

      {/* Category Pills */}
      <section className="w-11/12 mx-auto py-8 md:py-16 lg:py-20">
        <CategoryPills />
      </section>

      {/* Most Popular Products */}
      <section className="w-11/12 mx-auto pb-8">
        <MostPopularProducts />
      </section>

      {/* New Arrivals */}
      <section className="w-11/12 mx-auto pb-12 md:pb-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <div className="flex gap-8">
            {/* Optional Sidebar - Left Empty for now */}
            <div className="hidden lg:block w-1/4 flex-shrink-0" />

            <div className="w-full">
              <div className="flex items-end justify-between mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-[#09164B]">
                  New Arrivals
                </h2>
                <Link
                  to="/products?sort=newest"
                  className="hidden md:flex items-center gap-2 text-primary hover:text-primary-hover font-medium text-sm"
                >
                  View All
                  <ArrowRight size={18} />
                </Link>
              </div>

              {isLoading ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-80 bg-gray-200 rounded-2xl animate-pulse" />
                  ))}
                </div>
              ) : (
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-2 md:grid-cols-4 gap-4"
                >
                  {newArrivals.map((product) => (
                    <ProductCard
                      key={product._id}
                      name={product.title}
                      price={`€ ${product.price?.toFixed(2) || '0.00'}`}
                      qty={product.min_quantity}
                      img={product.mainImage}
                    />
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Special Offers */}
      <section className="w-11/12 mx-auto pb-12 md:pb-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <div className="flex gap-8">
            <div className="hidden lg:block w-1/4 flex-shrink-0" />

            <div className="w-full">
              <div className="flex items-end justify-between mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-[#09164B]">
                  Special Offers
                </h2>
                <Link
                  to="/products?filter=offers"
                  className="hidden md:flex items-center gap-2 text-primary hover:text-primary-hover font-medium text-sm"
                >
                  View All
                  <ArrowRight size={18} />
                </Link>
              </div>

              {isLoading ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-80 bg-gray-200 rounded-2xl animate-pulse" />
                  ))}
                </div>
              ) : (
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-2 md:grid-cols-4 gap-4"
                >
                  {specialOffers.map((product) => (
                    <ProductCard
                      key={product._id}
                      name={product.title}
                      price={`€ ${product.price?.toFixed(2) || '0.00'}`}
                      qty={product.min_quantity}
                      img={product.mainImage}
                    />
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Unique Edge */}
      <section>
        <UniqueEdge />
      </section>

      {/* Star Products */}
      <section>
        <StarProducts />
      </section>

      {/* Core Services */}
      <section>
        <CoreServices />
      </section>

      {/* Popular Choices */}
      <PopularChoices />

      {/* Hire Designers */}
      <HireDesignersBlock />
    </div>
  );
};

export default Home;