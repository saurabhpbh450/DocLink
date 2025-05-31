// src/pages/Appointment.jsx
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import RelatedDoctors from '../components/RelatedDoctors';
import axios from 'axios';
import { toast } from 'react-toastify';

// Import react‐slick and its CSS
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, backendUrl, token, getDoctosData } = useContext(AppContext);
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const [docInfo, setDocInfo] = useState(false);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');

  const navigate = useNavigate();

  // 1) Fetch doctor object from context by ID
  const fetchDocInfo = () => {
    const found = doctors.find((doc) => doc._id === docId);
    setDocInfo(found || null);
  };

  // 2) Build next-7-days slots
  const getAvailableSlots = () => {
    if (!docInfo) return;
    setDocSlots([]);

    let today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date(today);
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        });

        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();
        const slotDate = `${day}_${month}_${year}`;
        const slotTime = formattedTime;

        const isBooked = docInfo.slots_booked?.[slotDate]?.includes(slotTime);
        if (!isBooked) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
        }
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };

  // 3) Booking request
  const bookAppointment = async () => {
    if (!token) {
      toast.warning('Login to book appointment');
      return navigate('/login');
    }

    const dateObj = docSlots[slotIndex][0].datetime;
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();
    const slotDate = `${day}_${month}_${year}`;

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/book-appointment`,
        { docId, slotDate, slotTime },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        getDoctosData();
        navigate('/my-appointments');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Whenever the doctors array (from context) changes, re-fetch this doctor
  useEffect(() => {
    if (doctors.length > 0) {
      fetchDocInfo();
    }
  }, [doctors, docId]);

  // Whenever docInfo arrives, rebuild slots
  useEffect(() => {
    if (docInfo) {
      getAvailableSlots();
    }
  }, [docInfo]);

  // Slider settings for days row
  const daySliderSettings = {
    infinite: false,
    speed: 400,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    responsive: [
      {
        breakpoint: 768, // < 768px
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480, // < 480px
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  // Slider settings for times row
  const timeSliderSettings = {
    infinite: false,
    speed: 400,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    responsive: [
      {
        breakpoint: 768, // < 768px
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 480, // < 480px
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };

  return docInfo ? (
    <div className="bg-background text-textPrimary min-h-screen pb-10">
      {/* ---------- Doctor Details ----------- */}
      <div className="flex flex-col sm:flex-row gap-4 p-4 sm:p-8">
        <div className="flex-shrink-0">
          <img
            className="w-full sm:max-w-72 rounded-lg"
            src={docInfo.image}
            alt={docInfo.name}
          />
        </div>

        <div className="flex-1 bg-surface border border-primary/20 rounded-lg p-8 py-7 shadow-lg">
          <p className="flex items-center gap-2 text-3xl font-medium text-textPrimary">
            {docInfo.name}{' '}
            <img className="w-5" src={assets.verified_icon} alt="Verified" />
          </p>
          <div className="flex flex-wrap items-center gap-2 mt-1 text-textSecondary text-sm">
            <p>
              {docInfo.degree} – {docInfo.speciality}
            </p>
            <span className="py-0.5 px-2 bg-accent text-[#121212] text-xs rounded-full">
              {docInfo.experience}
            </span>
          </div>

          <div className="mt-2 text-textSecondary text-sm">
            <p>
              <b>City:</b> {docInfo.city}
            </p>
            <p className="mt-1">
              <b>Address:</b> {docInfo.address.line1}, {docInfo.address.line2},{' '}
              {docInfo.address.line3}
            </p>
          </div>

          <div className="mt-4">
            <p className="flex items-center gap-1 text-sm font-medium text-accent">
              About{' '}
              <img className="w-3" src={assets.info_icon} alt="Info" />
            </p>
            <p className="text-textSecondary text-sm max-w-[700px] mt-1">
              {docInfo.about}
            </p>
          </div>

          <p className="text-textSecondary font-medium mt-4">
            Appointment fee:{' '}
            <span className="text-textPrimary">
              {currencySymbol}
              {docInfo.fees}
            </span>
          </p>
        </div>
      </div>

      {/* ---------- Booking Slots w/ Sliders ----------- */}
      <div className="mt-8 px-4 sm:px-8">
        <h3 className="text-lg font-medium text-white">Booking Slots</h3>

        {/* Day Circle Slider */}
        <div className="mt-4">
          <Slider {...daySliderSettings}>
            {docSlots.map((slots, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setSlotIndex(idx);
                  setSlotTime('');
                }}
                className={`
                  mx-2
                  text-center py-2 rounded-full cursor-pointer transition-colors
                  ${
                    idx === slotIndex
                      ? 'bg-[#D4AF37] text-[#121212]'
                      : 'border border-[#9E9E9E] text-[#9E9E9E]'
                  }
                `}
              >
                <p>{daysOfWeek[slots[0]?.datetime.getDay()]}</p>
                <p>{slots[0]?.datetime.getDate()}</p>
              </div>
            ))}
          </Slider>
        </div>

        {/* Time Circle Slider */}
        <div className="mt-6">
          <Slider {...timeSliderSettings}>
            {docSlots[slotIndex]?.map((slot, i) => (
              <div
                key={i}
                onClick={() => setSlotTime(slot.time)}
                className={`
                  mx-2
                  px-4 py-2 rounded-full cursor-pointer transition-colors
                  ${
                    slot.time === slotTime
                      ? 'bg-[#D4AF37] text-[#121212]'
                      : 'border border-[#9E9E9E] text-[#9E9E9E]'
                  }
                `}
              >
                {slot.time}
              </div>
            ))}
          </Slider>
        </div>

        <button
          onClick={bookAppointment}
          className="
            mt-6 bg-[#D4AF37] hover:bg-[#FFD15C] text-[#121212]
            px-6 py-3 rounded-full text-sm font-medium transition
          "
        >
          Book Appointment
        </button>
      </div>

      {/* ---------- Related Doctors ----------- */}
      <RelatedDoctors speciality={docInfo.speciality} docId={docId} />
    </div>
  ) : null;
};

export default Appointment;
