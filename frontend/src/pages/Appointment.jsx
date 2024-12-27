import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { assets, doctors } from '../assets/assets_frontend/assets';
import RelatedDoctors from '../components/RelatedDoctors';

const Appointment = () => {
  const { docId } = useParams();
  const daysOfWeek = ['SUN', 'MON', 'TUES', 'WED', 'THU', 'FRI', 'SAT'];

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);

  const getAvailableSlots = async () => {
    setDocSlots([]);
    let today = new Date();

    let generatedSlots = [];

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(Math.max(currentDate.getHours() + 1, 10));
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10, 0, 0, 0);
      }

      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        });

        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime
        });

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      generatedSlots.push(timeSlots);
    }
    setDocSlots(generatedSlots);
  };

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  };

  useEffect(() => {
    fetchDocInfo();
  }, [docId]);

  return (
    docInfo && (
      <div>
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

        <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
          <p>Booking slots</p>
          <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
            {docSlots.length > 0 &&
              docSlots.map((slots, index) => (
                <div 
                  key={index} 
                  onClick={() => setSlotIndex(index)} 
                  className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : 'bg-white border border-gray-300'}`}
                >
                  <p>{daysOfWeek[slots[0].datetime.getDay()]}</p>
                  <p>{slots[0].datetime.getDate()}</p>
                </div>
              ))}
          </div>
          <div className='flex items-center gap-3 w-full overflow-x-auto mt-4'>
            {docSlots.length > 0 && docSlots[slotIndex] &&
              docSlots[slotIndex].map((item, idx) => (
                <p onClick={() => setSlotTime(item.time)}
                  key={idx} 
                  className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotIndex ? 'bg-primary text-white' : 'bg-white border border-gray-300'}`}
                >
                  {item.time}
                </p>
                
              ))}
          </div>
          <button className='bg-primary text-white py-2 px-4 rounded-full mt-4'>Book an appointment</button>
        </div>
        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>
    )
  );
};

export default Appointment;
