// Hero.jsx
import React from 'react';
import { assets } from '../assets/assets';

const Hero = () => (
  <section className="bg-[#121212]">
    <div className="mx-auto max-w-6xl px-6 md:px-10 lg:px-20 flex flex-col md:flex-row items-center">
      
      {/* Left: copy + CTA */}
      <div className="md:w-1/2 flex flex-col justify-center items-start gap-6 py-16">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight">
          Your Health, Our Priority: <br />
          Simplifying Doctor Appointments.
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-3 mt-4 text-sm font-light">
          <img
            className="h-6 md:h-8 lg:h-12 object-contain"
            src={assets.group_profiles}
            alt="Group profiles"
          />
          <p className="text-[#9E9E9E] text-lg">
            Your journey to better health starts here —<br className="hidden sm:block" />
            book expert care anytime, anywhere.
          </p>
        </div>
        
        <a
          href="#speciality"
          onClick={(e) => {
            e.preventDefault();
            document
              .getElementById('speciality')
              ?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="
            flex items-center gap-2
            bg-[#D4AF37] text-[#121212]
            px-8 py-3 rounded-full text-sm
            m-auto md:m-0
            hover:scale-105 transition-all duration-300
          "
        >
          Book Appointment
          <img src={assets.arrow_icon} alt="→" className="ml-2 w-3" />
        </a>
      </div>

      {/* Right: hero image */}
      <div className="md:w-1/2 relative mt-5 md:mt-0">
        <img
          src={assets.header_img}
          alt="Doctors and patient"
          className="w-full h-auto rounded-lg shadow-xl"
        />
      </div>
      
    </div>
  </section>
);

export default Hero;
