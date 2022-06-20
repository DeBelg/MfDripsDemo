import React from 'react';
import { useState } from 'react';
 
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
      wallet: 'sha.eth',
      role: 'DevRel @heliumfndn',
      imageUrl:
        'https://pbs.twimg.com/profile_images/1451891033504165889/30Q6K4eK_400x400.jpg',
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
        'https://pbs.twimg.com/profile_images/1531616379585142784/c2RQ5uSO_400x400.jpg',
    },


  ]

  

  export default function ContributorGrid() {

    const [selected, setSelected] = useState(false); // Added state

   
    const handleClick = () => {
      setSelected(!selected);
    };

   

    return (
      
      <div   className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {contributors.map((person) => (
          <div onClick={()=>console.log([person.wallet])}
            key={person.wallet}
            className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
          >
            <div className="flex-shrink-0">
              <img className="h-10 w-10 rounded-full" src={person.imageUrl} alt="" />
            </div>
            <div className="flex-1 min-w-0">
              <a href="#" className="focus:outline-none">
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="text-sm font-medium text-gray-900">{person.name}</p>
                <p className="text-sm text-gray-500 truncate">{person.role}</p>
              </a>
            </div>
          </div>
        ))}
      </div>
    )
  }