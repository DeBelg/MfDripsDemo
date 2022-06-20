
import ContributorGrid from './pages/contributors';
import './App.css';
import DripsSelection from './pages/dripamount';
import { DripsClient, SubgraphClient } from 'drips-sdk'
import { ContractReceipt, providers, type ContractTransaction } from 'ethers'
import Connect from './pages/walletv2';




let dripsClient: DripsClient;
let subgraphClient: SubgraphClient;

function App() {


  return (


    
    <div className="bg-white">
      <div className="max-w-7xl mx-auto text-center py-12 px-6 sm:px-6 lg:py-16 lg:px-8">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          <span className="block">Drips Demo</span>
      
        </h2>
        <div className="mt-8 flex justify-center">
      
          
            <a
              href="https://www.notion.so/duckweed-growth/Devrel-DEMO-d8dd1dfd329648c1a6ed81985897025b"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md min-width 
              text-indigo-700 bg-indigo-100 hover:bg-indigo-200" >
               Guide to build this demo
  
            </a>
            
          </div>
         
        
        
      </div>
      
   
  

   
    <div className='=mt-8 flex justify-center px-6 py-3'> <Connect/>  </div>



    </div>
  

    
    
    
  )
}

export default App;
