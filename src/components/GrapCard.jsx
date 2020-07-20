import React from 'react';
// import { connect } from 'react-redux';
import { Card, Button, Menu, Input, Dropdown } from 'antd';
import { SettingOutlined, PlusOutlined } from '@ant-design/icons';
import GraphContainer from './GraphContainer';

class GraphCard extends React.Component {
	constructor(props, context){
		super(props, context);
		this.state = {
			title: 'Graphs',
			graphs: [],
			settingsVisible: false,
			visible: false,
			count: 0
		};
	}
	
	componentWillMount() {
		this.addGraph();
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
				{id: this.state.count}
			],
			count: this.state.count+1
		});
	}

	removeGraph(id) {
		const graphs = this.state.graphs.filter(graph => graph.id !== id-1);
		this.setState({ graphs });
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
					{this.state.graphs.map(graph => (
						<GraphContainer
							key={graph.id}
							id={graph.id + 1}
							unMountMe={(id) => this.removeGraph(id)}
						/>
					))}
				</Card>
			</>
		);
	}
}
		
export default GraphCard;