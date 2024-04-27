import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Home from '../src/Pages/Home'
import Login from '../src/Pages/Login'
import Register from './Pages/Register';
import { Navigate } from 'react-router-dom';
import Blog from './Pages/Blog';
import Blogdetails from './Pages/Blogdetails';
import Updatepassword from './Pages/Updatepassword';
import Dashboard from './Pages/Dashboard'
import Contact from './Pages/Contact';
import Course from './Pages/Course';


const App = () => {

  // Create Function for private routing
  function PrivateRoute({ children }) {
    const token = localStorage.getItem("auth") || sessionStorage.getItem("auth");
    return token !== null && token !== undefined ? (
      children
    ) : (
      <Navigate to="/login" />
    );
  }

  const public_routing = [
    {
      path: '/',
      component: <Home />
    },
    {
      path: '/login',
      component: <Login />
    },
    {
      path: '/register',
      component: <Register />
    }
  ]

  const private_routing = [
    {
      path: '/blog',
      component: <Blog />
    },
    {
      path: '/blogdetails/:id',
      component: <Blogdetails />
    },
    {
      path: '/updatepassword',
      component: <Updatepassword />
    },
    {
      path: '/dashboard',
      component: <Dashboard />
    },
    {
      path: '/contact',
      component: <Contact/>
    },
    {
      path: '/course',
      component: <Course/>
    }
  ]

  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          {/*Public Routing Area*/}
          {public_routing?.map((routing) => {
            return (
              <>
                <Route path={routing?.path} element={routing?.component} />
              </>
            )
          })}

          {/*Private Routing Area*/}
          {private_routing?.map((routing) => {
            return (
              <>
                <Route path={routing.path} element={<PrivateRoute>{routing?.component}</PrivateRoute>} />
              </>
            )
          })}
        </Routes>
      </Router>
    </>
  )
}

export default App
