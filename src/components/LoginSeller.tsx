import React from "react";
//import { useState, useEffect } from 'react';
//import { useNavigate } from 'react-router-dom';
//import '../style/style.css'
import {Modal} from "./LoginCustomer";

const  LoginSeller:React.FC<{obj:Modal}>=(props)=> {

    return (

        <>
            <div className="bg-green-100 h-screen">
        <div className="flex justify-center items-center h-screen">
        <div className="h-42 w-1/4 bg-green-400 rounded-sm  py-4 rounded-md">
        <div className="font-bold text-xl text-gray-600 font-sans text-center ">Sign in To Your Account</div>
    <button className="bg-transparent text-lg  ml-4 relative -top-6 left-72  text-red-400 font-extrabold hover:text-red-200" onClick={() => { props.obj.modalState(false); props.obj.setOpenLoginCompany(false) }}>
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        </button>
        <form className="my-8">

    <input type='text' className=' rounded-sm     text-md px-4 py-2 mx-20' name='email' placeholder='xyz@gmail.com'  />


    <input type='password' className='rounded-sm   text-md px-4 py-2 mx-20' name='password' placeholder='Password'  />




        <button className="my-2 mx-20 px-20  text-center  relative text-xl bg-gray-500  text-white rounded-sm ">Signin</button><br />
        </form>
        </div>
        </div>

        </div>
        </>
)
}
export default LoginSeller