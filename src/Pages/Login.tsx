
import { useState } from 'react';
import { Link , useNavigate} from 'react-router-dom'
import { getAuth , signInWithEmailAndPassword  } from "firebase/auth";
import { app} from '../Firebase/Firebase.tsx'
import { toast } from "react-toastify";



interface inputFormData {
    email:string,
    password:string
}

const auth = getAuth(app)
const Login = () => {
    const navigate = useNavigate();
    const [ error, setError ] = useState<Partial<inputFormData>>({});
    const [formData , setFormData] = useState<inputFormData>({
        email:"",
        password:""
    })

    const handleChangeData =(e:React.ChangeEvent<HTMLInputElement>) =>{
        const name = e.target.name;
        const value = e.target.value;
        setFormData({...formData, [name]:value})
    }

    const handleSubmit = (e:React.MouseEvent<HTMLButtonElement>) =>{
        e.preventDefault()
        let showErrorMessage:Partial<inputFormData> ={}


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

      signInWithEmailAndPassword(auth , formData.email , formData.password)
      .then(()=>{
        toast.success("Login Successfully");
        navigate("/")
      })
      .catch((err)=>{
        toast.error(err.message);
        console.log(err.message)
      })
    }
    
    return (
        <>
            <div className='flex flex-wrap w-full justify-center items-center h-[94vh] bg-[#246b91]'>
                <div className='sm:w-[48%] w-[100%] sm:mx-10 mx-2 h-[65vh] border my-10 rounded-3xl '>
                    <h1 className='text-4xl font-bold mt-8 text-center text-white'>Login</h1>
                    <form className='flex flex-col justify-center h-[70%] sm:w-[90%] w-[100%] sm:mx-12 mx-4 sm:my-4 my-1 '>
                
                        <label className='font-bold text-xl mt-2 mb-1 text-white'>Email</label>
                        <input className='w-[100%] h-[10%]  rounded-md p-2  outline-none' type='text' placeholder='Email' name='email'  onChange={handleChangeData}/>
                        <span>{error.email}</span>

                        <label className='font-bold text-xl mt-2 mb-1 text-white'>Password</label>
                        <input className='w-[100%] h-[10%]  rounded-md p-2  outline-none' type='password' placeholder='Password' name='password' onChange={handleChangeData} />
                        <span>{error.password}</span>

                        <button className='w-[100%] h-[10%] rounded-md mt-10 bg-[#0f0f0f] text-white text20old outline-none' onClick={handleSubmit}>Login</button>
                    </form>
                    <div className=' flex w-[44%] ml-36'>

                        <p className='text-white font-bold sm:text-xl text-[18px]'>Not a Member ?</p>
                        <Link to="/signup"> <p className='text-white font-bold text-xl ml-2 cursor-pointer'>Sign up</p></Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
