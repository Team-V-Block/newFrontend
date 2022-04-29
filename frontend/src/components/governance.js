import React, { Component } from 'react';
import ABI from '../ABI/Governance.json'
import { ethers } from "ethers";
import { BigNumber } from "ethers";
import {useState } from 'react';




class Vote extends Component {
  constructor(props) {
    super(props);

    this.state = {
      address: "",
      stakeholders:"",
      candidates:"",
      vote:"",
      result:"",
      allowed: "",

    };
    this.handleChangeAddress = this.handleChangeAddress.bind(this);
    this.handleChangeStake = this.handleChangeStake.bind(this);
    this.handleChangeCandidates = this.handleChangeCandidates.bind(this);
    this.handleChangeVote = this.handleChangeVote.bind(this);
    this.handleChangeResult = this.handleChangeResult.bind(this);
    this.handleChangeAllowed = this.handleChangeAllowed.bind(this);
  }

  /////// *******  HANDLES////////
handleChangeAddress(event) {
  this.setState({address: event.target.value});
}
handleChangeStake(event) {
  this.setState({stakeholders: event.target.value});
}
handleChangeCandidates(event) {
  this.setState({candidates : event.target.value});
}
handleChangeVote(event) {
  this.setState({vote : event.target.value});
}
handleChangeResult(event) {
  this.setState({result : event.target.value});
}
handleChangeAllowed(event) {
  this.setState({allowed: event.target.value});
}



  async connectToMetamask() {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const accounts = await provider.send("eth_requestAccounts", []);
    const balance = await provider.getBalance(accounts[0]);
    const addressBalance = ethers.utils.formatEther(balance);
    
    

    ////////************************READ FUNCTION */
    const voteContract = new ethers.Contract('0x64bC644e2225D7e6B75A8543221556e0E1A5a955', ABI.abi, provider);
    const Chairman = await voteContract.CHAIRMAN_ROLE();
    const Student = await voteContract.STUDENT_ROLE();
    const Teacher = await voteContract.TEACHER_ROLE();
    // Change Byte32 to string
    const checkStakeRole  = await voteContract.getRole(accounts[0]);
  

    const returnChairman = (Chairman)
    const returnStudent = (Student)
    const returnTeacher = (Teacher)
    this.setState({ selectedAddress: accounts[0], balance: addressBalance, 
      Chairman:returnChairman, Student:returnStudent, Teacher:returnTeacher,
      checkStakeRole
     });


}



//*********************************WRITE FUNCTIONS */

// grantRole
async grant() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner()  
    const address = this.state.address;
    const stakeholders = this.state.stakeholders
    const voteContract = new ethers.Contract('0x64bC644e2225D7e6B75A8543221556e0E1A5a955', ABI.abi, signer);
    // add dropdown for grantrole and input
    const byte = await voteContract.grantRole(stakeholders,address);
    
    this.setState({byte});
}
//changeResultStatus
async changeResultof() {

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner()
const status = this.state.result 
const voteContract = new ethers.Contract('0x64bC644e2225D7e6B75A8543221556e0E1A5a955', ABI.abi, signer);
const change = await voteContract.changeResultStatus(status)

this.setState({change});
}

// vote
async voteCandidate() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner()
    const voteCan = this.state.vote
    const voteContract = new ethers.Contract('0x64bC644e2225D7e6B75A8543221556e0E1A5a955', ABI.abi, signer);
    const votecand = await voteContract.vote(BigNumber.from(voteCan));
    this.setState({votecand});
    console.log(votecand);
}
// addCandidates 
async addCandidates() {

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner()
const name = this.state.candidates
const voteContract = new ethers.Contract('0x64bC644e2225D7e6B75A8543221556e0E1A5a955', ABI.abi, signer);
const add = await voteContract.addCandidates([name])

this.setState({add});
}

//changeVotingAllowed

async changeVoting() {

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner()
const allow = this.state.allowed
const voteContract = new ethers.Contract('0x64bC644e2225D7e6B75A8543221556e0E1A5a955', ABI.abi, signer);
const voting = await voteContract.changeVotingAllowed(allow)

this.setState({voting});
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
        <p>Student: {this.state.Student}</p>
        <p>Teacher: {this.state.Teacher}</p>
        <p>Role: {this.state.checkStakeRole}</p>
        <div>
        <form>
        <h3>Grant Role</h3>
        <label htmlFor="address"/>
        <h3>Input Address</h3>
        <input type="text" value={this.state.address} onChange={this.handleChangeAddress}/>
        <div>
        <h3>Select Role</h3>
        <select value={this.state.stakeholders} onChange={this.handleChangeStake}>
            <option value="0xdc1958ce1178d6eb32ccc146dcea8933f1978155832913ec88fa509962e1b413">Chairman</option>
            <option value="0xd16e204b8a42a15ab0ea6bb8ec1ecdfbe69f38074fc865323af19efe7d9573d9">Teacher</option>
            <option value="0x36a5c4aaacb6b388bbd448bf11096b7dafc5652bcc9046084fd0e95b1fb0b2cc">Student</option>
          </select>
        </div>
        </form>
        <button onClick={() => this.grant()}>grantRole</button>
        </div>
        <div>
        <h3>Add Candidates</h3>
        <label htmlFor="text"/>
        <h3>Input Candidate Name</h3>
        <input type="text" value={this.state.candidates} onChange={this.handleChangeCandidates}/>
        <button onClick={() => this.addCandidates()}>addCandidates</button>
        </div>
        <div>
        <h3>Vote Candidates</h3>
        <label htmlFor="number"/>
        <h3>Vote Candidates By ID</h3>
        <input type="number" value={this.state.vote} onChange={this.handleChangeVote}/>
        <button onClick={() => this.voteCandidate()}>Vote Candidates</button>
        </div>
        <div>
        <h3>Change Vote Result Status</h3>
        <select value={this.state.result} onChange={this.handleChangeResult}>
            <option value="false">Make Result Hidden</option>
            <option value="true">Make Result Public</option>
          </select>
        <button onClick={() => this.changeResultof()}>changeResultStatus</button>
        </div>
        <div>
        <h3>Change Voting Status</h3>
        <select value={this.state.allowed} onChange={this.handleChangeAllowed}>
            <option value="false">Disable Voting</option>
            <option value="true">Enable Voting</option>
          </select>
        <button onClick={() => this.changeVoting()}>ChangeVotingAllowed</button>
        </div>
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