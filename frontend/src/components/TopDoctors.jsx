import React from 'react'
import { doctors } from '../assets/assets_frontend/assets'
import { useNavigate } from 'react-router-dom'

const TopDoctors = () => {
    const navigate = useNavigate()

  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
        <h1 className='text-3xl font-medium'>Top Doctors to Book</h1>
        <p className='sm:1/3 text-center text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae provident deleniti veniam nihil minus natus cum perspiciatis voluptatum fugit possimus recusandae fuga, mollitia voluptate adipisci porro minima magni expedita.
        </p>
        <div className='w-full grid grid-cols-4 gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
            {doctors.slice(0,12).map((item,index)=>(
                <div onClick={()=>navigate(`/appointment/${item._id}`)} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}>
                    <img className='bg-blue-50' src={item.image} alt=''/>
                    <div className='p-4'>
                        <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                            <p className='w-2 h-2 bg-green-500 rounded-full'></p><p>Available</p>
                        </div>
                        <p className='text-gray-900 text-lg'>{item.name}</p>
                        <p className='text-gray-600 text-sm'>{item.speciality}</p>
                    </div>               
                </div>
            ))}
        </div>
        <button onClick={()=>navigate('/doctors')} className='bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10'>more</button>
    </div>
  )
}

export default TopDoctors