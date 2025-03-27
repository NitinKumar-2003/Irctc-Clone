import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { onAuthStateChanged, signOut } from 'firebase/auth';
import { ToastContainer } from 'react-toastify';
import Home from './pages/home/Home';
import Signup from './pages/registration/Signup';
import Login from './pages/registration/Login';
import Profile from './pages/profile/Profile';
import Payment from './pages/payment/Payment';
import Booklist from './pages/booklist/Booklist';
import MyState from './context/MyState';
import SearchUsingTrie from './components/search/SearchUsingTrie';
import Ticketdetail from './components/ticketdetail/Ticketdetail';
import Search from './components/search/Search';
import Bookingticket from './components/ticketdetail/Bookingticket';
import ResultTickets from './components/ticketdetail/ResultTickets';

function App() {
  return (
    <MyState>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          {/* <Route path='/booking' element={<Bookingticket/>}/> */}
          <Route path='/booklist' element={
            <ProtectedRoute>
              <Booklist/>
            </ProtectedRoute>
          }/>
          <Route path='/search' element={
            <ProtectedRoute>
              <Search/>
            </ProtectedRoute>
          }/>
          {/* <Route path='/ticket' element={<Ticketdetail/>}/> */}
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/resultsearch' element={
            <ProtectedRoute>
              <ResultTickets/>
            </ProtectedRoute>
          }/>
          <Route path='/profile' element={
            <ProtectedRoute>
              <Profile/>
            </ProtectedRoute>
          }/>
          <Route path='/payment' element={
            <ProtectedRoute>
              <Payment/>
            </ProtectedRoute>
          }/>
          <Route path='/booklist' element={
            <ProtectedRoute>
              <Booklist/>
            </ProtectedRoute>
          }/>
        </Routes>
        <ToastContainer/>
      </Router>
    </MyState>
  );
}

export default App;

// protected route

export const ProtectedRoute = ({children})=>{
  const user = localStorage.getItem('user');
  if(user){
    return children
  }else{
    return <Navigate to={'/login'}/>
  }
}
