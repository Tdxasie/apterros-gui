import React, { Component, useState } from "react";
import XTerm from "./terminal2.js";
import { FitAddon } from "xterm-addon-fit";
import { Form, Input, Button, Checkbox } from 'antd';

import NodeSSH from "node-ssh";

class Terminal extends Component {
  constructor(props, context) {
    super(props, context);
    this.inputRef = React.createRef();
    this.sate = {
      logged: false,
      log_info: null,
    };
  }

  async componentDidMount() {
    await this.runTerminal(this.inputRef.current);
  }

  componentWillUnmount() {
    this.inputRef.current.componentWillUnmount();
  }

  onFinish(values) {
    console.log(values);
  }

  onFinishFailed(err){
    console.error(err);
  }

  async runTerminal(xterm) {
    const ssh = new NodeSSH();
    const term = xterm.getTerminal();
    const fitAddon = new FitAddon();

    term.loadAddon(fitAddon);
    fitAddon.fit();

    await ssh.connect({
      host: "169.254.57.12",
      username: "pi",
      password: "raspberry",
    });

    let shell = await ssh.requestShell();

    shell.on("data", (res) => xterm.write("" + res));
    term.onKey((e) => shell.write(e.key));

    // ssh
    //   .connect({
    //     host: "169.254.57.12",
    //     username: "pi",
    //     password: "raspberry",
    //   })
    //   .then(async () => {
    //     let shell = await ssh.requestShell();
    //     const term = xterm.getTerminal();
    //     shell.on("data", (res) => xterm.write("" + res));
    //     term.on("key", (key) => shell.write(key));
    //   });
  }

  render() {
    if (this.state.logged) {
      return (
        <div>
          <XTerm
            ref={this.inputRef}
            // addons={["fit"]}
            style={{
              overflow: "hidden",
              position: "relative",
              width: "100%",
              height: "100%",
            }}
          />
        </div>
      );
    } else {
      return (
        <div>
          <Form
            {...layout}
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      );
    }
  }
}

export default Terminal;
