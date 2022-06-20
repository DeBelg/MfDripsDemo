import React, { Component } from 'react'
import { type SubgraphClient,Split, toDAI, DripsConfig, DripsClient } from "drips-sdk";


export let dripsClient: DripsClient;
export let subgraphClient: SubgraphClient;


let userDrips: DripsConfig;
let updating = false;
let userSplits: Split[];

export async function refresh() {
  dripsClient.connect()
  updating = true;
  userDrips = await subgraphClient.getDripsBySender(dripsClient.address)
  userSplits = await subgraphClient.getSplitsBySender(dripsClient.address.toLowerCase())
  updating = false;
}


export default class UserWalletDripsInfo extends Component {

 
  render() {
    return (
  <div>
      <button onClick={refresh} >Update</button>
      <h3>Drips</h3>
      <div>{ userDrips ? JSON.stringify(userDrips, null, 2) : '...' }</div>
      <h3>Splits</h3>
<div>{ userSplits ? JSON.stringify(userSplits, null, 2) : '...' }</div>
   

   </div>
    )
  }
}
