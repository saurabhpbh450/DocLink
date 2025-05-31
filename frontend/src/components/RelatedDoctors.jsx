import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const RelatedDoctors = ({ speciality, docId }) => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  const [relDoc, setRelDoc] = useState([]);

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId);
      setRelDoc(doctorsData);
    }
  }, [doctors, speciality, docId]);

  return (
    <div className='flex flex-col items-center gap-4 my-16 text-textPrimary'>
      <h1 className='text-3xl font-medium'>Related Doctors</h1>
      <p className='sm:w-1/3 text-center text-sm text-textSecondary'>Simply browse through our extensive list of trusted doctors.</p>
      <div className='w-full grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
        {relDoc.map((item) => (
          <div
            onClick={() => {
              navigate(`/appointment/${item._id}`);
              window.scrollTo(0, 0);
            }}
            className='bg-surface border border-primary/20 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] hover:shadow-lg transition-all duration-500'
            key={item._id}
          >
            <div className='h-48'>
              <img src={item.image} alt={item.name} className='w-full h-full object-cover' />
            </div>
            <div className='p-4'>
              <div className='flex items-center gap-2 text-sm'>
                <span className={`w-2 h-2 rounded-full ${item.available ? 'bg-secondary' : 'bg-textSecondary'}`}></span>
                <p className={item.available ? 'text-secondary' : 'text-textSecondary'}>
                  {item.available ? 'Available' : 'Not Available'}
                </p>
              </div>
              <p className='text-textPrimary text-lg font-medium'>{item.name}</p>
              <p className='text-textSecondary text-sm'>{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedDoctors;