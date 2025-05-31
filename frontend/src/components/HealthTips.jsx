// // frontend\src\components\HealthTips.jsx
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const tips = [
  {
    tip: 'Maintain a heart-healthy diet rich in fruits, vegetables, and whole grains.',
    doctor: 'Dr. Rahul Verma'
  },
  {
    tip: 'Incorporate daily stretching exercises to boost joint flexibility and prevent injuries.',
    doctor: 'Dr. Priya Singh'
  },
  {
    tip: 'Apply broad-spectrum sunscreen every day to protect your skin against UV damage.',
    doctor: 'Dr. Neha Kapoor'
  },
  {
    tip: 'Follow all instructions before imaging tests for optimal clarity and safety.',
    doctor: 'Dr. Amit Chauhan'
  },
  {
    tip: 'Eat a balanced diet high in fiber to support digestive health.',
    doctor: 'Dr. Kavita Gupta'
  },
  {
    tip: 'Schedule regular check-ups to catch potential health issues early.',
    doctor: 'Dr. Suresh Tiwari'
  },
  {
    tip: 'Limit salt and saturated fats to manage blood pressure effectively.',
    doctor: 'Dr. Pankaj Mishra'
  },
  {
    tip: 'Participate in recommended cancer screenings based on your age and history.',
    doctor: 'Dr. Anuradha Sharma'
  },
  {
    tip: 'Wash hands frequently with soap and water to prevent infections.',
    doctor: 'Dr. Vikram Shukla'
  },
  {
    tip: 'Engage in weight-bearing exercises like walking or light jogging for bone health.',
    doctor: 'Dr. Rohan Agrawal'
  },
  {
    tip: 'Keep your skin hydrated by drinking water and using a gentle moisturizer.',
    doctor: 'Dr. Smita Patel'
  },
  {
    tip: 'Add probiotics to your diet to maintain a healthy gut microbiome.',
    doctor: 'Dr. Deepak Kumar'
  },
  {
    tip: 'Practice stress-reduction techniques like yoga or meditation for heart wellness.',
    doctor: 'Dr. Sandeep Singh'
  },
  {
    tip: 'Apply cold packs and rest after minor injuries to reduce swelling.',
    doctor: 'Dr. Meera Rao'
  },
  {
    tip: 'Aim for a balanced plate: lean protein, healthy fats, and complex carbs.',
    doctor: 'Dr. Arvind Nagar'
  }
];

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  autoplay: true,
  autoplaySpeed: 6000,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  appendDots: dots => (
    <div className="mt-4">
      <ul className="flex justify-center space-x-2">{dots}</ul>
    </div>
  )
};

const HealthTips = () => {
  return (
    <section className="bg-[#121212] text-white py-16 px-4 md:px-10 lg:px-20">
      <h2 className="text-3xl font-bold text-center mb-8">Health Tips from Doctors</h2>
      {/* Center and constrain the carousel width */}
      <div className="mx-auto max-w-xl">
        <Slider {...settings}>
          {tips.map((item, index) => (
            <div key={index} className="flex justify-center px-2">
              <div className="bg-[#2A2A2A] p-6 rounded-xl shadow-md w-full">
                <p className="text-ng-white text-lg italic mb-4">“{item.tip}”</p>
                <p className="text-[#D4AF37] text-right font-medium">— {item.doctor}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default HealthTips;