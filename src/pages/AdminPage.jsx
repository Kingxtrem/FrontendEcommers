import React, { useEffect, useState } from 'react'
import Api from '../axios/Api'
import { FaStar } from 'react-icons/fa6'
import { Link, useNavigate } from 'react-router-dom'
import { MdDeleteForever } from 'react-icons/md'
import Loader from '../components/Loader'
import { FaRegEdit } from "react-icons/fa";
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'
import { Helmet } from 'react-helmet'

const AdminPage = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    const GetAllProducts = async () => {
        try {
            setLoading(true)
            const res = await Api.get("/product/all")
            setData(res.data.data)
        }
        catch (err) {
            console.log(err)
            toast.error('failed to load products')
        } finally {
            setLoading(false)
        }
    }
    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to delete this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel'
        })
        if (result.isConfirmed) {
            setLoading(true)
            try {
                const token = localStorage.getItem('token')
                const response = await Api.delete(`/product/delete/${id}`, {
                    headers: {
                        'Authorization': token
                    }
                });
                Swal.fire('Deleted!', 'Your item has been deleted.', 'success');
                GetAllProducts();
            } catch (error) {
                console.error(error);
                Swal.fire('Error!', 'Failed to delete your item.', 'error');
            }
            setLoading(false)
        }
    }
    const handleEdit = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to edit this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes!',
            cancelButtonText: 'Cancel'
        })
        if (result.isConfirmed) {
            navigate(`/edit/${id}`)
        }
    }
    const handleAddProduct = async () => {
        navigate(`/addproduct`)
    }

    useEffect(() => {
        GetAllProducts()
    }, [])
    return (
        <div className='bg-gray-100 min-h-screen w-full mx-auto p-5'>
            <Helmet>
                <title>TechCart Store | Admin Panel</title>
                <meta name="description" content="Find the best Tech products at TechCart Store. Explore our wide range of products and enjoy shopping!" />
                <meta name="keywords" content="tech, ecommerce, gadgets, electronics, shop, buy online" />
            </Helmet>
            {loading ? <Loader /> :
                <div className='container w-full p-3 rounded-2xl bg-white mx-auto shadow-lg shadow-black flex flex-col overflow-x-auto'>
                    <button
                        onClick={handleAddProduct}
                        className={"w-full mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:bg-blue-800 transition duration-300 cursor-pointer"}
                    >
                        Add New Product
                    </button>
                    <table className='text-center w-full'>
                        <thead>
                            <tr className='text-nowrap text-l'>
                                <th scope='col' className='p-2'>S.No</th>
                                <th scope='col' className='p-2'>Image</th>
                                <th scope='col' className='p-2'>Item Name</th>
                                <th scope='col' className='p-2'>Item Price</th>
                                <th scope='col' className='p-2'>InStock</th>
                                <th scope='col' className='p-2'>Rating</th>
                                <th scope='col' className='p-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => {
                                return (
                                    <tr key={item._id} className='border-y-2 border-gray-300'>
                                        <td className="w-16 h-16" >{index + 1}</td>
                                        <td className="w-16 h-16" ><Link to={`/products/${item._id}`}><img className='hover:scale-95' src={item.image} alt={item.name} /></Link></td>
                                        <td className="">{item.name}</td>
                                        <td className="">₹{item.price}</td>
                                        <td className="">{item.inStock}</td>
                                        <td className='mx-auto my-auto'>
                                            <div className='flex'>
                                                {Array.from({ length: 5 }, (_, index) => (
                                                    <FaStar key={index} className={index < item.rating ? 'text-yellow-400' : 'text-black'} />
                                                ))}</div>
                                        </td>
                                        <td className="mx-auto my-auto p-2">
                                            <div className='flex'>
                                                <button onClick={() => handleEdit(item._id)} className="text-red-600 hover:scale-125 m-1 cursor-pointer text-4xl"><FaRegEdit /></button>
                                                <button onClick={() => handleDelete(item._id)} className="text-red-600 hover:scale-125 m-1 cursor-pointer text-4xl"><MdDeleteForever /></button></div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>}

        </div>
    )
}

export default AdminPage
