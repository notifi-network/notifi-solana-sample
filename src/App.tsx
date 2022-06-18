import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Wallet from "./Wallet";
import Notifi from "./Notifi";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Wallet>
          <Notifi />
        </Wallet>
      </header>
    </div>
  );
}

export default App;
