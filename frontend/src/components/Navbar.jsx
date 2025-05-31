// frontend/src/components/Navbar.jsx
import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const { token, setToken, userData } = useContext(AppContext);

  const logout = () => {
    localStorage.removeItem('token');
    setToken(false);
    navigate('/login');
  };

  return (
    <div className="sticky top-0 z-50 flex items-center justify-between text-sm py-4 mb-5 border-b border-primary/20 bg-background">
      <NavLink to="/" className="flex items-center">
        <img src={assets.logo} alt="DocLink logo" className="h-10" />
        <span className="ml-2 text-2xl font-bold text-[#D4AF37]">DocLink</span>
      </NavLink>

      <ul className="md:flex items-start gap-5 font-medium hidden">
        <NavLink to="/">
          {({ isActive }) => (
            <>
              <li className={`py-1 ${isActive ? 'text-primary' : 'text-textPrimary'}`}>HOME</li>
              <hr className={`h-0.5 bg-primary w-3/5 m-auto ${isActive ? '' : 'hidden'}`} />
            </>
          )}
        </NavLink>
        <NavLink to="/doctors">
          {({ isActive }) => (
            <>
              <li className={`py-1 ${isActive ? 'text-primary' : 'text-textPrimary'}`}>ALL DOCTORS</li>
              <hr className={`h-0.5 bg-primary w-3/5 m-auto ${isActive ? '' : 'hidden'}`} />
            </>
          )}
        </NavLink>
        <NavLink to="/about">
          {({ isActive }) => (
            <>
              <li className={`py-1 ${isActive ? 'text-primary' : 'text-textPrimary'}`}>ABOUT</li>
              <hr className={`h-0.5 bg-primary w-3/5 m-auto ${isActive ? '' : 'hidden'}`} />
            </>
          )}
        </NavLink>
        <NavLink to="/contact">
          {({ isActive }) => (
            <>
              <li className={`py-1 ${isActive ? 'text-primary' : 'text-textPrimary'}`}>CONTACT</li>
              <hr className={`h-0.5 bg-primary w-3/5 m-auto ${isActive ? '' : 'hidden'}`} />
            </>
          )}
        </NavLink>
      </ul>

      <div className="flex items-center gap-4">
        {token && userData ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img
              className="w-8 rounded-full"
              src={userData.image}
              alt={userData.name ? `${userData.name}'s profile` : 'User profile'}
            />
            <img className="w-2.5" src={assets.dropdown_icon} alt="Dropdown" />

            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-textPrimary z-20 hidden group-hover:block">
              <div className="min-w-48 bg-surface rounded shadow-lg flex flex-col gap-4 p-4">
                <p onClick={() => navigate('/my-profile')} className="hover:text-white cursor-pointer">My Profile</p>
                <p onClick={() => navigate('/my-appointments')} className="hover:text-white cursor-pointer">My Appointments</p>
                <p onClick={logout} className="hover:text-white cursor-pointer">Logout</p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block"
          >
            Create account
          </button>
        )}

        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden"
          src={assets.menu_icon}
          alt="Menu"
        />

        {/* ---- Mobile Menu ---- */}
        <div
          className={`md:hidden ${showMenu ? 'fixed w-full' : 'h-0 w-0'} right-0 top-0 bottom-0 z-50 overflow-hidden bg-background transition-all duration-300`}
        >
          <div className="flex items-center justify-between px-5 py-6">
            <img src={assets.logo} className="w-36" alt="DocLink logo" />
            <img
              onClick={() => setShowMenu(false)}
              src={assets.cross_icon}
              className="w-7"
              alt="Close menu"
            />
          </div>
          <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
            <NavLink
              onClick={() => setShowMenu(false)}
              to="/"
              className={({ isActive }) =>
                `px-4 py-2 rounded-full ${isActive ? 'bg-primary text-white' : 'text-textPrimary'}`
              }
            >
              HOME
            </NavLink>
            <NavLink
              onClick={() => setShowMenu(false)}
              to="/doctors"
              className={({ isActive }) =>
                `px-4 py-2 rounded-full ${isActive ? 'bg-primary text-white' : 'text-textPrimary'}`
              }
            >
              ALL DOCTORS
            </NavLink>
            <NavLink
              onClick={() => setShowMenu(false)}
              to="/about"
              className={({ isActive }) =>
                `px-4 py-2 rounded-full ${isActive ? 'bg-primary text-white' : 'text-textPrimary'}`
              }
            >
              ABOUT
            </NavLink>
            <NavLink
              onClick={() => setShowMenu(false)}
              to="/contact"
              className={({ isActive }) =>
                `px-4 py-2 rounded-full ${isActive ? 'bg-primary text-white' : 'text-textPrimary'}`
              }
            >
              CONTACT
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
