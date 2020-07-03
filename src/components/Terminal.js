import React, { Component } from 'react';
import XTerm from './XTerm.js';
import { FitAddon } from 'xterm-addon-fit';

import NodeSSH from 'node-ssh';
import LoginForm from './LoginForm.js';



class Terminal extends Component {
	constructor(props, context) {
		super(props, context);
		this.inputRef = React.createRef();
		this.state = {
			logged: false,
			log_info: null,
		};
	}
	
	async componentDidUpdate() {
		if (this.state.logged){
			await this.runTerminal(this.inputRef.current, this.state.log_info);
		}
	}
	
	componentWillUnmount() {
		this.inputRef.current.componentWillUnmount();
	}
	
	async runTerminal(xterm, log_info) {
		const ssh = new NodeSSH();
		const term = xterm.getTerminal();
		const fitAddon = new FitAddon();
		
		term.loadAddon(fitAddon);
		fitAddon.fit();
		
		await ssh.connect(log_info);
		
		let shell = await ssh.requestShell();
		
		shell.on('data', (res) => xterm.write('' + res));
		term.onKey((e) => shell.write(e.key));
	}
	
	render() {
		if (this.state.logged) {
			return (
				<div>
					<XTerm
						ref={this.inputRef}
						style={{
							overflow: 'hidden',
							position: 'relative',
							width: '100%',
							height: '100%',
						}}
					/>
				</div>
			);
		} else {
			return (
				<div>
					<LoginForm onSubmit={ (values) => this.setState({
						logged: true,
						log_info: values
					})}/>
				</div>
			);
		}
	}
}
		
export default Terminal;
		