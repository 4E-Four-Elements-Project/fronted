import letter_open from '../../../assets/img/letter-open.svg';
import letter_open_white from '../../../assets/img/letter-open-white.svg';
import letter_closed from '../../../assets/img/letter-closed.svg';
import letter_closed_white from '../../../assets/img/letter-closed-white.svg';
import phone_black from '../../../assets/img/phone.svg';
import phone_white from '../../../assets/img/phone-white.svg';
import { useEffect, useState } from "react";


const Contact = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [borderColor, setBorderColor] = useState<string>("black");

  useEffect(() => {
    const handleResize = () => {
      const isMobileView = window.innerWidth <= 768;
      setIsMobile(isMobileView);
      setBorderColor(isMobileView ? "white" : "black");
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (

    <div className="flex flex-col gap-1 text-md text-gray-600 border-b-2 border-l-2 border-black p-5 absolute w-300 left-10 bottom-10 pl-2 pb-2"
      style={{ borderColor: borderColor }}
    >

        <a href="" className="flex m-1 text-white md:text-black">
          <img 
            src={isMobile ? letter_open_white : letter_open} 
            className="mr-3 w-[24px] h-[24px]"
          />
          4E-gatan 23, 123 45
        </a>

        <a href="" className="flex m-1 text-white md:text-black"> 
          <img
            src={isMobile ? phone_white : phone_black} 
            alt="phone"
            className="mr-3 pl-0 w-[24px] h-[24px]"
          />  
            0102301231
        </a>

        <a href="" className="flex m-1 text-white md:text-black">
          <img
            src={isMobile ? letter_closed_white : letter_closed} 
            alt="phone"
            className="mr-3 pl-0 w-[24px] h-[24px]"
          /> 
          4elements@food.com
        </a>
    </div>

  );
}

export default Contact;