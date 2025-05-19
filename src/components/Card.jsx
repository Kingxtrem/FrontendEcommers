import { FaIndianRupeeSign } from "react-icons/fa6";
import { CiStar } from "react-icons/ci";
import { Link } from 'react-router-dom';

const Card = ({ item }) => {
    return (
        <Link
            to={`/products/${item._id}`}
            className='w-90 md:max-h-80 min-h-80 p-3 rounded-2xl m-5 box-border bg-white md:flex gap-2 mx-auto shadow-lg shadow-black hover:scale-95 duration-300'
        >
            <div className='md:w-50 w-auto my-auto mx-auto '>
                <img src={item.image} alt="image" className='w-auto max-h-60 object-cover mx-auto my-auto' />
            </div>
            <div className='text-black text-xs mx-auto container md:p-2 flex flex-col flex-wrap box-border justify-between'>
                <div className='w-50 h-30'>
                    <div className='m-2 truncate'><span className='font-bold'>Product Name:</span> {item.name}</div>
                    <div className='m-2 truncate'><span className='font-bold'>Product Description:</span> {item.description}</div>
                    <div className='flex items-center m-2'><span className='font-bold'>Price:</span><FaIndianRupeeSign /> {item.price}</div>
                    <div className='font-bold flex items-center m-2'>Rating:
                        {Array.from({ length: 5 }, (_, index) => (
                            <CiStar key={index} className={index < item.rating ? 'text-yellow-500' : 'text-black'} />
                        ))}
                        <span className="text-black">{item.rating}</span>
                    </div>
                </div>
                <div className='flex justify-center items-end'>
                    <div className='m-5 border-2 rounded-xl text-xl p-2 bg-blue-700 text-white hover:bg-blue-800 active:bg-blue-950 transition duration-300'>
                        View Details
                    </div>
                </div>
            </div>
        </Link>

    )
}

export default Card
