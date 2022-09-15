import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Wallet from "./Wallet";
import Notifi from "./Notifi";
import BroadcastForm from "./BroadcastForm";
import Transaction from "./Transaction";
import Hooks from "./Hooks";
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
