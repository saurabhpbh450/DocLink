import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';

const DoctorsList = () => {
  const { doctors = [], aToken, getAllDoctors, changeAvailability } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  return (
    <section className='min-h-screen bg-background p-6'>
      <div className='max-w-6xl mx-auto'>
        <h1 className='text-3xl font-bold text-textPrimary mb-6'>All Doctors</h1>
        {doctors.length === 0 ? (
          <p className='text-textSecondary text-center py-8'>No doctors found.</p>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6' role='list'>
            {doctors.map((doc) => (
              <div
                key={doc._id}
                className='flex flex-col bg-surface border border-primary/20 rounded-lg overflow-hidden shadow-md hover:bg-primary/10 transition-all duration-300'
                role='listitem'
              >
                <div className='aspect-[4/3] w-full overflow-hidden'>
                  <img
                    src={doc.image}
                    alt={`${doc.name}'s profile`}
                    className='object-cover w-full h-full'
                  />
                </div>
                <div className='flex-1 p-4 flex flex-col'>
                  <h2 className='text-xl font-semibold text-textPrimary'>{doc.name}</h2>
                  <p className='text-textSecondary mt-1'>{doc.speciality}</p>
                  <button
                    onClick={() => changeAvailability(doc._id)}
                    className={`mt-auto inline-block text-sm font-medium py-1 px-3 rounded-full transition-colors duration-200 ${
                      doc.available
                        ? 'bg-secondary text-textPrimary hover:bg-secondary/80'
                        : 'bg-primary text-textPrimary hover:bg-primary/80'
                    }`}
                    aria-label={`Toggle availability for ${doc.name}`}
                  >
                    {doc.available ? 'Available' : 'Unavailable'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default DoctorsList;