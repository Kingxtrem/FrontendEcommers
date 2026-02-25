import { FaIndianRupeeSign, FaStar } from "react-icons/fa6";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";


const Card = ({ item }) => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar
        key={i}
        className={i < Math.floor(rating) ? "text-amber-400" : "text-slate-200"}
      />
    ));
  };

  return (
    <Link
      to={`/products/${item._id}`}
      className="group flex flex-col w-full bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
    >

      <div className="h-64 bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
          onError={(e) => { e.target.src = 'https://placehold.co/400x400?text=No+Image'; }}
        />

        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-slate-500 uppercase tracking-widest border border-slate-100 shadow-sm">
          {item.category || 'Mobiles'}
        </div>
      </div>


      <div className="flex flex-col p-6 flex-1">
        <div className="mb-4">
          <div className="flex justify-between items-start gap-2 mb-2">
            <h3 className="text-lg font-black text-slate-800 line-clamp-1 leading-tight group-hover:text-blue-600 transition-colors">
              {item.name}
            </h3>
          </div>

          <div className="flex items-center gap-1 mb-3">
            {renderStars(item.rating)}
            <span className="text-slate-400 text-xs font-bold ml-1">({item.rating})</span>
          </div>

          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed h-8">
            {item.description}
          </p>
        </div>


        <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter block">Price</span>
            <div className="flex items-center text-xl font-black text-blue-600">
              <FaIndianRupeeSign className="text-sm" />
              <span>{item.price?.toLocaleString("en-IN")}</span>
            </div>
          </div>

          <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center group-hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100">
            <FiArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;