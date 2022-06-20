import React, { Component } from 'react'
import { toWei,toWeiPerSec } from "drips-sdk";
import {DripsReceiverStruct, DripsClient, SubgraphClient, DripsConfig } from 'drips-sdk';
import {BigNumber, ContractReceipt, ethers , providers, Signer, type ContractTransaction } from 'ethers'
import Web3Modal, { Modal } from 'web3modal'
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import { useState } from 'react';
import { SetStateAction } from 'react'
import { getAddress } from 'ethers/lib/utils';


//contributor grid inputs

const contributors= [
  {
    name: 'Nader Dabit',
    wallet: 'sha.eth',
    role: 'Co-Founder developer Dao / DevRel @graphprotocol',
    imageUrl:
      'https://pbs.twimg.com/profile_images/1527428692103860224/sqHT4Wl1_400x400.png',
  },

  {
    name: 'Eda',
    wallet: 'genlyai.eth',
    role: 'DevRel @heliumfndn',
    imageUrl:
      'https://pbs.twimg.com/profile_images/1451891033504165889/30Q6K4eK_400x400.jpg',
    classnameonselected: "relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
  },

  {
    name: 'Mf',
    wallet: 'foragers.eth',
    role: 'Founder foragers.io / Devrel @Radicle',
    imageUrl:
      'https://pbs.twimg.com/profile_images/1519079307943071745/or70QEny_400x400.jpg',
  },

  {
    name: 'Ally',
    wallet: 'developerally.eth',
    role: 'Developer Advocate @filecoin @ipfs @protocollabs',
    imageUrl:
      'https://pbs.twimg.com/profile_images/1446605786948329472/_LjIFzfh_400x400.jpg',
  },

  {
    name: 'Cami',
    wallet: 'camiinthisthang.eth',
    role: 'DevRel @edgeandnode @graphprotocol @radicle',
    imageUrl:
      'https://pbs.twimg.com/profile_images/1531160718942253056/Q99UReV6_400x400.jpg',
  },
  
  {
    name: 'Rahat',
    wallet: 'rahat.eth',
    role: 'DevRel @edgeandnode @graphprotocol @radicle',
    imageUrl:
      'https://pbs.twimg.com/profile_images/1536380006791798786/Gn2uZUoq_400x400.jpg',
  },


]
 

// Define network-related constants
const networks = {
  1: { name: 'mainnet', layer: 'ethereum', infura: 'wss://mainnet.infura.io/ws/v3/1cf5614cae9f49968fe604b818804be6', explorer: { name: 'Etherscan', domain: 'https://etherscan.io' }, subgraph: 'https://api.thegraph.com/subgraphs/name/gh0stwheel/drips-on-mainnet'},
  4: { name: 'rinkeby', layer: 'ethereum', infura: 'wss://rinkeby.infura.io/ws/v3/1cf5614cae9f49968fe604b818804be6', explorer: { name: 'Etherscan', domain: 'https://rinkeby.etherscan.io' }, subgraph: 'https://api.thegraph.com/subgraphs/name/gh0stwheel/drips-on-rinkeby' },
  137: { name: 'matic', layer: 'polygon', infura: 'https://polygon-mainnet.infura.io/v3/1cf5614cae9f49968fe604b818804be6', explorer: { name: 'Polyscan', domain: 'https://polygonscan.com' }, subgraph: 'https://api.thegraph.com/subgraphs/name/gh0stwheel/drips-on-polygon' },
  80001: { name: 'mumbai', layer: 'polygon', infura: 'https://polygon-mumbai.infura.io/v3/1cf5614cae9f49968fe604b818804be6', explorer: { name: 'Polyscan', domain: 'https://mumbai.polygonscan.com' }, subgraph: 'https://api.thegraph.com/subgraphs/name/gh0stwheel/drips-on-mumbai' }
}

const networkToUse = "rinkeby"


export const providerOptions = {
  coinbasewallet: {
    package: CoinbaseWalletSDK, 
    options: {
      appName: "Web 3 Modal Demo",
      infuraId: '1cf5614cae9f49968fe604b818804be' 
    }
  },

 };
 

// set cacheProvider parameter as true when instantiating web3modal
const web3Modal = new Web3Modal({

  providerOptions // required
});




let dripsClient: DripsClient;
  let subgraphClient: SubgraphClient;
  let providerNetwork: providers.Network;
  let refreshUserDrips: () => Promise<void>;
  let errorText: string;

 
  
  function Connect(){
    //// set state of selectedcontributors to be reused for selection of adress
    const [selectedcontributor, setSelectedcontributor] = useState("")
  

    
//Init dripsamount function, drips amount equals the input that will be used for amount of monthly drips sendout (currently in DDAI)
    const  [dripsamount, setdripsamount] = useState(10);

    //Translating the input to WEI (based on DAI currently)
    
const inputAmountinWei =  {dripsamount} ? toWei(dripsamount):BigNumber.from(0)
    



    //set states for consts used to connect to network and dripsclient
    const [provider, setProvider] = useState();
    const [library, setLibrary] = useState();
    const [account, setAccount] = useState();
    const [network, setNetwork] = useState();
    
  
    const connectWallet = async (props:any) => {
      try {
        const Walletprovider = await web3Modal.connect();
        const library:any = new ethers.providers.Web3Provider(Walletprovider); //I needed to change some code from the example code here for making it work. It needed to connect to the "Library" rather than "provider"const
        const accounts:any = await library.listAccounts();
        const network = await library.getNetwork();
        const signer = library.getSigner() //again here, changed "provider" to "library"
        
      
        setProvider(Walletprovider);
        setLibrary(library);
        if (accounts) setAccount(accounts[0]);
        setNetwork(network);
  
        dripsClient = new DripsClient(library)
        await dripsClient.connect()
        const useraddress = dripsClient.address
        dripsClient = dripsClient;
        
        
        console.log(useraddress)
        
      } catch (error) {
        console.error(error);
        
      
      }
      
      
      
     
    
    };

    //for some reason I don't understand the approveDaiContract need to be in the same function or file like the Connect contract
    
    
    let approvalTx: ContractTransaction;
    let approvalReceipt: ContractReceipt;
    async function approveDAIContract () {
      approvalTx = await dripsClient.approveDAIContract();
      approvalReceipt = await approvalTx.wait() 
    }
  
    /// Check Allowance //Get Balance of wallet  //notsure if this works yet


    // async function CheckAllowedBalance(amt: BigNumber, userDrips: DripsConfig): Promise<any>{
    //   if (amt.gt(0)) {
    //     const allowance = await dripsClient.getAllowance()
    //     if (allowance.lt(amt)) {
    //       return 'You do not have enough DAI, or must first approve DAI for your addres.'
    //     }
    //   }
    //   else if (amt.lt(0)) {
    //     const withdrawable:any = userDrips.withdrawable
    //     // !! can't withdraw that much
    //     if (amt.abs().gt(withdrawable)) {
    //       return `You can't withdraw that much DAI.`
    //     }
    //   }
    // }
  
/// getting the drips inputfunction to change state when changing value linked to {dripsamount}
  const UpdateDrips:any = (event: { target: { value: SetStateAction<any>; }; }) => {
    setdripsamount(event.target.value)
  
    
    

    }



    


/// SendDrips Function 
//DOESNT WORK YET WITH MY STUFF, WHY? 

// let transaction: ContractTransaction;
// let txReceipt: ContractReceipt;
// let started = false
// let fundwalletamount = 0;
// let error: string = "";




const dripReceiversInputs = [
  //{address: [{ADDRESSOFYOURCONTRIBUTOR}]  amount: [{AMOUNTTOBEDRIPPEDPERMONTH}] as number from dripamount.tsx}
  {address: [{selectedcontributor}] as any, amount: [{dripsamount}] as any},
  
]

// const newReceivers = dripReceiversInputs.filter(({address, amount}) => address.length && amount)
// .map<DripsReceiverStruct>(({address, amount}) => (
//   {receiver: address.toLowerCase(), amtPerSec: toWeiPerSec(amount)}
// ))




    // async function SendDrips(){

    //   const topUpWei = fundwalletamount ? toWei(fundwalletamount) : BigNumber.from(0);
    //   const userDrips = await subgraphClient.getDripsBySender(dripsClient.address)
    //   error = await CheckAllowedBalance(topUpWei, userDrips);
    //   if (error) return;

    //   const newReceivers = dripReceivers.filter(({address, amount}) => address.length && amount)
    //   .map<DripsReceiverStruct>(({address, amount}) => (
    //     {receiver: address.toLowerCase(), amtPerSec: toWeiPerSec(amount)}
    //   ))

    //   started = true;
    //   transaction = await dripsClient.updateUserDrips(
    //     userDrips.timestamp || 0,
    //     userDrips.balance || 0,
    //     userDrips.receivers || [],
    //     topUpWei,
    //     newReceivers
    //   )
    //   txReceipt = await transaction.wait()
     
    // }

    


//     /Async get subgraphclient drips by sender function

 
// /Function to see if the user has enough funds in their wallet for a certain action. 
 async function checkIfBalanceisAvailable(amt:BigNumber, userDrips: any){
      
if(amt.gt(0)){
  const allowance = await dripsClient.getAllowance()
  if(allowance.lt(amt)){
    return 'You have invalid DAI available, please approve the DAI contract and top up your balance'
  }
}

else if(amt.lte(0)){ //useage LTE rather than LT (Lower equal then vs Lower Then "0" to include 0)
return 'something is wrong, your amount is lower or equal to 0'
}

console.log(amt)
}




  

    return (

      <div   className="grid grid-cols-1 gap-4 sm:grid-cols-1">
      
        {contributors.map((person) => (
          <div 
         
          onClick={()=> setSelectedcontributor((person.wallet))}
         
            key={person.wallet}
            className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
          >
           
            <div className="flex-shrink-0">
              <img className="h-10 w-10 rounded-full" src={person.imageUrl} alt="" />
            </div>
            <div className="flex-1 min-w-0">
              <a href="#" className="focus:outline-none">
                <span className="absolute inset-0" aria-hidden="true" />
                <p  className="text-sm font-medium text-gray-900">{person.name}</p>
                <p className="text-sm text-gray-500 truncate">{person.role}</p>
              </a>
            </div>
            
          </div>
          
        ))}
        
<div> Send to contributor '{[selectedcontributor]}'</div>

      
<div className='grid grid-cols-1 gap-4'>
       
       <div className="max-w-7xl mx-auto text-center py-4 px-4 sm:px-6 lg:py-16 lg:px-8">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          <span className="block">Choose your monthly drips amount</span>
        </h2>
        </div>
      <div className= " border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
      <label htmlFor="number" className="block text-xs font-medium text-gray-900">
         Amount in DAI
      </label>
      <form >
      <input  onChange={UpdateDrips}
        
         type="number"
         name="price"
         id="price"
         placeholder="10"
    
        className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
       
      />  </form>
    </div>
  


      <div className="flex items-center justify-between">

<a href="https://docs.drips.network/" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
  See drips docs
</a>
<div>
<button> {dripsamount} </button>

</div> 
</div>
    


    
     
       <div className='grid grid-cols-2 gap-4'>
        <a className="grid gap items-center justify-center px-6 py-3 margin-left:5px border border-transparent text-base font-medium rounded-md 
              text-white bg-indigo-600 hover:bg-indigo-700"> <button onClick={connectWallet}>1. Connect Wallet</button> </a> 

        <a  className="grid  items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md 
              text-white bg-indigo-600 hover:bg-indigo-700"> <button onClick={approveDAIContract}>2.  Approve Dai</button> </a> 
<a  className="grid  items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md 
              text-white bg-indigo-600 hover:bg-indigo-700"> <button onClick={() => console.log(5)}>3. Fund DripWallet</button> </a> 
             <a  className="grid  items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md 
              text-white bg-indigo-600 hover:bg-indigo-700"> <button onClick={() => console.log("none")}>4.  Activate Monthly Drips</button> </a> 

<button onClick={ ()=> console.log([dripReceiversInputs])}> show log new receivers</button>
<button onClick={ ()=>  checkIfBalanceisAvailable(inputAmountinWei,dripsClient.address)}> Check Allowance with above inputs</button>
              </div>
              
<div>


</div>

      </div> 
      </div>
     )
   
  }


   export default Connect;
    

