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
    const Student = await voteContract.STUDENT_ROLE();
    const Teacher = await voteContract.TEACHER_ROLE();
    const returnChairman = (Chairman)
    const returnStudent = (Student)
    const returnTeacher = (Teacher)
    this.setState({ selectedAddress: accounts[0], balance: addressBalance, Chairman:returnChairman, Student:returnStudent, Teacher:returnTeacher  });


}
// grantRole
async grant() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner()  

    const voteContract = new ethers.Contract('0x64bC644e2225D7e6B75A8543221556e0E1A5a955', ABI.abi, signer);
    const byte = await voteContract.grantRole("0x36a5c4aaacb6b388bbd448bf11096b7dafc5652bcc9046084fd0e95b1fb0b2cc","0x777094c9Ede5AD9E04d2b2f00f992CD7f9B0A85C");
    
    this.setState({byte});
}
// addCandidates 
async addCandidates() {

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner()

    const voteContract = new ethers.Contract('0x64bC644e2225D7e6B75A8543221556e0E1A5a955', ABI.abi, signer);
    const add = await voteContract.addCandidates(["Hollio"])

    this.setState({add});
}
// vote
async voteCandidate() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner()
    
    const voteContract = new ethers.Contract('0x64bC644e2225D7e6B75A8543221556e0E1A5a955', ABI.abi, signer);
    const vote = await voteContract.vote(['3']);
    this.setState({vote});
    console.log(vote)
}
//











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
        <p>Student: {this.state.Student}</p>
        <p>Teacher: {this.state.Teacher}</p>
        <button onClick={() => this.grant()}>grantRole</button>
        <button onClick={() => this.addCandidates()}>addCandidates</button>
        <button onClick={() => this.voteCandidate}>Vote Candidates</button>
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