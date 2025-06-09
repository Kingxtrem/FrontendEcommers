import axios from 'axios';
import Api from '../axios/Api';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Bounce, ToastContainer, toast } from 'react-toastify';

const AddProduct = () => {
    const { id } = useParams()
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [Data, setData] = useState({
        name: '',
        description: '',
        price: 0,
        rating: 0,
        category: '',
        inStock: 1,
    });
    const [image, setImage] = useState(null);
    const [errors, setErrors] = useState({});
    const [disable, setDisable] = useState(false);

    const onchangeHandler = (e) => {
        setData({ ...Data, [e.target.name]: e.target.value });
    };

    const onFileChangeHandler = (e) => {
        setImage(e.target.files[0]);
    };

    const validateForm = () => {
        const newErrors = {};
        if (!Data.name) newErrors.name = 'name is required.';
        if (!Data.description) newErrors.description = 'description is required.';
        if (!Data.price) newErrors.price = 'price is required.';
        if (!Data.category) newErrors.category = 'category is requierd.';
        if (!image) newErrors.image = 'picture is required.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const onsubmitHandler = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        const formData = new FormData();
        formData.append('name', Data.name);
        formData.append('description', Data.description);
        formData.append('price', Data.price);
        formData.append('rating', Data.rating);
        formData.append('category', Data.category);
        formData.append('inStock', Data.inStock);
        formData.append('image', image);

        try {
            setDisable(true);
            const res = await Api.post('/product/create', formData, {
                headers: {
                    'Authorization': token
                }
            });
            res.data.message && toast.success(res.data.message);
            toast.info("Redirecting to admin page");
            setData({
                name: '',
                description: '',
                price: 0,
                rating: 0,
                category: '',
                inStock: 0,
            });
            setImage(null);
            setErrors({});
            setTimeout(() => {
                setDisable(false);
                navigate('/admin');
            }, 2000);
        } catch (error) {
            console.error('Product adding failed:', error);
            error.response?.data?.message && toast.error(error.response.data.message);
            setErrors({});
            setDisable(false);
        }
    };
    const getDetails = async (id) => {
        try {
            const response = await Api.get(`/product/${id}`);
            setData(response.data.productData);
            setImage(response.data.productData.image);
        } catch (error) {
            console.error("Failed to fetch product details:", error);
            toast.error("Failed to load product details. Please try again.");
        }
    }
    const updateHandler = async (e) => {
        e.preventDefault()
        if (!validateForm()) return;
        const formData = new FormData();
        formData.append('name', Data.name);
        formData.append('description', Data.description);
        formData.append('price', Data.price);
        formData.append('rating', Data.rating);
        formData.append('category', Data.category);
        formData.append('inStock', Data.inStock);
        formData.append('image', image);

        try {
            setDisable(true);
            const res = await Api.put(`/product/update/${id}`, formData, {
                headers: {
                    'Authorization': token
                }
            });
            res.data.message && toast.success(res.data.message);
            toast.info("Redirecting to admin page");
            setData({
                name: '',
                description: '',
                price: 0,
                rating: 0,
                category: '',
                inStock: 0,
            });
            setImage(null);
            setErrors({});
            setTimeout(() => {
                setDisable(false);
                navigate('/admin');
            }, 2000);
        } catch (error) {
            console.error('Product updating failed:', error);
            error.response?.data?.message && toast.error(error.response.data.message);
            setErrors({});
            setDisable(false);
        }
    }
    useEffect(() => {
        if (id) {
            getDetails(id);
        }
    }, [])
    return (
        <div className='bg-gray-100 min-h-screen flex items-center justify-center'>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                transition={Bounce}
            />
            <div className="sm:w-full w-80  max-w-md bg-white shadow-lg shadow-black rounded-lg p-6">
                <h2 className="text-2xl font-bold text-center text-green-600 mb-6">{id ? "Edit product" : "Add new product"}</h2>
                <form onSubmit={id ? updateHandler : onsubmitHandler}>
                    <div className="flex flex-col gap-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium">
                                Product Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Enter your Product Name"
                                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                value={Data.name}
                                onChange={onchangeHandler}
                                autoComplete="product-name"
                                autoFocus
                            />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                        </div>
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium">
                                Description
                            </label>
                            <input
                                type="text"
                                id="description"
                                name="description"
                                placeholder="Enter your description"
                                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                value={Data.description}
                                onChange={onchangeHandler}
                                autoComplete="description"
                            />
                            {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                        </div>
                        <div>
                            <label htmlFor="price" className="block text-sm font-medium">
                                Price
                            </label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                placeholder="Enter your price"
                                value={Data.price}
                                min={0}
                                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                onChange={onchangeHandler}
                            />
                            {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
                        </div>
                        <div>
                            <label htmlFor="rating" className="block text-sm font-medium">
                                Rating
                            </label>
                            <input
                                type="number"
                                max={5}
                                min={0}
                                id="rating"
                                name='rating'
                                placeholder="Enter your rating"
                                value={Data.rating}
                                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                onChange={onchangeHandler}
                            />
                        </div>
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium">
                                Category
                            </label>
                            <input
                                type="text"
                                id="category"
                                name="category"
                                placeholder="Enter your category"
                                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                value={Data.category}
                                onChange={onchangeHandler}
                            />
                            {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
                        </div>
                        <div>
                            <label htmlFor="inStock" className="block text-sm font-medium">
                                In Stock
                            </label>
                            <input
                                type="number"
                                id="inStock"
                                name="inStock"
                                min={0}
                                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                value={Data.inStock}
                                onChange={onchangeHandler}
                            />
                        </div>
                        <div>
                            <label htmlFor="image" className="block text-sm font-medium">
                                Image
                            </label>
                            <input
                                type="file"
                                id="image"
                                name="image"
                                accept="image/*"
                                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                onChange={onFileChangeHandler}
                            />
                            {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
                        </div>
                        <button
                            type="submit"
                            disabled={disable}
                            className={disable ? "w-full bg-black text-white rounded-lg py-2 cursor-not-allowed" : "w-full bg-green-600 text-white rounded-lg py-2 hover:bg-green-700 transition duration-200 cursor-pointer"}
                        >
                            {id ? "UPDATE PRODUCT" : "ADD PRODUCT"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddProduct
