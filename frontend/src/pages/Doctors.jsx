// frontend/src/pages/Doctors.jsx
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate, useParams } from 'react-router-dom';
import { HiOutlineChevronDown, HiOutlineChevronUp } from 'react-icons/hi';

const specialities = [
  'General Physician',
  'Cardiologist',
  'Orthopedic Surgeon',
  'Dermatologist',
  'Radiologist',
  'Gastroenterologist',
  'Oncologist',
  'Neurologist',
  'Pediatrician',
  'Gynecologist & Obstetrician'
];

const Doctors = () => {
  const { speciality } = useParams();
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [selectedCity, setSelectedCity] = useState('');

  // build city list
  const cities = Array.from(new Set(doctors.map((d) => d.city).filter(Boolean)));

  // apply filters
  useEffect(() => {
    let list = doctors;
    if (speciality) list = list.filter((d) => d.speciality === speciality);
    if (selectedCity) list = list.filter((d) => d.city === selectedCity);
    setFilterDoc(list);
  }, [doctors, speciality, selectedCity]);

  const toggleSpeciality = (spec) => {
    if (spec === speciality) navigate('/doctors');
    else navigate(`/doctors/${encodeURIComponent(spec)}`);
    window.scrollTo(0, 0);
  };

  return (
    <section className="bg-[#121212] text-[#FFFFFF] py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-semibold">Browse Doctors</h1>
        <p className="mt-2 text-sm text-[#9E9E9E]">
          Filter by speciality or city, or view all available doctors.
        </p>

        {/* Mobile filter toggle */}
        <div className="mt-6 sm:hidden flex justify-end">
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="flex items-center gap-2 text-[#D4AF37] font-medium"
          >
            {showFilter ? <HiOutlineChevronUp /> : <HiOutlineChevronDown />}
            Filters
          </button>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row gap-6">
          {/* Filters sidebar */}
          <aside
            className={`${showFilter ? 'block' : 'hidden'} sm:block sm:w-1/4 space-y-6`}
          >
            {/* Speciality Filter */}
            <div className="bg-[#1F1F1F] p-4 rounded-lg border border-[#2A2A2A]">
              <h2 className="text-lg font-medium text-[#FFFFFF] mb-3">Specialities</h2>
              <ul className="max-h-48 overflow-y-auto pr-2 space-y-2 scrollbar-thin scrollbar-thumb-[#D4AF37] scrollbar-track-[#1F1F1F]">
                {specialities.map((spec) => (
                  <li key={spec}>
                    <button
                      onClick={() => toggleSpeciality(spec)}
                      className={`w-full text-left text-sm py-2 px-3 rounded transition-colors duration-200 ${
                        spec === speciality
                          ? 'bg-[#D4AF37] text-[#121212]'
                          : 'text-[#9E9E9E] hover:bg-[#2A2A2A]'
                      }`}
                    >
                      {spec}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* City Filter */}
            <div className="bg-[#1F1F1F] p-4 rounded-lg border border-[#2A2A2A]">
              <h2 className="text-lg font-medium text-[#FFFFFF] mb-3">Cities</h2>
              <ul className="max-h-48 overflow-y-auto pr-2 space-y-2 scrollbar-thin scrollbar-thumb-[#D4AF37] scrollbar-track-[#1F1F1F]">
                {cities.map((city) => (
                  <li key={city}>
                    <button
                      onClick={() =>
                        setSelectedCity((c) => (c === city ? '' : city))
                      }
                      className={`w-full text-left text-sm py-2 px-3 rounded transition-colors duration-200 ${
                        city === selectedCity
                          ? 'bg-[#D4AF37] text-[#121212]'
                          : 'text-[#9E9E9E] hover:bg-[#2A2A2A]'
                      }`}
                    >
                      {city}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Doctors grid */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filterDoc.length > 0 ? (
              filterDoc.map((doc) => (
                <div
                  key={doc._id}
                  className="flex flex-col h-96 bg-[#2A2A2A] rounded-xl overflow-hidden cursor-pointer transform hover:-translate-y-1 hover:shadow-lg transition-transform duration-300"
                >
                  {/* Image */}
                  <div className="h-48 bg-[#2A2A2A] flex items-center justify-center overflow-hidden">
                    <img
                      src={doc.image}
                      alt={doc.name}
                      className="h-full w-auto object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-4 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-sm mb-2">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            doc.available ? 'bg-[#4CAF50]' : 'bg-[#E53935]'
                          }`}
                        />
                        <span
                          className={
                            doc.available
                              ? 'text-[#4CAF50]'
                              : 'text-[#E53935]'
                          }
                        >
                          {doc.available ? 'Available' : 'Not Available'}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-[#FFFFFF]">
                        {doc.name}
                      </h3>
                      <p className="mt-1 text-sm text-[#9E9E9E]">
                        {doc.speciality}
                      </p>
                      {doc.city && (
                        <p className="mt-1 text-sm text-[#9E9E9E]">
                          {doc.city}
                        </p>
                      )}
                    </div>

                    {/* Action */}
                    <button
                      onClick={() => navigate(`/appointment/${doc._id}`)}
                      className="mt-4 bg-[#D4AF37] text-[#121212] py-2 rounded-full text-sm font-medium hover:bg-[#FFD15C] transition"
                    >
                      Book Appointment
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-[#9E9E9E]">
                No doctors match these filters.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Doctors;