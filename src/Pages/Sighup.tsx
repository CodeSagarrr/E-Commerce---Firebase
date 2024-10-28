import React, {  useState } from "react";
import { Link , useNavigate } from "react-router-dom"
import { getAuth , createUserWithEmailAndPassword , updateProfile } from "firebase/auth";
import { app} from '../Firebase/Firebase.tsx'
import { toast } from "react-toastify";


interface inputFormData {
    username:string,
    email:string,
    phone:string,
    password:string
}

const Sighup = () => {


    const navigate = useNavigate();
    const [ error, setError ] = useState<Partial<inputFormData>>({});
    const [ formData , setFormData ] = useState<inputFormData>({
        username:"",
        email:"",
        phone:"",
        password:""
    })
    const auth = getAuth(app)

    const handleChangeData =(e:React.ChangeEvent<HTMLInputElement>) =>{
        const name = e.target.name;
        const value = e.target.value;
        setFormData({...formData, [name]:value})
    }

    const handleSubmit = (e:React.MouseEvent<HTMLButtonElement>) =>{
        e.preventDefault()
        let showErrorMessage:Partial<inputFormData>= {};

        // Username field validation
        if(formData.username === ""){
            showErrorMessage.username = "Please enter username";
        }else if(formData.username.length <=4){
            showErrorMessage.username = "Username should be at least 5 characters long";
        }else if(formData.username.search(/[0-9]/) ==-1){
            showErrorMessage.username = "Username should contain at least one number";
        }else if(formData.username.search(/["@","#"."$","&","*"]/)){
            showErrorMessage.username = "Username should not contain any special characters";
        }else{
            setError({username:""})
        }

        // email validation

        if(formData.email === ""){
            showErrorMessage.email = "Please enter email";
        }else if(formData.email.indexOf("@") === 0){
            showErrorMessage.email = "Email should not start with @";
        }else if(formData.email.includes("@")){
            showErrorMessage.email = "Email should not contain more than one @";
        }else if(formData.email.charAt(formData.email.length-4)!=="." && formData.email.charAt(formData.email.length-3)!=="."){
            showErrorMessage.email = "invalid email";
        }else{
            setError({email:""})
        }

        // phone Number validation

        if(formData.phone===""){
            showErrorMessage.phone="Please Enter phone number"
          }else if(isNaN(parseInt(formData.phone))){
            showErrorMessage.phone="It accepts Only digit"
          }else if(formData.phone.length>10){
            showErrorMessage.phone="Phone no should only 10 digit"
          }else{
            setError({phone:""})
          }

          // password validation
          if(formData.password===""){
            showErrorMessage.password="Please Enter your Password"
          }else if(formData.password.length<4){
            showErrorMessage.password="Password should contain 8 character"
          }else if(formData.password.search(/["@","#"."$","&","*"]/)==-1){
               showErrorMessage.password="Password should contain at least one special character"
          }else if(formData.password.search(/[0-9]/)==-1){
            showErrorMessage.password="Password Should Contain at least one digit"
          }else{
            setError({password:""})
          }

        // send user confirmation
       createUserWithEmailAndPassword(auth , formData.email , formData.password)
       .then((res) =>{
        const user = res.user;
        updateProfile(user , {displayName: formData.username})
        toast.success('Register Created Successfully')
        navigate("/Login")
       })
       .catch((err) =>{
        toast.error(err.message)
        console.log(err)
       })
    }

    return (
        <>
        <div className='flex flex-wrap w-full justify-center items-center h-[94vh] bg-[#246b91]'>
        <div className='sm:w-[48%] w-[100%] sm:mx-10 mx-2 h-[70vh] border my-10 rounded-3xl '>
          <h1 className='text-4xl font-bold mt-8 text-center text-white'>Sign Up</h1>
          <form className='flex flex-col justify-center h-[70%] sm:w-[90%] w-[100%] sm:mx-12 mx-4 sm:my-4 my-1 '>
            <label className='font-bold text-xl mt-5 mb-1 text-white'>Username</label>
            <input className='w-[100%] h-[10%]  rounded-md p-2 outline-none' type='text' placeholder='Name' name='username' onChange={handleChangeData} />
            <span>{error.username}</span>

            <label className='font-bold text-xl mt-2 mb-1 text-white'>Email</label>
            <input className='w-[100%] h-[10%]  rounded-md p-2  outline-none' type='text' placeholder='Email' name='email' onChange={handleChangeData} />
            <span>{error.email}</span>

            <label className='font-bold text-xl mt-2 mb-1 text-white'>Password</label>
            <input className='w-[100%] h-[10%]  rounded-md p-2  outline-none' type='password' placeholder='Password' name='password' onChange={handleChangeData} />
            <span>{error.password}</span>

            <button className='w-[100%] h-[10%] rounded-md mt-10 bg-[#0f0f0f] text-white text20old outline-none' onClick={handleSubmit}>Sign Up</button>
          </form>
          <div className=' flex w-[97%] my-4 sm:ml-24 ml-8'>
           
            <p className='text-white font-bold sm:text-xl text-[18px]'>Already have an account ?</p>
            <Link to="/login"> <p className='text-white font-bold text-xl ml-2 cursor-pointer'>Login</p></Link>
          </div>
        </div>
      </div>
        </>
    )
}

export default Sighup
