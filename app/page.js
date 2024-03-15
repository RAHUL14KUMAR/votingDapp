"use client"
import Image from 'next/image'

import Login from './login/page'
import Connected from './connected/page';
// import ethers from 'ethers'
import { useState } from 'react';
import Web3 from "web3";
import { ethers } from 'ethers';

export default function Home() {

  const [walletAddress, setWalletAddress] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  
  let provider=typeof window !== "undefined" && window.ethereum;
  async function connectToMetaMask(){
    try{
      if(!provider){
        alert("Please install MetaMask!");
        return;
      }

      const accounts = await provider.request({ method: 'eth_requestAccounts' });

      if(accounts.length){
        setWalletAddress(accounts[0]);
      }
      setIsConnected(true);

    }catch(error){
      console.error(error);
    }
  }

  return (
    <div>
      {isConnected? <Connected account={walletAddress} provider={provider}/>:
      <Login connectWallet={connectToMetaMask} />}
    </div>
  )
}
