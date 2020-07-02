import React from "react";
import { Button } from "antd";
import "./App.css";
import "./xterm.css";
import { Component } from "react";

import Terminal from "./terminal";

// antdesign layouts

class App extends Component {
  // constructor(props, context) {
  //   super(props, context);
  // }
  render() {
    return (
      <div className="App">
        
        <Terminal/>
      </div>
    );
  }
}

export default App;
