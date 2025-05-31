// frontend\src\components\SpecialityMenu.jsx
import React from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import { specialityData } from '../assets/assets';

// Slick CSS
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Prev/Next arrow components unchanged…
const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="
      absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10
      w-8 md:w-10 h-8 md:h-10 rounded-full
      bg-[#1F1F1F] flex items-center justify-center shadow-lg
    "
    aria-label="Previous"
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 md:w-6 h-5 md:h-6 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="
      absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10
      w-8 md:w-10 h-8 md:h-10 rounded-full
      bg-[#1F1F1F] flex items-center justify-center shadow-lg
    "
    aria-label="Next"
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 md:w-6 h-5 md:h-6 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  </button>
);

const SpecialityMenu = () => {
  const settings = {
    infinite: true,
    speed: 600,
    cssEase: 'ease-in-out',
    slidesToShow: 4,           // default for desktop
    slidesToScroll: 1,
    lazyLoad: 'ondemand',
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1280,      // <1280px
        settings: { slidesToShow: 3 }
      },
      {
        breakpoint: 1024,      // <1024px
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 640,       // <640px
        settings: { slidesToShow: 1 }
      }
    ]
  };

  return (
    <div id="speciality" className="relative bg-[#121212] text-white py-16 px-4 md:px-10 lg:px-20">
      <h1 className="text-3xl font-bold text-center">Find the Right Specialist</h1>
      <p className="text-center text-sm text-[#9E9E9E] max-w-xl mx-auto mt-2">
        From skin care to heart health — explore top-rated doctors by speciality and
        book your visit in just a few clicks.
      </p>

      <div className="mt-8 relative">
        <Slider {...settings}>
          {specialityData.map((item, idx) => (
            <div key={idx} className="px-2">
              <Link
                to={`/doctors/${item.speciality}`}
                onClick={() => window.scrollTo(0, 0)}
                className="flex flex-col items-center text-xs hover:-translate-y-2 transition-transform"
              >
                <img
                  src={item.image}
                  alt={item.speciality}
                  loading="lazy"
                  className="w-16 sm:w-24 mb-2 rounded-full border-2 border-[#D4AF37]"
                />
                <p>{item.speciality}</p>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default SpecialityMenu;
