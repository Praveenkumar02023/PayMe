import { Link } from "react-router-dom"


const Signup = () => {
  return (
   <div className="h-screen w-screen bg-gray-400 flex flex-col items-center justify-center">

        <div className="py-8 px-6 h-[70%] w-[25%] bg-white rounded-lg" >

            <div className=" flex flex-col items-center justify-center">

                <h2 className="text-3xl font-bold">Sign Up</h2>
                <p className="text-center mt-4 text-gray-500">Enter your information to create an account</p>

            </div>

             <div className="mt-4">
                <h4 className="text-black font-semibold">First Name</h4>
                <input className="mt-2 px-2 rounded border-gray-400 h-10 justify-center border w-[100%] " type="text" placeholder="enter your first name"/>
            </div>
            <div className="mt-4">
                <h4 className="text-black font-semibold">Last Name</h4>
                <input className="mt-2 px-2 rounded border-gray-400 h-10 justify-center border w-[100%] " type="text" placeholder="enter your last name"/>
            </div>
            <div className="mt-4">
                <h4 className="text-black font-semibold">Email</h4>
                <input className="mt-2 px-2 rounded border-gray-400 h-10 justify-center border w-[100%] " type="text" placeholder="enter your email"/>
            </div>
            <div className="mt-4">
                <h4 className="text-black font-semibold">Password</h4>
                <input className="mt-2 px-2 rounded border-gray-400 h-10 justify-center border w-[100%] " type="text"/>
            </div>

            <button className="cursor-pointer hover:bg-gray-800 mt-4 bg-black text-white font-bold w-[100%] h-10 rounded ">
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