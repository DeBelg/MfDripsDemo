/* This example requires Tailwind CSS v2.0+ */
import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import { Drip } from '../../../../DeBelgLocalForkDripJSSDK/drips-js-sdk/src/subgraph';


let dripsamount:any = 0;

const daiOptions = [

  { amount: 16},
  { amount: 32},
  { amount: 64},

]

function handleSubmit(){

  dripsamount  = ""


}
function classNames(...classes:any) {
  return classes.filter(Boolean).join(' ')
}

export default function Dripsmount() {
  const [dai, setDai] = useState(daiOptions[2])

 

  return (
   
    <div>
       
       <div className="max-w-7xl mx-auto text-center py-4 px-4 sm:px-6 lg:py-16 lg:px-8">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          <span className="block">Choose your monthly drips amount</span>
        </h2>
        </div>
      <div className= " border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
      <label htmlFor="amount" className="block text-xs font-medium text-gray-900">
        Custom amount in DAI
      </label>
      <form onChange={handleSubmit}>
      <input
        type="number"
    
        name="customnumber"
        id="dripsamount"
        className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
        placeholder="10"
      />  </form>
    </div>
      <RadioGroup value={dai} onChange={setDai} className="mt-2">
        <RadioGroup.Label className="sr-only">Choose a drips option</RadioGroup.Label>
        <div className="grid grid-cols-3 gap-3">
          {daiOptions.map((option) => (
            <RadioGroup.Option
              key={option.amount}
              value={option}
              className={({ active, checked }) =>
                classNames(
                   
                  active ? 'ring-2 ring-offset-2 ring-indigo-500' : '',
                  checked
                    ? 'bg-indigo-600 border-transparent text-white hover:bg-indigo-700'
                    : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50',
                  'border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1'
                )
              }
 
            >
              <RadioGroup.Label>{option.amount} DAI</RadioGroup.Label>
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>

      <div className="flex items-center justify-between">

<a href="https://docs.drips.network/" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
  See drips docs
</a>
</div>
    </div>
  )
}