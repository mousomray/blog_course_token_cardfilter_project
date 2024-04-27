import React from 'react';
import { Link } from "react-router-dom";
import { useAuth } from '../Context/AuthContext';
import { toast } from 'react-toastify';

const Nav = () => {

  const [auth, setAuth] = useAuth(); // Create custom hook

  // Make handle for Logout 
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: ''
    });
    localStorage.removeItem('auth');
    toast.success('Successfully Logged out');
  };

  return (
    <nav style={{ backgroundColor: '#FFFFF7', height: '100px' }} className="navbar navbar-expand-lg navbar-light fixed-top">
      <div className="container">
        <Link style={{ color: '#fff' }} className="navbar-brand" to="/">
          <img src="./assets/img/favicon.png" alt="Logo" style={{ height: '50px' }} />
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown" style={{ backgroundColor: 'white' }}>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item" style={{marginRight:'30px'}}>
              <Link style={{ color: 'black' }} className="nav-link" to="/"><img src="./assets/img/home.png" alt="Home" style={{ height: '30px' }} /></Link>
            </li>
            <li className="nav-item" style={{marginRight:'30px'}}>
              <Link style={{ color: 'black' }} className="nav-link" to="/blog"><img src="./assets/img/blog.png" alt="Blog" style={{ height: '30px' }} /></Link>
            </li>
            <li className="nav-item" style={{marginRight:'30px'}}>
              <Link style={{ color: 'black' }} className="nav-link" to="/course"><img src="./assets/img/course.png" alt="Course" style={{ height: '30px' }} /></Link>
            </li>
            <li className="nav-item" style={{marginRight:'30px'}}>
              <Link style={{ color: 'black' }} className="nav-link" to="/contact"><img src="./assets/img/contact.png" alt="Contact" style={{ height: '30px' }} /></Link>
            </li>

            {!auth.user ? (
              <li className="nav-item">
                <Link style={{ color: 'black' }} className="nav-link" to="/login"><img src="./assets/img/login.png" alt="Login" style={{ height: '30px' }} /></Link>
              </li>
            ) : (
              <li className="nav-item dropdown">
                <a style={{ color: 'black' }} className="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-expanded="false">
                <img src="./assets/img/user.png" alt="Contact" style={{ height: '30px' }} />
                </a>
                <div className="dropdown-menu" style={{ backgroundColor: 'white' }}>
                  <Link style={{ color: '#000' }} className="dropdown-item" to="/dashboard">Dashboard</Link>
                  <Link style={{ color: '#000' }} className="dropdown-item" to="/updatepassword">Update Password</Link>
                  <Link onClick={handleLogout} style={{ color: '#000' }} className="dropdown-item" to="/login">Logout</Link>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
