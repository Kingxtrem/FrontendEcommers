import { AiOutlineLoading } from "react-icons/ai";

const Loader = () => {
    return (
        <div className="flex justify-center items-center mx-auto w-full h-screen">
            <div className="flex items-center rounded-xl p-5 text-red-600 text-9xl font-extrabold">
                <AiOutlineLoading className="animate-spin" />
            </div>
        </div>
    )
}

export default Loader
