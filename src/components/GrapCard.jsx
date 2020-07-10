import React from 'react';
import { connect } from 'react-redux';
import { Card, Button, Modal, Menu, Checkbox, Input } from 'antd';
import { SettingOutlined, PlusOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const Love = () => <p>love</p>;
class GraphCard extends React.Component {
	constructor(props, context){
		super(props, context);
		this.state = {
			title: 'Graphs',
			graphs: [],
			settingsVisible: false,
			menu: (
				<Menu 
					mode="inline"
					selectable={false}
					theme="dark"
				> 
					<SubMenu title="Graph 1" onTitleClick={console.log('love')}>
						<Menu.Item>
							<Checkbox>Autoscale</Checkbox>
						</Menu.Item>
						<Menu.Item>
							<Button onClick={() => this.addGraph()}>Autoscale</Button>
						</Menu.Item>
						<Menu.Item>
							<Input placeholder="Basic usage" onPressEnter={(e) => this.changeTitle(e.target.value)}/>
						</Menu.Item>
					</SubMenu>
					<Menu.Item danger key="delete">Delete This Card</Menu.Item>
				</Menu>
			)
		};
	}
    
	changeTitle(title) {
		this.setState({
			title: title
		});
	}
    
	addGraph() {
		this.setState({
			graphs: [...this.state.graphs, <Love key/>]
		});
	}
    
	showModal() {
		this.setState({
			settingsVisible: true
		});
	}
    
	hideModal() {
		this.setState({
			settingsVisible: false
		});
	}

	render() {
		const {settingsVisible} = this.state;
        
		return (
			<>
				<Modal
					title="Basic Modal"
					visible={settingsVisible}
					onOk={() => this.hideModal()}
					onCancel={() => this.hideModal()}
				>
					{this.state.menu}
				</Modal>

				<Card
					size="small"
					style={{ width: 250 }}
					title="Graphs"
					extra={
						<>
							<Button
								size="small"
								type="text"
								icon={<PlusOutlined style={{fontSize: 16}}/>}
								onClick={() => this.addGraph()}
							/>
							<Button
								size="small"
								type="text"
								shape="circle"
								icon={<SettingOutlined  style={{fontSize: 16}}/>}
								onClick={() => this.showModal()}
							/>
						</>
					}
				>
					{this.state.graphs}
				</Card>
			</>
		);
	}
}

function mapStateToProps() {
	return {
		data: 'love'
	};
}

export default connect(mapStateToProps)(GraphCard);