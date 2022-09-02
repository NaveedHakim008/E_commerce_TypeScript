import React, {useState,useEffect} from "react";
import Axios from 'axios'

const SellerSignup:React.FC=()=> {
    //var navigate = useNavigate()
    const data=new FormData()
    type FormErrors={
        rule:string
        field:string
        message:string
    }

    const Errors:FormErrors[]=[]

    type sellerInfo={
        name:string
        address:string
        email:string
        phoneNumber:string
        password:string
        confirmPassword:string
        avatar:File[]|null
    }
    type formErrors={
        name:string
        address:string
        email:string
        phoneNumber:string
        password:string
        confirmPassword:string
        avatar:string
    }
    const initialvalue:sellerInfo = {

        name: "",
        address: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword:"",
        avatar:null

    };
    const [formvalues, setformvalues] = useState<sellerInfo>(initialvalue);

    const handleChange = (e:React.FormEvent<HTMLInputElement>|React.FormEvent<HTMLTextAreaElement>):void => {


        const { name, value }:{name:string,value:string  } = e.currentTarget;
        setformvalues({...formvalues,[name]:value})


    };
     const passdata = async () => {

         const  messages:string[]=[]
           const res=await  Axios.post('http://127.0.0.1:3333/seller',data)
         if(data.get('password')!==formvalues['confirmPassword'])
             messages.push('password must match Each Other')
         if(res.data.messages) {
             while(Errors.length>0)
             {
                 Errors.pop()
             }
             const {errors} = res.data.messages

             errors.forEach((error: FormErrors) => Errors.push(error))

             Errors.forEach((e) => messages.push(e.message))}
             if(res.data.errno===1062){
                 messages.push('name or phoneNumber or Email is already entered these fields must be unique')}
             else if(messages.length!==0)
                 alert(messages)
             else if(res.data.msg)
             alert('seller signup successfull')

         }









    const handleSubmit = (e:React.SyntheticEvent) => {

        e.preventDefault();

        const {name,phoneNumber,email,address,password}:{name:string,phoneNumber:string,email:string,
            address:string,password:string}=
            formvalues
        console.log(data.getAll(name))
        data.append('name',name)
        data.append('phoneNumber',phoneNumber)
        data.append('email',email)
        data.append('address',address)
        data.append('password',password)

        passdata()

    };

    // useEffect(() => {
    //     if (Object.keys(formerrors).length === 0 && issubmit) {
    //         passdata()
    //         localStorage.setItem('companyName', formvalues.name)
    // //        { navigate('../Companyhomepage', { replace: true }) }
    //
    //     }
    //
    // }, [formerrors, issubmit, formvalues])
    // const validate = (values) => {
    //     const errors = {}
    //     const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    //   //  checkname(values.name)
    //     if (uniquename.length === 0) {
    //         if (!values.name) {
    //             errors.name = 'Company Name required'
    //         }
    //     }
    //     else {
    //         errors.name = 'company exists enter a new company name'
    //     }
    //     if (!values.address) {
    //         errors.address = 'Address required'
    //     }
    //
    //     if (!values.email) {
    //         errors.email = 'Email required'
    //     }
    //     else if (!regex.test(values.email)) {
    //         errors.email = "This is not a valid email format!";
    //     }
    //
    //
    //
    //
    //     if (values.password !== values.confirmpassword) {
    //         errors.confirmpassword = "passwords are not similar"
    //     } if (!values.password) {
    //         errors.password = 'password required'
    //     }
    //
    //     return errors;
    // }

    return (
        <>
            <div className="bg-green-100 h-screen">
                <div className="flex justify-center items-center h-screen">
                    <div className="h-auto bg-green-400 px-4 py-4 rounded-sm w-1/3 ">
                        <div className=" font-bold text-xl text-gray-600 font-sans text-center">Seller Signup</div>

                        <form className="my-8 px-6" onSubmit={handleSubmit}>
                            <label className="text-sm text-red-600 font-bold">*</label><br />
                            <input type="text"
                                   id="name"
                                   name="name"
                                   placeholder=" Name"
                                   className="w-1/2 py-1 w-full"
                                   value={formvalues.name}
                                   onChange={handleChange}
                            />
                            <p className="text-sm font-normal text-red-600"></p>


                            <label className="text-sm text-red-600 font-bold">*</label><br/>

                            <textarea name="address"
                                      className="form-textarea py-1 block w-1/2 w-full"
                                      id="address"
                                      value={formvalues.address}
                                     placeholder="address"
                                onChange={handleChange}>

                            </textarea>
                            <p className="text-sm font-normal text-red-600"></p>


                            <label className="text-sm text-red-600 font-bold">*</label> <br />

                            <input type="text"
                                   id="email"
                                   name="email"
                                   placeholder="Email Address"
                                   className="w-1/2 py-1 w-full"
                                   value={formvalues.email}
                                   onChange={handleChange} />
                            <p className="text-sm font-normal text-red-600"></p>
                            <label className="text-sm text-red-600 font-bold">*</label> <br />

                            <input type="text"
                                   id="phoneNumber"
                                   name="phoneNumber"
                                   placeholder="phoneNumber"
                                   className="w-1/2 py-1 w-full"
                                   value={formvalues.phoneNumber}
                                   onChange={handleChange} />
                            <p className="text-sm font-normal text-red-600"></p>


                            <label className="text-sm text-red-600 font-bold">*Password atleast have 8 letter and combination of UpperCase Lowercase number and special character</label><br />
                            <input type="password"

                                   name="password"
                                   className="w-1/2 py-1 w-full"
                                   onChange={handleChange} placeholder="Password" />
                            <p className="text-sm font-normal text-red-600"></p>
                            <label className="text-sm text-red-600 font-bold">*</label><br />
                            <input type="password"
                                   className="w-1/2 py-1 w-full"
                                   name="confirmpassword"
                                   onChange={handleChange} placeholder="Confirm Password" />
                            <p className="text-sm font-normal text-red-600"></p>

                                <label >Select Avatar</label>
                                <input className='bg-gray-500 px-2 rounded-sm text-green-200 py-1 my-2 ' name='avatar' type='file' accept='' onChange={(e)=>{
                                    if(e.target.files)
                                    data.append('avatar',e.target.files[0])


                                }}  />




                            <button className="my-2 w-full bg-gray-500  text-white rounded-sm text-lg  text-center">Sign Up</button><br/>
                        </form>
                    </div>
                </div>

            </div>




        </>
    );
}
export default SellerSignup