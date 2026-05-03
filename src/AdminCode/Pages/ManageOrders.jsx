import React, { useState, useEffect } from 'react';
import useOrders from '../Hooks/useOrders';

const STATUSES = ['Pending', 'Approved', 'Processing', 'Complete', 'PlacedCourier', 'OnTheWay', 'Delivered', 'Cancelled'];
const PAYMENT_STATUSES = ['Pending', 'Partial', 'Paid'];

const statusColors = {
    Pending: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
    Approved: 'bg-green-500/10 text-green-400 border-green-500/30',
    Processing: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    Complete: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    PlacedCourier: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    OnTheWay: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
    Delivered: 'bg-green-500/10 text-green-400 border-green-500/30',
    Cancelled: 'bg-red-500/10 text-red-400 border-red-500/30',
};

const payColors = {
    Pending: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
    Partial: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
    Paid: 'bg-green-500/10 text-green-400 border-green-500/30',
};

const ManageOrders = () => {
    const base_url = import.meta.env.VITE_BASE_URL;
    const { orderRefetch, orderLoading, orders } = useOrders();

    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [newStatus, setNewStatus] = useState('');
    const [newPayStatus, setNewPayStatus] = useState('');
    const [saving, setSaving] = useState(false);
    const [toast, setToast] = useState({ msg: '', type: '', show: false });

    const showToast = (msg, type = 'success') => {
        setToast({ msg, type, show: true });
        setTimeout(() => setToast(t => ({ ...t, show: false })), 3000);
    };

    const filtered = (orders || []).filter(o => {
        const q = search.toLowerCase();
        const matchQ = !q || o.userEmail?.toLowerCase().includes(q) || o._id?.toLowerCase().includes(q);
        const matchS = !statusFilter || o.orderStatus === statusFilter;
        return matchQ && matchS;
    });

    const openModal = (order) => {
        setSelectedOrder(order);
        setNewStatus(order.orderStatus);
        setNewPayStatus(order.paymentStatus);
    };

    const closeModal = () => setSelectedOrder(null);

    const saveStatus = async () => {
        if (!selectedOrder) return;
        setSaving(true);
        try {
            const res = await fetch(`${base_url}/orders/${selectedOrder._id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ orderStatus: newStatus, paymentStatus: newPayStatus }),
            });
            if (!res.ok) throw new Error();
            showToast('Status updated!');
            orderRefetch();
            closeModal();
        } catch {
            showToast('Failed to update', 'error');
        }
        setSaving(false);
    };

    const deleteOrder = async () => {
        if (!deleteTarget) return;
        try {
            const res = await fetch(`${base_url}/orders/${deleteTarget}`, { method: 'DELETE' });
            if (!res.ok) throw new Error();
            showToast('Order deleted!');
            orderRefetch();
        } catch {
            showToast('Delete failed', 'error');
        }
        setDeleteTarget(null);
    };

    const stats = {
        total: orders?.length || 0,
        pending: orders?.filter(o => o.orderStatus === 'Pending').length || 0,
        delivered: orders?.filter(o => o.orderStatus === 'Delivered').length || 0,
        revenue: (orders || []).reduce((s, o) => s + parseFloat(o.totalAmount || 0), 0),
    };

    return (
        <div className="min-h-screen  text-white p-4 md:p-8 font-sans">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text text-transparent tracking-tight">
                    Manage Orders
                </h1>
                <p className="text-gray-500 text-sm mt-1">{stats.total} total orders</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {[
                    { label: 'Total Orders', val: stats.total, color: 'text-violet-400' },
                    { label: 'Pending', val: stats.pending, color: 'text-yellow-400' },
                    { label: 'Delivered', val: stats.delivered, color: 'text-green-400' },
                    { label: 'Revenue', val: `€${stats.revenue.toLocaleString()}`, color: 'text-violet-400' },
                ].map(({ label, val, color }) => (
                    <div key={label} className="bg-[#141720] border border-[#252a3a] rounded-2xl p-4 hover:-translate-y-1 transition-transform">
                        <div className={`text-2xl font-extrabold ${color}`}>{val}</div>
                        <div className="text-xs text-gray-500 mt-1">{label}</div>
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3 mb-5">
                <div className="relative flex-1 min-w-[200px]">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">🔍</span>
                    <input
                        className="w-full bg-[#141720] border border-[#252a3a] rounded-xl pl-9 pr-4 py-2.5 text-sm outline-none focus:border-violet-500 transition-colors"
                        placeholder="Search by email or order ID..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>
                <select
                    className="bg-[#141720] border border-[#252a3a] rounded-xl px-4 py-2.5 text-sm outline-none cursor-pointer"
                    value={statusFilter}
                    onChange={e => setStatusFilter(e.target.value)}
                >
                    <option value="">All Statuses</option>
                    {STATUSES.map(s => <option key={s}>{s}</option>)}
                </select>
            </div>

            {/* Table */}
            <div className="bg-[#141720] border border-[#252a3a] rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[900px]">
                        <thead>
                            <tr className="bg-[#1c2030]">
                                {['#', 'Order ID', 'Customer', 'Items', 'Qty', 'Amount', 'Order Status', 'Payment', 'Due', 'Date', 'Actions'].map(h => (
                                    <th key={h} className="px-4 py-3 text-left text-[10px] font-bold text-gray-500 uppercase tracking-widest">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {orderLoading ? (
                                <tr><td colSpan={11} className="text-center py-16 text-gray-500">Loading...</td></tr>
                            ) : filtered.length === 0 ? (
                                <tr><td colSpan={11} className="text-center py-16 text-gray-500">No orders found</td></tr>
                            ) : filtered.map((order, i) => (
                                <tr
                                    key={order._id}
                                    className="border-t border-[#252a3a] hover:bg-[#1c2030] cursor-pointer transition-colors"
                                    onClick={() => openModal(order)}
                                >
                                    <td className="px-4 py-3 text-xs text-gray-500">{i + 1}</td>
                                    <td className="px-4 py-3">
                                        <span className="text-violet-400 font-bold text-xs font-mono">#{order._id?.slice(-8).toUpperCase()}</span>
                                    </td>
                                    <td className="px-4 py-3 max-w-[150px] truncate text-xs text-gray-400">{order.userEmail}</td>
                                    <td className="px-4 py-3 font-semibold">{order.totalItems}</td>
                                    <td className="px-4 py-3 text-gray-300">{order.totalQuantity}</td>
                                    <td className="px-4 py-3 font-bold text-green-400 font-mono">€{parseFloat(order.totalAmount).toLocaleString()}</td>
                                    <td className="px-4 py-3">
                                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${statusColors[order.orderStatus] || statusColors.Pending}`}>
                                            <span className="w-1.5 h-1.5 rounded-full bg-current" />
                                            {order.orderStatus}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${payColors[order.paymentStatus] || payColors.Pending}`}>
                                            {order.paymentStatus}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 font-bold text-orange-400 font-mono">€{parseFloat(order.duePayment).toLocaleString()}</td>
                                    <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">
                                        {new Date(order.orderDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' })}
                                    </td>
                                    <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                                        <div className="flex gap-2">
                                            <button
                                                className="w-8 h-8 rounded-lg border border-[#252a3a] flex items-center justify-center text-sm hover:border-violet-500 hover:text-violet-400 transition-colors"
                                                onClick={() => openModal(order)}
                                            >👁️</button>
                                            <button
                                                className="w-8 h-8 rounded-lg border border-[#252a3a] flex items-center justify-center text-sm hover:border-red-500 hover:text-red-400 transition-colors"
                                                onClick={() => setDeleteTarget(order._id)}
                                            >🗑️</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* View/Edit Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={closeModal}>
                    <div className="bg-[#141720] border border-[#252a3a] rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                        <div className="flex items-start justify-between p-6 pb-0">
                            <div>
                                <h2 className="text-lg font-extrabold">Order #{selectedOrder._id?.slice(-8).toUpperCase()}</h2>
                                <p className="text-xs text-gray-500 mt-1">{selectedOrder.userEmail} · {new Date(selectedOrder.orderDate).toLocaleString()}</p>
                            </div>
                            <button className="w-8 h-8 bg-[#1c2030] border border-[#252a3a] rounded-lg flex items-center justify-center text-gray-400 hover:text-red-400 hover:border-red-500 transition-colors" onClick={closeModal}>✕</button>
                        </div>

                        <div className="p-6 space-y-5">
                            {/* Info Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {[
                                    { label: 'Total Amount', val: `€${parseFloat(selectedOrder.totalAmount).toLocaleString()}`, color: 'text-green-400 text-xl' },
                                    { label: 'Advance Paid', val: `€${(selectedOrder.advancePayment || 0).toLocaleString()}`, color: 'text-green-400' },
                                    { label: 'Due Payment', val: `€${(selectedOrder.duePayment || 0).toLocaleString()}`, color: 'text-orange-400' },
                                    { label: 'Total Items', val: `${selectedOrder.totalItems} items · ${selectedOrder.totalQuantity} pcs` },
                                    { label: 'Customer', val: selectedOrder.userEmail, small: true },
                                    { label: 'Order Date', val: new Date(selectedOrder.orderDate).toLocaleDateString() },
                                ].map(({ label, val, color, small }) => (
                                    <div key={label} className="bg-[#1c2030] border border-[#252a3a] rounded-xl p-3">
                                        <div className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold mb-1">{label}</div>
                                        <div className={`font-semibold ${small ? 'text-xs break-all' : 'text-sm'} ${color || 'text-white'}`}>{val}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Items */}
                            <div>
                                <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 pb-2 border-b border-[#252a3a]">
                                    🛍️ Order Items ({selectedOrder.items?.length})
                                </div>
                                <div className="space-y-2.5">
                                    {selectedOrder.items?.map(item => (
                                        <div key={item._id} className="bg-[#1c2030] border border-[#252a3a] rounded-xl p-3 flex gap-3">
                                            <img
                                                src={item.selectedImage}
                                                alt={item.itemName}
                                                className="w-14 h-14 rounded-lg object-cover border border-[#252a3a] shrink-0"
                                                onError={e => { e.target.src = 'https://via.placeholder.com/56x56/1c2030/6c63ff?text=📦'; }}
                                            />
                                            <div className="flex-1 min-w-0">
                                                <div className="font-semibold text-sm mb-1.5">{item.itemName}</div>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {item.selectedSize?.size && <span className="text-[10px] px-2 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/25 text-violet-400">📐 {item.selectedSize.size}</span>}
                                                    {item.selectedSide?.sides && <span className="text-[10px] px-2 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/25 text-violet-400">🔄 {item.selectedSide.sides}</span>}
                                                    {item.selectedLamination && <span className="text-[10px] px-2 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/25 text-violet-400">✨ {item.selectedLamination}</span>}
                                                    {item.selectedDelivery?.deliveryType && <span className="text-[10px] px-2 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/25 text-violet-400">🚚 {item.selectedDelivery.deliveryType}</span>}
                                                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/25 text-violet-400">📦 Qty: {item.quantity}</span>
                                                </div>
                                            </div>
                                            <div className="text-green-400 font-bold font-mono text-sm shrink-0 self-center">€{item.totalPrice.toLocaleString()}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Order Status */}
                            <div>
                                <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 pb-2 border-b border-[#252a3a]">📋 Order Status</div>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                    {STATUSES.map(s => (
                                        <button
                                            key={s}
                                            onClick={() => setNewStatus(s)}
                                            className={`py-2 px-3 rounded-xl border text-xs font-medium transition-all ${newStatus === s ? 'border-violet-500 bg-violet-500/10 text-white' : 'border-[#252a3a] text-gray-500 hover:border-violet-500/50 hover:text-gray-300'}`}
                                        >{s}</button>
                                    ))}
                                </div>
                            </div>

                            {/* Payment Status */}
                            <div>
                                <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 pb-2 border-b border-[#252a3a]">💳 Payment Status</div>
                                <div className="grid grid-cols-3 gap-2">
                                    {PAYMENT_STATUSES.map(s => (
                                        <button
                                            key={s}
                                            onClick={() => setNewPayStatus(s)}
                                            className={`py-2 px-3 rounded-xl border text-xs font-medium transition-all ${newPayStatus === s ? 'border-violet-500 bg-violet-500/10 text-white' : 'border-[#252a3a] text-gray-500 hover:border-violet-500/50 hover:text-gray-300'}`}
                                        >{s}</button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-[#252a3a] px-6 py-4 flex justify-end gap-3">
                            <button className="px-5 py-2.5 rounded-xl bg-[#1c2030] border border-[#252a3a] text-sm font-semibold text-gray-400 hover:text-white transition-colors" onClick={closeModal}>Close</button>
                            <button
                                className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold transition-all hover:-translate-y-0.5 disabled:opacity-50"
                                onClick={saveStatus}
                                disabled={saving}
                            >{saving ? 'Saving...' : 'Save Status'}</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirm */}
            {deleteTarget && (
                <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setDeleteTarget(null)}>
                    <div className="bg-[#141720] border border-red-500/30 rounded-2xl p-7 max-w-sm w-full text-center" onClick={e => e.stopPropagation()}>
                        <div className="text-5xl mb-3">🗑️</div>
                        <h3 className="text-lg font-extrabold mb-2">Delete Order?</h3>
                        <p className="text-gray-500 text-sm mb-6 leading-relaxed">This will permanently remove the order. This action cannot be undone.</p>
                        <div className="flex gap-3 justify-center">
                            <button className="px-5 py-2.5 rounded-xl bg-[#1c2030] border border-[#252a3a] text-sm font-semibold text-gray-400" onClick={() => setDeleteTarget(null)}>Cancel</button>
                            <button className="px-5 py-2.5 rounded-xl bg-red-500/15 border border-red-500/30 text-red-400 text-sm font-semibold hover:bg-red-500/25 transition-colors" onClick={deleteOrder}>Yes, Delete</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Toast */}
            {toast.show && (
                <div className={`fixed bottom-6 right-6 px-5 py-3 rounded-xl border text-sm font-semibold z-[9999] transition-all ${toast.type === 'error' ? 'bg-[#1c2030] border-red-500/40 text-red-400' : 'bg-[#1c2030] border-green-500/40 text-green-400'}`}>
                    {toast.msg}
                </div>
            )}
        </div>
    );
};

export default ManageOrders;