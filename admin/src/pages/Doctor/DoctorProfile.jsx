import React, { useContext, useEffect, useState } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData } = useContext(DoctorContext);
  const { currency, backendUrl } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);

  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        about: profileData.about,
        available: profileData.available,
      };

      const { data } = await axios.post(backendUrl + '/api/doctor/update-profile', updateData, {
        headers: { dToken },
      });

      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  return profileData ? (
    <div className='bg-background'>
      <div className='flex flex-col sm:flex-row gap-6 m-5'>
        <div>
          <img
            className='bg-surface w-full sm:max-w-64 rounded-lg border border-primary/20 shadow-md'
            src={profileData.image}
            alt={`${profileData.name}'s profile`}
          />
        </div>

        <div className='flex-1 border border-primary/20 rounded-lg p-8 bg-surface shadow-lg'>
          {/* Doctor Info: name, degree, experience */}
          <p className='flex items-center gap-2 text-3xl font-medium text-textPrimary'>
            {profileData.name}
          </p>
          <div className='flex items-center gap-2 mt-1 text-textSecondary'>
            <p>
              {profileData.degree} - {profileData.speciality}
            </p>
            <span className='py-0.5 px-2 border border-primary/20 bg-primary/10 text-primary text-xs rounded-full'>
              {profileData.experience}
            </span>
          </div>

          {/* Doctor About */}
          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-textPrimary mt-3'>
              About:
            </p>
            <p className='text-sm text-textSecondary max-w-[700px] mt-1'>
              {isEdit ? (
                <textarea
                  onChange={(e) => setProfileData((prev) => ({ ...prev, about: e.target.value }))}
                  className='w-full bg-surface border border-primary/20 rounded p-2 text-textPrimary placeholder-textSecondary focus:outline-none focus:ring-2 focus:ring-primary'
                  rows={8}
                  value={profileData.about}
                  aria-label='Doctor about information'
                />
              ) : (
                profileData.about
              )}
            </p>
          </div>

          <p className='text-textSecondary font-medium mt-4'>
            Appointment fee:{' '}
            <span className='text-textPrimary'>
              {currency}{' '}
              {isEdit ? (
                <input
                  type='number'
                  onChange={(e) => setProfileData((prev) => ({ ...prev, fees: e.target.value }))}
                  value={profileData.fees}
                  min='0'
                  step='1'
                  className='bg-surface border border-primary/20 rounded px-2 py-1 text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary'
                  aria-label='Appointment fee'
                />
              ) : (
                profileData.fees
              )}
            </span>
          </p>

          <div className='flex items-center gap-2 mt-1 text-textSecondary'>
            <p>City: {profileData.city}</p>
          </div>

          <div className='flex gap-2 py-2'>
            <p>Address:</p>
            <p className='text-sm text-textSecondary'>
              {isEdit ? (
                <input
                  type='text'
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value },
                    }))
                  }
                  value={profileData.address.line1}
                  className='w-full bg-surface border border-primary/20 rounded px-2 py-1 text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary'
                  aria-label='Address line 1'
                />
              ) : (
                profileData.address.line1
              )}
              <br />
              {isEdit ? (
                <input
                  type='text'
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value },
                    }))
                  }
                  value={profileData.address.line2}
                  className='w-full mt-2 bg-surface border border-primary/20 rounded px-2 py-1 text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary'
                  aria-label='Address line 2'
                />
              ) : (
                profileData.address.line2
              )}
              <br />
              {isEdit ? (
                <input
                  type='text'
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line3: e.target.value },
                    }))
                  }
                  value={profileData.address.line3}
                  className='w-full mt-2 bg-surface border border-primary/20 rounded px-2 py-1 text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary'
                  aria-label='Address line 3'
                />
              ) : (
                profileData.address.line3
              )}
            </p>
          </div>

          <div className='flex gap-2 pt-2'>
            <input
              type='checkbox'
              id='available'
              onChange={() =>
                isEdit && setProfileData((prev) => ({ ...prev, available: !prev.available }))
              }
              checked={profileData.available}
              disabled={!isEdit}
              aria-label='Doctor availability'
            />
            <label htmlFor='available' className='text-textSecondary'>
              Available
            </label>
          </div>

          {isEdit ? (
            <button
              onClick={updateProfile}
              className='px-4 py-1 border border-primary bg-primary text-textPrimary text-sm rounded-full mt-5 hover:bg-primary/90 transition-all'
              aria-label='Save profile changes'
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className='px-4 py-1 border border-primary text-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-textPrimary transition-all'
              aria-label='Edit profile'
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  ) : (
    <p className='text-textSecondary text-center py-8'>Loading profile...</p>
  );
};

export default DoctorProfile;