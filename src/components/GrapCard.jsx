import React from 'react';
import { connect } from 'react-redux';
import { Card, Button, Modal, Menu, Checkbox, Input, Dropdown } from 'antd';
import { SettingOutlined, PlusOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
class GraphCard extends React.Component {
	constructor(props, context){
		super(props, context);
		this.state = {
			title: 'Graphs',
			graphs: [],
			settingsVisible: false,
			visible: true,
			menu: (
				<Menu 
					selectable={false}
					theme="dark"
					onClick={(e) => this.h(e)}
					visible={true}
				> 
					<Menu.Item>
						<Checkbox>Autoscale Y</Checkbox>
					</Menu.Item>
					<Menu.Item>
						<Button onClick={() => this.addGraph()}>Autoscale</Button>
					</Menu.Item>
					<Menu.Item>
						<Input placeholder="Basic usage" onPressEnter={(e) => this.changeTitle(e)}/>
					</Menu.Item>

					<Menu.Item danger key="sdf">Delete This Card</Menu.Item>
					<Menu.Item danger key="delete">Delete This Card</Menu.Item>
				</Menu>
			)
		};
	}
		
	h(e){
		console.log(e);
		if (e.key === 'delete') {
			this.setState({ visible: false });
		}
	}
		
	changeTitle(title) {
		console.log(title);
	}
		
		handleVisibleChange = flag => {
			this.setState({ visible: flag });
		};
		
		addGraph() {
			this.setState({
				graphs: [...this.state.graphs, 
					<Dropdown 
						key
						overlay={this.state.menu}
						trigger={['contextMenu']}
						onVisibleChange={() => this.handleVisibleChange()}
						visible={this.state.visible}
					>
						<div>Love</div>
					</Dropdown>]
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