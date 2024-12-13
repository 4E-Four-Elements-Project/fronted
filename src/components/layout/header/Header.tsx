import { useNavigate, useLocation, Link } from "react-router";
import { useEffect, useState } from "react";
import { motion, Variants } from "motion/react";
import cartImg from "/img/shopping-cart.svg";
import cartImgWhite from "/img/shoppingcart-white.svg";
import { HeaderProps } from "../../../types/interface/interface";
import Logut from "../../../pages/logut/Logut";

export default function Header({
  cartCount = 0,
  cart = [],
  className,
}: HeaderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  }, [location]);


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); 
    };
  
    handleResize(); 
  
    window.addEventListener("resize", handleResize);
  
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLinks = () => {
    navigate("/cart", { state: { cart } });
  };

  const badgeVariants: Variants = {
    hidden: { scale: 0 },
    visible: { scale: 1, transition: { duration: 0.3 } },
  };

  const onClickLink: Variants = {
    initial: { strokeDasharray: 120, strokeDashoffset: 120 },
    animate: { strokeDashoffset: 0, transition: { duration: 1 } },
  };

  return (
    <header
      className={` w-full flex items-center justify-between px-5 py-3 ${
        className || "w-full"
      }`}
    >
      {/* Logotyp (vänster) */}
      <h1
        className="font-Londrina text-7xl text-secondary-0 text-shadow-titleBlack font-bold tracking-widest cursor-pointer select-none"
        onClick={() => navigate("/")}
      >
        4E
      </h1>

      {/* Navigation (höger) */}
      <section className="flex items-center justify-center gap-8">
        {/* Logout/Login */}
        {isLoggedIn ? (
          <motion.li
            initial="initial"
            whileHover="animate"
            className="flex flex-col items-center relative"
          >
            <button onClick={Logut} className="text-green-0 md:text-black">
              Logout
            </button>
            <svg width="48" height="5" className="absolute top-6">
              <motion.path
                variants={onClickLink}
                d="M0,2 Q10,0 20,2 T32,2 T50,3"
                fill="none"
                stroke="#C8D6AF"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </motion.li>
        ) : (
          <motion.li
            initial="initial"
            whileHover="animate"
            className="flex flex-col items-center relative"
          >
            <Link to="/login" className="text-green-0 xl:text-black">
              Sign in
            </Link>
            <svg width="48" height="5" className="absolute top-6">
              <motion.path
                variants={onClickLink}
                d="M0,2 Q10,0 20,2 T32,2 T50,3"
                fill="none"
                stroke="#C8D6AF"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </motion.li>
        )}

        {/* Menu */}
        {isLoggedIn && (
          <motion.li
            initial="initial"
            whileHover="animate"
            className="flex flex-col items-center relative"
          >
            <button
              onClick={() => navigate("/menu")}
              className="text-green-0 md:text-black"
            >
              Menu
            </button>
            <svg width="40" height="5" className="absolute top-6">
              <motion.path
                variants={onClickLink}
                d="M0,2 Q20,5 40,2 T80,3 T119,1 T120"
                fill="none"
                stroke="#C8D6AF"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </motion.li>
        )}

        {/* Kundkorg eller Create Account */}
        {isLoggedIn ? (
          <motion.li
            initial="initial"
            whileHover="animate"
            className="flex flex-col items-center relative"
          >
            <div className="relative">
              <img
                src={cartImg}
                alt="cart"
                className="w-10 cursor-pointer"
                onClick={handleLinks}
              />
              {cartCount > 0 && (
                <motion.div
                  className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-black text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center border-white border-2 z-10"
                  variants={badgeVariants}
                  initial="hidden"
                  animate="visible"
                  key={cartCount}
                >
                  {cartCount}
                </motion.div>
              )}
            </div>
          </motion.li>
        ) : (
          <div className="flex justify-between gap-3">
          <motion.li
            initial="initial"
            whileHover="animate"
            className="flex flex-col items-center justify-center relative"
          >
            <Link to="/createAccount" className="text-green-0 xl:text-black">
              Create account
            </Link>
            <svg width="120" height="5" className="absolute top-8">
              <motion.path
                variants={onClickLink}
                d="M0,2 Q20,5 40,2 T80,3 T119,1 T120"
                fill="none"
                stroke="#C8D6AF"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>

          </motion.li>

          <div className="relative">
          <img
          src={isMobile ? cartImgWhite : cartImg} 
          alt="cart"
          className="w-10 cursor-pointer"
          onClick={handleLinks}
        />
              {cartCount > 0 && (
                <motion.div
                  className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-black text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center border-white border-2 z-10"
                  variants={badgeVariants}
                  initial="hidden"
                  animate="visible"
                  key={cartCount}
                >
                  {cartCount}
                </motion.div>
              )}
            </div>
          </div>
        )}
      </section>
    </header>
  );
}
