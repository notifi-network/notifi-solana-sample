import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Wallet from "./Wallet";
import BroadcastForm from "./BroadcastForm";
import Remote from "./Remote";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Wallet>
          <Remote />
        </Wallet>
      </header>
    </div>
  );
}

export default App;
