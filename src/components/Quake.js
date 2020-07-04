import React from 'react';
import { Drawer, Button, Space } from 'antd';
import SSHTerminal from './SSHTerminal';
import { changeFocus, controlTerminal } from '../actions';
import { connect } from 'react-redux';


class Quake extends React.Component {
	constructor(props, context){
		super(props, context);
		this.state = { visible: false};
	}

	componentDidUpdate(){
		if(this.props.isOpen && !this.state.visible){
			this.showDrawer();
		} else if (!this.props.isOpen && this.state.visible){
			this.hideDrawer();
		}
	}
	
	showDrawer = () => {
		this.setState({
			visible: true,
		}, () => {
			this.props.changeFocus(true);
		});
	};
	
	hideDrawer = () => {
		this.setState({
			visible: false,
		}, () => {
			this.props.changeFocus(false);
		});
	};
	
	render() {
		const { visible } = this.state;
		return (
			<>
				<Space>
					<Button type="primary" onClick={() => this.props.controlTerminal(true)}>
			Open
					</Button>
				</Space>
				<Drawer
					placement='top'
					closable={false}
					onClose={() => this.props.controlTerminal(false)}
					visible={visible}
					bodyStyle={{padding: 0,
						overflow:'auto'}}

				>
					<SSHTerminal/>
				</Drawer>
			</>
		);
	}
}
	
function mapStateToProps({ openTerminalReducer }){
	return {
		isOpen : openTerminalReducer.isOpen
	};
}
	
export default connect(mapStateToProps, {changeFocus, controlTerminal})(Quake); 