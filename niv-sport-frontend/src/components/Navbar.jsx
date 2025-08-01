import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth'; // adjust path if needed

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-black text-white p-4">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo-niv.jpeg" alt="Niv Sport Logo" className="h-10 w-auto" />
          <span className="text-xl font-bold">Niv Sport</span>
        </Link>

        {/* Hamburger Button - mobile only */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-white text-2xl focus:outline-none"
        >
          ☰
        </button>

        {/* Links (desktop) */}
        <ul className="hidden md:flex gap-6 items-center">
          {!isAuthenticated ? (
            <>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/news">News</Link></li>
              <li><Link to="/events">Events</Link></li>
              <li><Link to="/media">Media</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/players">Players</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/admin">Dashboard</Link></li>
              <li><Link to="/admin/events">Manage Events</Link></li>
              <li><Link to="/admin/media">Manage Media</Link></li>
              <li><Link to="/admin/news">Manage News</Link></li>
              <li><Link to="/admin/players">Manage Players</Link></li>
              <li>
                <button onClick={handleLogout} className="text-red-400 hover:text-red-200">
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Links (mobile menu) */}
      {isOpen && (
        <ul className="md:hidden mt-4 flex flex-col gap-4 bg-gray-900 p-4 rounded">
          {!isAuthenticated ? (
            <>
              <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
              <li><Link to="/about" onClick={() => setIsOpen(false)}>About</Link></li>
              <li><Link to="/news" onClick={() => setIsOpen(false)}>News</Link></li>
              <li><Link to="/events" onClick={() => setIsOpen(false)}>Events</Link></li>
              <li><Link to="/media" onClick={() => setIsOpen(false)}>Media</Link></li>
              <li><Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link></li>
              <li><Link to="/players" onClick={() => setIsOpen(false)}>Players</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/admin" onClick={() => setIsOpen(false)}>Dashboard</Link></li>
              <li><Link to="/admin/events" onClick={() => setIsOpen(false)}>Manage Events</Link></li>
              <li><Link to="/admin/media" onClick={() => setIsOpen(false)}>Manage Media</Link></li>
              <li><Link to="/admin/news" onClick={() => setIsOpen(false)}>Manage News</Link></li>
              <li><Link to="/admin/players" onClick={() => setIsOpen(false)}>Manage Players</Link></li>
              <li>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="text-red-400 hover:text-red-200"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
