import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { assets, doctors } from '../assets/assets_frontend/assets';

const Appointment = () => {
  // Extract doctor ID from the URL params
  const { docId } = useParams();
  
  // Define the days of the week for displaying the date in a readable format
  const daysOfWeek = ['SUN', 'MON', 'TUES', 'WED', 'THU', 'FRI', 'SAT'];

  // State to hold doctor information and available time slots
  const [docInfo, setDocInfo] = useState();
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0); // To track the selected slot index
  const [slotTime, setSlotTime] = useState(''); // To track the selected time for booking

  // Function to generate and fetch available time slots for the doctor
  const getAvailableSlots = async () => {
    setDocSlots([]); // Reset the slots array on each fetch

    let today = new Date(); // Get the current date

    // Loop to generate slots for the next 7 days
    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      // Set end time for the current day to 9 PM
      let endTime = new Date(today);
      endTime.setDate(today.getDate() + i + 1);
      endTime.setHours(21, 0, 0, 0);

      // Adjust start time for today (if it's today, start at current time but not earlier than 10 AM)
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10); // For future days, set start time to 10 AM
        currentDate.setMinutes(0);
      }

      // Array to hold the time slots for the current day
      let timeSlots = [];

      // Loop to generate time slots every 30 minutes
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        });

        // Add the slot with datetime and formatted time
        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime
        });

        currentDate.setMinutes(currentDate.getMinutes() + 30); // Increment by 30 minutes
      }

      // Add the generated slots for this day to the state
      setDocSlots((prev) => [...prev, ...timeSlots]);
    }
  };

  // Fetch the available slots on docInfo change
  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);

  // Log the available slots to the console for debugging
  useEffect(() => {
    console.log(docSlots);
  }, [docSlots]);

  // Fetch doctor information based on the docId from URL params
  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo); // Set the fetched doctor info to state
  };

  // Fetch doctor info whenever the docId or doctors list changes
  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  return (
    // Render the component only when docInfo is available
    docInfo && (
      <div>
        {/* Doctor Information Section */}
        <div className='flex flex-col sm:flex-row gap-4'>
          <div>
            <img
              className='bg-primary w-full sm:max-w-72 rounded-lg'
              src={docInfo.image}
              alt={docInfo.name}
            />
          </div>
          <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
            <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>
              {docInfo.name}{' '}
              <img className='w-5' src={assets.verified_icon} alt='verified' />
            </p>
            <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
              <p>
                {docInfo.degree} - {docInfo.speciality}
              </p>
              <button className='py-0.5 px-2 border text-xs rounded-full'>
                {docInfo.experience}
              </button>
            </div>
            <div>
              <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>
                About
                <img src={assets.info_icon} alt='info' />
              </p>
              <p className='text-sm text-gray-500 max-w-[700px] mt-1'>
                {docInfo.about}
              </p>
            </div>
            <p className='text-gray-500 font-medium mt-4'>
              Appointment fee:
              <span className='text-gray-600'> $100</span>
            </p>
          </div>
        </div>

        {/* Booking Slots Section */}
        <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
          <p>Booking slots</p>
          <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
            {/* Render available slots */}
            {docSlots.length &&
              docSlots.map((item, index) => (
                <div
                  onClick={() => setSlotIndex(index)} // Set selected slot index on click
                  className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                    slotIndex === index ? 'bg-primary text-white' : 'border border-gray-200'
                  }`}
                  key={index}
                >
                  <p>{daysOfWeek[item.datetime.getDay()]}</p> {/* Day of the week */}
                  <p>{item.datetime.getDate()}</p> {/* Date */}
                </div>
              ))}
          </div>
        </div>
      </div>
    )
  );
};

export default Appointment;
