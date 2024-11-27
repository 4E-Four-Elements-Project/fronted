const Contact = () => {

  return (

    <div className="flex flex-col gap-1 text-md text-gray-600 border-b-2 border-l-2 border-black p-5 absolute w-300 left-10 bottom-10 pl-2 pb-2">

        <a href="" className="flex m-1 text-white md:text-black">
          <img 
            src="./src/assets/img/letter-open.svg"
            className="mr-3 w-[24px] h-[24px]"
          />
          4E-gatan 23, 123 45
        </a>

        <a href="" className="flex m-1 text-white md:text-black"> 
          <img
            src="./src/assets/img/phone.svg"
            alt="phone"
            className="mr-3 pl-0 w-[24px] h-[24px]"
          />  
            0102301231
        </a>

        <a href="" className="flex m-1 text-white md:text-black">
          <img
            src="./src/assets/img/letter-closed.svg"
            alt="phone"
            className="mr-3 pl-0 w-[24px] h-[24px]"
          /> 
          4elements@food.com
        </a>
    </div>

  );
}

export default Contact;