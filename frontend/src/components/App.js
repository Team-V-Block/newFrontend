import React from "react";
import "./App.css";
import Vote from "./governance";
import CheckVoterAddress from "./CheckVoterAddress";
import AddVoter from "./AddVoter";

const App = () => {
  return (
    <>
      <Vote />
      <AddVoter />
      <CheckVoterAddress />
    </>
  );
};

export default App;
