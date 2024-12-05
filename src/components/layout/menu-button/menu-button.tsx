import { ReactNode } from "react";
import { Link } from "react-router";

interface MenuButtonProps {
  children: ReactNode;
  className?: string;
  to: string;
}

const menuButton = ({ children, className = "", to }: MenuButtonProps) => {
  return (
    <Link to={to}>
      <button
        className={`relative block w-full px-4 py-2 text-lg text-green-600 border border-solid border-black rounded bg-white before:absolute before:content-[''] before:top-1/4 before:left-0 before:ml-2 before:w-[calc(100%)] before:h-10 before:bg-secondary before:rounded before:border before:border-black before:-z-10 before:transition-transform before:duration-300 hover:before:translate-x-[-8px] hover:before:translate-y-[-7px] ${className}`}
      >
        {children}
      </button>
    </Link>
  );
};

export default menuButton;
