import { AiOutlineLoading } from "react-icons/ai";

const Loader = ({ message = "Loading, please wait..." }) => {
    return (
        <div className="flex flex-col justify-center items-center mx-auto w-full h-screen bg-white/70">
            <div className="flex items-center rounded-xl p-5 text-blue-600 text-7xl font-extrabold">
                <AiOutlineLoading className="animate-spin" />
            </div>
            <div className="mt-4 text-lg text-gray-700 font-semibold animate-pulse">
                {message}
            </div>
        </div>
    );
};

export default Loader;
