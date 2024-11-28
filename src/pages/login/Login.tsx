import Contact from "../../components/layout/contact/contact";
import MenuButton from "../../components/layout/menu-button/menu-button";

const Login = () => {
  return (
    <div className="min-h-screen relative">
      {/* Video */}
      <figure className="absolute right-0 h-sm mw-auto hidden md:block">
        <video
          src="./src/assets/video/landing-video.mp4"
          className="rounded shadow-lg h-full w-[600px] object-cover"
          autoPlay
          muted
          loop
        />
      </figure>

      {/* Mobilbakgrund för videon */}
      <video
        src="./src/assets/video/landing-video.mp4"
        className="absolute top-0 left-0 w-full h-full object-cover -z-10 md:hidden"
        autoPlay
        muted
        loop
      />

      {/* Login-formulär */}
      <div className="w-full md:w-[50vw] h-screen flex items-center justify-center">
        <form
          className="max-w-md p-6 flex flex-col justify-center z-0 md:shadow-none rounded"
          method="POST"
          action="/login"
        >
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="example@email.com"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="••••••••"
              required
            />
            <button className="relative mt-2">
              <a href="/forgot-password" className="text-sm text-blue-500 hover:text-blue-700">
                Forgot password?
              </a>
              <img
                src="./src/assets/img/sallad.svg"
                alt="Logo"
                className="w-15 h-15 mt-4 rotate-12 absolute"
              />
            </button>
          </div>
          <MenuButton className="before:bg-pink mt-5">Login</MenuButton>
        </form>
      </div>

      {/* Kontaktsektion */}
      <Contact />
    </div>
  );
};

export default Login;


// import Contact from "../../components/layout/contact/contact";
// import MenuButton from "../../components/layout/menu-button/menu-button";

// const Login = () => {

//     return(
//         <div className="min-h-screen" >
//             <figure className="absolute right-0 h-sm mw-auto">
//               <video
//                 src="./src/assets/video/landing-video.mp4"
//                 className="rounded shadow-lg h-full w-[600px] object-cover"
//                 autoPlay
//                 muted
//                 loop
//               />
//             </figure>

//             <div className="w-[50vw] h-screen flex align-center justify-center">
//                 <form
//                     className="max-w-md p-6 flex flex-col justify-center z-0"
//                     method="POST"
//                     action="/login"
//                     >
//                     <div className="mb-4">
//                         <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                         Email
//                         </label>
//                         <input
//                         type="email"
//                         id="email"
//                         name="email"
//                         className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                         placeholder="example@email.com"
//                         required
//                         />
//                     </div>

//                     <div className="mb-4">
//                         <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                         Password
//                         </label>
//                         <input
//                         type="password"
//                         id="password"
//                         name="password"
//                         className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                         placeholder="••••••••"
//                         required
//                         />

//                         <button className="">
//                             <a href="/forgot-password" className="text-sm text-blue-500 hover:text-blue-700">
//                                 Forgot password?
//                             </a>
//                         <img
//                             src="./src/assets/img/sallad.svg"
//                             alt="Logo"
//                             className="w-15 h-15 mt-4 rotate-12 absolute "
//                         />
//                         </button>
//                     </div>
//                     <MenuButton className="before:bg-pink mt-5">Login</MenuButton>

//                 </form>
//             </div>
//             <Contact />
//         </div>
//     )
// }

// export default Login;