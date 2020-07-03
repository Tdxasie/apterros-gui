import React from 'react';
import './App.css';
import './xterm.css';
import { Component } from 'react';

import Quake from './components/Quake';

// antdesign layouts

class App extends Component {
	// constructor(props, context) {
	//   super(props, context);
	// }
	render() {
		return (
			<div className="App">
				<Quake/>
			</div>
		);
	}
}

export default App;
