/* This example requires Tailwind CSS v2.0+ */
import { SetStateAction, useState } from 'react'





export default function DripAmountFunction(props:any) {
  

  const [dripsamount, setdripsamount] = useState('');


  const UpdateDrips:any = (event: { target: { value: SetStateAction<any>; }; }) => {
    setdripsamount(event.target.value)
  
    props.dripsamount({dripsamount})

    }




  return (
   
    <div>
       
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
        
         type="text"
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
    </div>
  )
}

