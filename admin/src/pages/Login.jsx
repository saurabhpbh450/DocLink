// admin/src/pages/Login.jsx
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { DoctorContext } from '../context/DoctorContext';
import { AdminContext } from '../context/AdminContext';
import { toast } from 'react-toastify';

const Login = () => {
  const [role, setRole] = useState('Admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { setDToken } = useContext(DoctorContext);
  const { setAToken } = useContext(AdminContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url =
        role === 'Admin'
          ? `${backendUrl}/api/admin/login`
          : `${backendUrl}/api/doctor/login`;
      const { data } = await axios.post(url, { email, password });
      if (data.success) {
        if (role === 'Admin') {
          setAToken(data.token);
          localStorage.setItem('aToken', data.token);
        } else {
          setDToken(data.token);
          localStorage.setItem('dToken', data.token);
        }
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#121212] min-h-screen flex items-center justify-center px-4"
    >
      <div className="bg-[#1F1F1F] w-full max-w-md p-8 rounded-xl border border-[#2A2A2A] shadow-lg">
        <h2 className="text-2xl font-semibold text-[#FFFFFF] mb-6 text-center">
          <span className="text-[#D4AF37]">{role}</span> Login
        </h2>

        <div className="mb-4">
          <label className="block text-sm text-[#9E9E9E] mb-1">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-[#2A2A2A] border border-[#2A2A2A] text-[#FFFFFF] placeholder-[#9E9E9E] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm text-[#9E9E9E] mb-1">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-[#2A2A2A] border border-[#2A2A2A] text-[#FFFFFF] placeholder-[#9E9E9E] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#D4AF37] text-[#121212] py-2 rounded-md font-medium hover:bg-[#FFD15C] transition"
        >
          Login
        </button>

        <p className="mt-6 text-center text-sm text-[#9E9E9E]">
          {role === 'Admin'
            ? 'Doctor Login? '
            : 'Admin Login? '}
          <span
            onClick={() => setRole(role === 'Admin' ? 'Doctor' : 'Admin')}
            className="text-[#65C3BA] underline cursor-pointer hover:text-[#D4AF37] transition"
          >
            Click here
          </span>
        </p>
      </div>
    </form>
  );
};

export default Login;
