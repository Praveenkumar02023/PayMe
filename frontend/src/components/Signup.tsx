import axios from "axios";
import { useRef } from "react"
import toast from "react-hot-toast";
import { Link , useNavigate} from "react-router-dom"


const Signup = () => {

    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const handleSignUp = async()=>{

        const firstName = firstNameRef.current?.value
        const lastName = lastNameRef.current?.value
        const email = emailRef.current?.value
        const password = passwordRef.current?.value

        if(!firstName || !lastName || !email || !password) {
            toast.error("Invalid Inputs");
            return;
        }

        try {
            
            const response = await axios.post('http://localhost:8000/api/v1/user/signup',{
                firstName,
                lastName,
                email,
                password
            });

            toast.success("Sign In Successfull",{
                duration:3000
            });
            navigate('/dashboard');
            console.log(response.data);

        }catch (error: any) {
  toast.error(
    error?.response?.data?.error || "Something went wrong"
  );
    }
}


  return (
   <div className="h-screen w-screen bg-gray-400 flex flex-col items-center justify-center">

        <div className="py-8 px-6 h-[70%] w-[25%] bg-white rounded-lg" >

            <div className=" flex flex-col items-center justify-center">

                <h2 className="text-3xl font-bold">Sign Up</h2>
                <p className="text-center mt-4 text-gray-500">Enter your information to create an account</p>

            </div>

             <div className="mt-4">
                <h4 className="text-black font-semibold">First Name</h4>
                
                <input ref={firstNameRef} className="mt-2 px-2 rounded border-gray-400 h-10 justify-center border w-[100%] " type="text" placeholder="John"/>
            </div>
            <div className="mt-4">
                <h4 className="text-black font-semibold">Last Name</h4>
                
                <input ref={lastNameRef} className="mt-2 px-2 rounded border-gray-400 h-10 justify-center border w-[100%] " type="text" placeholder="Doe"/>
            </div>
            <div className="mt-4">
                <h4 className="text-black font-semibold">Email</h4>
                
                <input ref={emailRef} className="mt-2 px-2 rounded border-gray-400 h-10 justify-center border w-[100%] " type="text" placeholder="John@gmail.com"/>
            </div>
            <div className="mt-4">
                <h4 className="text-black font-semibold">Password</h4>
                
                <input ref={passwordRef} className="mt-2 px-2 rounded border-gray-400 h-10 justify-center border w-[100%] " type="password"/>
            </div>

            <button onClick={handleSignUp} className="cursor-pointer hover:bg-gray-800 mt-4 bg-black text-white font-bold w-[100%] h-10 rounded ">
                Sign Up
            </button>
            <div className="text-center text-black font-semibold mt-4">
                Already have an account? <Link className="underline" to="/signin" >Login</Link>
            </div>
        </div>
   </div>
  )
}

export default Signup