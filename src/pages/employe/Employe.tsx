import Logo from "../../components/ui/4eLogo/Logo";
import ActiveOrders from "./components/ActiveOrders";
import Overview from "./components/Overview";
import { useEffect, useState } from "react";

export default function Employe() {
  const [currentStaff, setCurrentStaff] = useState<boolean>(true);
  useEffect(() => {
    if (location.pathname === "/chef") {
      setCurrentStaff(!currentStaff);
    }
  }, [location]);

  return (
    <main className="bg-primary-0 w-full min-h-screen overflow-hidden flex flex-col items-center pt-24">
      <Logo link="/employe" />
      <Overview />
      {currentStaff ? (
        // staff (?)
        <section className="w-1/2 h-auto flex flex-col items-center justify-between mt-11">
          <ActiveOrders />
        </section>
      ) : (
        // Chef
        <section></section>
      )}
    </main>
  );
}
