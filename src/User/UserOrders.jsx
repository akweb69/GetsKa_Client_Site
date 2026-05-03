import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../Context/AuthContext';
import useOrders from '../AdminCode/Hooks/useOrders';
import {
    Package, ChevronDown, ChevronUp, Search, Filter,
    Calendar, CreditCard, Truck, Box, Clock, CheckCircle2,
    XCircle, AlertCircle, RotateCcw, MapPin, Layers, Eye,
    X, Hash, ShoppingBag, Image as ImageIcon
} from 'lucide-react';

const STATUS_CONFIG = {
    Pending: { color: 'bg-amber-50 text-amber-700 border-amber-200', icon: Clock, dot: 'bg-amber-400' },
    Approved: { color: 'bg-blue-50 text-blue-700 border-blue-200', icon: CheckCircle2, dot: 'bg-blue-400' },
    Processing: { color: 'bg-violet-50 text-violet-700 border-violet-200', icon: RotateCcw, dot: 'bg-violet-400' },
    Complete: { color: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: CheckCircle2, dot: 'bg-emerald-400' },
    PlacedCourier: { color: 'bg-cyan-50 text-cyan-700 border-cyan-200', icon: Package, dot: 'bg-cyan-400' },
    OnTheWay: { color: 'bg-orange-50 text-orange-700 border-orange-200', icon: Truck, dot: 'bg-orange-400' },
    Delivered: { color: 'bg-green-50 text-green-700 border-green-200', icon: CheckCircle2, dot: 'bg-green-500' },
    Cancelled: { color: 'bg-red-50 text-red-700 border-red-200', icon: XCircle, dot: 'bg-red-400' },
};

const PAY_CONFIG = {
    Pending: 'bg-amber-50 text-amber-700 border-amber-200',
    Partial: 'bg-orange-50 text-orange-700 border-orange-200',
    Paid: 'bg-green-50 text-green-700 border-green-200',
};

const StatusBadge = ({ status, type = 'order' }) => {
    const cfg = type === 'order' ? STATUS_CONFIG[status] : null;
    const cls = type === 'order' ? cfg?.color : PAY_CONFIG[status];
    const Icon = cfg?.icon;
    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${cls || 'bg-gray-50 text-gray-600 border-gray-200'}`}>
            {Icon && <Icon size={11} />}
            {status}
        </span>
    );
};

const OrderModal = ({ order, onClose }) => {
    const totalItems = order.items?.length || 0;
    return (
        <AnimatePresence>
            {/* Backdrop */}
            <motion.div
                className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
                style={{ background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(4px)' }}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <motion.div
                    className="bg-white w-full sm:max-w-2xl sm:rounded-2xl rounded-t-2xl max-h-[92vh] overflow-y-auto shadow-2xl"
                    initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 80, opacity: 0 }} transition={{ type: 'spring', damping: 28, stiffness: 300 }}
                    onClick={e => e.stopPropagation()}
                >
                    {/* Modal Header */}
                    <div className="sticky top-0 bg-white border-b border-gray-100 px-5 py-4 flex items-start justify-between z-10 rounded-t-2xl">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <Hash size={14} className="text-gray-400" />
                                <span className="font-mono text-sm font-semibold text-gray-800">{order._id?.slice(-10).toUpperCase()}</span>
                                <StatusBadge status={order.orderStatus} type="order" />
                            </div>
                            <p className="text-xs text-gray-400">{new Date(order.orderDate).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' })}</p>
                        </div>
                        <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                            <X size={15} className="text-gray-500" />
                        </button>
                    </div>

                    <div className="p-5 space-y-5">
                        {/* Summary Cards */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {[
                                { label: 'Total', val: `€ ${parseFloat(order.totalAmount).toLocaleString()}`, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                                { label: 'Advance', val: `€ ${(order.advancePayment || 0).toLocaleString()}`, color: 'text-blue-600', bg: 'bg-blue-50' },
                                { label: 'Due', val: `€ ${(order.duePayment || 0).toLocaleString()}`, color: 'text-orange-600', bg: 'bg-orange-50' },
                                { label: 'Qty', val: order.totalQuantity, color: 'text-violet-600', bg: 'bg-violet-50' },
                            ].map(({ label, val, color, bg }) => (
                                <div key={label} className={`${bg} rounded-xl p-3`}>
                                    <p className="text-[11px] text-gray-500 font-medium mb-0.5">{label}</p>
                                    <p className={`text-base font-bold ${color}`}>{val}</p>
                                </div>
                            ))}
                        </div>

                        {/* Payment Status */}
                        <div className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <CreditCard size={15} className="text-gray-400" />
                                Payment Status
                            </div>
                            <StatusBadge status={order.paymentStatus} type="pay" />
                        </div>

                        {/* Items */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                <ShoppingBag size={15} className="text-gray-400" />
                                Items ({totalItems})
                            </h3>
                            <div className="space-y-3">
                                {order.items?.map((item, idx) => (
                                    <motion.div
                                        key={item._id || idx}
                                        initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        className="flex gap-3 bg-white border border-gray-100 rounded-xl p-3 hover:border-gray-200 transition-colors"
                                    >
                                        {item.selectedImage ? (
                                            <img src={item.selectedImage} alt={item.itemName}
                                                className="w-16 h-16 rounded-lg object-cover border border-gray-100 shrink-0"
                                                onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                                            />
                                        ) : null}
                                        <div className="w-16 h-16 rounded-lg border border-gray-100 bg-gray-50 shrink-0 items-center justify-center" style={{ display: 'none' }}>
                                            <ImageIcon size={20} className="text-gray-300" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-semibold text-sm text-gray-800 mb-1.5 truncate">{item.itemName}</p>
                                            <div className="flex flex-wrap gap-1.5">
                                                {item.selectedSize?.size && <span className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full font-medium">📐 {item.selectedSize.size}</span>}
                                                {item.selectedSide?.sides && <span className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full font-medium">↔ {item.selectedSide.sides}</span>}
                                                {item.selectedLamination && <span className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full font-medium">✦ {item.selectedLamination}</span>}
                                                {item.selectedDelivery?.deliveryType && <span className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full font-medium">🚚 {item.selectedDelivery.deliveryType}</span>}
                                                <span className="text-[10px] px-2 py-0.5 bg-violet-50 text-violet-600 rounded-full font-medium">×{item.quantity}</span>
                                            </div>
                                        </div>
                                        <div className="text-right shrink-0">
                                            <p className="font-bold text-sm text-gray-800">€ {item.totalPrice?.toLocaleString()}</p>
                                            <p className="text-[11px] text-gray-400">€ {item.itemPrice}/unit</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

const OrderCard = ({ order, index, onClick }) => {
    const cfg = STATUS_CONFIG[order.orderStatus] || STATUS_CONFIG.Pending;
    const Icon = cfg.icon;
    const date = new Date(order.orderDate);
    const shortId = order._id?.slice(-8).toUpperCase();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06, type: 'spring', stiffness: 300, damping: 28 }}
            whileHover={{ y: -2 }}
            className="bg-white border border-gray-100 rounded-2xl p-4 hover:border-gray-200 hover:shadow-sm transition-all cursor-pointer group"
            onClick={() => onClick(order)}
        >
            {/* Top Row */}
            <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-xs font-bold text-gray-500">#{shortId}</span>
                    </div>
                    <p className="text-xs text-gray-400">{date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                </div>
                <div className="flex items-center gap-1.5">
                    <StatusBadge status={order.orderStatus} type="order" />
                </div>
            </div>

            {/* Amount Row */}
            <div className="flex items-end justify-between mb-3">
                <div>
                    <p className="text-[11px] text-gray-400 mb-0.5">Total Amount</p>
                    <p className="text-xl font-bold text-gray-900">€ {parseFloat(order.totalAmount).toLocaleString()}</p>
                </div>
                {parseFloat(order.duePayment) > 0 && (
                    <div className="text-right">
                        <p className="text-[11px] text-gray-400 mb-0.5">Due</p>
                        <p className="text-sm font-bold text-orange-500">€ {parseFloat(order.duePayment).toLocaleString()}</p>
                    </div>
                )}
            </div>

            {/* Items Preview */}
            <div className="flex items-center gap-2 mb-3">
                <div className="flex -space-x-2">
                    {order.items?.slice(0, 3).map((item, i) => (
                        item.selectedImage ? (
                            <img key={i} src={item.selectedImage} alt=""
                                className="w-7 h-7 rounded-full border-2 border-white object-cover"
                                onError={e => { e.target.style.display = 'none'; }}
                            />
                        ) : null
                    ))}
                </div>
                <p className="text-xs text-gray-500">{order.totalItems} items · {order.totalQuantity} pcs</p>
            </div>

            {/* Bottom Row */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                <StatusBadge status={order.paymentStatus} type="pay" />
                <motion.div
                    className="flex items-center gap-1 text-xs text-gray-400 group-hover:text-violet-500 transition-colors"
                    whileHover={{ x: 2 }}
                >
                    <Eye size={12} />
                    View details
                </motion.div>
            </div>
        </motion.div>
    );
};

const FILTERS = ['All', 'Pending', 'Approved', 'Processing', 'Complete', 'PlacedCourier', 'OnTheWay', 'Delivered', 'Cancelled'];

const UserOrders = () => {
    const { user, userLoading } = useAuth();
    const { orders, orderLoading, isError, orderRefetch } = useOrders(user?.email);

    const [search, setSearch] = useState('');
    const [activeFilter, setActiveFilter] = useState('All');
    const [selectedOrder, setSelectedOrder] = useState(null);

    const filtered = useMemo(() => {
        return (orders || []).filter(o => {
            const matchStatus = activeFilter === 'All' || o.orderStatus === activeFilter;
            const matchSearch = !search || o._id?.toLowerCase().includes(search.toLowerCase()) ||
                o.items?.some(i => i.itemName?.toLowerCase().includes(search.toLowerCase()));
            return matchStatus && matchSearch;
        });
    }, [orders, activeFilter, search]);

    const stats = useMemo(() => ({
        total: orders?.length || 0,
        active: orders?.filter(o => !['Delivered', 'Cancelled'].includes(o.orderStatus)).length || 0,
        spent: (orders || []).reduce((s, o) => s + parseFloat(o.totalAmount || 0), 0),
        due: (orders || []).reduce((s, o) => s + parseFloat(o.duePayment || 0), 0),
    }), [orders]);

    if (userLoading || orderLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <motion.div className="flex flex-col items-center gap-4"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <motion.div className="w-10 h-10 border-2 border-violet-500 border-t-transparent rounded-full"
                        animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }} />
                    <p className="text-sm text-gray-400">Loading your orders...</p>
                </motion.div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
                <div className="text-center">
                    <AlertCircle size={40} className="text-red-400 mx-auto mb-3" />
                    <p className="text-gray-600 mb-4">Could not load orders</p>
                    <button onClick={orderRefetch}
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
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">My Orders</h1>
                    <p className="text-gray-400 text-sm mt-1">{user?.email}</p>
                </motion.div>

                {/* Stats */}
                <motion.div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-7"
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                    {[
                        { label: 'Total Orders', val: stats.total, color: 'text-gray-900' },
                        { label: 'Active', val: stats.active, color: 'text-violet-600' },
                        { label: 'Total Spent', val: `€ ${stats.spent.toLocaleString()}`, color: 'text-emerald-600' },
                        { label: 'Due', val: `€ ${stats.due.toLocaleString()}`, color: 'text-orange-500' },
                    ].map(({ label, val, color }, i) => (
                        <motion.div key={label} className="bg-white border border-gray-100 rounded-2xl p-4"
                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 + i * 0.05 }}>
                            <p className="text-xs text-gray-400 mb-1">{label}</p>
                            <p className={`text-lg font-bold ${color}`}>{val}</p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Search + Filter */}
                <motion.div className="space-y-3 mb-6"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                    <div className="relative">
                        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Search by order ID or item name..."
                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-50 transition-all"
                        />
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                        {FILTERS.map(f => (
                            <motion.button key={f} onClick={() => setActiveFilter(f)} whileTap={{ scale: 0.96 }}
                                className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all border ${activeFilter === f
                                    ? 'bg-violet-600 text-white border-violet-600 shadow-sm'
                                    : 'bg-white text-gray-500 border-gray-200 hover:border-violet-300 hover:text-violet-600'
                                    }`}>
                                {f}
                            </motion.button>
                        ))}
                    </div>
                </motion.div>

                {/* Orders Grid */}
                {filtered.length === 0 ? (
                    <motion.div className="text-center py-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <Package size={48} className="text-gray-200 mx-auto mb-4" />
                        <p className="text-gray-400 text-sm">No orders found</p>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filtered.map((order, i) => (
                            <OrderCard key={order._id} order={order} index={i} onClick={setSelectedOrder} />
                        ))}
                    </div>
                )}
            </div>

            {/* Modal */}
            <AnimatePresence>
                {selectedOrder && <OrderModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />}
            </AnimatePresence>
        </div>
    );
};

export default UserOrders;