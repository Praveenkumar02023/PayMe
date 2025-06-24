import axios from "axios";
import { useEffect,  useRef, useState } from "react";


const Dashboard = () => {

  const [balance , setBalance] = useState(null);
  const [users,setUsers] = useState<{_id : string , firstName :string , lastName: string}[]>([]);
  const nameRef = useRef<HTMLInputElement>(null);


  const getUsers = async()=>{    
    const firstName = nameRef.current?.value;
    const token = localStorage.getItem("jwt");
    try {

      const res = await axios.post('http://localhost:8000/api/v1/user/bulk',{
        firstName
      },{
        headers:{
          Authorization : `Bearer ${token}`
        }
      });

      console.log(res.data);
      setUsers(res.data.users);

    } catch (error) {
        console.log(error);
    }

  }

  const getBalance = async()=>{

    const token = localStorage.getItem("jwt");

    try {

      const res = await axios.get('http://localhost:8000/api/v1/account/balance',{
        headers:{
          Authorization : `Bearer ${token}`
        } 
      });

      setBalance(res.data.balance);

    } catch (error) {
        console.log(error);
    }

  }

  useEffect(()=>{
    getBalance();
    getUsers();
  },[]);


  return (
    <div className="h-screen w-screen">
      <div className="border px-8 h-16 w-[100%] flex justify-between ">
        <h2 className="py-3 font-bold text-2xl">PayMe</h2>

        <div className="flex items-center justify-center">
          <h2 className="mr-2 font-semibold  ">Hello, User</h2>

          <div className="flex items-center justify-center rounded-full w-10 h-10 bg-gray-300 border-gray-300">
            U
          </div>
        </div>
      </div>
      <div className="flex  items-center m-8">
        <div className="font-bold text-2xl">Your Balance :</div>
        <div className="ml-8 font-semibold text-xl">${balance}</div>
      </div>
      <div className="p-8 w-screen">

        <div className="font-bold text-2xl">
          Users
        </div>
        <input ref={nameRef} onChange={getUsers} className="my-6 px-4 h-10 w-[100%] text-black  rounded-lg border border-gray-300" type="text" placeholder="search user..." />

        <div>
          <ul>
            {users.map((u) => <li className="flex items-center justify-between my-2 px-4 rounded-md h-10 border border-gray-300 w-[100%] text-black" key={u._id}>
              
             <div className="flex items-center">
              <div className="rounded-full bg-gray-300 h-8 w-8 flex justify-center items-center ">
                {u.firstName[0]}
              </div >
              <div className="ml-3 font-semibold">
                {u.firstName}  {u.lastName}
              </div>
             </div>
              
              <button className="cursor-pointer hover:bg-gray-800 h-[100%] rounded-lg w-[8%] bg-black text-white" >send money</button></li>)}
          </ul>
        </div>

      </div>


    </div>
  );
};


export default Dashboard;
