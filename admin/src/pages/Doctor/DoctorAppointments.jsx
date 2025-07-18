import React, { useContext, useEffect } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

const DoctorAppointments = () => {
  const { dToken, appointments, getAppointments, cancelAppointment, completeAppointment } = useContext(DoctorContext);
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  return (
    <div className='w-full max-w-6xl m-5 bg-background'>
      <p className='mb-3 text-lg font-medium text-textPrimary'>All Appointments</p>

      <div
        className='bg-surface border border-primary/20 rounded-lg text-sm max-h-[80vh] overflow-y-auto shadow-lg'
        role='table'
      >
        <div
          className='hidden sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-2 py-3 px-6 border-b border-primary/20 text-textSecondary'
          role='row'
        >
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
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
              className='flex flex-wrap justify-between max-sm:gap-4 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-2 items-center text-textSecondary py-3 px-6 border-b border-primary/20 hover:bg-primary/10'
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
              <div>
                <p className='text-xs inline border border-primary/20 bg-primary/10 text-primary px-2 rounded-full'>
                  {item.payment ? 'Online' : 'CASH'}
                </p>
              </div>
              <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
              <p>
                {slotDateFormat(item.slotDate)}, {item.slotTime}
              </p>
              <p>
                {currency}
                {item.amount}
              </p>
              {item.cancelled ? (
                <p className='text-error text-xs font-medium'>Cancelled</p>
              ) : item.isCompleted ? (
                <p className='text-secondary text-xs font-medium'>Completed</p>
              ) : (
                <div className='flex gap-2'>
                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className='text-error hover:text-error/80 transition'
                    aria-label={`Cancel appointment for ${item.userData.name}`}
                  >
                    <img
                      src={assets.cancel_icon}
                      className='w-8 cursor-pointer'
                      alt='Cancel appointment'
                    />
                  </button>
                  <button
                    onClick={() => completeAppointment(item._id)}
                    className='text-secondary hover:text-secondary/80 transition'
                    aria-label={`Complete appointment for ${item.userData.name}`}
                  >
                    <img
                      src={assets.tick_icon}
                      className='w-8 cursor-pointer'
                      alt='Complete appointment'
                    />
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DoctorAppointments;