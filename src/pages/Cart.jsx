import { useNavigate } from 'react-router-dom'
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { useState } from 'react';
import { useEffect } from 'react';
import Api from '../axios/Api';
import Loader from '../components/Loader';

const Cart = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [cartvalue, setCartvalue] = useState(0)
    const [totalAmount, setTotalAmount] = useState(0);
    const [loading, setLoading] = useState(true);
    const GetCartItems = async () => {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (!token) {
            alert("Please login to view your cart");
            navigate("/login");
            return;
        }
        try {
            const response = await Api.get("/user/profile", {
                headers: {
                    'Authorization': token,
                },
            });
            setCartItems(response.data.user.cart);
            setCartvalue(response.data.user.cart.length);
            localStorage.setItem('cartValue', response.data.user.cart.length);
            setTotalAmount(response.data.user.cart.reduce((acc, item) => acc + item.price, 0));
        } catch (error) {
            console.error("Failed to fetch cart items:", error);
            alert("Failed to load cart items. Please try again.");
        }
        setLoading(false);
    };
    useEffect(() => {
        GetCartItems();
    }, []);
    const handelremovefromcart = async (product_id) => {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (!token) {
            alert("Please login to remove items from the cart");
            navigate("/login");
            return;
        }
        try {
            const response = await Api.post("/user/removefromcart", { product_id }, {
                headers: {
                    'Authorization': token,
                },
            });
            setCartItems(response.data.user.cart);
            setCartvalue(response.data.user.cart.length);
            localStorage.setItem('cartValue', response.data.user.cart.length);
            setTotalAmount(response.data.user.cart.reduce((acc, item) => acc + item.price, 0));
        } catch (error) {
            console.error("Failed to remove item from cart:", error);
            alert("Failed to remove item from cart. Please try again.");
        }
        setLoading(false);
    };
    
    return (
        <div className='bg-gray-100 min-h-screen w-full mx-auto p-5'>
            {cartvalue < 1 ? loading?<Loader/>:(
                <div className='container w-full p-3 rounded-2xl bg-white mx-auto shadow-lg shadow-black flex flex-col'>
                    <MdOutlineRemoveShoppingCart className='text-9xl text-red-500 mx-auto' />
                    <p className='text-3xl text-red-500 mx-auto'>No Items found. The Cart is Empty.... </p>
                    <button onClick={() => navigate("/products")} className='cursor-pointer border-0 rounded-2xl p-3 bg-blue-700 text-white text-xl flex justify-center items-center mx-auto m-5 hover:bg-blue-800 active:bg-blue-950 transition duration-300'>Start Shopping</button>
                </div>
            ) : loading?<Loader/>:(
                <div className='container w-full p-3 rounded-2xl bg-white mx-auto shadow-lg shadow-black flex flex-col overflow-x-auto'>
                    <table className='text-center w-full'>
                        <thead>
                            <tr>
                                <th scope="col">Image</th>
                                <th scope="col">Item Name</th>
                                <th scope="col">Item Price</th>
                                <th scope="col">Quantity</th>
                                {/* <th scope="col">Total Item Price</th> */}
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item) =>{
                                return (
                                <tr key={item.product_id} className='border'>
                                    <td className="w-16 h-16 object-cover mx-auto" ><img src={item.image} alt={item.name} /></td>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                    <td>{item.quantity}</td>
                                    {/* <td>{item.price * item.quantity}</td> */}
                                    <td>
                                        <button onClick={()=>handelremovefromcart(item.product_id)} className="text-red-600 hover:underline">Remove</button>
                                    </td>
                                </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <div className='flex justify-end font-bold mt-4'>Total Amount: {totalAmount}</div>
                    <div className='flex justify-between w-full mt-4'>
                        <button onClick={() => navigate("/products")} className='animate-bounce rounded-xl md:text-2xl p-2 bg-blue-700 text-white cursor-pointer hover:bg-blue-800 active:bg-blue-950 transition duration-300 w-fit text-nowrap'>Continue Shopping</button>
                        <button className='animate-bounce rounded-xl md:text-2xl p-2 bg-blue-700 text-white cursor-pointer hover:bg-blue-800 active:bg-blue-950 transition duration-300 w-fit text-nowrap'>Check Out</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Cart
