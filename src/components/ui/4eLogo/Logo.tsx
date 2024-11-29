import { useNavigate } from "react-router";
import { HeaderProps } from "../../../types/interface/interface";

export default function Logo({ link }: HeaderProps) {
  let navigate = useNavigate();

  return (
    <h1
      className="font-Londrina text-7xl text-secondary-0 text-shadow-titleBlack font-bold tracking-widest cursor-pointer select-none absolute top-2 left-5"
      onClick={() => {
        navigate(link || "/");
      }}
    >
      4E
    </h1>
  );
}
