import React from 'react';
import { Drawer, Button, Space } from 'antd';
import Terminal from './XTerm';

class Quake extends React.Component {
	state = { visible: false};
	
	showDrawer = () => {
		this.setState({
			visible: true,
		});
	};
	
	onClose = () => {
		this.setState({
			visible: false,
		});
	};
	
	render() {
		const { visible } = this.state;
		return (
			<>
				<Space>
					<Button type="primary" onClick={this.showDrawer}>
			Open
					</Button>
				</Space>
				<Drawer
					placement='top'
					closable={false}
					onClose={this.onClose}
					visible={visible}
				>
					<Terminal/>
				</Drawer>
			</>
		);
	}
}
	
export default Quake; 