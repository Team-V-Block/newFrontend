import React, { Component } from "react";
import ABI from "../ABI/Governance.json";
import { ethers } from "ethers";
import "./governance.css";
import { BigNumber } from "ethers";

class Vote extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  async connectToMetamask() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    const balance = await provider.getBalance(accounts[0]);
    const addressBalance = ethers.utils.formatEther(balance);

    ////////************************READ FUNCTION */
    const voteContract = new ethers.Contract(
      "0x64bC644e2225D7e6B75A8543221556e0E1A5a955",
      ABI.abi,
      provider
    );
    const Chairman = await voteContract.CHAIRMAN_ROLE();
    const Student = await voteContract.STUDENT_ROLE();
    const Teacher = await voteContract.TEACHER_ROLE();

    const returnChairman = Chairman;
    const returnStudent = Student;
    const returnTeacher = Teacher;
    this.setState({
      selectedAddress: accounts[0],
      balance: addressBalance,
      Chairman: returnChairman,
      Student: returnStudent,
      Teacher: returnTeacher,
    });
  }
  async Result() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const voteContract = new ethers.Contract(
      "0x64bC644e2225D7e6B75A8543221556e0E1A5a955",
      ABI.abi,
      provider
    );
    const Result = await voteContract.votingResult();

    this.setState({ Result });
  }

  //*********************************WRITE FUNCTIONS */

  // grantRole
  async grant() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const voteContract = new ethers.Contract(
      "0x64bC644e2225D7e6B75A8543221556e0E1A5a955",
      ABI.abi,
      signer
    );
    const byte = await voteContract.grantRole(
      "0x36a5c4aaacb6b388bbd448bf11096b7dafc5652bcc9046084fd0e95b1fb0b2cc",
      "0x777094c9Ede5AD9E04d2b2f00f992CD7f9B0A85C"
    );

    this.setState({ byte });
  }
  //changeResultStatus
  async changeResultof() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const voteContract = new ethers.Contract(
      "0x64bC644e2225D7e6B75A8543221556e0E1A5a955",
      ABI.abi,
      signer
    );
    const change = await voteContract.changeResultStatus(true);

    this.setState({ change });
  }

  // vote
  async voteCandidate() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const voteContract = new ethers.Contract(
      "0x64bC644e2225D7e6B75A8543221556e0E1A5a955",
      ABI.abi,
      signer
    );
    const votecand = await voteContract.vote(BigNumber.from("2"));
    this.setState({ votecand });
    console.log(votecand);
  }
  // addCandidates
  async addCandidates() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const voteContract = new ethers.Contract(
      "0x64bC644e2225D7e6B75A8543221556e0E1A5a955",
      ABI.abi,
      signer
    );
    const add = await voteContract.addCandidates(["Hollio"]);

    this.setState({ add });
  }

  //changeVotingAllowed

  async changeVoting() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const voteContract = new ethers.Contract(
      "0x64bC644e2225D7e6B75A8543221556e0E1A5a955",
      ABI.abi,
      signer
    );
    const voting = await voteContract.changeVotingAllowed(false);

    this.setState({ voting });
  }

  renderMetamask() {
    if (!this.state.selectedAddress) {
      return (
        <button
          className="btn-connect"
          onClick={() => this.connectToMetamask()}
        >
          Connect to Metamask
        </button>
      );
    } else {
      return (
        <>
          <div className="container">
            <div className="header">
              <h1 className="title">ZURI Governance App</h1>
            </div>
            <div className="text-container">
              <div className="user-card">
                <p className="user-address">
                  Welcome {this.state.selectedAddress}
                </p>
                <p className="user-balance">
                  Your Balance is: {this.state.balance}
                </p>
              </div>
              <div className="role-info">
                <p className="role">Chairman: {this.state.Chairman}</p>
                <p className="role">Student: {this.state.Student}</p>
                <p className="role">Teacher: {this.state.Teacher}</p>
              </div>
            </div>
            <div className="button-container">
              <button className="btn btn-grant" onClick={() => this.grant()}>
                grantRole
              </button>
              <button
                className="btn btn-add"
                onClick={() => this.addCandidates()}
              >
                addCandidates
              </button>
              <button
                className="btn btn-vote"
                onClick={() => this.voteCandidate}
              >
                Vote Candidates
              </button>
              <button
                className="btn btn-changeStatus"
                onClick={() => this.changeResultof()}
              >
                changeResultStatus
              </button>
              <button
                className="btn btn-changeVoting"
                onClick={() => this.changeVoting()}
              >
                ChangeVotingAllowed
              </button>
            </div>
          </div>
        </>
      );
    }
  }

  render() {
    return <div>{this.renderMetamask()}</div>;
  }
}

export default Vote;
