"use client"
import React,{useEffect,useState} from 'react'
import Web3 from "web3";
import { Abi,address } from '@/components/Contract/Abi';
import { Calligraffitti } from 'next/font/google';

function Page(props) {
  const [time,setTime]=useState('')
  const [candidates,setCandidates]=useState([])
  useEffect(()=>{
    get();
    getTime();
    getCandidates();
  },[])

  async function getContract(){
    const web3=new Web3(props.provider);
    return new web3.eth.Contract(Abi,address);
  }

  async function get(){
    const contract=await getContract();
    console.log("contract",contract);

    console.log("contract methods",contract.methods);
    // const result=await contract.methods.getAllVoteOfCandidates().call();
    // console.log("result",result);
  }

  async function getTime(){
    const contract=await getContract();

    const res=await contract.methods.getRemainingTime().call();

    setTime(parseInt(res,16));
    console.log("res->getTTime",parseInt(res,16))
  }

  async function getCandidates(){
    const contract=await getContract();

    const res=await contract.methods.getAllVoteOfCandidates().call();

    console.log("res->getCandidates",res);
    setCandidates(res);
  }

  // console.log("address",address)
  console.log(time)
  return (
    <div className='bg-violet-200 flex flex-col items-center justify-center w-screen h-screen'>
      <div className='text-violet-900 text-2xl font-bold tracking-widest text-center'>You are connected to the metamask</div>

      <div  className=' bg-white p-2  w-100 text-violet-900 text-xl font-bold tracking-widest text-center'>connected-accounts:{props.account}</div>

      {time>0? <div className='bg-violet-900 text-white p-2 w-100 text-xl font-bold tracking-widest text-center mt-5'>Time remaining:{time}</div>:<div className='bg-violet-900 text-white p-2 w-100 text-xl font-bold tracking-widest text-center mt-5'>Voting is closed</div>}


      <div className='text-center text-violet-900 text-2xl  mt-5'>
        <h1 className='font-bold text-xl tracking-widest'>GET ALL CANDIDDATES DETAILS</h1>
        <table className='border-4 border-violet-950 mt-5 p-4 mx-auto'>
        <thead>
        <tr className='text-voilet-900 font-bold tracking-widest border-4 border-violet-950 p-4 bg-violet-800 text-white'>
          <th className='border-4 border-violet-950 p-4'>Name</th>
          <th className='border-4 border-violet-950 p-4'>Votes</th>
        </tr>
        </thead>
        {
          candidates.map((item)=>{
            return( 
              <tr>
                <td className='border-4 border-violet-950 p-4 m-2 font-mono font-bold '>{item.name}</td>
                <td className='border-4 border-violet-950 p-4 m-2 font-mono font-bold '>{parseInt(item.voteCount)}</td>
              </tr>
            
            )
          })
        }
        </table>
      </div>
    </div>
  )
}

export default Page
