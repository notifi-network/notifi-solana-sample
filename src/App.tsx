import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Wallet from "./Wallet";
import Notifi from "./Notifi";
import BroadcastForm from "./BroadcastForm";
import Transaction from "./Transaction";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Wallet>
          <Transaction />
        </Wallet>
      </header>
    </div>
  );
}

export default App;
