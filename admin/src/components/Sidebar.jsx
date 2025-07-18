import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { NavLink } from 'react-router-dom';
import { DoctorContext } from '../context/DoctorContext';
import { AdminContext } from '../context/AdminContext';

const Sidebar = () => {
  const { dToken } = useContext(DoctorContext);
  const { aToken } = useContext(AdminContext);

  const links = aToken
    ? [
        {
          to: '/admin-dashboard',
          icon: assets.home_icon,
          label: 'Dashboard',
          alt: 'Admin Dashboard',
        },
        {
          to: '/all-appointments',
          icon: assets.appointment_icon,
          label: 'Appointments',
          alt: 'All Appointments',
        },
        {
          to: '/add-doctor',
          icon: assets.add_icon,
          label: 'Add Doctor',
          alt: 'Add Doctor',
        },
        {
          to: '/doctor-list',
          icon: assets.people_icon,
          label: 'Doctors List',
          alt: 'Doctors List',
        },
      ]
    : dToken
    ? [
        {
          to: '/doctor-dashboard',
          icon: assets.home_icon,
          label: 'Dashboard',
          alt: 'Doctor Dashboard',
        },
        {
          to: '/doctor-appointments',
          icon: assets.appointment_icon,
          label: 'Appointments',
          alt: 'Doctor Appointments',
        },
        {
          to: '/doctor-profile',
          icon: assets.people_icon,
          label: 'Profile',
          alt: 'Doctor Profile',
        },
      ]
    : [];

  return (
    <aside className='min-h-screen w-64 bg-background border-r border-primary/20 shadow-md'>
      <ul className='mt-8 space-y-1'>
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-3 text-textSecondary hover:bg-surface hover:text-textPrimary transition-colors ${
                isActive ? 'bg-surface text-textPrimary border-l-4 border-primary' : ''
              }`
            }
            aria-label={link.label}
          >
            <img src={link.icon} alt={link.alt} className='h-5 w-5' />
            <span className='font-medium'>{link.label}</span>
          </NavLink>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;