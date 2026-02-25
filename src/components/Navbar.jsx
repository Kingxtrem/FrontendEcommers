import { NavLink, Link } from "react-router-dom";
import { useState, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import { useClickOutside } from "../hooks/useClickOutside";
import TechCart from "../assets/logos/TechCart.jpg";



import { TbBrandSafari, TbCategoryPlus } from "react-icons/tb";
import { SiGnuprivacyguard } from "react-icons/si";
import { IoCartOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { LuBoxes } from "react-icons/lu";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [dropdownOpen2, setDropdownOpen2] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const isActiveToken = useSelector((state) => state.auth.isAuthenticated);
  const cartValue = useSelector((state) => state.cart.items.length);


  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);


  const closeAll = useCallback(() => {
    setDropdownOpen1(false);
    setDropdownOpen2(false);
    setMenuOpen(false);
  }, []);


  useClickOutside([navRef, mobileMenuRef], closeAll);

  const navItemStyles = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 font-bold ${isActive
      ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
      : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
    }`;

  const brands = ["Apple", "HP", "MSI", "Nothing", "Google", "ASUS", "SAMSUNG", "boAt"];
  const categories = ["Mobiles", "Audio", "Laptops", "Gaming Laptops", "Watches"];

  return (
    <>

      <nav ref={navRef} className="sticky top-0 w-full z-[100] bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm h-16 flex items-center">
        <div className="max-w-7xl mx-auto px-4 w-full flex justify-between items-center">


          <Link to="/" onClick={closeAll} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <img src={TechCart} alt="Logo" className="w-10 h-10 rounded-full object-cover border border-slate-100 shadow-sm" />
            <span className="text-xl font-black text-slate-800 tracking-tighter">Tech<span className="text-blue-600">Cart</span></span>
          </Link>


          <div className="hidden md:flex items-center gap-1 text-sm">
            <NavLink to="/products" className={navItemStyles} onClick={closeAll}><LuBoxes /> Products</NavLink>


            <div className="relative">
              <button
                onClick={() => { setDropdownOpen1(!dropdownOpen1); setDropdownOpen2(false); }}
                className={`flex items-center gap-1 px-4 py-2 rounded-xl transition-colors font-bold ${dropdownOpen1 ? 'text-blue-600 bg-blue-50' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                <TbBrandSafari /> Brands {dropdownOpen1 ? <IoIosArrowDropup /> : <IoIosArrowDropdown />}
              </button>
              {dropdownOpen1 && (
                <div className="absolute top-[calc(100%+8px)] left-0 w-48 bg-white border border-slate-100 rounded-2xl shadow-xl py-2 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  {brands.map((brand) => (
                    <Link key={brand} to={`/brands/${brand}`} onClick={closeAll} className="block px-4 py-2 hover:bg-blue-50 hover:text-blue-600 text-xs font-bold transition-colors">
                      {brand}
                    </Link>
                  ))}
                </div>
              )}
            </div>


            <div className="relative">
              <button
                onClick={() => { setDropdownOpen2(!dropdownOpen2); setDropdownOpen1(false); }}
                className={`flex items-center gap-1 px-4 py-2 rounded-xl transition-colors font-bold ${dropdownOpen2 ? 'text-blue-600 bg-blue-50' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                <TbCategoryPlus /> Categories {dropdownOpen2 ? <IoIosArrowDropup /> : <IoIosArrowDropdown />}
              </button>
              {dropdownOpen2 && (
                <div className="absolute top-[calc(100%+8px)] left-0 w-48 bg-white border border-slate-100 rounded-2xl shadow-xl py-2 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  {categories.map((cat) => (
                    <Link key={cat} to={`/categories/${cat}`} onClick={closeAll} className="block px-4 py-2 hover:bg-blue-50 hover:text-blue-600 text-xs font-bold transition-colors">
                      {cat}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <NavLink to={isActiveToken ? "/profile" : "/login"} className={navItemStyles} onClick={closeAll}>
              {isActiveToken ? <><CgProfile /> Profile</> : <><SiGnuprivacyguard /> Login</>}
            </NavLink>


            <NavLink to="/cart" onClick={closeAll} className="relative p-2.5 ml-2 bg-slate-50 rounded-full hover:bg-blue-600 hover:text-white transition-all">
              <IoCartOutline className="text-xl" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full ring-2 ring-white">
                {cartValue || 0}
              </span>
            </NavLink>
          </div>


          <button
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen(!menuOpen);
            }}
            className="md:hidden p-2 text-2xl text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            {menuOpen ? <IoMdClose /> : <GiHamburgerMenu />}
          </button>
        </div>
      </nav>


      <div
        className={`fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[110] md:hidden transition-all duration-300 ${menuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={closeAll}
      >
        <div
          ref={mobileMenuRef}
          className={`absolute right-0 top-0 h-full w-72 bg-white p-6 shadow-2xl transition-transform duration-300 transform ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
          onClick={(e) => e.stopPropagation()}
        >

          <div className="flex justify-between items-center mb-8">
            <span className="font-black text-xl text-slate-800 tracking-tight">Tech<span className="text-blue-600">Cart</span></span>
            <button onClick={closeAll} className="p-2 hover:bg-slate-100 rounded-full"><IoMdClose className="text-2xl" /></button>
          </div>
          <div className="flex flex-col gap-3 h-full overflow-y-auto pb-20">
            <NavLink to="/products" onClick={closeAll} className={navItemStyles}><LuBoxes /> All Products</NavLink>

            <div className="flex flex-col gap-1">
              <button
                onClick={() => { setDropdownOpen1(!dropdownOpen1); setDropdownOpen2(false); }}
                className={`flex items-center justify-between px-4 py-2 rounded-xl transition-colors font-bold ${dropdownOpen1 ? 'text-blue-600 bg-blue-50' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                <div className="flex items-center gap-2"><TbBrandSafari /> Brands</div>
                {dropdownOpen1 ? <IoIosArrowDropup /> : <IoIosArrowDropdown />}
              </button>
              {dropdownOpen1 && (
                <div className="flex flex-col pl-8 mt-1 space-y-1 animate-in slide-in-from-top-1 duration-200">
                  {brands.map((brand) => (
                    <Link key={brand} to={`/brands/${brand}`} onClick={closeAll} className="py-2 text-slate-500 hover:text-blue-600 text-sm font-semibold transition-colors">
                      {brand}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <button
                onClick={() => { setDropdownOpen2(!dropdownOpen2); setDropdownOpen1(false); }}
                className={`flex items-center justify-between px-4 py-2 rounded-xl transition-colors font-bold ${dropdownOpen2 ? 'text-blue-600 bg-blue-50' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                <div className="flex items-center gap-2"><TbCategoryPlus /> Categories</div>
                {dropdownOpen2 ? <IoIosArrowDropup /> : <IoIosArrowDropdown />}
              </button>
              {dropdownOpen2 && (
                <div className="flex flex-col pl-8 mt-1 space-y-1 animate-in slide-in-from-top-1 duration-200">
                  {categories.map((cat) => (
                    <Link key={cat} to={`/categories/${cat}`} onClick={closeAll} className="py-2 text-slate-500 hover:text-blue-600 text-sm font-semibold transition-colors">
                      {cat}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <NavLink to="/cart" onClick={closeAll} className={navItemStyles}><IoCartOutline /> View Cart</NavLink>
            <hr className="my-2 border-slate-100" />
            <p className="text-[10px] uppercase tracking-widest text-slate-400 font-black px-4">Account Space</p>
            {isActiveToken ? (
              <NavLink to="/profile" onClick={closeAll} className={navItemStyles}><CgProfile /> My Profile</NavLink>
            ) : (
              <NavLink to="/login" onClick={closeAll} className={navItemStyles}><SiGnuprivacyguard /> Login / Join</NavLink>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;