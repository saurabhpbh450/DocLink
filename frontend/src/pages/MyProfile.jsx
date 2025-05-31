import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const MyProfile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  const { token, backendUrl, userData, setUserData, loadUserProfileData } = useContext(AppContext);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append('name', userData.name);
      formData.append('phone', userData.phone);
      formData.append('address', JSON.stringify(userData.address));
      formData.append('gender', userData.gender);
      formData.append('dob', userData.dob);

      if (image) {
        formData.append('image', image);
      }

      const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, {
        headers: { token },
      });

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return userData ? (
    <div className='max-w-lg flex flex-col gap-4 text-sm pt-5 bg-background text-textPrimary'>
      {isEdit ? (
        <label htmlFor='image' className='cursor-pointer'>
          <div className='relative inline-block'>
            <img
              className='w-36 h-36 rounded-full object-cover opacity-75'
              src={image ? URL.createObjectURL(image) : userData.image}
              alt='Profile'
            />
            <img
              className='w-10 absolute bottom-2 right-2'
              src={assets.upload_icon}
              alt='Upload profile picture'
            />
          </div>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type='file'
            id='image'
            accept='image/*'
            hidden
            aria-label='Upload profile picture'
          />
        </label>
      ) : (
        <img
          className='w-36 h-36 rounded-full object-cover'
          src={userData.image}
          alt='Profile'
        />
      )}

      {isEdit ? (
        <input
          className='bg-surface text-3xl font-medium max-w-60 border border-primary/20 rounded p-2 text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary'
          type='text'
          onChange={(e) => setUserData((prev) => ({ ...prev, name: e.target.value }))}
          value={userData.name}
          aria-label='Full Name'
        />
      ) : (
        <p className='font-medium text-3xl mt-4'>{userData.name}</p>
      )}

      <div className='border-t border-primary/20 my-4' />

      <div>
        <p className='text-textSecondary underline mt-3'>CONTACT INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3'>
          <p className='font-medium'>Email id:</p>
          <p className='text-primary'>{userData.email}</p>
          <p className='font-medium'>Phone:</p>
          {isEdit ? (
            <input
              className='bg-surface max-w-52 border border-primary/20 rounded p-2 text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary'
              type='text'
              onChange={(e) => setUserData((prev) => ({ ...prev, phone: e.target.value }))}
              value={userData.phone}
              aria-label='Phone number'
            />
          ) : (
            <p className='text-primary'>{userData.phone}</p>
          )}
          <p className='font-medium'>Address:</p>
          {isEdit ? (
            <div>
              <input
                className='bg-surface border border-primary/20 rounded p-2 w-full text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary'
                type='text'
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value },
                  }))
                }
                value={userData.address.line1}
                aria-label='Address line 1'
              />
              <input
                className='bg-surface border border-primary/20 rounded p-2 w-full mt-2 text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary'
                type='text'
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value },
                  }))
                }
                value={userData.address.line2}
                aria-label='Address line 2'
              />
            </div>
          ) : (
            <p className='text-textSecondary'>
              {userData.address.line1}
              <br />
              {userData.address.line2}
            </p>
          )}
        </div>
      </div>

      <div>
        <p className='text-textSecondary underline mt-3'>BASIC INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3'>
          <p className='font-medium'>Gender:</p>
          {isEdit ? (
            <select
              className='max-w-20 bg-surface border border-primary/20 rounded p-2 text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary'
              onChange={(e) => setUserData((prev) => ({ ...prev, gender: e.target.value }))}
              value={userData.gender}
              aria-label='Gender'
            >
              <option value='Not Selected'>Not Selected</option>
              <option value='Male'>Male</option>
              <option value='Female'>Female</option>
            </select>
          ) : (
            <p className='text-textSecondary'>{userData.gender}</p>
          )}
          <p className='font-medium'>Birthday:</p>
          {isEdit ? (
            <input
              className='max-w-28 bg-surface border border-primary/20 rounded p-2 text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary'
              type='date'
              onChange={(e) => setUserData((prev) => ({ ...prev, dob: e.target.value }))}
              value={userData.dob}
              aria-label='Date of birth'
            />
          ) : (
            <p className='text-textSecondary'>{userData.dob}</p>
          )}
        </div>
      </div>

      <div className='mt-10'>
        {isEdit ? (
          <button
            onClick={updateUserProfileData}
            className='bg-primary text-white px-8 py-2 rounded-full hover:bg-primary/90 transition-all'
          >
            Save information
          </button>
        ) : (
          <button
            onClick={() => setIsEdit(true)}
            className='bg-surface border border-primary px-8 py-2 rounded-full text-textPrimary hover:bg-primary hover:text-white transition-all'
          >
            Edit
          </button>
        )}
      </div>
    </div>
  ) : null;
};

export default MyProfile;