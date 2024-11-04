import { FaUsers, FaChartLine, FaClipboardList, FaTachometerAlt } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-gray-800 to-gray-600 text-white shadow-lg border-b border-gray-700">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        

        <nav className="flex space-x-14 text-sm font-semibold text-xl">
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


        <div className="flex items-center space-x-4 ">
          <span className="text-gray-300 text-xl">Admin</span>
          <img
            src="/public/assets/user-svgrepo-com.svg" 
            alt="User Avatar"
            className="w-10 h-10 rounded-full border-2 border-gray-400"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
