import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useWishlist from '../AdminCode/Hooks/useWishlist';
import {
    Heart, ShoppingBag, Search, Package,
    AlertCircle, Trash2, ExternalLink, Tag, Layers
} from 'lucide-react';

const WishlistCard = ({ item, index, onRemove }) => {
    const navigate = useNavigate();
    const [imgError, setImgError] = useState(false);
    const [removing, setRemoving] = useState(false);

    const handleRemove = async (e) => {
        e.stopPropagation();
        setRemoving(true);
        await onRemove(item._id);
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92, y: -10 }}
            transition={{ delay: index * 0.06, type: 'spring', stiffness: 300, damping: 28 }}
            whileHover={{ y: -4 }}
            className="bg-white border border-gray-100 rounded-2xl overflow-hidden group hover:shadow-md hover:border-gray-200 transition-all duration-300 cursor-pointer"
            onClick={() => navigate(`/product/${item.itemName}`)}
        >
            {/* Image */}
            <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
                {!imgError ? (
                    <img
                        src={item.mainImage}
                        alt={item.itemName}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={() => setImgError(true)}
                    />
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-gray-300">
                        <Package size={32} />
                        <span className="text-xs">No image</span>
                    </div>
                )}

                {/* Remove button */}
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={handleRemove}
                    disabled={removing}
                    className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center border border-gray-100 shadow-sm hover:bg-red-50 hover:border-red-200 transition-all group/btn"
                >
                    {removing ? (
                        <motion.div
                            className="w-3.5 h-3.5 border-2 border-red-400 border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 0.7, ease: 'linear' }}
                        />
                    ) : (
                        <Heart
                            size={14}
                            className="text-red-400 fill-red-400 group-hover/btn:scale-110 transition-transform"
                        />
                    )}
                </motion.button>

                {/* MOQ badge */}
                <div className="absolute bottom-3 left-3">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-semibold text-gray-600 border border-gray-100 shadow-sm">
                        <Layers size={9} />
                        MOQ {item.moq}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-4">
                <h3 className="font-semibold text-sm text-gray-900 mb-1 truncate">{item.itemName}</h3>

                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1">
                        <Tag size={11} className="text-violet-400" />
                        <span className="text-lg font-bold text-violet-600">€ {item.itemPrice}</span>
                        <span className="text-xs text-gray-400">/unit</span>
                    </div>
                </div>

                <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={(e) => { e.stopPropagation(); navigate(`/product/${item.itemName}`); }}
                    className="w-full py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors group/btn"
                >
                    <ShoppingBag size={13} />
                    View & Order
                    <ExternalLink size={10} className="opacity-60 group-hover/btn:opacity-100 transition-opacity" />
                </motion.button>
            </div>
        </motion.div>
    );
};

const MyWishList = () => {
    const { wishlist, isLoading, error, wishlistRefetch } = useWishlist();
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const base_url = import.meta.env.VITE_BASE_URL;

    const filtered = (wishlist || []).filter(item =>
        !search || item.itemName?.toLowerCase().includes(search.toLowerCase())
    );

    const handleRemove = async (id) => {
        try {
            await fetch(`${base_url}/wishlist/${id}`, { method: 'DELETE' });
            wishlistRefetch?.();
        } catch {
            // handle error
        }
    };

    // Loading
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <motion.div className="flex flex-col items-center gap-4"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <motion.div
                        className="w-10 h-10 border-2 border-violet-500 border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                    />
                    <p className="text-sm text-gray-400">Loading wishlist...</p>
                </motion.div>
            </div>
        );
    }

    // Error
    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
                <div className="text-center">
                    <AlertCircle size={40} className="text-red-400 mx-auto mb-3" />
                    <p className="text-gray-600 mb-4">Could not load wishlist</p>
                    <button onClick={wishlistRefetch}
                        className="px-5 py-2 bg-violet-600 text-white rounded-xl text-sm font-medium hover:bg-violet-700 transition-colors">
                        Try again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <motion.div className="mb-8" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                    <div className="flex items-center gap-3 mb-1">
                        <div className="w-9 h-9 bg-red-50 rounded-xl flex items-center justify-center">
                            <Heart size={18} className="text-red-400 fill-red-400" />
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">My Wishlist</h1>
                    </div>
                    <p className="text-gray-400 text-sm ml-12">
                        {wishlist?.length || 0} saved {wishlist?.length === 1 ? 'item' : 'items'}
                    </p>
                </motion.div>

                {/* Stats */}
                {wishlist?.length > 0 && (
                    <motion.div
                        className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-7"
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        {[
                            { label: 'Saved Items', val: wishlist.length, color: 'text-violet-600' },
                            {
                                label: 'Avg. Price',
                                val: `€ ${Math.round(wishlist.reduce((s, i) => s + i.itemPrice, 0) / wishlist.length).toLocaleString()}`,
                                color: 'text-emerald-600'
                            },
                            {
                                label: 'Min. Order Value',
                                val: `€ ${wishlist.reduce((s, i) => s + i.itemPrice * i.moq, 0).toLocaleString()}`,
                                color: 'text-orange-500'
                            },
                        ].map(({ label, val, color }, i) => (
                            <motion.div key={label}
                                className="bg-white border border-gray-100 rounded-2xl p-4"
                                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 + i * 0.05 }}
                            >
                                <p className="text-xs text-gray-400 mb-1">{label}</p>
                                <p className={`text-lg font-bold ${color}`}>{val}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {/* Search */}
                {wishlist?.length > 0 && (
                    <motion.div className="mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                        <div className="relative">
                            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                placeholder="Search saved items..."
                                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-50 transition-all"
                            />
                        </div>
                    </motion.div>
                )}

                {/* Empty State */}
                {wishlist?.length === 0 && (
                    <motion.div
                        className="text-center py-24"
                        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    >
                        <motion.div
                            className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-5"
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ repeat: Infinity, duration: 2.5 }}
                        >
                            <Heart size={36} className="text-red-300" />
                        </motion.div>
                        <h2 className="text-lg font-semibold text-gray-700 mb-2">Your wishlist is empty</h2>
                        <p className="text-gray-400 text-sm mb-6 max-w-xs mx-auto">
                            Save items you like and come back to order them anytime
                        </p>
                        <motion.button
                            whileTap={{ scale: 0.97 }}
                            onClick={() => navigate('/products')}
                            className="px-6 py-2.5 bg-violet-600 text-white rounded-xl text-sm font-semibold hover:bg-violet-700 transition-colors"
                        >
                            Browse Products
                        </motion.button>
                    </motion.div>
                )}

                {/* No results */}
                {wishlist?.length > 0 && filtered.length === 0 && (
                    <motion.div className="text-center py-16" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <Package size={40} className="text-gray-200 mx-auto mb-3" />
                        <p className="text-gray-400 text-sm">No items match "{search}"</p>
                    </motion.div>
                )}

                {/* Grid */}
                <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    <AnimatePresence>
                        {filtered.map((item, i) => (
                            <WishlistCard
                                key={item._id}
                                item={item}
                                index={i}
                                onRemove={handleRemove}
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>

            </div>
        </div>
    );
};

export default MyWishList;