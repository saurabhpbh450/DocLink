import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { DoctorContext } from '../context/DoctorContext';
import { AdminContext } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { dToken, setDToken } = useContext(DoctorContext);
  const { aToken, setAToken } = useContext(AdminContext);

  const navigate = useNavigate();

  const logout = () => {
    if (dToken) {
      setDToken('');
      localStorage.removeItem('dToken');
    }
    if (aToken) {
      setAToken('');
      localStorage.removeItem('aToken');
    }
    navigate('/');
  };

  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-4 border-b border-primary/20 bg-background shadow-md'>
      <div className='flex items-center gap-3'>
        <img
          onClick={() => navigate('/')}
          className='h-10 cursor-pointer hover:opacity-90 transition'
          src={assets.admin_logo}
          alt='DocLink Admin Logo'
          aria-label='Navigate to home'
        />
        <p className='bg-accent px-3 py-1 rounded-full text-textPrimary text-xs font-medium'>
          {aToken ? 'Admin' : 'Doctor'}
        </p>
      </div>
      <button
        onClick={logout}
        className='bg-primary text-textPrimary text-sm px-8 py-2 rounded-full hover:bg-primary/80 transition'
        aria-label='Log out'
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;