import React, { useContext, useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import { Timestamp, collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { auth, fireDB } from '../../firebase/FirebaseConfig';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material';
import myContext from '../../context/myContext';
import { toast } from 'react-toastify';

function Profile() {
    
    const context = useContext(myContext);
    const {GetUser} = context;
    const loggeduser = GetUser();
    const currUser = loggeduser[0];

    // console.log("currUser",currUser);
    const [formData,setFormData] = useState(
    //     {
    //     firstname:currUser?.firstname || "",
    //     middlename:currUser?.middlename || "",
    //     lastname:currUser?.lastname || "",
    //     username:currUser?.username || "",
    //     password:currUser?.password || "",
    //     phone:currUser?.phone || "",
    //     dob:currUser?.dob || "",
    //     gender:currUser?.gender || "",
    //     state:currUser?.state || "",
    //     trains:currUser?.trains || [],
    //     uid:currUser?.uid || "",
    //     email:currUser?.email || "",
    //     time:currUser?.time || Timestamp.now()
    // }
    )
    // console.log("formdata",formData);
    const logout = ()=>{
        localStorage.clear('user');
        window.location.href = '/login';
    }

    const handleUpdate = async(e)=>{
        e.preventDefault();
        // console.log(formData);
        currUser.firstname=formData.firstname;
        currUser.middlename=formData.middlename;
        currUser.lastname=formData.lastname;
        currUser.username=formData.username;
        currUser.email=formData.email;
        currUser.phone=formData.phone;
        currUser.state=formData.state;
        currUser.gender=formData.gender;
        currUser.dob=formData.dob;

        await setDoc(doc(fireDB,"users",currUser.id),currUser);
        toast.success("Your Profile has been succesfully updated!");
        // console.log("user",currUser);
    }
    useEffect(()=>{
        const initializeFormData = () => {
            if (currUser) {
              setFormData({
                firstname: currUser.firstname || "",
                middlename: currUser.middlename || "",
                lastname: currUser.lastname || "",
                username: currUser.username || "",
                password: currUser.password || "",
                phone: currUser.phone || "",
                dob: currUser.dob || "",
                gender: currUser.gender || "",
                state: currUser.state || "",
                trains: currUser.trains || [],
                uid: currUser.uid || "",
                email: currUser.email || "",
                time: currUser.time || Timestamp.now(),
              });
            }
          };
        
          initializeFormData();
        // setFormData({
        //     firstname:currUser?.firstname || "",
        //     middlename:currUser?.middlename || "",
        //     lastname:currUser?.lastname || "",
        //     username:currUser?.username || "",
        //     password:currUser?.password || "",
        //     phone:currUser?.phone || "",
        //     dob:currUser?.dob || "",
        //     gender:currUser?.gender || "",
        //     state:currUser?.state || "",
        //     trains:currUser?.trains || [],
        //     uid:currUser?.uid || "",
        //     email:currUser?.email || "",
        //     time:currUser?.time || Timestamp.now()
        // })
        // setFormData({...formData,firstname:currUser?.firstname});
        // setFormData({...formData,lasttname:currUser?.lasttname});
        // setFormData({...formData,middlename:currUser?.middlename});
        // setFormData({...formData,username:currUser?.username});
        // setFormData({...formData,email:currUser?.email});
        // setFormData({...formData,phone:currUser?.phone});
        // setFormData({...formData,state:currUser?.state});
        // setFormData({...formData,gender:currUser?.gender});
        // setFormData({...formData,dob:currUser?.dob});
    },[currUser]);

  return (
    <Layout>
        <div className='h-full gap-2'>
            <div className='xl:flex h-full xl:w-3/5 mx-auto p-3'>
                <div className='xl:w-2/5 h-1/2 xl:mr-2 my-2 shadow-lg rounded-lg'>
                    <div className='w-full rounded-t-lg flex justify-center items-center'>
                        <img src="/assets/train-img3.webp" alt="" className='h-72 p-2'/>
                    </div>
                    <div className='w-full flex flex-col justify-center items-center py-3'>
                        <h1 className='font-bold text-lg'>{formData?.gender=="female"?"Miss.":"Mr."}{formData?.firstname}</h1>
                        <h2>{formData?.username}</h2>
                        <h3>{formData?.email}</h3>
                        <h3>{formData?.phone}</h3>
                    </div>
                </div>
                <div className='xl:w-3/5 flex flex-col p-3 my-2 shadow-lg h-full rounded-lg outline-none border-0'>
                    <h1 className='text-2xl font-bold'>Profile</h1>
                    <form action="" className='flex flex-col gap-3 my-2 relative outline-none  border-none'>
                        <input value={formData?.firstname} onChange={(e)=>setFormData({...formData,firstname:e.target.value})} placeholder="firstname" type="text" className='rounded-lg py-3'/>
                        <input value={formData?.middlename} onChange={(e)=>setFormData({...formData,middlename:e.target.value})} placeholder="middlename" type="text" className='rounded-lg py-3'/>
                        <input value={formData?.lastname} onChange={(e)=>setFormData({...formData,lastname:e.target.value})} placeholder="lastname" type="text" className='rounded-lg py-3'/>
                        <input value={formData?.username} onChange={(e)=>setFormData({...formData,username:e.target.value})} placeholder="username" type="text" className='rounded-lg py-3'/>
                        <input value={formData?.email} onChange={(e)=>setFormData({...formData,email:e.target.value})} placeholder="email" type="email" className='rounded-lg py-3'/>
                        <FormLabel id="demo-row-radio-buttons-group-label"><p className='font-bold text-black'>Gender</p></FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={formData?.gender}   
                                onChange={(e)=>setFormData({...formData,gender:e.target.value})}
                            >
                                <FormControlLabel value="male" checked={formData?.gender=="male"}  control={<Radio />} label="Male" />
                                <FormControlLabel value="female" checked={formData?.gender=="female"}  control={<Radio />} label="Female" />
                                <FormControlLabel value="other" checked={formData?.gender=="other"}  control={<Radio />} label="Other" />
                            </RadioGroup>
                        <label htmlFor="dob" className='font-bold'>Date Of Birth</label>
                        <input type="date" value={formData?.dob} onChange={(e)=>setFormData({...formData,dob:e.target.value})}  className='border-1 border-gray-300 py-1 px-2 rounded-sm outline-none'/>
                        <input value={formData?.phone} onChange={(e)=>setFormData({...formData,phone:e.target.value})} label="phone number" type="text" placeholder='phone number' className='rounded-lg py-3'/>
                        <label htmlFor="state" className='font-bold'>State</label>
                        <select name="state" value={formData?.state} onChange={(e)=>setFormData({...formData,state:e.target.value})} className='border-1 border-gray-500 p-3 rounded-md outline-none'>
                            <option value="Gujarat" name="state">Gujarat</option>
                            <option value="Goa" name="state">Goa</option>
                            <option value="Tamilnadu" name="state">Tamilnadu</option>
                            <option value="Delhi" name="state">Delhi</option>
                            <option value="Kerala" name="state">Kerala</option>
                            <option value="Punjab" name="state">Punjab</option>
                            <option value="Rajasthan" name="state">Rajasthan</option>
                            <option value="Haryana" name="state">Haryana</option>
                            <option value="Orissa" name="state">Orissa</option>
                            <option value="Jammu And Kashmir" name="state">Jammu And Kashmir</option>
                        </select>
                        <button className='btn bg-blue-900 text-white hover:bg-blue-950 xl:w-1/5 mx-auto' onClick={handleUpdate}>Update</button>
                    </form>
                </div>
            </div>
            <div className='flex justify-center pt-20 pb-5'>
                <button className='btn btn-danger px-4' onClick={logout}>Log out</button>
            </div>
        </div>
    </Layout>
  )
}

export default Profile