import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [state, setState] = useState('Sign Up');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const { backendUrl, token, setToken } = useContext(AppContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (state === 'Sign Up') {
        const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password });
        if (data.success) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
          setName('');
          setEmail('');
          setPassword('');
          toast.success('Account created successfully!');
          navigate('/');
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/user/login', { email, password });
        if (data.success) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
          setEmail('');
          setPassword('');
          toast.success('Logged in successfully!');
          navigate('/');
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
      console.error(error);
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center bg-background'>
      <div className='flex flex-col gap-4 m-auto items-start p-8 min-w-[340px] sm:min-w-96 bg-surface border border-primary/20 rounded-xl text-textPrimary shadow-lg'>
        <h2 className='text-2xl font-semibold'>
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
        </h2>
        <p className='text-textSecondary text-sm'>
          Please {state === 'Sign Up' ? 'sign up' : 'log in'} to book an appointment
        </p>
        {state === 'Sign Up' && (
          <div className='w-full'>
            <label className='text-sm'>Full Name</label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              className='border border-primary/20 rounded w-full p-2 mt-1 bg-background text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary'
              type='text'
              required
              aria-label='Full Name'
            />
          </div>
        )}
        <div className='w-full'>
          <label className='text-sm'>Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className='border border-primary/20 rounded w-full p-2 mt-1 bg-background text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary'
            type='email'
            required
            aria-label='Email'
          />
        </div>
        <div className='w-full'>
          <label className='text-sm'>Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className='border border-primary/20 rounded w-full p-2 mt-1 bg-background text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary'
            type='password'
            required
            aria-label='Password'
          />
        </div>
        <button
          className='bg-primary text-white w-full py-2 my-2 rounded-md text-base hover:bg-primary/90 transition'
          type='submit'
        >
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
        </button>
        <p className='text-textSecondary text-sm'>
          {state === 'Sign Up' ? 'Already have an account?' : 'Create a new account?'}{' '}
          <span
            onClick={() => setState(state === 'Sign Up' ? 'Login' : 'Sign Up')}
            className='text-primary underline cursor-pointer hover:text-primary/80'
          >
            {state === 'Sign Up' ? 'Login here' : 'Click here'}
          </span>
        </p>
      </div>
    </form>
  );
};

export default Login;