import React, { Component } from 'react';
import XTerm from './XTerm';
import { FitAddon } from 'xterm-addon-fit';

import NodeSSH from 'node-ssh';
import LoginForm from './LoginForm.js';

import { notification, message } from 'antd';
import { connect } from 'react-redux';

const openNotificationWithIcon = (type, title, msg) => {
	notification[type]({
		message: title,
		description: msg
	});
};

class SSHTerminal extends Component {
	constructor(props, context) {
		super(props, context);
		this.inputRef = React.createRef();
		this.state = {
			logged: false,
			shell: null,
			attached: false
		};
	}
	
	async componentDidUpdate() {
		if (this.state.logged && !this.state.attached){
			await this.attachTerminal(this.inputRef.current);
		}
		if (this.state.logged && this.state.attached && this.props.isFocused) {
			this.inputRef.current.focus();
		}
	}
	
	componentWillUnmount() {
		this.inputRef.current.componentWillUnmount();
	}
	
	async attachTerminal(xterm) {
		const term = xterm.getTerminal();
		const fitAddon = new FitAddon();
		
		term.loadAddon(fitAddon);
		fitAddon.fit();
        
		this.state.shell.on('data', (res) => xterm.write('' + res));
		term.onKey((e) => {
			e.domEvent.preventDefault();
			this.state.shell.write(e.key);
		});

		this.setState({
			attached: true
		});
	}

	async SSHConnect(log_info){
		const ssh = new NodeSSH();
		const hide = message.loading('Awaiting connection...', 0);
		try{
			await ssh.connect(log_info);
			hide();
			let shell = await ssh.requestShell();
			this.setState({
				logged: true,
				shell: shell
			});

		} catch (e){
			hide();
			openNotificationWithIcon('error', 'Authentication failed', 'Please use correct ssh login credentials.');
		}
	}

	render() {
		if (this.state.logged) {
			return (
				<div>
					<XTerm
						ref={this.inputRef}
						style={{
							width: '100%',
							height: '100%',
						}}
					/>
				</div>
			);
		} else {
			return (
				<div>
					<LoginForm onSubmit={ async (values) => this.SSHConnect(values)}/>
				</div>
			);
		}
	}
}

function mapStateToProps({ focusTerminalReducer }){
	return {
		isFocused : focusTerminalReducer.isFocused
	};
}

export default connect(mapStateToProps)(SSHTerminal);
		