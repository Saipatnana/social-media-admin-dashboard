import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location  = useLocation().pathname;
  const navgate = useNavigate()

  const onLogout = () => {
    localStorage.clear()
    navgate('/')
  }

  return (
    <div className="flex flex-col w-64 bg-gray-800 min-h-screen p-4 justify-between">
      <ul className={`flex-col space-y-3`}>
        <li className={`${location==='/dash'?'bg-black':''} rounded-md pt-2 pb-2 pl-2`}><Link className="text-white hover:text-gray-300" to="/dash">Home</Link></li>
        <li className={`${location==='/dash/users'?'bg-black':''} rounded-md pt-2 pb-2 pl-2`}><Link className="text-white hover:text-gray-300" to="./users">Users Listing</Link></li>
        <li className={`${location==='/dash/posts'?'bg-black':''} rounded-md pt-2 pb-2 pl-2`}><Link className="text-white hover:text-gray-300" to="./posts">Posts Listing</Link></li>
      </ul>
      <button className='text-black font-semibold pt-2 pb-2 text-lg bg-white rounded-md' onClick={onLogout}>Logout</button>
    </div>
  );
};

export default Navbar;
