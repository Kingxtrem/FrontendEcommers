import { Link } from "react-router-dom";

const HeroSection = () => (
    <section className="bg-gradient-to-br from-blue-100 to-green-100 py-16 px-4 flex flex-col items-center justify-center text-center rounded-xl h-[60vh]">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 ">
            Discover the Latest Tech at <span className="text-blue-700">TechCart</span>
        </h1>
        <p className="text-lg md:text-2xl text-gray-700 mb-8 max-w-2xl">
            Shop the best gadgets, electronics, and accessories. Fast shipping, great prices, and top brands—all in one place.
        </p>
        <div className="flex gap-4">
            <Link to="/products">
                <button className='animate-pulse hover:animate-none rounded-xl text-3xl p-3 bg-blue-700 text-white cursor-pointer hover:bg-blue-800 active:bg-blue-950 transition duration-300 text-nowrap'>Shop Now</button>
            </Link>
        </div>
    </section>
);

export default HeroSection;