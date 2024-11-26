import { useNavigate, useLocation, Link } from "react-router";
import cartImg from "../../../assets/img/shopping-cart.svg";
import { HeaderProps } from "../../../types/interface/interface";
import { useEffect, useState } from "react";
import { motion, Variants } from "motion/react";

export default function Header({ link }: HeaderProps) {
  const [menu, setMenu] = useState<boolean>(false);
  const [logIn, setLogIn] = useState<boolean>(false);
  const [createAccount, setCreateAccount] = useState<boolean>(false);
  let navigate = useNavigate();
  const location = useLocation();

  console.log(location);

  useEffect((): void => {
    if (location.pathname === "/menu") {
      setMenu(true);
    }

    if (location.pathname === "/logIn") {
      setLogIn(true);
    }

    if (location.pathname === "/createAccount") {
      setCreateAccount(true);
    }
  }, [location]);

  const handleLinks = (): void => {
    if (link) {
      navigate(link);
    } else {
      navigate("/error");
    }
  };

  const onClickLinkCreateUser: Variants = {
    initial: {
      strokeDasharray: 120,
      strokeDashoffset: 120,
    },
    animate: {
      strokeDashoffset: 0,
      transition: { duration: 1 },
    },
  };

  const onClickLinkSignIn: Variants = {
    initial: {
      strokeDasharray: 50,
      strokeDashoffset: 50,
    },
    animate: {
      strokeDashoffset: 0,
      transition: { duration: 1 },
    },
  };

  return (
    <header className="w-full flex items-end justify-between px-10 py-2">
      <h1
        className="font-Londrina text-7xl text-secondary-0 text-shadow-titleBlack font-bold tracking-widest cursor-pointer"
        onClick={() => {
          navigate("/");
        }}
      >
        4E
      </h1>

      <section className="">
        {menu ? (
          <img
            src={cartImg}
            alt="cart"
            className="w-10 cursor-pointer"
            onClick={handleLinks}
          />
        ) : logIn ? (
          <h1>login</h1>
        ) : createAccount ? (
          <h1>Create</h1>
        ) : (
          <ul className="flex flex-col items-center justify-between h-16 sm:flex-row sm:w-56 text-lg font-Roboto font-regular">
            <motion.li
              initial="initial"
              whileHover="animate"
              className="flex flex-col items-center"
            >
              <Link to={"/login"}>Sign in</Link>
              <svg width="48" height="5">
                <motion.path
                  variants={onClickLinkSignIn}
                  d="M0,2 Q10,0 20,2 T32,2 T50,3"
                  fill="none"
                  stroke="#B8F9AD"
                  strokeWidth="2"
                  stroke-linecap="round"
                />
              </svg>
            </motion.li>
            <motion.li
              initial="initial"
              whileHover="animate"
              className="flex flex-col items-center"
            >
              <Link to={"/createAccount"}>Create account</Link>
              <svg width="120" height="5">
                <motion.path
                  d="M0,2 Q20,5 40,2 T80,3 T119,1 T120"
                  fill="none"
                  stroke="#B8F9AD"
                  stroke-width="2"
                  stroke-linecap="round"
                  variants={onClickLinkCreateUser}
                />
              </svg>
            </motion.li>
          </ul>
        )}
      </section>
    </header>
  );
}
