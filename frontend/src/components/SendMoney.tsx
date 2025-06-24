import { useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const SendMoney = () => {
  const location = useLocation();
  const { userId, firstName, lastName } = location.state || {};
  const amountRef = useRef<HTMLInputElement>(null);
  const token = localStorage.getItem("jwt");

  const handleMoneyTransfer = async()=>{

    try {
      
      const res = await axios.post('http://localhost:8000/api/v1/account/transfer',{
        to : userId,
        amount : parseInt(amountRef.current?.value!)
      },{
        headers : {
          Authorization : `Bearer ${token}`
        }
      })

      console.log(res.data);
      toast.success(res.data.message);

    } catch (error) {
      toast.error("Something went wrong");
    }

  }

  return (
    <div className=" bg-gray-300 h-screen w-screen flex items-center justify-center">
      <div className="rounded-xl p-8 h-auto w-[25%] border bg-white border-gray-300 shadow shadwow-">
        <h2 className="text-3xl font-bold text-center">Send Money</h2>
        <h2 className="mt-8 text-lg font-semibold text-center">
          to
        </h2>
        <div className="justify-center my-8 flex items-center">
          <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center font-Bold text-2xl text-white">
            {firstName[0]}
          </div>
          <div className="ml-2 font-semibold text-xl">
            {firstName} {lastName}
          </div>
        </div>

        <div className="mt-4">
          <h4 className="text-black font-semibold">Amount($)</h4>

          <input
            ref={amountRef}
            className="mt-2 px-2 rounded border-gray-400 h-10 justify-center border w-[100%] "
            type="text"
          />
        </div>
        <button onClick={handleMoneyTransfer}
        className="cursor-pointer hover:bg-green-300 mt-4 bg-green-500 text-white font-semibold w-[100%] h-10 rounded "
      >
        Initiate Transfer
      </button>
      </div>
      
    </div>
  );
};

export default SendMoney;
