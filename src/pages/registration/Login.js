import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { toast } from 'react-toastify'
import { auth } from '../../firebase/FirebaseConfig'
import { useNavigate } from 'react-router-dom'
import Layout from '../../components/layout/Layout'


function Login() {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const navigate = useNavigate();

    const login = async(e)=>{
        e.preventDefault();
        try {
            const result = await signInWithEmailAndPassword(auth,email,password);
            // console.log(result);
            toast.success("Login Succesfull!",{
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            localStorage.setItem('user',JSON.stringify(result));
            navigate('/');
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
        }
    }
  return (
    <Layout>
        <div className='sign-up'>
            <div className='h-screen backdrop-blur-[3px] bg-slate-600/30 w-full flex justify-center items-center'>
                <div className='xl:w-1/3 h-3/6 rounded-3xl backdrop-blur-2xl bg-white/30'>
                    <div className='h-1/4 w-full flex flex-col justify-end items-center text-2xl font-bold'>
                        <div className='rounded-full bg-blue-900 text-white w-7 h-7 text-sm font-bold text-center'><FontAwesomeIcon icon={faLock} /></div>
                        <div>Sign In</div>
                    </div>
                    <div className='h-2/4 flex flex-col w-5/6 mx-auto justify-center'>
                        <label htmlFor="email">Email address*</label>
                        <input 
                            type="email" 
                            placeholder='Enter your email' 
                            className='outline-none border-4 border-b-black border-none rounded-lg py-2 pl-2' 
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}/>
                        <label htmlFor="password">Password*</label>
                        <input 
                            type="password" 
                            placeholder='Enter your password'
                            className='outline-none border border-b-black rounded-lg py-2 pl-2'
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}/>
                        
                    </div>
                    <div className='h-1/4 text-md w-5/6 mx-auto text-white flex flex-col'>
                        <button 
                            className='btn bg-blue-900 hover:bg-slate-500 text-white font-semibold'
                            onClick={login}>LOG IN</button>
                        <a href="/signup" className='underline underline-offset-2'>DON'T HAVE AN ACCOUNT? SIGN UP</a>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default Login