import * as React from 'react';
import { DripsClient, SubgraphClient, DripsConfig } from 'drips-sdk';
import { ContractReceipt, ethers , providers, type ContractTransaction } from 'ethers'

export interface FundWallet {
}






let dripsClient:DripsClient
let approvalTx: ContractTransaction;
let approvalReceipt: ContractReceipt;

async function approveDAIContract () {
  dripsClient.connect()
  approvalTx = await dripsClient.approveDAIContract();
  approvalReceipt = await approvalTx.wait()
}


export default class App extends React.Component<FundWallet> {
  public render() {
    
   
    


    return (
      <div>
      <h2> You must first allow the Drips contract to be able to withdraw your DAI, after that you can fund your drips wallet </h2>
      <button onClick={approveDAIContract} 
      className=" items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm 
      text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Approve DAI
        </button>
        
      <button 
        type="button"
        className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md min-width 
        text-indigo-700 bg-indigo-100 hover:bg-indigo-200">
        Fund your wallet!
      </button>
      </div>
      
    );
  }
}

