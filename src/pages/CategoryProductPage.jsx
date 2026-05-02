import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Filter, Grid, List, Search } from 'lucide-react';
import useProducts from '../AdminCode/Hooks/useProducts';
import { ProductCard } from '../components/Shared';   // Reuse your existing ProductCard

const CategoryProductPage = () => {
    const { cat_name } = useParams();
    const { products, isLoading } = useProducts();

    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState('newest');
    const [viewMode, setViewMode] = useState('grid');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    // Filter products by category + search
    const filteredProducts = useMemo(() => {
        if (!products) return [];

        let result = products.filter((product) =>
            product.p_category === cat_name ||
            product.category === cat_name ||
            product.cat_name === cat_name
        );

        // Apply search filter
        if (searchTerm.trim()) {
            const term = searchTerm.toLowerCase();
            result = result.filter(product =>
                product.title?.toLowerCase().includes(term) ||
                product.name?.toLowerCase().includes(term)
            );
        }

        // Apply sorting
        switch (sortOption) {
            case 'price-low':
                return [...result].sort((a, b) => (a.price || 0) - (b.price || 0));
            case 'price-high':
                return [...result].sort((a, b) => (b.price || 0) - (a.price || 0));
            case 'newest':
            default:
                return [...result].sort((a, b) =>
                    new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
                );
        }
    }, [products, cat_name, searchTerm, sortOption]);

    const categoryTitle = cat_name ?
        cat_name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) :
        'Products';

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#f5f5ff] py-12">
                <div className="w-11/12 mx-auto">
                    <div className="h-10 w-64 bg-gray-200 rounded animate-pulse mb-8" />
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="h-80 bg-gray-200 rounded-2xl animate-pulse" />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f5f5ff] pb-16">
            {/* Header */}
            <div className="bg-white border-b sticky top-0 z-40">
                <div className="w-11/12 mx-auto py-6">
                    <div className="flex items-center gap-4 mb-6">
                        <Link
                            to="/products"
                            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            <ArrowLeft size={20} />
                            <span className="font-medium">Back to All Products</span>
                        </Link>
                    </div>

                    <h1 className="text-4xl font-bold text-[#09164B] mb-2">
                        {categoryTitle}
                    </h1>
                    <p className="text-gray-600">
                        {filteredProducts.length} products found
                    </p>
                </div>
            </div>

            <div className="w-11/12 mx-auto pt-8">
                {/* Filters & Controls */}
                <div className="flex flex-col md:flex-row gap-4 mb-10 items-start md:items-center justify-between">
                    {/* Search */}
                    <div className="relative w-full md:w-80">
                        <Search className="absolute left-4 top-3.5 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search in this category..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:border-primary text-sm"
                        />
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto">
                        {/* Sort */}
                        <select
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                            className="bg-white border border-gray-200 rounded-2xl px-5 py-3 text-sm focus:outline-none"
                        >
                            <option value="newest">Newest First</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                        </select>

                        {/* View Toggle */}
                        <div className="flex border border-gray-200 rounded-2xl overflow-hidden">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-3 ${viewMode === 'grid' ? 'bg-primary text-white' : 'bg-white text-gray-600'}`}
                            >
                                <Grid size={18} />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-3 ${viewMode === 'list' ? 'bg-primary text-white' : 'bg-white text-gray-600'}`}
                            >
                                <List size={18} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Products Grid / List */}
                <AnimatePresence mode="wait">
                    {filteredProducts.length > 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className={`grid gap-6 ${viewMode === 'grid'
                                ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
                                : 'grid-cols-1'
                                }`}
                        >
                            {filteredProducts.map((product, index) => (
                                <motion.div
                                    key={product._id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.03 }}
                                >
                                    <ProductCard
                                        name={product.title || product.name}
                                        price={`€ ${product.price?.toFixed(2) || '0.00'}`}
                                        qty={product.min_quantity}
                                        img={product.mainImage}
                                    />
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <div className="text-center py-20">
                            <div className="text-6xl mb-4">😕</div>
                            <h3 className="text-2xl font-semibold text-gray-700 mb-2">No products found</h3>
                            <p className="text-gray-500">Try changing the search term or filters</p>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default CategoryProductPage;