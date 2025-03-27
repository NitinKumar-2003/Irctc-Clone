import React, { useEffect, useState } from 'react'
import MyContext from './myContext'
import { toast } from 'react-toastify';
import { Timestamp, addDoc, collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { auth, fireDB } from '../firebase/FirebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';

function MyState(props) {

  const [users,setUsers] = useState({
    firstname:"",
    middlename:"",
    lastname:"",
    username:"",
    password:"",
    phone:"",
    dob:"",
    gender:"",
    state:"",
    trains:[],
    uid:"",
    email:"",
    time:Timestamp.now()
  });

  const addUser = async()=>{
      if(users?.firstname == "" || users?.email == "" || users?.password == ""){
          return toast.error("All fields are required")
      }
      try {
          const user1 = await createUserWithEmailAndPassword(auth,users.email,users.password);
          // console.log(user1.user.uid);
          users.uid=user1.user.uid;
          const userRef = collection(fireDB,"users");
          await addDoc(userRef,users);
          toast.success("Sign Up Succesfull!");
          setTimeout(() => {
            window.location.href = '/login'
          },800);

      } catch (error) {
        toast.error(error.code.split("auth/")[1],{
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
      });
        // console.log(error);
      }
  }

  function GetUser(){
    const [user,setUser] = useState('');
    // const userCollectionRef = collection(fireDB,"users");

    useEffect(()=>{
        auth.onAuthStateChanged((userlogged)=>{
            // console.log("true");
            if(userlogged){
                const getUsers =async()=>{
                    const q = query(collection(fireDB,"users"),where("uid","==",userlogged.uid));
                    // console.log("this is profile run",q);
                    const data = await getDocs(q);
                    setUser(data.docs.map((doc)=>({...doc.data(),id:doc.id})));
                }
                getUsers();
            }else{
                setUser(null);
            }
        })
    },[])
    return user;
  }

// const loggeduser = GetUser();
// const currUser = loggeduser[0];

// const updateUser = async()=>{
//     try {
//       await setDoc(doc(fireDB,'users',users.id),users);
//       toast.success("Profile updated");
//     } catch (error) {
//       console.log(error);
//     }
// }

  return (
    <MyContext.Provider value={{users,setUsers,addUser,GetUser}}>
        {props.children}
    </MyContext.Provider>
  )
}

export default MyState