import { useContext, useRef, useState } from "react";
import logo from "./assets/logo.png";
import cart_icon from "./assets/cart_icon.png";
import { Link } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import nav_dropdown from './assets/nav_dropdown.png'

export default function Navbar() {
  const [menu, setMenu] = useState("shop");
  const {getTotalCartItems} = useContext(ShopContext)
  const menuRef = useRef()

  const dropdown_toggle = (e) =>{
    if (menuRef.current) {
      menuRef.current.classList.toggle('hidden');
      e.target.classList.toggle('rotate-90');
    }
  };

  const Forli =
    "flex flex-col items-center justify-center gap-3 cursor-pointer";
  return (
    <div className="flex justify-around p-[16px] shadow-[0_1px_3px_-2px_rgba(0,0,0,0.5)] items-center xl:py-[12px] xl:px-[50px] lg:py-[12px] lg:px-[30px] md:py-[10px] md:px-[0px]">
      <div className="flex items-center gap-10">
        <img className="xl:w-[40px]" src={logo} alt="" />
        <p className="text-[#171717] text-[38px] font-semibold xl:text-[25px]">SHOPPER</p>
      </div>
      <img className="hidden md:block md:w-[30px] md:rotate-[-90deg] md:duration-[0.5s]" onClick={dropdown_toggle} src={nav_dropdown} alt=""/>
      <ul className="flex items-center list-none gap-[50px] text-[#626262] text-[20px] font-medium xl:gap-[30px] xl:text-[16px] lg:gap-[25px] lg:text-[14px] md:hidden md:h-[80px] md:w-[100%] md:absolute md:bg-white md:justify-center md:top-[50px]" ref={menuRef}>
        <li
          onClick={() => {
            setMenu("shop");
          }}
          className={Forli}
        >
          <Link to='/'>Shop</Link>
          {menu === "shop" ? (
            <hr className="border-none w-[80%] h-[3px] rounded-[10px] bg-[#FF4141]" />
          ) : (
            <></>
          )}
        </li>
        <li
          onClick={() => {
            setMenu("mens");
          }}
          className={Forli}
        >
          <Link to='/mens'>Men</Link>{menu === "mens" ? (
            <hr className="border-none w-[80%] h-[3px] rounded-[10px] bg-[#FF4141]" />
          ) : (
            <></>
          )}
        </li>
        <li
          onClick={() => {
            setMenu("womens");
          }}
          className={Forli}
        >
          <Link to='/womens'>Women</Link> {menu === "womens" ? (
            <hr className="border-none w-[80%] h-[3px] rounded-[10px] bg-[#FF4141]" />
          ) : (
            <></>
          )}
        </li>
        <li
          onClick={() => {
            setMenu("kids");
          }}
          className={Forli}
        >
          <Link to='/kids'>Kids</Link> {menu === "kids" ? (
            <hr className="border-none w-[80%] h-[3px] rounded-[10px] bg-[#FF4141]" />
          ) : (
            <></>
          )}
        </li>
      </ul>
      <div className="flex items-center gap-[45px] xl:gap-[30px]">
      <Link to='/login'><button className="w-[157px] h-[58px] outline-none border border-gray-500 rounded-[75px] text-[#515151] text-[20px] font-medium bg-white cursor-pointer active:bg-slate-500 xl:w-[120px] xl:h-[45px] xl:text-[16px] lg:w-[80px] lg:h-[35px] lg:text-[14px]">
          Login
        </button></Link>
        <Link to='/cart'><img className="lg:w-[30px]" src={cart_icon} alt="" /></Link>
        <div className="w-[22px] h-[22px] flex items-center justify-center mt-[-35px] ml-[-55px] rounded-[11px] text-[14px] bg-red-400 text-white xl:ml-[-40px] xl:text-[12px] lg:w-[18px] lg:h-[18px]">
          {getTotalCartItems()}
        </div>
      </div>
    </div>
  );
}
