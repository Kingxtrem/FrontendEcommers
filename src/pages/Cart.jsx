import { useNavigate } from 'react-router-dom'
import { MdOutlineRemoveShoppingCart } from "react-icons/md";

const Cart = ({ cartItems = [], cartvalue, onRemove }) => {
    const navigate = useNavigate();
    const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className='bg-gray-100 min-h-screen w-full mx-auto p-5'>
            {cartvalue < 1 ? (
                <div className='container w-full p-3 rounded-2xl bg-white mx-auto shadow-lg shadow-black flex flex-col'>
                    <MdOutlineRemoveShoppingCart className='text-9xl text-red-500 mx-auto' />
                    <p className='text-3xl text-red-500 mx-auto'>No Items found. The Cart is Empty.... </p>
                    <button onClick={() => navigate("/products")} className='cursor-pointer border-0 rounded-2xl p-3 bg-blue-700 text-white text-xl flex justify-center items-center mx-auto m-5 hover:bg-blue-800 active:bg-blue-950 transition duration-300'>Start Shopping</button>
                </div>
            ) : (
                <div className='container w-full p-3 rounded-2xl bg-white mx-auto shadow-lg shadow-black flex flex-col overflow-x-auto'>
                    <table className='text-center w-full'>
                        <thead>
                            <tr>
                                <th scope="col">Image</th>
                                <th scope="col">Item Name</th>
                                <th scope="col">Item Price</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Total Item Price</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item) => (
                                <tr key={item._id}>
                                    <td><img src={item.image} alt={item.name} className="w-16 h-16 object-cover mx-auto" /></td>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.price * item.quantity}</td>
                                    <td>
                                        <button onClick={() => onRemove(item._id)} className="text-red-600 hover:underline">Remove</button>
                                    </td>
                                </tr>
                            ))}
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
