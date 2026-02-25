import { Link } from "react-router-dom";
import { FaArrowRight, FaRocket } from "react-icons/fa6";


const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-20 px-6 rounded-3xl min-h-[70vh] flex flex-col items-center justify-center text-center border border-white shadow-sm">


      <div
        className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-200/40 rounded-full blur-[100px]"
        style={{ animation: 'pulse 8s infinite alternate' }}
      ></div>
      <div
        className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-green-200/40 rounded-full blur-[100px]"
        style={{ animation: 'pulse 10s infinite alternate-reverse' }}
      ></div>

      <div className="relative z-10 max-w-4xl mx-auto">

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600/10 border border-blue-200 text-blue-700 text-sm font-bold mb-8 uppercase tracking-widest">
          <FaRocket className="text-xs" />
          <span>New Arrivals {new Date().getFullYear()}</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-6 tracking-tight">
          Upgrade Your Tech <br />
          <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
            Without the Limits
          </span>
        </h1>

        <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          Shop the latest in high-performance computing, smart home automation,
          and premium accessories at prices that make sense.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/products">
            <button className="group px-8 py-4 bg-blue-600 text-white rounded-2xl text-lg font-bold transition-all duration-300 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-200 active:scale-95 flex items-center gap-2">
              Explore Store
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>


        </div>
      </div>
    </section>
  );
};

export default HeroSection;