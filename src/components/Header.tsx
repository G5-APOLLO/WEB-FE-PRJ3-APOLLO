import { useState } from 'react';
import { FaUsers, FaChartLine, FaClipboardList, FaTachometerAlt, FaBars } from 'react-icons/fa';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="bg-gradient-to-r from-gray-800 to-gray-600 text-white shadow-lg border-b border-gray-700">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">

          <div className="flex items-center lg:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 focus:outline-none">
              <FaBars className="text-2xl" />
            </button>
          </div>

          <nav className="hidden lg:flex lg:space-x-14 lg:text-sm lg:font-semibold lg:text-xl lg:items-center">
            <a href="#clientes" className="flex items-center hover:text-gray-300 transition duration-200 ease-in-out">
              <FaUsers className="mr-2" /> Clients
            </a>
            <a href="#oportunidades" className="flex items-center hover:text-gray-300 transition duration-200 ease-in-out">
              <FaChartLine className="mr-2" /> Opportunities
            </a>
            <a href="#seguimiento" className="flex items-center hover:text-gray-300 transition duration-200 ease-in-out">
              <FaClipboardList className="mr-2" /> Tracking
            </a>
            <a href="#dashboard" className="flex items-center hover:text-gray-300 transition duration-200 ease-in-out">
              <FaTachometerAlt className="mr-2" /> Dashboard
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <span className="text-gray-300 text-xl hidden lg:block">Admin</span>
            <img
              src="/assets/user-svgrepo-com.svg"
              alt="User Avatar"
              className="w-10 h-10 rounded-full border-2 border-gray-400"
            />
          </div>
        </div>
      </header>

      {isOpen && (
        <div className="lg:hidden bg-gray-700 text-white py-4 space-y-4 px-6">
          <a href="#clientes" className="block flex items-center hover:text-gray-300 transition duration-200 ease-in-out">
            <FaUsers className="mr-2" /> Clients
          </a>
          <a href="#oportunidades" className="block flex items-center hover:text-gray-300 transition duration-200 ease-in-out">
            <FaChartLine className="mr-2" /> Opportunities
          </a>
          <a href="#seguimiento" className="block flex items-center hover:text-gray-300 transition duration-200 ease-in-out">
            <FaClipboardList className="mr-2" /> Tracking
          </a>
          <a href="#dashboard" className="block flex items-center hover:text-gray-300 transition duration-200 ease-in-out">
            <FaTachometerAlt className="mr-2" /> Dashboard
          </a>
        </div>
      )}
    </>
  );
};

export default Header;