import React, { Component } from 'react'
import { DripsClient, SubgraphClient, DripsConfig } from 'drips-sdk';
import { ContractReceipt, ethers , providers, type ContractTransaction } from 'ethers'
import Web3Modal from 'web3modal'
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import { useState } from 'react';




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
    const [provider, setProvider] = useState();
    const [library, setLibrary] = useState();
    const [account, setAccount] = useState();
    const [network, setNetwork] = useState();
  
    const connectWallet = async () => {
      try {
        const Walletprovider = await web3Modal.connect();
        const library:any = new ethers.providers.Web3Provider(Walletprovider); //I needed to change some code from the example code here for making it work. It needed to connect to the "Library" rather than "provider"const
        const accounts:any = await library.listAccounts();
        const network = await library.getNetwork();
        
        setProvider(Walletprovider);
        setLibrary(library);
        if (accounts) setAccount(accounts[0]);
        setNetwork(network);
  
        dripsClient = new DripsClient(library)
        await dripsClient.connect()
       
        dripsClient = dripsClient;
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
  

    function Disconnect(){ 
      dripsClient.disconnect()
       //Not working so far
      // clear so they can re-select from scratch
      web3Modal.clearCachedProvider()
      // manually clear walletconnect --- https://github.com/Web3Modal/web3modal/issues/354
      localStorage.removeItem('metamask')
        
    };
    
    return (
      <div> 
       <div className='grid grid-cols-2 gap-4'>
        <a className="grid gap items-center justify-center px-6 py-3 margin-left:5px border border-transparent text-base font-medium rounded-md 
              text-white bg-indigo-600 hover:bg-indigo-700"> <button onClick={connectWallet}>Connect Wallet</button> </a> 

        <a  className="grid  items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md 
              text-white bg-indigo-600 hover:bg-indigo-700"> <button onClick={approveDAIContract}> Approve Dai</button> </a> 
</div>

 
      </div> 
 
     )
   }

   export default Connect;
    

