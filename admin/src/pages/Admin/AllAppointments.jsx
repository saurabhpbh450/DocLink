import React, { useEffect } from 'react';
import { assets } from '../../assets/assets';
import { useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext';

const AllAppointments = () => {
  const { aToken, appointments, cancelAppointment, getAllAppointments } = useContext(AdminContext);
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  return (
    <div className='w-full max-w-6xl m-5 bg-background'>
      <p className='mb-3 text-lg font-medium text-textPrimary'>All Appointments</p>

      <div
        className='bg-surface border border-primary/20 rounded-lg text-sm max-h-[80vh] overflow-y-auto shadow-lg'
        role='table'
      >
        <div
          className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] py-3 px-6 border-b border-primary/20 text-textSecondary'
          role='row'
        >
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {appointments.length === 0 ? (
          <p className='text-textSecondary text-center py-8' role='row'>
            No appointments found.
          </p>
        ) : (
          appointments.map((item, index) => (
            <div
              className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-textSecondary py-3 px-6 border-b border-primary/20 hover:bg-primary/10'
              key={item._id}
              role='row'
            >
              <p className='max-sm:hidden'>{index + 1}</p>
              <div className='flex items-center gap-2'>
                <img
                  src={item.userData.image}
                  className='w-8 h-8 rounded-full'
                  alt={`${item.userData.name}'s profile`}
                />
                <p>{item.userData.name}</p>
              </div>
              <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
              <p>
                {slotDateFormat(item.slotDate)}, {item.slotTime}
              </p>
              <div className='flex items-center gap-2'>
                <img
                  src={item.docData.image}
                  className='w-8 h-8 rounded-full bg-surface'
                  alt={`${item.docData.name}'s profile`}
                />
                <p>{item.docData.name}</p>
              </div>
              <p>
                {currency}
                {item.amount}
              </p>
              {item.cancelled ? (
                <p className='text-error text-xs font-medium'>Cancelled</p>
              ) : item.isCompleted ? (
                <p className='text-secondary text-xs font-medium'>Completed</p>
              ) : (
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className='text-error hover:text-error/80 transition'
                  aria-label={`Cancel appointment for ${item.userData.name}`}
                >
                  <img src={assets.cancel_icon} className='w-8 cursor-pointer' alt='Cancel appointment' />
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AllAppointments;