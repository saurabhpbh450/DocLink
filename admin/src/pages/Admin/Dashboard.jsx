import React, { useContext, useEffect } from 'react';
import { assets } from '../../assets/assets';
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext';

const Dashboard = () => {
  const { aToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext);
  const { slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  return dashData ? (
    <div className='m-5 bg-background'>
      <div className='flex flex-wrap gap-4'>
        <div
          className='flex items-center gap-3 bg-surface p-4 min-w-52 rounded-lg border border-primary/20 cursor-pointer hover:bg-primary/10 hover:scale-105 transition-all shadow-md'
          role='button'
          aria-label='Doctors count'
        >
          <img className='w-14' src={assets.doctor_icon} alt='Doctors icon' />
          <div>
            <p className='text-xl font-semibold text-textPrimary'>{dashData.doctors}</p>
            <p className='text-textSecondary'>Doctors</p>
          </div>
        </div>
        <div
          className='flex items-center gap-3 bg-surface p-4 min-w-52 rounded-lg border border-primary/20 cursor-pointer hover:bg-primary/10 hover:scale-105 transition-all shadow-md'
          role='button'
          aria-label='Appointments count'
        >
          <img className='w-14' src={assets.appointments_icon} alt='Appointments icon' />
          <div>
            <p className='text-xl font-semibold text-textPrimary'>{dashData.appointments}</p>
            <p className='text-textSecondary'>Appointments</p>
          </div>
        </div>
        <div
          className='flex items-center gap-3 bg-surface p-4 min-w-52 rounded-lg border border-primary/20 cursor-pointer hover:bg-primary/10 hover:scale-105 transition-all shadow-md'
          role='button'
          aria-label='Patients count'
        >
          <img className='w-14' src={assets.patients_icon} alt='Patients icon' />
          <div>
            <p className='text-xl font-semibold text-textPrimary'>{dashData.patients}</p>
            <p className='text-textSecondary'>Patients</p>
          </div>
        </div>
      </div>

      <div className='bg-surface mt-10 rounded-lg border border-primary/20 shadow-lg'>
        <div className='flex items-center gap-2.5 px-4 py-4 rounded-t border-b border-primary/20'>
          <img src={assets.list_icon} alt='List icon' />
          <p className='font-semibold text-textPrimary'>Latest Bookings</p>
        </div>

        <div className='pt-4' role='table'>
          {dashData.latestAppointments.length === 0 ? (
            <p className='text-textSecondary text-center py-8' role='row'>
              No recent appointments found.
            </p>
          ) : (
            dashData.latestAppointments.slice(0, 5).map((item) => (
              <div
                className='flex items-center px-6 py-3 gap-3 hover:bg-primary/10'
                key={item._id}
                role='row'
              >
                <img
                  className='rounded-full w-10 h-10'
                  src={item.docData.image}
                  alt={`${item.docData.name}'s profile`}
                />
                <div className='flex-1 text-sm'>
                  <p className='text-textPrimary font-medium'>{item.docData.name}</p>
                  <p className='text-textSecondary'>
                    Booking on {slotDateFormat(item.slotDate)}
                  </p>
                </div>
                {item.cancelled ? (
                  <p className='text-error text-xs font-medium'>Cancelled</p>
                ) : item.isCompleted ? (
                  <p className='text-secondary text-xs font-medium'>Completed</p>
                ) : (
                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className='text-error hover:text-error/80 transition'
                    aria-label={`Cancel appointment for ${item.docData.name}`}
                  >
                    <img
                      className='w-8 cursor-pointer'
                      src={assets.cancel_icon}
                      alt='Cancel appointment'
                    />
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  ) : null;
};

export default Dashboard;