import React, { Component } from 'react';
import ABI from '../ABI/Governance.json'
import { ethers } from "ethers";




class Vote extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  async connectToMetamask() {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const accounts = await provider.send("eth_requestAccounts", []);
    const balance = await provider.getBalance(accounts[0]);
    const addressBalance = ethers.utils.formatEther(balance);
    

    
  
     const voteContract = new ethers.Contract('0x64bC644e2225D7e6B75A8543221556e0E1A5a955', ABI.abi, provider);
    const Chairman = await voteContract.CHAIRMAN_ROLE();
    const returnByte = (Chairman)
    this.setState({ selectedAddress: accounts[0], balance: addressBalance, Chairman:returnByte   });









}

async grant() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner()  

    const voteContract = new ethers.Contract('0x64bC644e2225D7e6B75A8543221556e0E1A5a955', ABI.abi, signer);
    const byte = await voteContract.grantRole("0x36a5c4aaacb6b388bbd448bf11096b7dafc5652bcc9046084fd0e95b1fb0b2cc");
    const voteContractSigner = voteContract.connect(signer);
     voteContractSigner.grantRole("0xD2bD56D366B4E72417630e66C14f6929660C17aB", byte)


}

  renderMetamask() {
    if (!this.state.selectedAddress) {
      return (
        <button onClick={() => this.connectToMetamask()}>Connect to Metamask</button>
      )
    } else {
      return (
          <div>
        <p>Welcome {this.state.selectedAddress}</p>
        <p>Your Balance is: {this.state.balance}</p>
        <p>Chairman: {this.state.Chairman}</p>
        <button onClick={() => this.grant("0xD2bD56D366B4E72417630e66C14f6929660C17aB","0x64bC644e2225D7e6B75A8543221556e0E1A5a955")}>grantRole</button>
        </div>
      );
    }
  }

  render() {
    return(
      <div>
        {this.renderMetamask()}
      </div>
    )
  }
}

export default Vote;