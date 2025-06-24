import { useRef } from "react"
import toast from "react-hot-toast"
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'



const Signin = () => {

    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const navigate = useNavigate();


    const handleSignIn = async()=>{

      const email = emailRef.current?.value
      const password = passwordRef.current?.value

      if(!email || !password){

        toast.error("Invalid Inputs");
        return;
      }

      try {
      
        
        const res = await axios.post('http://localhost:8000/api/v1/user/signin',{
          email,
          password
        });

        toast.success("Sign In Succesfull");
        navigate('/dashboard');
        console.log(res.data);
        localStorage.setItem('jwt',res.data.jwt_token)

        
      } catch (error : any) {
        toast.error(error?.response?.data?.error || "Something went Wrong");
      }

    }

  return (
    (
   <div className="h-screen w-screen bg-gray-400 flex flex-col items-center justify-center">

        <div className="py-8 px-6 h-auto w-[25%] bg-white rounded-lg" >

            <div className="flex flex-col items-center justify-center">

                <h2 className="text-3xl font-bold">Sign In</h2>
                <p className="text-center mt-4 text-gray-500">Enter your information to Sign In</p>

            </div>
            <div className="mt-4">
                <h4 className="text-black font-semibold">Email</h4>
                
                <input ref={emailRef} className="mt-2 px-2 rounded border-gray-400 h-10 justify-center border w-[100%] " type="text" placeholder="John@gmail.com"/>
            </div>
            <div className="mt-4">
                <h4 className="text-black font-semibold">Password</h4>
               
                <input ref={passwordRef} className="mt-2 px-2 rounded border-gray-400 h-10 justify-center border w-[100%] " type="text"/>
            </div>

            <button onClick={handleSignIn} className="cursor-pointer hover:bg-gray-800 mt-4 bg-black text-white font-bold w-[100%] h-10 rounded ">
                Sign In
            </button>
            <div className="text-center text-black font-semibold mt-4">
                Don't have an account? <Link className="underline" to="/signup" >Sign Up</Link>
            </div>
        </div>
   </div>
  )
  )
}

export default Signin