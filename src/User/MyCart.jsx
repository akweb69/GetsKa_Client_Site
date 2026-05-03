import React from 'react';
import { useAuth } from '../Context/AuthContext';
import useMyCart from '../AdminCode/Hooks/useMyCart';
import { motion } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';

const MyCart = () => {
    const { user, useLoading } = useAuth();
    const { myCart, totalCart, isLoading, error, refetch } = useMyCart(user?.email);
    const base_url = import.meta.env.VITE_BASE_URL;

    // staets--->
    const [removeLoading, setRemoveLoading] = React.useState(false);
    const [advancePayment, setAdvancePayment] = React.useState(0);

    // handle order place function--->
    const handlePlaceOrder = async () => {
        const orderData = {
            userEmail: user?.email,
            items: myCart,
            totalItems: totalCart,
            totalAmount: myCart.reduce((total, item) => total + item.totalPrice, 0).toFixed(2),
            totalQuantity: myCart.reduce((total, item) => total + item.quantity, 0),
            orderDate: new Date().toISOString(),
            orderStatus: "Pending",
            paymentStatus: "Pending",
            advancePayment: 0,
            duePayment: myCart.reduce((total, item) => total + item.totalPrice, 0).toFixed(2) - advancePayment

        }
        toast.loading("Placing your order...");
        const res = await axios.post(`${base_url}/orders`, { orderData });
        if (res.data) {
            toast.dismiss();
            toast.success("✅ Order placed successfully");
            refetch();
        }

    }



    // handle remove itemn form cart---->
    const handleRemoveItemFormCart = async (itemId) => {
        setRemoveLoading(true);
        toast.loading("Removing item from cart...");
        const deleteRes = await axios.delete(`${base_url}/cart/${itemId}`);
        if (deleteRes.data) {
            toast.dismiss();
            toast.success("Item removed from cart");
            setRemoveLoading(false);
            // refetch cart data after successful deletion
            refetch();
            setRemoveLoading(false);
        }
        else {
            toast.dismiss();
            toast.error("Failed to remove item from cart");
            setRemoveLoading(false);
        }
    }


    // check loading state
    if (isLoading || useLoading) {
        return <div>Loading...</div>
    }


    return (
        <motion.div
            initial={{ opacity: 0.8, x: 400 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            transition={{ duration: 0.3 }}
            className=' w-[300px] md:w-[450px] overflow-y-auto   bg-[#3b1fa8] p-4 border border-blue-950/20 h-[90vh] '>
            {/* content */}
            <div className="mb-[150px]">
                {/* title and itemcount */}
                <div className="flex justify-between items-center gap-4">
                    <h2 className="text-white text-xl font-bold">My Cart</h2>
                    <p className="text-white">Items in cart: {myCart.length}</p>
                </div>

                {/* cart items */}
                <div className="mt-4">
                    {myCart.length === 0 ? (
                        <p className="text-white">Your cart is empty.</p>
                    ) : (
                        myCart.map((item) => (
                            <div className="p-3 border mb-4 relative bg-blue-200/5 rounded  border-blue-200/10 flex items-center justify-between" key={item._id}>

                                {/* remove btn */}
                                <button
                                    onClick={() => handleRemoveItemFormCart(item._id)}
                                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                                    {
                                        removeLoading ? <div className="animate-pulse">...</div>
                                            : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>}
                                </button>
                                <div className="">
                                    <h3 className="text-white font-semibold">{item.itemName}</h3>
                                    <div className="w-16 h-16 bg-gray-200 flex-shrink-0 ">
                                        <img className='object-cover' src={item?.selectedImage} alt="" />
                                    </div>
                                </div>

                                <div className="">

                                    <p className="text-sm text-gray-300">Qty: {item.quantity}</p>
                                    {/* price in euro */}
                                    <p className="text-sm text-gray-300">Price: €{item.totalPrice.toFixed(2)}</p>
                                </div>

                            </div>
                        ))
                    )}
                </div>

            </div>


            {/* Bottom Checkout Section */}
            <div className="w-full absolute bottom-0 left-0 p-4 mb-4 bg-white border-t border-gray-100 shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.05)]">
                <div className="space-y-3 mb-4">


                    {/* Total Price */}
                    <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold text-gray-900">Total Amount</span>
                        <span className="text-2xl font-bold text-blue-600">
                            €{myCart.reduce((total, item) => total + item.totalPrice, 0).toFixed(2)}
                        </span>
                    </div>
                </div>

                {/* Checkout Button */}
                <button
                    onClick={() => handlePlaceOrder()}
                    className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-[0.98]">
                    Proceed to Order
                </button>
            </div>
        </motion.div>
    );
};

export default MyCart;