import React from "react";
import logo from "./logo.svg";
import { Button } from "antd";
import "./App.css";

import XTerm, { Terminal } from "react-xterm";
import "./xterm.css";

import { Component } from "react";

import NodeSSH from "node-ssh";

// antdesign layouts

function runLocalTerminal(xterm) {
  const term = xterm.getTerminal();

  const os = require("os");
  const pty = require("node-pty");

  const shell = process.env[os.platform() === "win32" ? "COMSPEC" : "SHELL"];

  const ptyProc = pty.spawn(shell, [], {
    name: "xterm-color",
    env: process.env,
  });

  term.on("data", (data) => {
    ptyProc.write(data);
  });

  term.on("resize", (size) => {
    ptyProc.resize(
      Math.max(size ? size.cols : term.cols, 1),
      Math.max(size ? size.rows : term.rows, 1)
    );
  });

  ptyProc.on("data", (data) => {
    term.write(data);
  });
}

function runFakeTerminal(xterm) {
  const ssh = new NodeSSH();

  ssh
    .connect({
      host: "192.168.1.78",
      username: "pi",
      password: "raspberry",
    })
    .then(async function () {
      let shell = await ssh.requestShell();

      const term = xterm.getTerminal();

      shell.on("data", (e) => {
        xterm.write("" + e);
      });

      term.on("key", function (key, ev) {
        shell.write(key, {});
      });
    });
}

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.inputRef = React.createRef();
  }
  componentDidMount() {
    runFakeTerminal(this.inputRef.current);
  }
  componentWillUnmount() {
    this.inputRef.current.componentWillUnmount();
  }

  render() {
    return (
      // <div className="App">
      //   <header className="App-header">
      //     <Button type='primary'>love</Button>
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <p>
      //       Edit <code>src/App.js</code> and save to reload.
      //     </p>
      //     <a
      //       className="App-link"
      //       href="https://reactjs.org"
      //       target="_blank"
      //       rel="noopener noreferrer"
      //     >
      //       Learn React
      //     </a>
      //   </header>
      // </div>
      <div className="App">
        <XTerm
          ref={this.inputRef}
          addons={["fit", "fullscreen", "search"]}
          style={{
            overflow: "hidden",
            position: "relative",
            width: "100%",
            height: "100%",
          }}
        />
      </div>
    );
  }
}

export default App;

// function App() {

//   return (
//     // <div className="App">
//     //   <header className="App-header">
//     //     <Button type='primary'>love</Button>
//     //     <img src={logo} className="App-logo" alt="logo" />
//     //     <p>
//     //       Edit <code>src/App.js</code> and save to reload.
//     //     </p>
//     //     <a
//     //       className="App-link"
//     //       href="https://reactjs.org"
//     //       target="_blank"
//     //       rel="noopener noreferrer"
//     //     >
//     //       Learn React
//     //     </a>
//     //   </header>
//     // </div>
//     <div className="App">
//                 <XTerm ref={this.inputRef}
//                        addons={['fit', 'fullscreen', 'search']}
//                        style={{
//                         overflow: 'hidden',
//                         position: 'relative',
//                         width: '100%',
//                         height: '100%'
//                        }}/>
//             </div>
//   );
// }

// export default App;
