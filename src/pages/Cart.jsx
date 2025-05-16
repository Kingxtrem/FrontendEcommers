import { useNavigate } from 'react-router-dom'
import { MdOutlineRemoveShoppingCart } from "react-icons/md";

const Cart = ({ cartvalue }) => {
    const Navigate = useNavigate();
    return (
        <div className='bg-gray-100 min-h-screen w-full mx-auto p-5 ' >
            {cartvalue < 1 ?
                <div className='container w-full  p-3  rounded-2xl bg-white mx-auto shadow-lg shadow-black flex flex-col'>
                    <MdOutlineRemoveShoppingCart className='text-9xl text-red-500 mx-auto' />
                    <p className='text-3xl text-red-500 mx-auto'>No Items found. The Cart is Empty.... </p>
                    <button onClick={() => Navigate("/products")} className='cursor-pointer border-0 rounded-2xl p-3 bg-blue-700 text-white text-xl flex justify-center items-center mx-auto m-5  hover:bg-blue-800 active:bg-blue-950 transition duration-300'>Start Shopping</button>
                </div> :
                <div className='container w-full p-3 rounded-2xl bg-white mx-auto shadow-lg shadow-black flex flex-col'>
                    <table className=' text-center '>
                        <th>Items</th>
                        <th>Item Name</th>
                        <th>Item Price</th>
                        <th>Quantity</th>
                        <th>Total Item Price</th>
                        <th>Action</th>
                        <tr>
                            <td ><img src="" alt="item image" /></td>
                            <td>name</td>
                            <td>price</td>
                            <td>1</td>
                            <td>price</td>
                            <td>remove</td>
                        </tr>
                    </table>
                    <div className='flex justify-end font-bold '>Total Amount:</div>
                    <div className='flex justify-between w-full '>
                        <button className='animate-bounce mt-5 rounded-xl md:text-2xl p-2 bg-blue-700 text-white cursor-pointer hover:bg-blue-800 active:bg-blue-950 transition duration-300 w-fit text-nowrap'>Continue Shopping</button>
                        <button className='animate-bounce mt-5 rounded-xl md:text-2xl p-2 bg-blue-700 text-white cursor-pointer hover:bg-blue-800 active:bg-blue-950 transition duration-300 w-fit text-nowrap'>Check Out</button>
                    </div>
                </div>
            }
        </div >
    )
}

export default Cart
