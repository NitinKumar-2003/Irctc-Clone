import React from 'react'

function IntroSection() {
  return (
    <div>
        <div className='xl:h-[500px] bg-gradient-to-b from-gray-100 to-blue-300 xl:flex justify-center items-center'>
              <div className='xl:w-1/3 p-5 text-center'>
                <h1 className='font-semibold text-4xl'>WELCOME,</h1>
                <p className=''>Revolutionize your travel experience with our train travel website, offering seamless booking, real-time updates, and curated itineraries. Explore the world by rail, where every journey is a story waiting to be written.</p>
              </div>
              <div className='xl:w-[430px] h-full flex justify-center items-center py-4'>
                <img src="assets/train_img5.jpg" alt="" className='xl:rounded-tr-[120px] xl:rounded-bl-[120px] h-3/4 w-5/6'/>
              </div>
        </div>
    </div>
  )
}

export default IntroSection