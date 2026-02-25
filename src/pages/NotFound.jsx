import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { FiHome, FiSearch, FiAlertTriangle } from "react-icons/fi";


const NotFound = () => {
  const navigate = useNavigate();

  return (
    <main className="relative min-h-screen w-full flex items-center justify-center bg-slate-50 overflow-hidden px-6">
      <Helmet>
        <title>404 | Page Not Found | TechCart</title>
      </Helmet>


      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-[120px] opacity-60"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-100 rounded-full blur-[120px] opacity-60"></div>

      <div className="relative z-10 max-w-2xl w-full text-center">

        <div className="mb-8 relative inline-block">
          <span className="text-[10rem] md:text-[14rem] font-black text-slate-200 select-none leading-none">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white p-6 rounded-3xl shadow-xl shadow-slate-200/50 rotate-12 border border-slate-100">
              <FiAlertTriangle className="text-blue-600 text-6xl" />
            </div>
          </div>
        </div>


        <div className="space-y-4">
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
            Whoops! System Error.
          </h1>
          <p className="text-lg text-slate-600 max-w-md mx-auto leading-relaxed">
            The page you're trying to access has been de-listed or moved to a different server. Let's get you back online.
          </p>
        </div>


        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="group flex items-center gap-2 px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 transition-all active:scale-95 w-full sm:w-auto text-lg"
          >
            <FiHome /> Go to Homepage
          </button>

          <button
            onClick={() => navigate("/products")}
            className="flex items-center gap-2 px-8 py-4 bg-white text-slate-700 border border-slate-200 font-bold rounded-2xl hover:bg-slate-50 transition-all w-full sm:w-auto text-lg"
          >
            <FiSearch /> Browse Gadgets
          </button>
        </div>


        <p className="mt-12 text-sm text-slate-400 font-medium italic">
          Error Code: TECH_CART_404_PAGE_MISSING
        </p>
      </div>
    </main>
  );
};

export default NotFound;