import { useEffect, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import Api from "../axios/Api";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { IoChevronBackOutline } from "react-icons/io5";
import { FaCheckCircle, FaMapMarkerAlt, FaFileInvoiceDollar, FaCreditCard } from "react-icons/fa";

const OrderDetails = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchOrderDetails = useCallback(async () => {
        try {
            const { data } = await Api.get(`/order/${id}`);
            if (data.success) {
                setOrder(data.order);
            }
        } catch (error) {
            console.log(error)
            toast.error("Failed to load order details");
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchOrderDetails();
    }, [fetchOrderDetails]);

    if (loading) return <Loader />;

    if (!order) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
                <h2 className="text-2xl font-bold text-slate-800 mb-4">Order Not Found</h2>
                <Link to="/orders" className="text-indigo-600 hover:underline font-bold">Return to Orders</Link>
            </div>
        );
    }

    const { shippingAddress, items, totalAmount, paymentStatus, razorpayOrderId, razorpayPaymentId, createdAt } = order;

    return (
        <div className="bg-slate-50 min-h-screen pb-20 pt-10 px-4">
            <title>Order Receipt | TechCart</title>
            <div className="max-w-4xl mx-auto">

                <div className="flex items-center gap-4 mb-8">
                    <Link to="/orders" className="p-3 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow text-slate-500 hover:text-indigo-600">
                        <IoChevronBackOutline size={20} />
                    </Link>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Order Receipt</h1>
                </div>

                <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">

                    <div className="bg-indigo-600 p-8 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <p className="text-indigo-200 text-sm font-bold uppercase tracking-widest mb-1">Receipt Number</p>
                            <p className="text-2xl font-mono font-black">{razorpayOrderId}</p>
                        </div>
                        <div className="flex flex-col md:items-end">
                            <p className="text-indigo-200 text-sm font-bold uppercase tracking-widest mb-1">Date Paid</p>
                            <p className="font-semibold text-lg">
                                {new Date(createdAt).toLocaleDateString("en-US", {
                                    year: 'numeric', month: 'long', day: 'numeric',
                                    hour: '2-digit', minute: '2-digit'
                                })}
                            </p>
                        </div>
                    </div>

                    <div className="p-8">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">

                            <div className="space-y-4">
                                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                                    <FaMapMarkerAlt /> Shipping Address
                                </h3>
                                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 text-slate-700 text-sm leading-relaxed">
                                    <p className="font-bold text-base text-slate-900 mb-1">{shippingAddress?.firstName} {shippingAddress?.lastName}</p>
                                    <p>{shippingAddress?.address}</p>
                                    <p>{shippingAddress?.city}, {shippingAddress?.zipCode}</p>
                                    <p className="mt-2 text-slate-500 flex items-center gap-2">
                                        <span className="font-semibold">Phone:</span> {shippingAddress?.phone}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                                    <FaFileInvoiceDollar /> Payment Details
                                </h3>
                                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 text-slate-700 text-sm space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-slate-500">Gateway Status</span>
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${paymentStatus === "Completed" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                                            }`}>
                                            {paymentStatus === "Completed" && <FaCheckCircle />}
                                            {paymentStatus}
                                        </span>
                                    </div>
                                    <div className="flex break-all justify-between items-center gap-4">
                                        <span className="text-slate-500 shrink-0">Transaction Ref</span>
                                        <span className="font-mono text-xs bg-white px-2 py-1 rounded border border-slate-200">
                                            {razorpayPaymentId || "N/A"}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center pt-2 border-t border-slate-200">
                                        <span className="text-slate-500 flex items-center gap-1"><FaCreditCard className="text-slate-400" /> Mode</span>
                                        <span className="font-semibold">Razorpay Checkout</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Order Items</h3>
                        <div className="border border-slate-100 rounded-2xl overflow-hidden mb-8">
                            <div className="divide-y divide-slate-100">
                                {items.map((item) => (
                                    <div key={item._id} className="p-4 sm:p-6 flex items-center gap-4 sm:gap-6 bg-white hover:bg-slate-50 transition-colors">
                                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-100 rounded-xl overflow-hidden shrink-0">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply p-2" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <Link to={`/products/${item.product_id}`} className="font-bold text-slate-900 text-sm sm:text-base hover:text-indigo-600 transition-colors line-clamp-1">
                                                {item.name}
                                            </Link>
                                            <p className="text-slate-500 text-xs sm:text-sm mt-1">Qty: <span className="font-semibold text-slate-700">{item.quantity}</span></p>
                                        </div>
                                        <div className="text-right shrink-0">
                                            <p className="font-black text-slate-900 text-sm sm:text-base">₹{(item.price * item.quantity).toLocaleString("en-IN")}</p>
                                            {item.quantity > 1 && <p className="text-xs text-slate-400 mt-0.5">₹{item.price.toLocaleString("en-IN")} each</p>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <div className="w-full sm:w-80 bg-slate-50 rounded-2xl p-6 border border-slate-100">
                                <div className="flex justify-between text-slate-500 text-sm mb-3">
                                    <span>Subtotal</span>
                                    <span className="font-semibold text-slate-700">₹{totalAmount.toLocaleString("en-IN")}</span>
                                </div>
                                <div className="flex justify-between text-slate-500 text-sm mb-4">
                                    <span>Shipping</span>
                                    <span className="font-bold text-emerald-600 uppercase text-xs tracking-wider">Free</span>
                                </div>
                                <div className="flex justify-between items-center pt-4 border-t border-slate-200">
                                    <span className="text-base font-bold text-slate-800">Total Paid</span>
                                    <span className="text-2xl font-black text-indigo-600">₹{totalAmount.toLocaleString("en-IN")}</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default OrderDetails;
