import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext';

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [experience, setExperience] = useState('1 Year');
  const [fees, setFees] = useState('');
  const [about, setAbout] = useState('');
  const [speciality, setSpeciality] = useState('General physician');
  const [degree, setDegree] = useState('');
  const [city, setCity] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [address3, setAddress3] = useState('');

  const { backendUrl } = useContext(AppContext);
  const { aToken } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (!docImg) {
        return toast.error('Image Not Selected');
      }

      const formData = new FormData();
      formData.append('image', docImg);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('experience', experience);
      formData.append('fees', Number(fees));
      formData.append('about', about);
      formData.append('speciality', speciality);
      formData.append('degree', degree);
      formData.append('city', city);
      formData.append('address', JSON.stringify({ line1: address1, line2: address2, line3: address3 }));

      // Log FormData for debugging
      for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

      const base = backendUrl || import.meta.env.VITE_BACKEND_URL;
      const url = `${base}/api/admin/add-doctor`;

      const { data } = await axios.post(url, formData, {
        headers: { aToken },
      });

      if (data.success) {
        toast.success(data.message);
        setDocImg(false);
        setName('');
        setPassword('');
        setEmail('');
        setAddress1('');
        setAddress2('');
        setAddress3('');
        setDegree('');
        setCity('');
        setAbout('');
        setFees('');
        setExperience('1 Year');
        setSpeciality('General physician');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <main className='min-h-screen bg-background py-10 px-4'>
      <form
        onSubmit={onSubmitHandler}
        className='max-w-4xl mx-auto bg-surface p-8 rounded-2xl shadow-lg border border-primary/20 space-y-8'
      >
        <h1 className='text-2xl font-bold text-textPrimary'>Add Doctor</h1>

        {/* Image Upload */}
        <div className='flex items-center gap-6'>
          <label
            htmlFor='doc-img'
            className='w-24 h-24 rounded-full border-2 border-dashed border-primary/20 flex items-center justify-center cursor-pointer overflow-hidden bg-surface hover:border-primary transition'
          >
            {docImg ? (
              <img
                src={URL.createObjectURL(docImg)}
                alt='Doctor profile'
                className='object-cover w-full h-full'
              />
            ) : (
              <img
                src={assets.upload_area}
                alt='Upload doctor picture'
                className='w-12 h-12 opacity-50'
              />
            )}
          </label>
          <input
            onChange={(e) => setDocImg(e.target.files[0])}
            type='file'
            id='doc-img'
            accept='image/*'
            hidden
            aria-label='Upload doctor picture'
          />
          <span className='text-textSecondary'>Upload doctor picture</span>
        </div>

        {/* Two-Column Fields */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          {/* Left Column */}
          <div className='space-y-4'>
            <div>
              <label className='block text-sm text-textSecondary mb-1'>Name</label>
              <input
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder='Dr. Jane Doe'
                className='w-full bg-surface border border-primary/20 rounded px-3 py-2 text-textPrimary placeholder-textSecondary focus:outline-none focus:ring-2 focus:ring-primary'
                aria-label='Doctor name'
              />
            </div>
            <div>
              <label className='block text-sm text-textSecondary mb-1'>Email</label>
              <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder='doctor@example.com'
                className='w-full bg-surface border border-primary/20 rounded px-3 py-2 text-textPrimary placeholder-textSecondary focus:outline-none focus:ring-2 focus:ring-primary'
                aria-label='Doctor email'
              />
            </div>
            <div>
              <label className='block text-sm text-textSecondary mb-1'>Password</label>
              <input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder='••••••••'
                className='w-full bg-surface border border-primary/20 rounded px-3 py-2 text-textPrimary placeholder-textSecondary focus:outline-none focus:ring-2 focus:ring-primary'
                aria-label='Doctor password'
              />
            </div>
            <div>
              <label className='block text-sm text-textSecondary mb-1'>Experience</label>
              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className='w-full bg-surface border border-primary/20 rounded px-2 py-2 text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary'
                aria-label='Doctor experience'
              >
                {[...Array(15).keys()].map((i) => (
                  <option key={i + 1} value={`${i + 1} Year${i + 1 > 1 ? 's' : ''}`}>
                    {i + 1} Year{i + 1 > 1 ? 's' : ''}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className='block text-sm text-textSecondary mb-1'>Fees</label>
              <input
                type='number'
                value={fees}
                onChange={(e) => setFees(e.target.value)}
                required
                min='0'
                step='1'
                placeholder='1500'
                className='w-full bg-surface border border-primary/20 rounded px-3 py-2 text-textPrimary placeholder-textSecondary focus:outline-none focus:ring-2 focus:ring-primary'
                aria-label='Consultation fees'
              />
            </div>
          </div>

          {/* Right Column */}
          <div className='space-y-4'>
            <div>
              <label className='block text-sm text-textSecondary mb-1'>Speciality</label>
              <select
                value={speciality}
                onChange={(e) => setSpeciality(e.target.value)}
                className='w-full bg-surface border border-primary/20 rounded px-2 py-2 text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary'
                aria-label='Doctor speciality'
              >
                <option>General physician</option>
                <option>Cardiologist</option>
                <option>Orthopedic Surgeon</option>
                <option>Radiologist</option>
                <option>Gastroenterologist</option>
                <option>Oncologist</option>
                <option>Gynecologist & Obstetrician</option>
                <option>Neurologist</option>
                <option>Pediatrician</option>
                <option>Dermatologist</option>
              </select>
            </div>
            <div>
              <label className='block text-sm text-textSecondary mb-1'>Degree</label>
              <input
                type='text'
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                required
                placeholder='MD Cardiology'
                className='w-full bg-surface border border-primary/20 rounded px-3 py-2 text-textPrimary placeholder-textSecondary focus:outline-none focus:ring-2 focus:ring-primary'
                aria-label='Doctor degree'
              />
            </div>
            <div>
              <label className='block text-sm text-textSecondary mb-1'>City</label>
              <input
                type='text'
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                placeholder='New Delhi'
                className='w-full bg-surface border border-primary/20 rounded px-3 py-2 text-textPrimary placeholder-textSecondary focus:outline-none focus:ring-2 focus:ring-primary'
                aria-label='City'
              />
            </div>
            <div>
              <label className='block text-sm text-textSecondary mb-1'>Address</label>
              <input
                type='text'
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
                required
                placeholder='Address Line 1'
                className='w-full bg-surface border border-primary/20 rounded px-3 py-2 text-textPrimary placeholder-textSecondary focus:outline-none focus:ring-2 focus:ring-primary'
                aria-label='Address line 1'
              />
              <input
                type='text'
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
                required
                placeholder='Address Line 2'
                className='mt-2 w-full bg-surface border border-primary/20 rounded px-3 py-2 text-textPrimary placeholder-textSecondary focus:outline-none focus:ring-2 focus:ring-primary'
                aria-label='Address line 2'
              />
              <input
                type='text'
                value={address3}
                onChange={(e) => setAddress3(e.target.value)}
                required
                placeholder='Address Line 3'
                className='mt-2 w-full bg-surface border border-primary/20 rounded px-3 py-2 text-textPrimary placeholder-textSecondary focus:outline-none focus:ring-2 focus:ring-primary'
                aria-label='Address line 3'
              />
            </div>
          </div>
        </div>

        {/* About */}
        <div>
          <label className='block text-sm text-textSecondary mb-1'>About Doctor</label>
          <textarea
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            rows={5}
            placeholder='Write about the doctor'
            className='w-full bg-surface border border-primary/20 rounded px-3 py-2 text-textPrimary placeholder-textSecondary focus:outline-none focus:ring-2 focus:ring-primary'
            aria-label='About the doctor'
          ></textarea>
        </div>

        <button
          type='submit'
          className='bg-primary text-textPrimary px-10 py-3 rounded-full font-medium hover:bg-primary/90 transition'
          aria-label='Add doctor'
        >
          Add Doctor
        </button>
      </form>
    </main>
  );
};

export default AddDoctor;