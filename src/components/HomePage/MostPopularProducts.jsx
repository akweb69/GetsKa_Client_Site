import React from 'react';
import { Link } from 'react-router-dom';
import { ProductCard } from '../Shared';
import { ChevronRight } from 'lucide-react';
import { img } from 'motion/react-client';
import useAllCategories from '../../AdminCode/Hooks/useAllCategories';
import useProducts from '../../AdminCode/Hooks/useProducts';

const MostPopularProducts = () => {
    const { isLoading, allCategories } = useAllCategories();
    const { isLoading: isLoadingProducts, products } = useProducts();


    if (isLoading || isLoadingProducts) {
        return (
            <div className="w-full flex items-center justify-center py-12">
                <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-400 font-medium">Loading categories...</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="flex  gap-8">
                {/* Sidebar categories */}
                <div className="hidden lg:block w-1/4 flex-shrink-0 sticky top-24 self-start">
                    <div className="bg-[#7F48FD] w-full rounded-2xl  shadow-sm ">
                        <h3 className="text-lg md:text-xl font-bold text-white mb-3 p-4 rounded-t-2xl bg-[#5A33B4] ">Most Popular Product</h3>
                        <ul className="space-y-1  text-white bg-[#7F48FD] rounded-b-2xl ">
                            {allCategories?.map((item) => (
                                <li key={item?._id}>
                                    <Link to={`/category_products/${item?.cat_name}`} className="flex items-center justify-between py-1.5 hover:text-gray-200 transition-colors border-b border-white/20 p-4">
                                        <span className="text-lg">{item?.cat_name}</span>
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
                        {
                            products?.map((product) => (
                                <ProductCard
                                    key={product?._id}
                                    name={product?.title}
                                    price={`€ ${product?.price.toFixed(2)}`}
                                    qty={product?.min_quantity}
                                    img={product?.mainImage}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MostPopularProducts;