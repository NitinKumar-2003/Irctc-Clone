import React, { useContext, useEffect, useState } from 'react'
import Bookingticket from '../../components/ticketdetail/Bookingticket'
import Layout from '../../components/layout/Layout'
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { auth, fireDB } from '../../firebase/FirebaseConfig';
import myContext from '../../context/myContext';


function Booklist() {
//   function GetCurrentUser(){
//     const [user,setUser] = useState('');
//     const userCollectionRef = collection(fireDB,"users");

//     useEffect(()=>{
//         auth.onAuthStateChanged((userlogged)=>{
//             if(userlogged){
//                 const getUsers =async()=>{
//                     const q = query(collection(fireDB,"users"),where("uid","==",userlogged.uid));
//                     // console.log("this is profile run",q);
//                     const data = await getDocs(q);
//                     setUser(data.docs.map((doc)=>({...doc.data(),id:doc.id})));
//                 }
//                 getUsers();
//             }else{
//                 setUser(null);
//             }
//         })
//     },[])
//     return user;
// }

const context = useContext(myContext);
const {GetUser} = context;
const loggeduser = GetUser();
const currUser = loggeduser[0];
// console.log(currUser);
  return (
    <Layout>
      <div className='h-screen'>
          <h1 className='font-semibold text-3xl p-3 w-4/5 text-center mx-auto'>Booklist</h1>
          {
            currUser?.trains?.map((data,i)=>{
              return(
                <div>
                  <Bookingticket data={data} currUser={currUser} i={i}/>
                </div>
              )
            })
          }
      </div>
    </Layout>
  )
}

export default Booklist