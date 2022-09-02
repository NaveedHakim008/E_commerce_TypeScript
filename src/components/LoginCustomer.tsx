import React from "react";
import { useState, useEffect } from 'react';
//import { useNavigate } from 'react-router-dom';
//import '../style/style.css'
export interface Modal{

    modalState:React.Dispatch<React.SetStateAction<boolean>>
    setOpenLoginUser:React.Dispatch<React.SetStateAction<boolean>>
    setOpenLoginCompany:React.Dispatch<React.SetStateAction<boolean>>
}
const  LoginCustomer:React.FC<{obj:Modal}>=(props)=> {

    return (

        <>
            <div className="bg-green-100 h-screen">
                <div className="flex justify-center items-center h-screen">
                    <div className="h-42 w-1/4 bg-green-400 rounded-sm  py-4 rounded-sm  ">
                        <div className='flex justify-center font-bold text-lg text-gray-600'>
                            Signin To Your Account
                        </div>
                        <button className="bg-transparent text-lg  ml-8 relative -top-8 left-80  text-red-400 font-extrabold hover:text-red-200" onClick={() => { props.obj.modalState(false); props.obj.setOpenLoginUser(false) }}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </button>
                        <form className="my-8" >

                            <input type='text' className='rounded-sm    text-md px-4 py-2 mx-24 my-2' name='username' placeholder='Username'  />

                            <input type='password' className='rounded-sm     text-md px-4 py-2 mx-24' name='password' placeholder='Password'  />



                            <button className="my-2 mx-24 px-20 text-xl bg-gray-500   rounded-sm px-1 text-white font-normal">Signin</button><br />
                        </form>
                    </div>
                </div>

            </div>
        </>
    )
}
export default LoginCustomer