import React from 'react';
import './App.css';
import './xterm.css';
import { Component } from 'react';
import { connect } from 'react-redux';
import GlobalHotKeys from 'react-hot-keys';
import { controlTerminal } from './actions';

// components
import Quake from './components/Quake';
import LineChart from './components/LineChart';
import MQTTInterface from './components/MQTTInterface';
import GraphCard from './components/GrapCard';
import Group from 'antd/lib/input/Group';



// antdesign layouts

class App extends Component {
	constructor(props, context){
		super(props, context);
		this.inputRef = React.createRef();
	}
    
	componentDidUpdate(){
		if (!this.props.isOpen) {
			this.inputRef.current.focus();
		}
	}

	render() {
		return (
			<div ref={this.inputRef} tabIndex={-1}>
				<GlobalHotKeys
					keyName='alt+t'
					onKeyDown={() => this.props.controlTerminal(!this.props.isOpen)}
				></GlobalHotKeys>
				<Quake/>
				<MQTTInterface/>
				<LineChart/>
				<GraphCard/>
			</div>
		);
	}
}

function mapStateToProps({ openTerminalReducer }){
	return {
		isOpen : openTerminalReducer.isOpen
	};
}

export default connect(mapStateToProps, {controlTerminal})(App);
