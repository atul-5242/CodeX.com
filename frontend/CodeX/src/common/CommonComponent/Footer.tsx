// import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="w-full absolute translate-y-72 z-[200]">
      <div className="bg-transparent absolute w-full h-[5rem]  text-white flex items-center justify-between px-12">
      <div className="flex flex-row items-center space-x-0">
        <h2 className="text-3xl text-blue-200 font-semibold">Code</h2><h2 className='text-4xl text-green-300 font-semibold'>X</h2>
      </div>
      <div className="flex space-x-6">
        <Link to="/facebook" className="text-lg hover:text-gray-400 transition duration-300">Facebook</Link>
        <Link to="/twitter" className="text-lg hover:text-gray-400 transition duration-300">Twitter</Link>
        <Link to="/instagram" className="text-lg hover:text-gray-400 transition duration-300">Instagram</Link>
      </div>
      </div>
      
    </div>
  );
}

export default Footer;
