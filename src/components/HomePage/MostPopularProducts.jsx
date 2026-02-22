import React from 'react';
import { Link } from 'react-router-dom';
import { ProductCard } from '../Shared';
import { ChevronRight } from 'lucide-react';

const MostPopularProducts = () => {
    return (
        <div>
            <div className="flex  gap-8">
                {/* Sidebar categories */}
                <div className="hidden lg:block w-1/4 flex-shrink-0 ">
                    <div className="bg-[#7F48FD] w-full rounded-2xl  shadow-sm">
                        <h3 className="text-lg md:text-xl font-bold text-white mb-3 p-4 rounded-t-2xl bg-[#5A33B4] ">Most Popular Product</h3>
                        <ul className="space-y-1  text-white bg-[#7F48FD] rounded-b-2xl ">
                            {['Business Essentials', 'Marketing Materials', 'Labels & Stickers', 'Promotional Items', 'Banners, Poster & Signs', 'Apparel LIM', 'Forms & Packages'].map(item => (
                                <li key={item}>
                                    <Link to="/products" className="flex items-center justify-between py-1.5 hover:text-gray-200 transition-colors border-b border-white/20 p-4">
                                        <span className="text-lg">{item}</span>
                                        <ChevronRight size={16} className="text-white " />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                {/* Products Grid */}
                <div className="flex-1">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <ProductCard key={i} name="Packaging Products" price={`€ ${(20 + i * 5).toFixed(2)}`} qty="100 pcs" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MostPopularProducts;