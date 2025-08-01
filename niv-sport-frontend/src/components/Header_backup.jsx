// src/components/Navbar.jsx
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">NIV Sport</Link>
        <nav className="hidden md:flex gap-6 text-gray-700 font-medium">
          <Link to="/" className="hover:text-blue-500">Home</Link>
          <Link to="/about" className="hover:text-blue-500">About</Link>
          <Link to="/news" className="hover:text-blue-500">News</Link>
          <Link to="/events" className="hover:text-blue-500">Events</Link>
          <Link to="/media" className="hover:text-blue-500">Media</Link>
          <Link to="/contact" className="hover:text-blue-500">Contact</Link>
          <Link to="/players" className="hover:text-blue-500">Players</Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
