const Navbar = () => {
  return (
    <nav className="bg-[#222831] text-[#EEEEEE] p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center">
                    <span className="text-xl font-semibold">Cutoff</span>
                </div>
                <ul className="flex space-x-4">
                    <li>
                        <a href="#" className="hover:text-[#00ADB5]">Home</a>
                    </li>
                    <li>
                        <a href="#" className="hover:text-[#00ADB5]">About Us</a>
                    </li>
                    <li>
                        <a href="#" className="hover:text-[#00ADB5]">Contact Us</a>
                    </li>
                </ul>
            </div>
        </nav>
  );
};

export default Navbar;
