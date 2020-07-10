import React from 'react';
import { connect } from 'react-redux';
import { Card, Button, Modal, Menu, Checkbox  } from 'antd';
import { SettingOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;

class GraphCard extends React.Component {
	constructor(props, context){
		super(props, context);
		this.state = {
			graphs: 0,
			settingsVisible: false,
			menu: (
				<Menu mode="inline"
					selectable={false}> 
					<SubMenu title="Graph 1" onTitleClick={console.log('love')}>
						<Menu.Item>
							<Checkbox>Autoscale</Checkbox>
						</Menu.Item>
					</SubMenu>
					<Menu.Divider />
					<Menu.Item danger key="delete">Delete This Card</Menu.Item>
				</Menu>
			)
		};
	}
    
	showModal() {
		this.setState({
			settingsVisible: true
		});
	}

	render() {
		const {settingsVisible} = this.state;
        
		return (
			<>
				<Modal
					title="Basic Modal"
					visible={settingsVisible}
					// onOk={this.handleOk}
					// onCancel={this.handleCancel}
				>
					{this.state.menu}
				</Modal>

				<Card
					title="Graphs"
					size="small"
					extra={
						<Button
							type="text"
							shape="circle"
							icon={<SettingOutlined />}
							onClick={() => this.showModal()}
						/>
					}
				>
					<Menu mode="inline">
						<SubMenu title="Graph 1" onTitleClick={console.log('love')}>
							<Menu.Item>
								<Checkbox>Autoscale</Checkbox>
							</Menu.Item>
						</SubMenu>
						<Menu.Divider />
						<Menu.Item danger key="delete">Delete This Card</Menu.Item>
					</Menu>
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