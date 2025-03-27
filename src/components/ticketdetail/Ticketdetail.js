import {
  faCircleCheck,
  faMinus,
  faPlus,
  faTrainSubway,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Bookingticket from "./Bookingticket";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import { toast } from "react-toastify";

// const ticket = {
//     "status": true,
//     "message": "Success",
//     "timestamp": 1706550777275,
//     "data":
//     [
//       {
//         "train_number": "12951",
//         "train_name": "Rajdhani Express",
//         "run_days": [
//           "Tue",
//           "Thu",
//           "Fri",
//           "Sun"
//         ],
//         "train_src": "MMCT",
//         "train_dstn": "NDLS",
//         "from_std": "17:24",
//         "from_sta": "17:22",
//         "local_train_from_sta": 1042,
//         "to_sta": "08:32",
//         "to_std": "08:32",
//         "from_day": 0,
//         "to_day": 1,
//         "d_day": 0,
//         "from": "BVI",
//         "to": "NDLS",
//         "from_station_name": "BORIVALI",
//         "halt_stn": 7,
//         "distance": 1354,
//         "to_station_name": "NEW DELHI",
//         "duration": "15:8",
//         "special_train": false,
//         "train_type": "RAJ",
//         "score": 25,
//         "score_train_type": 5,
//         "score_booking_requency": 0,
//         "frequency_perc": 0,
//         "from_distance_text": "",
//         "to_distance_text": "",
//         "duration_rating": 1,
//         "score_duration": 10,
//         "score_std": 10,
//         "score_user_preferred": 0,
//         "train_date": "30-01-2024",
//         "class_type": [
//           "3A",
//           "2A",
//           "1A"
//         ]
//       },
//       {
//         "train_number": "12951",
//         "train_name": "MUMBAI CENTRAL - NEW DELHI Rajdhani Express",
//         "run_days": [
//           "Mon",
//           "Tue",
//           "Wed",
//           "Thu",
//           "Fri",
//           "Sat",
//           "Sun"
//         ],
//         "train_src": "MMCT",
//         "train_dstn": "NDLS",
//         "from_std": "17:24",
//         "from_sta": "17:22",
//         "local_train_from_sta": 1042,
//         "to_sta": "08:32",
//         "to_std": "08:32",
//         "from_day": 0,
//         "to_day": 1,
//         "d_day": 0,
//         "from": "BVI",
//         "to": "NDLS",
//         "from_station_name": "BORIVALI",
//         "to_station_name": "NEW DELHI",
//         "duration": "15:8",
//         "special_train": false,
//         "train_type": "RAJ",
//         "train_date": "26-05-2023",
//         "class_type": [
//           "3A",
//           "2A",
//           "1A"
//         ]
//       }
//     ]
//   }

function Ticketdetail({ data, currUser }) {
  let days = {
    Mon: false,
    Tue: false,
    Wed: false,
    Thu: false,
    Fri: false,
    Sat: false,
    Sun: false,
  };

  data.run_days.forEach((day) => {
    if (day == "Mon") days.Mon = true;
    if (day == "Tue") days.Tue = true;
    if (day == "Wed") days.Wed = true;
    if (day == "Thu") days.Thu = true;
    if (day == "Fri") days.Fri = true;
    if (day == "Sat") days.Sat = true;
    if (day == "Sun") days.Sun = true;
  });

  const navigate = useNavigate();

  const handleBook = async (e) => {
    // e.preventDefault();
    if(currUser.trains.some((i)=>i.train_number === data.train_number)){
          toast("Your traindetails already added in booklist!");
    }else{
      data.booked = true;
      data.paid = false;
      currUser?.trains.push(data);
      await setDoc(doc(fireDB, "users", currUser.id), currUser);
      toast.success("Your traindetails succesfully added in booklist!");
    }
  };

  const handlePaid = async (e) => {
    e.preventDefault();
    if(currUser.trains.some((i)=>i.train_number === data.train_number && i.paid === true)){
      toast("Your ticket is already booked!");
    }else{
      data.booked = true;
      data.paid = false;
      currUser?.trains.push(data);
      await setDoc(doc(fireDB, "users", currUser.id), currUser);
      navigate("/payment", { state: { data: data, currUser: currUser } });
    }
  };

  const removeBook = async () => {
    let newTrains = [];
    // console.log("old trains", currUser.trains);
    currUser.trains.filter((i) => {
      if (i != data) {
        newTrains.push(i);
      }
    });
    // console.log("newtrains", newTrains);
    // currUser.trains=newTrains;
    // console.log("old trains", currUser.trains);
    await setDoc(doc(fireDB,"users",currUser.id),currUser);
    // window.location.href='/booklist';
  };
  // console.log(currUser);
  return (
    <div>
      <div className="py-4">
        <div className="xl:h-1/3 bg-cyan-100 w-4/5 mx-auto rounded-lg shadow-md p-3">
          <div className="xl:h-1/4 xl:flex justify-between items-center p-2 ">
            <div className="font-bold xl:w-1/5 text-center shadow-sm shadow-gray-300">{data.train_name}</div>
            <div className="text-center text-blue-900">
              <p className="font-bold">Runs on:</p>
              <span
                className={`px-2 cursor-pointer font-semibold ${
                  days.Mon ? "text-blue-950" : "text-gray-400"
                }`}
                title="Sun"
              >
                M
              </span>
              <span
                className={`px-3 cursor-pointer font-semibold ${
                  days.Tue ? "text-blue-950" : "text-gray-400"
                }`}
                title="Tue"
              >
                T
              </span>
              <span
                className={`px-2 cursor-pointer font-semibold ${
                  days.Wed ? "text-blue-950" : "text-gray-400"
                }`}
                title="Wed"
              >
                W
              </span>
              <span
                className={`px-3 cursor-pointer font-semibold ${
                  days.Thu ? "text-blue-950" : "text-gray-400"
                }`}
                title="Thu"
              >
                T
              </span>
              <span
                className={`px-2 cursor-pointer font-semibold ${
                  days.Fri ? "text-blue-950" : "text-gray-400"
                }`}
                title="Fri"
              >
                F
              </span>
              <span
                className={`px-3 cursor-pointer font-semibold ${
                  days.Sat ? "text-blue-950" : "text-gray-400"
                }`}
                title="Sat"
              >
                S
              </span>
              <span
                className={`px-2 cursor-pointer font-semibold ${
                  days.Sun ? "text-blue-950" : "text-gray-400"
                }`}
                title="Sun"
              >
                S
              </span>
            </div>
            <div className="text-center">
              <button className="btn border-1 text-blue-900 border-blue-900 hover:bg-blue-950 hover:text-white my-2">
                TRAIN SCHEDULE
              </button>
            </div>
          </div>
          <div className="xl:h-1/4 xl:flex justify-between text-center items-center p-2 text-gray-400 font-semibold">
            <div className="">
              {data.to_sta} | {data.train_src} | {data.train_date}
            </div>
            <div className="text-center xl:ml-20">
              <p>{data.duration}</p>
            </div>
            <div>
              {data.to_std} | {data.train_dstn} | {data.train_date}
            </div>
          </div>
          <div className="h-1/4 xl:flex items-center gap-3 p-2">
            <div>Discount On</div>
            <div className="gap-3 flex">
              {data.class_type?.map((item) => {
                return (
                  <button className="btn border-1 text-blue-900 border-blue-900 hover:bg-blue-950 hover:text-white">
                    {item}
                  </button>
                );
              })}
              {/* <button className='btn border-1 text-blue-900 border-blue-900 hover:bg-blue-950 hover:text-white'>ACCC</button> */}
            </div>
          </div>
          <div className="h-1/4 flex items-center p-2">
            <div className="flex gap-3">
              {data.booked == true ? (
                <button
                  className="btn border-1 text-blue-900 border-blue-900 hover:bg-blue-950 hover:text-white font-semibold flex justify-center items-center gap-2"
                  onClick={removeBook}
                >
                  REMOVE FROM BOOKLIST <FontAwesomeIcon icon={faMinus} />
                </button>
              ) : (
                <button
                  className="btn border-1 text-blue-900 border-blue-900 hover:bg-blue-950 hover:text-white font-semibold flex justify-center items-center gap-2"
                  onClick={handleBook}
                >
                  ADD TO BOOKLIST <FontAwesomeIcon icon={faPlus} />
                </button>
              )}
              {data.paid == true ? (
                <button className="btn border-1 text-blue-900 border-blue-900 hover:bg-blue-950 hover:text-white font-semibold flex justify-center items-center gap-2 cursor-none">
                  BOOKED <FontAwesomeIcon icon={faCircleCheck} />
                </button>
              ) : (
                <button
                  className="btn border-1 text-blue-900 border-blue-900 hover:bg-blue-950 hover:text-white font-semibold flex justify-center items-center gap-2"
                  onClick={handlePaid}
                >
                  BOOK <FontAwesomeIcon icon={faTrainSubway} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ticketdetail;
