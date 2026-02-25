import { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import Api from "../axios/Api";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { IoChevronBackOutline } from "react-icons/io5";
import { FaBoxOpen, FaCheckCircle, FaRupeeSign } from "react-icons/fa";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchOrders = useCallback(async () => {
        try {
            const { data } = await Api.get("/order/myorders");
            if (data.success) {
                setOrders(data.orders);
            }
        } catch {
            toast.error("Failed to fetch order history.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    if (loading) return <Loader />;

    return (
        <div className="bg-slate-50 min-h-screen pb-20 pt-10 px-4">
            <title>My Orders | TechCart</title>
            <meta name="description" content="View your order history at TechCart." />

            <div className="max-w-6xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <Link to="/profile" className="p-3 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow text-slate-500 hover:text-indigo-600">
                        <IoChevronBackOutline size={20} />
                    </Link>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Order History</h1>
                </div>

                {orders.length === 0 ? (
                    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-16 text-center">
                        <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <FaBoxOpen className="text-4xl text-slate-300" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-800 mb-2">No orders yet</h2>
                        <p className="text-slate-500 mb-8 max-w-md mx-auto">Looks like you haven't made any purchases. Explore our collection of premium tech gadgets!</p>
                        <button
                            onClick={() => navigate("/products")}
                            className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all active:scale-95"
                        >
                            Start Shopping
                        </button>
                    </div>
                ) : (
                    <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
                        <div className="hidden md:grid grid-cols-12 gap-4 p-6 bg-slate-50/50 border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-wider">
                            <div className="col-span-3">Order ID</div>
                            <div className="col-span-3">Date</div>
                            <div className="col-span-2">Status</div>
                            <div className="col-span-2 text-right">Items</div>
                            <div className="col-span-2 text-right">Total Amount</div>
                        </div>

                        <div className="divide-y divide-slate-100">
                            {orders.map((order) => (
                                <Link
                                    key={order._id}
                                    to={`/orders/${order._id}`}
                                    className="block p-6 hover:bg-slate-50 transition-colors group"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:items-center">

                                        <div className="md:col-span-3 flex flex-col md:block">
                                            <span className="md:hidden text-xs font-bold text-slate-400 uppercase mb-1">Order ID</span>
                                            <span className="font-mono text-sm font-semibold text-slate-600 truncate bg-slate-100 px-2 py-1 rounded inline-block">
                                                {order.razorpayOrderId}
                                            </span>
                                        </div>

                                        <div className="md:col-span-3 flex flex-col md:block">
                                            <span className="md:hidden text-xs font-bold text-slate-400 uppercase mb-1">Date</span>
                                            <span className="text-slate-800 font-medium text-sm">
                                                {new Date(order.createdAt).toLocaleDateString("en-US", {
                                                    year: 'numeric', month: 'long', day: 'numeric',
                                                    hour: '2-digit', minute: '2-digit'
                                                })}
                                            </span>
                                        </div>

                                        <div className="md:col-span-2 flex flex-col md:block">
                                            <span className="md:hidden text-xs font-bold text-slate-400 uppercase mb-1">Status</span>
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${order.paymentStatus === "Completed" ? "bg-emerald-50 text-emerald-600" :
                                                order.paymentStatus === "Failed" ? "bg-red-50 text-red-600" :
                                                    "bg-amber-50 text-amber-600"
                                                }`}>
                                                {order.paymentStatus === "Completed" && <FaCheckCircle />}
                                                {order.paymentStatus}
                                            </span>
                                        </div>

                                        <div className="md:col-span-2 flex flex-col md:text-right">
                                            <span className="md:hidden text-xs font-bold text-slate-400 uppercase mb-1">Items</span>
                                            <span className="text-slate-600 font-medium text-sm">
                                                {order.items.reduce((acc, item) => acc + item.quantity, 0)} items
                                            </span>
                                        </div>

                                        <div className="md:col-span-2 flex flex-col md:text-right">
                                            <span className="md:hidden text-xs font-bold text-slate-400 uppercase mb-1">Total</span>
                                            <span className="text-lg font-black text-indigo-600 flex items-center md:justify-end">
                                                <FaRupeeSign className="text-sm mr-0.5" />
                                                {order.totalAmount.toLocaleString("en-IN")}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Orders;
