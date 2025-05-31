// src/pages/MyAppointments.jsx
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const MyAppointments = () => {
  const { backendUrl, token } = useContext(AppContext);
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [payment, setPayment] = useState(''); // stores the appointmentId currently triggering payment

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  // Format slotDate like "20_07_2024" → "20 Jul 2024"
  const slotDateFormat = (slotDate) => {
    const [day, mon, year] = slotDate.split('_').map(Number);
    return `${day} ${months[mon - 1]} ${year}`;
  };

  // Fetch all appointments for this user
  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
        headers: { token },
      });
      setAppointments(data.appointments.reverse());
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  // Cancel a given appointment
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/cancel-appointment`,
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  // Initialize Razorpay checkout
  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Appointment Payment',
      description: 'Appointment Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(
            `${backendUrl}/api/user/verifyRazorpay`,
            response,
            { headers: { token } }
          );
          if (data.success) {
            navigate('/my-appointments');
            getUserAppointments();
          } else {
            toast.error(data.message);
          }
        } catch (error) {
          console.error(error);
          toast.error(error.message);
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  // Trigger Razorpay payment for the given appointment
  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/payment-razorpay`,
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        initPay(data.order);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  // On component mount (or whenever token changes), load appointments
  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  return (
    <div className="bg-background text-textPrimary min-h-screen p-6">
      <p className="pb-3 mt-12 text-lg font-medium text-textSecondary border-b border-primary/20">
        My Appointments
      </p>

      <div className="mt-6">
        {appointments.length === 0 ? (
          <p className="text-textSecondary text-center py-8">
            No appointments found.
          </p>
        ) : (
          appointments.map((item) => (
            <div
              key={item._id}
              className="
                mb-4
                flex flex-col sm:flex-row
                bg-surface border border-primary/20 rounded-lg shadow
                overflow-hidden
              "
            >
              {/* ---------- Left: Doctor Image ---------- */}
              <div className="flex-shrink-0 bg-[#1F1F1F] p-2 flex items-center justify-center">
                <img
                  src={item.docData.image}
                  alt={`${item.docData.name} profile`}
                  className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg"
                />
              </div>

              {/* ---------- Middle: Details ---------- */}
              <div className="flex-1 p-4 text-textSecondary text-sm">
                <p className="text-textPrimary text-base font-semibold">
                  {item.docData.name}
                </p>
                <p>{item.docData.speciality}</p>

                <div className="mt-2">
                  <p className="font-medium text-textPrimary">Address:</p>
                  <p>{item.docData.address.line1}</p>
                  <p>{item.docData.address.line2}</p>
                  <p>{item.docData.address.line3}</p>
                </div>

                <p className="mt-2">
                  <span className="font-medium text-textPrimary">
                    Date & Time:
                  </span>{' '}
                  {slotDateFormat(item.slotDate)} | {item.slotTime}
                </p>
              </div>

              {/* ---------- Right: Actions ---------- */}
              <div className="p-4 flex flex-col justify-center items-start sm:items-end gap-2 text-sm">
                {/* If not cancelled, not paid, not completed → Show “Pay Online” */}
                {!item.cancelled && !item.payment && !item.isCompleted && payment !== item._id && (
                  <button
                    onClick={() => setPayment(item._id)}
                    className="sm:min-w-40 py-2 px-3 border border-primary/20 rounded hover:bg-primary hover:text-white transition"
                    aria-label="Pay online for appointment"
                  >
                    Pay Online
                  </button>
                )}

                {/* If “Pay Online” clicked for this appointment, show Razorpay button */}
                {!item.cancelled &&
                  !item.payment &&
                  !item.isCompleted &&
                  payment === item._id && (
                    <button
                      onClick={() => appointmentRazorpay(item._id)}
                      className="
                        sm:min-w-40 py-2 px-3 border border-primary/20 rounded
                        bg-background hover:bg-primary/10 transition
                        flex items-center justify-center
                      "
                      aria-label="Pay with Razorpay"
                    >
                      <img
                        className="max-h-5"
                        src={assets.razorpay_logo}
                        alt="Razorpay logo"
                      />
                    </button>
                  )}

                {/* If paid but not completed yet */}
                {!item.cancelled && item.payment && !item.isCompleted && (
                  <button
                    className="sm:min-w-40 py-2 px-3 border border-primary/20 rounded bg-primary/10 text-textSecondary"
                    disabled
                  >
                    Paid
                  </button>
                )}

                {/* If completed */}
                {item.isCompleted && (
                  <button
                    className="sm:min-w-40 py-2 px-3 border border-secondary rounded text-secondary"
                    disabled
                  >
                    Completed
                  </button>
                )}

                {/* If not yet cancelled and not completed → show “Cancel” */}
                {!item.cancelled && !item.isCompleted && (
                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className="
                      sm:min-w-40 py-2 px-3 border border-error/20 rounded
                      hover:bg-error hover:text-white transition
                    "
                    aria-label="Cancel appointment"
                  >
                    Cancel Appointment
                  </button>
                )}

                {/* If already cancelled */}
                {item.cancelled && !item.isCompleted && (
                  <button
                    className="sm:min-w-40 py-2 px-3 border border-error rounded text-error"
                    disabled
                  >
                    Appointment Cancelled
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyAppointments;
