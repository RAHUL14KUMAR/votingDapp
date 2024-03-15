import React from 'react'

function Page(prop) {
  return (
    <div className='bg-violet-200 w-screen h-screen flex flex-col justify-center items-center'>
        <div className='text-center font-bold tracking-widest font-mono text-2xl text-violet-900'>
            <h1>WELCOME TO VOTING DAPP</h1>
        </div>  
        <button className='mt-3 p-3 bg-violet-400 hover:violet-900 text-violet-900 hover:text-white font-bold tracking-widest rounded-sm' onClick={prop.connectWallet}>
            Login To Metamask
        </button>
    </div>
  )
}

export default Page
