import React from 'react';
import './App.css';
import './xterm.css';
import { Component } from 'react';
import Quake from './components/Quake';
import GlobalHotKeys from 'react-hot-keys';
import { connect } from 'react-redux';
import { controlTerminal } from './actions';
// antdesign layouts

class App extends Component {

	render() {
		return (
			<div className="App">
				<GlobalHotKeys
					keyName='alt+t'
					onKeyDown={() => this.props.controlTerminal(!this.props.isOpen)}
				></GlobalHotKeys>
				<Quake/>
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
