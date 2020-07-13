import React from 'react';
// import { connect } from 'react-redux';
import { Card, Button, Menu, Input, Dropdown } from 'antd';
import { SettingOutlined, PlusOutlined } from '@ant-design/icons';
import LineChart from './LineChart';

class GraphCard extends React.Component {
	constructor(props, context){
		super(props, context);
		this.state = {
			title: 'Graphs',
			graphs: [],
			settingsVisible: false,
			visible: false,
		};
	}
	
	handleMenuClick(e) {
		if (e.key === 'delete') {
			// delete card
			this.setState({ visible: false });
		}
	}
	
	changeTitle(title) {
		this.setState({
			visible: false,
			title
		});
	}

	setVisible(bool) {
		this.setState({ visible: bool});
	}
	
	addGraph() {
		this.setState({
			graphs: [...this.state.graphs, 
				<div key={this.state.graphs.length}>
					<LineChart id={this.state.graphs.length + 1}/>
				</div>
			]
		});
	}
	
	render() {
		const dropMenu = (
			<Menu onClick={(e) => this.handleMenuClick(e)} >
				<Menu.Item key="rename">
					<Input placeholder="Rename card" onPressEnter={(e) => this.changeTitle(e.target.value)}/>
				</Menu.Item>
				<Menu.Item key="delete" danger>Delete Card</Menu.Item>
			</Menu>
		);
			
		return (
			<>
				<Card
					size="small"
					style={{ width: 500 }}
					title={this.state.title}
					extra={
						<>
							<Button
								size="small"
								type="text"
								icon={<PlusOutlined style={{fontSize: 16}}/>}
								onClick={() => this.addGraph()}
							/>
							<Dropdown 
								overlay={dropMenu} 
								placement="bottomRight"
								trigger={['click']}
								onVisibleChange={(flag) => this.setVisible(flag)}
								visible={this.state.visible}
							>
								<Button
									size="small"
									disabled={false}
									type="text"
									shape="circle"
									icon={
										<SettingOutlined  style={{fontSize: 16}}/>
									}
								/>
							</Dropdown>
						</>
					}
				>
					{this.state.graphs}
				</Card>
			</>
		);
	}
}
		
export default GraphCard;