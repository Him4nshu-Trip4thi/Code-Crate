import React from "react";
import { Link, useNavigate } from "react-router-dom";
import api from '../api';
import { useAuth } from '../authContext';
import "./navbar.css";

const Navbar = () => {
  const { setCurrentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post('/logout');
    } catch (e) {
      // ignore
    }
    localStorage.removeItem('userId');
    setCurrentUser(null);
    navigate('/');
  };

  return (
    <nav className="site-nav">
      <Link to="/app" className="brand">
        <img
          src="https://www.github.com/images/modules/logos_page/GitHub-Mark.png"
          alt="Logo"
        />
        <span>Code Crate</span>
      </Link>
      <div className="nav-actions">
        <Link to="/app">Dashboard</Link>
        <Link to="/create">Create</Link>
        <Link to="/profile">Profile</Link>
        <button onClick={handleLogout} className="logout">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
