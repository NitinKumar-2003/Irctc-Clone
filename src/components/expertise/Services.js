import React from 'react'

function Services() {
  return (
    <div className=''>
        <div className='xl:w-3/5 mx-auto flex flex-col gap-5 my-24'>
            <div className='xl:flex'>
                <div className='w-full flex flex-col justify-center items-center my-2'><img src="/assets/payfooter1.png" className="w-5/6" alt="" /></div>
                <div className='w-full bg-cyan-100 rounded-2xl p-4'>
                    <h1 className='font-bold text-4xl text-center'>Convenience</h1>
                    <div className='my-3'>
                        <h2 className='font-semibold text-lg'>Seamless Transactions:</h2>
                        <p>Our platform offers user friendly interface for quick and hassle free transaction, allowing users to send and receive money with ease.</p>
                    </div>
                    <div className='my-3'>
                        <h2 className='font-semibold text-lg'>24/7 Availability</h2>
                        <p>Users can initiate transactions at any time, providing flexibility and convenience for their financial activities.</p>
                    </div>
                </div>
            </div>
            <div className='xl:flex'>
                <div className='w-full bg-cyan-100 rounded-2xl p-4'>
                <h1 className='font-bold text-4xl text-center'>Security</h1>
                    <div className='my-3'>
                        <h2 className='font-semibold text-lg'>Robust Security Measures:</h2>
                        <p>We prioritize the security of financial transactions, implementing advanced encryption and authentication mechanisms to safeguard user data and funds.</p>
                    </div>
                    <div className='my-3'>
                        <h2 className='font-semibold text-lg'>Fraud Protection:</h2>
                        <p>Our system employs sophisticated fraud detection and prevention measures to ensure the safety of every transaction.</p>
                    </div>
                </div>
                <div className='w-full flex flex-col justify-center items-center my-2'><img src="/assets/payfooter2.png" className="w-5/6" alt="" /></div>
            </div>
            <div className='xl:flex'>
                <div className='w-full flex flex-col justify-center items-center my-2'><img src="/assets/home3.png" className="w-4/5" alt="" /></div>
                <div className='w-full bg-cyan-100 rounded-2xl p-4'>
                <h1 className='font-bold text-4xl text-center'>Customer Support</h1>
                    <div className='my-3'>
                        <h2 className='font-semibold text-lg'>Responsive Support Team:</h2>
                        <p>Our dedicated customer support team is available to assist users with any issues, ensuring a positive and reliable user experience.</p>
                    </div>
                    <div className='my-3'>
                        <h2 className='font-semibold text-lg'>Eductional Resources:</h2>
                        <p>We provide informative material and guides to help users navigate the platform and understand the features available</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Services