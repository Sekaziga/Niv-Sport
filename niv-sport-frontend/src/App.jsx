import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import News from './pages/News';
import Events from './pages/Events';
import Media from './pages/Media';
import Contact from './pages/Contact';
import Players from './pages/Players';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';

// Admin Pages
import AdminDashboard from './pages/Admin/AdminDashboard';
import ManageNews from './pages/Admin/ManageNews';
import ManageEvents from './pages/Admin/ManageEvents';
import ManageMedia from './pages/Admin/ManageMedia';
import AdminLogin from './pages/Admin/AdminLogin';
import AdminRegister from './pages/Admin/adminRegister';
import PlayerManager from './pages/Admin/PlayerManager';

export default function App() {
  return (
    <Router>
      <Navbar />
      <main className="min-h-screen p-4">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/news" element={<News />} />
          <Route path="/events" element={<Events />} />
          <Route path="/media" element={<Media />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/register" element={<AdminRegister />} />
          <Route path="/admin/players" element={<PlayerManager />} />
          <Route path="/players" element={<Players />} />


          {/* Protected Admin Routes */}
          <Route path="/admin" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
          <Route path="/admin/news" element={<PrivateRoute><ManageNews /></PrivateRoute>} />
          <Route path="/admin/events" element={<PrivateRoute><ManageEvents /></PrivateRoute>} />
          <Route path="/admin/media" element={<PrivateRoute><ManageMedia /></PrivateRoute>} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}
