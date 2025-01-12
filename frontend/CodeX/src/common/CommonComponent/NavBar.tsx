// import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const NavBar = () => {
  // @ts-ignore
  const user=useSelector((state)=>state.auth.UserData);
  // const token=useSelector((state)=>state.auth.token);

  const LogoutHandler=()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("UserData");
    window.location.reload();
  }
  return (
    <div className="bg-[#100518] text-white w-full p-4">
      <div className="flex items-center justify-evenly">
        {/* Logo or Brand Name */}
        <div className="text-2xl font-bold flex -translate-x-36">
          <h2 className="text-3xl text-blue-200 font-semibold">Code</h2><h2 className='text-4xl text-green-300 font-semibold'>X</h2>
        </div>
        
        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <Link to="/home" className="hover:text-gray-400 transition duration-300">Home</Link>
          <Link to="/about" className="hover:text-gray-400 transition duration-300">About</Link>
          <Link to="/services" className="hover:text-gray-400 transition duration-300">Services</Link>
          <Link to="/contact" className="hover:text-gray-400 transition duration-300">Contact</Link>
        </div>

        {/* Login and Sign Up Buttons for Desktop */}
        <div className="hidden md:flex space-x-6">
          {
            user?(
              <div className="hidden md:flex space-x-6">
              <Link to="/chat" className="bg-black border border-slate-800 px-6 py-2 rounded text-white hover:text-black hover:bg-white transition duration-300">Start Chat</Link>
              <button onClick={LogoutHandler} className="bg-black border border-slate-800 px-6 py-2 rounded text-white hover:text-black hover:bg-white transition duration-300">Logout</button>
              
              </div>
            ):(
              <div className="hidden md:flex space-x-6">
              <Link to="/login" className="bg-black border border-slate-800 px-6 py-2 rounded text-white hover:text-black hover:bg-white transition duration-300">Login</Link>
              <Link to="/signIn" className="bg-black border border-slate-800 px-6 py-2 rounded text-white hover:text-black hover:bg-white transition duration-300">Sign Up</Link>
              </div>
            )
          } 
        </div>

        {/* Mobile Menu Button (Hamburger) */}
        <div className="md:hidden flex items-center space-x-4">
          <button className="text-xl text-white hover:text-gray-400">☰</button>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
