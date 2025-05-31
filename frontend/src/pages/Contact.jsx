import React, { useState, useEffect } from 'react';
import { FaLinkedin, FaInstagram } from 'react-icons/fa';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const Contact = () => {
  const [currentDay, setCurrentDay] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const updateStatus = () => {
      const now = new Date();
      const dayName = days[now.getDay()];
      const hours = now.getHours();
      const mins = now.getMinutes();
      setCurrentDay(dayName);
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

      const totalMins = hours * 60 + mins;
      const openMins = 9 * 60 + 30;
      const closeMins = 17 * 60;
      setIsOpen(
        now.getDay() >= 1 && now.getDay() <= 6 && totalMins >= openMins && totalMins <= closeMins
      );
    };

    updateStatus();
    const timer = setInterval(updateStatus, 60000);
    return () => clearInterval(timer);
  }, []);

  const faqs = [
    {
      q: 'How do I book an appointment?',
      a: 'Select a specialist, pick an available slot, and confirm—your appointment is booked instantly.',
    },
    {
      q: 'Can I reschedule or cancel?',
      a: 'Yes—log in to your account and reschedule or cancel up to 24 hours before your appointment.',
    },
    {
      q: 'Is my data secure?',
      a: 'Absolutely—DocLink is HIPAA-compliant and uses end-to-end encryption for all records.',
    },
    {
      q: 'How do I choose the right specialist?',
      a: 'Use our ‘Find a Specialist’ carousel or consult our Symptom Checker for tailored recommendations.',
    },
    {
      q: 'Do you offer virtual consultations?',
      a: 'Yes—many doctors on DocLink provide video appointments; just look for the camera icon on their profile.',
    },
  ];
  const [openIndex, setOpenIndex] = useState(null);
  const toggleFAQ = (idx) => setOpenIndex(openIndex === idx ? null : idx);

  return (
    <section className='min-h-screen pt-28 pb-20 px-6 bg-background text-textPrimary'>
      <div className='max-w-6xl mx-auto'>
        {/* Page Header */}
        <div className='text-center mb-16'>
          <h2 className='text-4xl font-bold mb-4'>Get in Touch</h2>
          <p className='text-textSecondary'>
            We’d love to hear from you. Fill out the form or use the info on the right.
          </p>
        </div>

        <div className='flex flex-col md:flex-row gap-12'>
          {/* Left: Contact Form */}
          <div className='md:w-1/2 bg-surface p-8 rounded-2xl shadow-lg border border-primary/20'>
            <form action='https://formspree.io/f/xeogaykb' method='POST' className='space-y-6'>
              <div className='relative'>
                <input
                  type='text'
                  name='username'
                  required
                  className='peer w-full bg-background border border-primary/20 rounded-md p-4 text-textPrimary placeholder-transparent focus:outline-none focus:ring-2 focus:ring-primary'
                  placeholder='Name'
                  aria-label='Name'
                />
                <label className='absolute left-4 top-2 text-sm text-textSecondary peer-placeholder-shown:top-4 peer-placeholder-shown:text-base transition-all duration-200'>
                  Name
                </label>
              </div>
              <div className='relative'>
                <input
                  type='email'
                  name='email'
                  required
                  className='peer w-full bg-background border border-primary/20 rounded-md p-4 text-textPrimary placeholder-transparent focus:outline-none focus:ring-2 focus:ring-primary'
                  placeholder='Email'
                  aria-label='Email'
                />
                <label className='absolute left-4 top-2 text-sm text-textSecondary peer-placeholder-shown:top-4 peer-placeholder-shown:text-base transition-all duration-200'>
                  Email
                </label>
              </div>
              <div className='relative'>
                <input
                  type='text'
                  name='subject'
                  required
                  className='peer w-full bg-background border border-primary/20 rounded-md p-4 text-textPrimary placeholder-transparent focus:outline-none focus:ring-2 focus:ring-primary'
                  placeholder='Subject'
                  aria-label='Subject'
                />
                <label className='absolute left-4 top-2 text-sm text-textSecondary peer-placeholder-shown:top-4 peer-placeholder-shown:text-base transition-all duration-200'>
                  Subject
                </label>
              </div>
              <div className='relative'>
                <textarea
                  name='message'
                  rows='5'
                  required
                  className='peer w-full bg-background border border-primary/20 rounded-md p-4 text-textPrimary placeholder-transparent focus:outline-none focus:ring-2 focus:ring-primary'
                  placeholder='Message'
                  aria-label='Message'
                ></textarea>
                <label className='absolute left-4 top-2 text-sm text-textSecondary peer-placeholder-shown:top-4 peer-placeholder-shown:text-base transition-all duration-200'>
                  Message
                </label>
              </div>
              <button
                type='submit'
                className='bg-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary/90 transition transform hover:scale-95'
                aria-label='Send message'
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Right: Info Panels */}
          <div className='md:w-1/2 space-y-8'>
            {/* Team Contact Information */}
            <div className='bg-surface p-6 rounded-2xl shadow-lg border border-primary/20 break-words'>
              <h3 className='text-xl font-semibold mb-4'>Team Contact Information</h3>
              <p className='text-textSecondary mb-2'>
                For any inquiries or further information, feel free to reach out to our team:
              </p>
              <p className='text-textPrimary font-medium mb-2'>Saurabh Mishra</p>
              <p className='flex items-start gap-2 text-textSecondary mb-4 break-words'>
                ✉️{' '}
                <a
                  href='mailto:saurabh.mishrabtechcs21@smslucknow.ac.in'
                  className='hover:text-primary break-words'
                >
                  saurabh.mishrabtechcs21@smslucknow.ac.in
                </a>
              </p>
              <p className='flex items-start gap-2 text-textSecondary break-words'>
                🏢 Department of Computer Science & Engineering, School of Management Sciences,
                Lucknow, Uttar Pradesh, India UP-226501
              </p>
            </div>

            {/* Office Hours & Availability */}
            <div className='bg-surface p-6 rounded-2xl shadow-lg border border-primary/20'>
              <h3 className='text-xl font-semibold mb-4'>Office Hours</h3>
              <p className='text-textSecondary mb-2'>Mon–Fri: 9:30 AM–5:00 PM</p>
              <p className='text-textSecondary mb-2'>Sunday: Closed</p>
              <p className='text-sm'>
                Now:{' '}
                <span className='font-semibold text-secondary'>
                  {isOpen ? 'Open now' : 'Closed'}
                </span>
              </p>
              <p className='text-xs text-textSecondary mt-1'>
                {currentDay}, {currentTime}
              </p>
            </div>

            {/* Social & Quick-Connect */}
            <div className='bg-surface p-6 rounded-2xl shadow-lg border border-primary/20 flex items-center justify-center gap-6'>
              <a
                href='https://in.linkedin.com/in/saurabhmishra1077'
                target='_blank'
                rel='noopener noreferrer'
                className='text-textSecondary hover:text-primary text-2xl'
                aria-label='LinkedIn'
              >
                <FaLinkedin />
              </a>
              <a
                href='https://www.instagram.com/saurabhmishra1077/'
                target='_blank'
                rel='noopener noreferrer'
                className='text-textSecondary hover:text-primary text-2xl'
                aria-label='Instagram'
              >
                <FaInstagram />
              </a>
            </div>

            {/* FAQ Accordion */}
            <div className='bg-surface p-6 rounded-2xl shadow-lg border border-primary/20'>
              <h3 className='text-xl font-semibold mb-4'>Frequently Asked Questions</h3>
              <div className='space-y-4'>
                {faqs.map((faq, idx) => (
                  <div key={idx} className='border-b border-primary/20 pb-2'>
                    <button
                      onClick={() => toggleFAQ(idx)}
                      className='w-full flex justify-between items-center py-2 text-left text-textPrimary font-medium focus:outline-none'
                      aria-expanded={openIndex === idx}
                      aria-controls={`faq-${idx}`}
                    >
                      {faq.q}
                      {openIndex === idx ? (
                        <FiChevronUp className='text-primary' />
                      ) : (
                        <FiChevronDown className='text-textSecondary' />
                      )}
                    </button>
                    {openIndex === idx && (
                      <p id={`faq-${idx}`} className='mt-2 text-textSecondary'>
                        {faq.a}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;