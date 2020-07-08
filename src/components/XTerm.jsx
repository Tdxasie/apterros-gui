import * as React from 'react';
import { Terminal } from 'xterm';

import className from 'classnames';

class XTerm extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			isFocused: false
		};
	}
	componentDidMount() {
		this.xterm = new Terminal(this.props.options);
		this.xterm.open(this.container);
		if (this.props.onContextMenu) {
			this.xterm.element.addEventListener('contextmenu', this.onContextMenu.bind(this));
		}
		if (this.props.onInput) {
			this.xterm.onData(this.onInput);
		}
		if (this.props.value) {
			this.xterm.write(this.props.value);
		}
	}
	componentWillUnmount() {
		// is there a lighter-weight way to remove the cm instance?
		if (this.xterm) {
			this.xterm.destroy();
			this.xterm = null;
		}
	}
	// componentWillReceiveProps(nextProps) {
	//     if (nextProps.hasOwnProperty('value')) {
	//         this.setState({ value: nextProps.value });
	//     }
	// }
	
	shouldComponentUpdate(nextProps) {
		// console.log('shouldComponentUpdate', nextProps.hasOwnProperty('value'), nextProps.value != this.props.value);
		if (nextProps.value !== this.props.value) {
			if (this.xterm) {
				this.xterm.clear();
				setTimeout(()=>{
					this.xterm.write(nextProps.value);
				},0);
			}
		}
		return false;
	}
	getTerminal() {
		return this.xterm;
	}
	write(data) {
		this.xterm && this.xterm.write(data);
	}
	writeln(data) {
		this.xterm && this.xterm.writeln(data);
	}
	focus() {
		if (this.xterm) {
			this.xterm.focus();
		}
	}
	focusChanged(focused) {
		this.setState({
			isFocused: focused
		});
		this.props.onFocusChange && this.props.onFocusChange(focused);
	}
	onInput = data => {
		this.props.onInput && this.props.onInput(data);
	};
	
	resize(cols, rows) {
		this.xterm && this.xterm.resize(Math.round(cols), Math.round(rows));
	}
	setOption(key, value) {
		this.xterm && this.xterm.setOption(key, value);
	}
	refresh() {
		this.xterm && this.xterm.refresh(0, this.xterm.rows - 1);
	}
	
	onContextMenu(e) {
		this.props.onContextMenu && this.props.onContextMenu(e);
	}
	
	render() {
		const terminalClassName = className('ReactXTerm', this.state.isFocused ? 'ReactXTerm--focused' : null, this.props.className);
		return <div ref={ref => (this.container = ref)} className={terminalClassName} />;
	}
}
export default XTerm;