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

// import { VictoryBar } from 'victory';

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
				{/* <LineChart2/> */}
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
