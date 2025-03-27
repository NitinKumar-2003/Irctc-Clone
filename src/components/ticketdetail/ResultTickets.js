import React, { useContext, useEffect, useState } from 'react'
import Ticketdetail from './Ticketdetail'
import { Station } from '../search/Station'
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { auth, fireDB } from '../../firebase/FirebaseConfig';
import myContext from '../../context/myContext';

const ticket = {
    "status": true,
    "message": "Success",
    "timestamp": 1706550777275,
    "data":
    [
      {
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
      },
      {
        "train_number": "12951",
        "train_name": "MUMBAI CENTRAL - NEW DELHI Rajdhani Express",
        "run_days": [
          "Mon",
          "Tue",
          "Wed",
          "Thu",
          "Fri",
          "Sat",
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
        "to_station_name": "NEW DELHI",
        "duration": "15:8",
        "special_train": false,
        "train_type": "RAJ",
        "train_date": "26-05-2023",
        "class_type": [
          "3A",
          "2A",
          "1A"
        ]
      },
      {
        "train_number": "12953",
        "train_name": "MUMBAI CENTRAL - HAZRAT NIZAMUDDIN August Kranti Rajdhani Exp",
        "run_days": [
          "Mon",
          "Tue",
          "Wed",
          "Thu",
          "Fri",
          "Sat",
          "Sun"
        ],
        "train_src": "MMCT",
        "train_dstn": "NZM",
        "from_std": "17:35",
        "from_sta": "17:33",
        "local_train_from_sta": 1053,
        "to_sta": "09:43",
        "to_std": "09:43",
        "from_day": 0,
        "to_day": 1,
        "d_day": 0,
        "from": "BVI",
        "to": "NZM",
        "from_station_name": "BORIVALI",
        "to_station_name": "DELHI HAZRAT NIZAMUDDIN",
        "duration": "16:8",
        "special_train": false,
        "train_type": "RAJ",
        "train_date": "26-05-2023",
        "class_type": [
          "3A",
          "2A",
          "1A"
        ]
      }
    ]
  }

function ResultTickets({trains}) {
  const context = useContext(myContext);
  const {GetUser} = context;
  const user = JSON.parse(localStorage.getItem('user'));
  let currUser={};
  if(user){
    const loggeduser = GetUser();
    currUser=loggeduser[0];
  }
  return (
    <div>
        {
            trains?.data?.map((data)=>{
                return(
                    <Ticketdetail data={data} currUser={currUser}/>
                )
            })
        }
    </div>
  )
}

export default ResultTickets