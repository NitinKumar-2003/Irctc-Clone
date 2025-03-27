import { doc, setDoc } from 'firebase/firestore';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { fireDB } from '../../firebase/FirebaseConfig';
import { toast } from 'react-toastify';

const data1 = {
        "train_number": "12951",
        "train_name": "Rajdhani Express",
        "run_days": [
          "Tue",
          "Thu",
          "Fri",
          "Sun"
        ],
        "train_src": "MMCT",
        "train_dstn": "NDLS",
        "from_std": "17:24",
        "from_sta": "17:22",
        "local_train_from_sta": 1042,
        "to_sta": "08:32",
        "to_std": "08:32",
        "from_day": 0,
        "to_day": 1,
        "d_day": 0,
        "from": "BVI",
        "to": "NDLS",
        "from_station_name": "BORIVALI",
        "halt_stn": 7,
        "distance": 1354,
        "to_station_name": "NEW DELHI",
        "duration": "15:8",
        "special_train": false,
        "train_type": "RAJ",
        "score": 25,
        "score_train_type": 5,
        "score_booking_requency": 0,
        "frequency_perc": 0,
        "from_distance_text": "",
        "to_distance_text": "",
        "duration_rating": 1,
        "score_duration": 10,
        "score_std": 10,
        "score_user_preferred": 0,
        "train_date": "30-01-2024",
        "class_type": [
          "3A",
          "2A",
          "1A"
        ]
      }

function Bookingticket({data,currUser,i}) {
    
    const navigate = useNavigate();

    const handlePay = ()=>{
        // console.log("data",data);
        navigate('/payment',{state:{data:data}});
    }

    const handleRemove = async(e)=>{
        e.preventDefault();
        let newTrains = [];
        currUser.trains.filter((i)=>{
            if(i!=data){
                newTrains.push(i);
            }
        })
        currUser.trains=newTrains;
        await setDoc(doc(fireDB,"users",currUser.id),currUser);
        toast.success("Your Ticketdetails succesfully removed it!")
        setTimeout(() => {
            window.location.reload();
        },800);
    }
  return (
    <div>
        <div className='h-full xl:w-full p-2 sm:w-full flex justify-center items-center'>
            <div class="bg-blue-50 border-none dropdown flex flex-col w-full xl:w-4/6 rounded-md xl:ml-30 shadow-md">
                <button class="btn outline-none rounded-md xl:flex justify-between items-center" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <div className='xl:flex gap-2'>
                                <div className='bg-blue-100 py-1 px-3 rounded-full my-1'>{i+1}</div>
                                <div className='bg-blue-100 py-1 px-3 rounded-full my-1'>FROM : {data.from_station_name}</div>
                                <div className='bg-blue-100 py-1 px-3 rounded-full my-1'>TO : {data.to_station_name}</div>
                                <div className='bg-blue-100 py-1 px-3 rounded-full my-1'>DATE : {data.train_date}</div>
                                <div className='bg-blue-100 py-1 px-3 rounded-full my-1'>TRAIN : {data.train_number}</div>
                                {
                                    data.paid==true?
                                    <div className='bg-green-300 py-1 px-3 rounded-full'>Paid</div>:""
                                }
                    </div>
                    <div><button className='dropdown-toggle'></button></div>
                </button>
                <table class="dropdown-menu w-full p-3">
                    <tr>
                        <td className='col-5'>Train Name</td>
                        <td className=''>:</td>
                        <td className=''>{data.train_name}</td>
                    </tr>
                    <tr>
                        <td>From</td>
                        <td>:</td>
                        <td>{data.from_station_name}</td>
                    </tr>
                    <tr>
                        <td>To</td>
                        <td>:</td>
                        <td>{data.to_station_name}</td>
                    </tr>
                    <tr>
                        <td>Distance</td>
                        <td>:</td>
                        <td>{data.distance} km</td>
                    </tr>
                    <tr>
                        <td>Date</td>
                        <td>:</td>
                        <td>{data.train_date}</td>
                    </tr>
                    <tr>
                        <td>All Classes</td>
                        <td>:</td>
                        <td>{data.class_type}</td>
                    </tr>
                    <tr>
                        <td>TrainNumber</td>
                        <td>:</td>
                        <td>{data.train_number}</td>
                    </tr>
                    <tr>
                        <td>AcChairCar</td>
                        <td>:</td>
                        <td>{data.class_type[0]}</td>
                    </tr>
                    <tr>
                        <td>AC3Tier</td>
                        <td>:</td>
                        <td>Yes</td>
                    </tr>
                    <tr>
                        <td>ExecChairCar</td>
                        <td>:</td>
                        <td>Yes</td>
                    </tr>
                    <tr>
                        <td>SecondSitting</td>
                        <td>:</td>
                        <td>No</td>
                    </tr>
                    <tr>
                        <td>Price</td>
                        <td>:</td>
                        <td>{data.score*data.score_duration}</td>
                    </tr>
                    <div className='gap-3 py-2 flex'> 
                        {
                            data.paid?<button className="btn hover:bg-blue-950 text-white px-3 bg-green-400">PAID</button>
                            :<button className="btn hover:bg-blue-950 text-white px-3 bg-blue-900" onClick={handlePay}>PAY NOW</button>
                        }
                        <button className='btn border-1 text-blue-900 border-blue-900 hover:bg-blue-950 hover:text-white' onClick={handleRemove}>REMOVE ITEM--</button>
                    </div>
                </table>
                
            </div>
        </div>
    </div>
  )
}

export default Bookingticket