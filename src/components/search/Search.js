import React, { useContext, useEffect, useState } from 'react'
import { data } from './stations';
import Ticketdetail from '../ticketdetail/Ticketdetail';
import { Station } from './Station';
import { CgArrowsExchangeAltV } from "react-icons/cg";
import ResultTickets from '../ticketdetail/ResultTickets';
import { toast } from 'react-toastify';
import { redirect, useNavigate } from 'react-router-dom';
import myContext from '../../context/myContext';
import Baba from "../assets/saibaba.jpg";
import Durga from "../assets/durga.jpg";
import Ramayana from "../assets/ram.jpg";

const url = 'https://irctc1.p.rapidapi.com/api/v3/trainBetweenStations?fromStationCode=BVI&toStationCode=NDLS&dateOfJourney=2024-01-30';

const options1 = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'f4b9ca1f2dmsh642f816e1012b45p1a82f0jsn6201a258721b',
		'X-RapidAPI-Host': 'irctc1.p.rapidapi.com'
	}
};
const options2 = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '69e78f34f6msh1b62461f1f1de44p1ff618jsnea69afe74bef',
		'X-RapidAPI-Host': 'irctc1.p.rapidapi.com'
	}
};
const options3 = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '3381645f1cmshec06a90d8dea6a0p1ca80fjsnefc757824250',
		'X-RapidAPI-Host': 'irctc1.p.rapidapi.com'
	}
};

function Search() {
  let [responseData,setResponseData] = useState('');

  
    const [from,setFrom] = useState("");
    const [dest,setDest] = useState("");
    const [fcode,setFcode] = useState("");
    const [dcode,setDcode] = useState("");

    const setFromVal = (val)=>{
        setFrom(val.station);
        setFcode(val.code);
    }
    const setDestVal = (val)=>{
        setDest(val.station);
        setDcode(val.code);
    }
    const change = (e)=>{
        e.preventDefault();
        const to = dest;
        setDest(from);
        setFrom(to);
    }

    const [date,setDate] = useState("");
    const [allclass,setAllclass] = useState("");
    const [category,setCategory] = useState("");
    // const [formdata,setFormdata] = useState("");
    const [trains,setTrains] = useState([]);

    // const fetchData = async()=>{ 
    //     try {
    //       const response = await fetch(url, options);
    //       const result = await response.text();
    //       console.log(result);
    //     } catch (error) {
    //       console.error(error);
    //     }
    //   }
    
    
    const navigate = useNavigate();

    // const context = useContext(myContext);
    // const {GetUser} = context;
    // const loggeduser = GetUser();
    // const currUser = loggeduser[0];
    const user = JSON.parse(localStorage.getItem('user'));
    
    const handleSearch1 = async(e)=>{
        e.preventDefault();
        if(!user)   navigate('/login');
        else if(fcode === "" || dcode === "" || date === ""){
            toast("All the fields are required!");
        }else{
            try {
                const res = await fetch(
                  `https://irctc1.p.rapidapi.com/api/v3/trainBetweenStations?fromStationCode=${fcode}&toStationCode=${dcode}&dateOfJourney=${date}`,
                  options1
                );
            
                if (!res.ok) {
                  throw new Error(`Failed to fetch data. Status: ${res.status}`);
                }
            
                const finaldata = await res.json();
                // console.log("fdata", finaldata);
                setTrains(finaldata);
                navigate('/',{state:{trains:trains}});
                toast("If Search button not gives response then click second time!")
              } catch (error) {
                toast.error('Error during API request:', error.message);
              }
        }
    }
    
    const handleSearch2 = async(e)=>{
        e.preventDefault();
        if(!user)   navigate('/login');
        else if(fcode === "" || dcode === "" || date === ""){
            toast("All the fields are required!");
        }else{
            try {
                const res = await fetch(
                  `https://irctc1.p.rapidapi.com/api/v3/trainBetweenStations?fromStationCode=${fcode}&toStationCode=${dcode}&dateOfJourney=${date}`,
                  options2
                );
            
                if (!res.ok) {
                  throw new Error(`Failed to fetch data. Status: ${res.status}`);
                }
            
                const finaldata = await res.json();
                // console.log("fdata", finaldata);
                setTrains(finaldata);
                navigate('/',{state:{trains:trains}});
                toast("If Search button not gives response then click second time!")
              } catch (error) {
                toast.error('Error during API request:', error.message);
              }
        }
    }
    const handleSearch3 = async(e)=>{
        e.preventDefault();
        if(!user)   navigate('/login');
        else if(fcode === "" || dcode === "" || date === ""){
            toast("All the fields are required!");
        }else{
            try {
                const res = await fetch(
                  `https://irctc1.p.rapidapi.com/api/v3/trainBetweenStations?fromStationCode=${fcode}&toStationCode=${dcode}&dateOfJourney=${date}`,
                  options3
                );
            
                if (!res.ok) {
                  throw new Error(`Failed to fetch data. Status: ${res.status}`);
                }
            
                const finaldata = await res.json();
                // console.log("fdata", finaldata);
                setTrains(finaldata);
                navigate('/',{state:{trains:trains}});
                toast("If Search button not gives response then click second time!")
              } catch (error) {
                toast.error('Error during API request:', error.message);
              }
        }
    }
    // console.log("station",Station.data[0]);
    // useEffect(()=>{
    //     handleSearch();
    //   },[handleSearch]);
  return (
    <div>
        <div className='h-full w-full'>
        <form>
        {/* <img src="https://partheniumprojects.com/wp-content/uploads/2019/01/Railway-Reservation-System.jpg" alt="" className='xl:rounded-tr-[120px] xl:rounded-bl-[120px] h-3/4 w-5/6'/> */}
            <div className='xl:flex xl:flex-col xl:items-center p-5 '>
                <h1 className='font-semibold text-3xl'>Start Your Journey</h1>
                <div className='xl:flex xl:flex-col xl:item-start xl:w-1/3 mt-2'>
                    <label htmlFor="" className='text-xl pb-2'>From :</label>
                    <input type="text" name="" value={from} onChange={(e)=>setFrom(e.target.value)} placeholder="Source Location" className='border-1 border-gray-500 p-3 rounded-md outline-none w-full'/>
                    <div className='rounded-md w-full'>
                        {
                            data
                            .filter((item)=>{
                                return from.toLowerCase() === "" ? "" : item.station.toLowerCase().includes(from)
                            })
                            .map((item)=>{
                                return(
                                    <div className=' bg-gray-200 my-1 rounded-md outline-none w-full'>
                                        <button  onClick={()=>setFromVal(item)} className='flex w-full p-3 rounded-md'>
                                            {item.station} - {item.code}  {item.state}
                                        </button>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className='flex justify-center items-center w-full h-full py-3'>
                    <button className='btn bg-blue-900 text-white hover:bg-blue-950 text-3xl' onClick={change}><CgArrowsExchangeAltV /></button>
                </div>
                <div className='xl:flex xl:flex-col xl:item-start xl:w-1/3'>
                    <label htmlFor="" className='text-xl pb-2'>To :</label>
                    <input type="text" name="" value={dest} onChange={(e)=>setDest(e.target.value)} placeholder="Destination" className='border-1 border-gray-500 p-3 rounded-md outline-none w-full'/>
                    <div className='rounded-md w-full'>
                        {
                            data
                            .filter((item)=>{
                                return dest.toLowerCase() === "" ? "" : item.station.toLowerCase().includes(dest)
                            })
                            .map((item)=>{
                                return(
                                    <div className=' bg-gray-200 my-1 rounded-md outline-none w-full'>
                                        <button  onClick={()=>setDestVal(item)} className='flex w-full p-3 rounded-md'>
                                            {item.station} - {item.code}  {item.state}
                                        </button>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            
            <div className=' '>
                <div className='flex justify-center  w-[1500px] ml-96 gap-3  p-10 opacity-95 shadow-2xl flex-row items-center bg-blue-950 h-[200px] bg-opacity-60 rounded-lg mb-52'>
                    <div className='xl:w-1/3 flex flex-col border-2 border-blue-900 rounded-md p-2 my-2'>
                        <label htmlFor="date" className='font-bold text-xl'>Date</label>
                        <input type="date" className="p-2 rounded-md w-2/3 border-1 border-gray-500" value={date} onChange={(e)=>setDate(e.target.value)}/>
                    </div>
                    <div className='xl:w-1/3 flex flex-col border-2 border-blue-900 rounded-md p-2 shadow-2xl my-2'>
                        <label htmlFor="state" className='font-bold text-xl'>All Classes</label>
                        <select name="allclass" value={allclass} onChange={(e)=>setAllclass(e.target.value)} className='border-1 border-gray-500 p-3 rounded-md outline-none'>
                            <option value="All Classes" name="allclass" selected>All Classes</option>
                            <option value="2S" name="allclass" >Second Sitting (2S)</option>
                            <option value="CC" name="allclass" >AC Chair Car (CC)</option>
                            <option value="EC" name="allclass" >Exec. Chair Car (EC)</option>
                        </select>
                    </div>
                    <div className='xl:w-1/3 flex flex-col border-2 border-blue-900 rounded-md p-2 my-2'>
                        <label htmlFor="category" className='font-bold text-xl'>Categories</label>
                        <select name="category" value={category} onChange={(e)=>setCategory(e.target.value)} className='border-1 border-gray-500 p-3 rounded-md outline-none'>
                            <option value="GENERAL" name="category">GENERAL</option>
                            <option value="LADIES" name="category">LADIES</option>
                            <option value="LOWER" name="category">LOWER BIRTH/SR.CITIZEN</option>
                            <option value="PERSON" name="category">PERSON WITH DISABILITY</option>
                            <option value="DUTY" name="category">DUTY PASS</option>
                            <option value="TATKAL" name="category">TATKAL</option>
                        </select>
                    </div>
                </div>
                <div className='flex justify-center p-3 gap-2'>
                    <button onClick={handleSearch1} className='btn bg-blue-900 text-white hover:bg-blue-950 px-3'>SEARCH1</button>
                    <button onClick={handleSearch2} className='btn bg-blue-900 text-white hover:bg-blue-950 px-3'>SEARCH2</button>
                    <button onClick={handleSearch3} className='btn bg-blue-900 text-white hover:bg-blue-950 px-3'>SEARCH3</button>
                </div>
                <div className="w-full bg-indigo-500 text-white p-6 rounded-lg flex justify-center">
            <h3 className=" flex justify-center text-lg font-bold">15% OFF</h3>
            <p className='pl-10'>on Tours in Special Trains</p>
            {/* <img src="https://upload.wikimedia.org/wikipedia/commons/5/5c/Indian_Train.png" alt="Train Offer" className="h-16 mx-auto mt-4" /> */}
          </div>
          <div className=" mx-auto py-8 bg-gray-300 w-full">
        <div className="flex justify-around">
          <h2 className="text-2xl font-semibold mb-6">Packages</h2>
          <h2 className="text-2xl font-semibold mb-6">View More</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center">
  {[
    {
      img: Baba,
      title: "Baba Centenary Celebration Special - Shirdi Special",
      duration: "7 Days",
      cost: "₹15230/-",
    },
    {
      img: Durga,
      title: "Travel this Durga Puja - Enchanting North Bengal",
      duration: "7 Days",
      cost: "₹14830/-",
    },
    {
      img: Ramayana,
      title: "Shri Ramayana Yatra - Srilanka",
      duration: "7 Days",
      cost: "₹35630/-",
    },
  ].map((pkg, index) => (
    <div
      key={index}
      className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col items-center"
    >
      <img
        src={pkg.img}
        alt={pkg.title}
        className="w-[400px] h-96 object-cover"
      />
      <div className="p-4 text-center">
        <h3 className="font-semibold text-lg">{pkg.title}</h3>
        <p className="text-gray-500">Duration: {pkg.duration}</p>
        <p className="text-red-500 font-semibold">Cost: {pkg.cost}</p>
      </div>
    </div>
  ))}
</div>
      </div>
            </div>
        </form>
        </div>
        <div>
            {/* {
                
                Object.keys(Station.data).forEach((train)=>{
                    return(
                        <div>
                            <Ticketdetail ticket={train}/>
                        </div>
                    )
                })

            } */}
            <ResultTickets/>
        </div>
    </div>
  )
}

export default Search