
import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface MenuButtonProps {
    children: ReactNode;
    className?: string;
    to?: string; // Gör "to" valfritt
    type?: "button" | "submit" | "reset"; // Begränsa till giltiga värden
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>;
}

const MenuButton = ({ children, className = "", to, type = "button", onClick }: MenuButtonProps) => {
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (type !== "submit" && onClick) {
            event.preventDefault();
            onClick(event);
        }
    };

    if (to) {
        return (
            <Link to={to}>
                <button
                    type={type}
                    onClick={handleClick}
                    className={`relative block w-full px-4 py-2 text-lg text-green-600 border border-solid border-black rounded bg-white before:absolute before:content-[''] before:top-1/4 before:left-0 before:ml-2 before:w-[calc(100%)] before:h-10 before:bg-secondary before:rounded before:border before:border-black before:-z-10 before:transition-transform before:duration-300 hover:before:translate-x-[-8px] hover:before:translate-y-[-7px] ${className}`}
                >
                    {children}
                </button>
            </Link>
        );
    }

    return (
        <button
            type={type}
            onClick={handleClick}
            className={`relative block w-full px-4 py-2 text-lg text-green-600 border border-solid border-black rounded bg-white ${className}`}
        >
            {children}
        </button>
    );
};

export default MenuButton;

// import { ReactNode } from "react";
// import { Link } from "react-router";

// interface MenuButtonProps {
//   children: ReactNode;
//   className?: string;
//   to: string;
// }

// const menuButton = ({ children, className = "", to }: MenuButtonProps) => {
//   return (
//     <Link to={to}>
//       <button
//         className={`relative block w-full px-4 py-2 text-lg text-green-600 border border-solid border-black rounded bg-white before:absolute before:content-[''] before:top-1/4 before:left-0 before:ml-2 before:w-[calc(100%)] before:h-10 before:bg-secondary before:rounded before:border before:border-black before:-z-10 before:transition-transform before:duration-300 hover:before:translate-x-[-8px] hover:before:translate-y-[-7px] ${className}`}
//       >
//         {children}
//       </button>
//     </Link>
//   );
// };

// export default menuButton;
