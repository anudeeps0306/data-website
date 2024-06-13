import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-[#222831] text-[#EEEEEE] p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-xl font-semibold">NEET CUTOFF</Link>
        </div>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="hover:text-[#00ADB5]">Home</Link>
          </li>
          <li>
            <Link to="/about-us" className="hover:text-[#00ADB5]">About Us</Link>
          </li>
          <li>
            <Link to="/contact-us" className="hover:text-[#00ADB5]">Contact Us</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
