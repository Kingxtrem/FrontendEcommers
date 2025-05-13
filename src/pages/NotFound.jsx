import { useNavigate } from 'react-router-dom'

const NotFound = () => {
    const Navigate = useNavigate();
    const handleClick = () => {
        Navigate("/");
    }
    return (

        <div className='container flex justify-center items-center mx-auto my-auto flex-col h-screen w-auto'>
            <h1 className='text-4xl font-bold text-red-600'>404: Not Found</h1>

            <p className='text-xl text-gray-700'>The page you are looking for does not exist.</p>

            <p className='text-xl text-gray-700'>Please check the URL or return to the homepage.</p>

            <div className='flex justify-center items-center'>
                <button className='animate-bounce m-5 rounded-xl text-2xl p-2 bg-blue-700 text-white cursor-pointer hover:bg-blue-800 active:bg-blue-950 transition duration-300 text-nowrap' onClick={handleClick}>Go to Home</button>
            </div>



        </div>
    )
}

export default NotFound
