import React, {useState} from 'react'
import SignupOption from "./SignupOption";
import LoginOption,{LoginOptionProps} from './LoginOption'
import LoginCustomer ,{Modal} from "./LoginCustomer"
import LoginSeller from "./LoginSeller";
import {SignupOptionProps} from './SignupOption'
const Navbar:React.FC=()=>{
    const [name,setName]=useState<string>("")
    const [dispCategories,setDispCategories]=useState<boolean>(false)
    const [arrowDown,setArrowDown]=useState<boolean>(true)
    const [arrowUp,setArrowUp]=useState<boolean>(false)
    const [openSignupoption, setopenSignupoption] = useState<boolean>(false)
    const [openLoginoption, setopenLoginoption] = useState<boolean>(false)
    const [openmodallogin, setopenmodallogin] = useState<boolean>(false)
    const [openloginuser, setopenloginuser] = useState<boolean>(false)
    const [openlogincompany, setopenlogincompany] = useState<boolean>(false)


    const signup:SignupOptionProps = { signupState:setopenSignupoption, seller: 'Signup As Seller', customer: 'Signup As Customer' }
    const login:LoginOptionProps={loginState: setopenLoginoption, setOpenLoginUser: setopenloginuser, setOpenLoginCompany: setopenlogincompany, modalOpen: setopenmodallogin, seller: 'Login As Company', customer: 'Login As Jobseeker' }
    const modal:Modal = { modalState: setopenmodallogin,   setOpenLoginUser: setopenloginuser, setOpenLoginCompany: setopenlogincompany }
    function handleChange(e:React.SyntheticEvent) :void{
        e.preventDefault()
        const target = e.target as typeof e.target & {
            searchedItem: { value: string };

        };
        console.log(target.searchedItem.value)

    }

   return (

       <>
           {  !openmodallogin &&     <> <nav  className='bg-slate-500 h-12 pt-2'>
           <ul className=' inline align-middle'>
               <li className='inline align-middle ml-4 mr-8 font-bold text-white'>Home</li>
               <li className='inline align-middle mr-8 font-bold text-white cursor-pointer'
                   onClick={(e)=>{
                       if(arrowDown===true){
                           setDispCategories(true)
                           setArrowDown(false)
                           setArrowUp(true)
                       }
                       else
                       {
                           setDispCategories(false)
                           setArrowDown(true)
                           setArrowUp(false)
                       }


                   }}>Categories
                   { arrowDown &&<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={4} stroke="currentColor" className="w-6 h-6 inline cursor-pointer">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                   </svg>}
                       {   arrowUp&& <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={4} stroke="currentColor" className="w-6 h-6 inline cursor-pointer">
                           <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                       </svg>}


               </li>
               <li className='inline align-middle mr-28'>

                   <div className='inline '>
                       <form onSubmit={handleChange} className='inline'>
                       <input type='text' name='searchedItem' className='w-2/5 pl-2'  placeholder='Search Item By Name'/>
                       <button className='-ml-6'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5 text-gray-600 relative top-1">
                           <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                       </svg>
                       </button>
                       </form>
                   </div>
               </li>
               <li className='inline align-middle ml-72 mr-4 font-bold text-white cursor-pointer'
                   onClick={(e) => {
                       setopenLoginoption(true); setopenSignupoption(false);
                   }}>Login</li>
               <li className='inline align-middle font-bold text-white cursor-pointer'
                   onClick={(e) => {
                       setopenLoginoption(false); setopenSignupoption(true);
                   }}>Signup</li>
           </ul>
       </nav>

           {dispCategories && <div className='relative -right-20 inline-block w-4/5'>
           <ul className='bg-slate-500 w-1/5 font-bolder text-white'>
        <li className='py-2 text-center hover:bg-slate-400 cursor-pointer'>
            Home & Garden
        </li>
           <li className=' py-2 text-center hover:bg-slate-400 cursor-pointer'>
               Apparel & Accessories
           </li>
           <li className='py-2  text-center hover:bg-slate-400 cursor-pointer'>
               Health & Wellness
           </li>
           <li className='py-2  text-center hover:bg-slate-400 cursor-pointer'>
               Children & Infants
           </li>
           <li className='py-2  text-center hover:bg-slate-400 cursor-pointer'>
               Consumer Electronics
           </li>
           <li  className=' py-2 text-center hover:bg-slate-400 cursor-pointer'>
               Clothing & Fashion
           </li>
               </ul>
       </div>}
</>}
           {openSignupoption && <SignupOption obj={signup} />}

    {openLoginoption && <LoginOption obj={login} />}
    {openloginuser && <LoginCustomer obj={modal} />}
    {openlogincompany && <LoginSeller obj={modal} />}
</>
)
}
export default Navbar