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

//layout
import { Responsive, WidthProvider } from 'react-grid-layout';
const ResponsiveGridLayout = WidthProvider(Responsive);

// antdesign layouts

class App extends Component {
	constructor(props, context){
		super(props, context);
		this.inputRef = React.createRef();
		this.state = { value: true};
	}
    
	componentDidUpdate(){
		if (!this.props.isOpen) {
			this.inputRef.current.focus();
		}
	}
    
	onHandle(){
		this.setState( (prevState) => ({ value: !prevState.value}));
	}

	render() {
		// const layout = [
		// 	{ i: 'a', x: 0, y: 0, w: 4, h: 1 },
		// 	{ i: 'b', x: 4, y: 2, w: 4, h: 1 },
		// 	{ i: 'c', x: 8, y: 4, w: 4, h: 1 },
		// ];
		return (
			<div ref={this.inputRef} tabIndex={-1}>
				<GlobalHotKeys
					keyName='alt+t'
					onKeyDown={() => this.props.controlTerminal(!this.props.isOpen)}
				></GlobalHotKeys>
				<Quake/>
				{/* <ResponsiveGridLayout
					className="layout"
					layouts={layout}
					breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
					cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}
					rowHeight={100}
					width={800}
					verticalCompact={false}
					preventCollision={true}
                    
				> */}
				{/* <div key="a"> */}
				<MQTTInterface/>
				{/* </div> */}
				{/* <div key="c"> */}
				<GraphCard/>
				{/* </div> */}
				{/* </ResponsiveGridLayout> */}
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
