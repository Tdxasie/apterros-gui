import React from 'react';
import { connect } from 'react-redux';
import { WINDOW } from '../constants/settings';
import { Button, Modal, Input, Menu } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import GraphSettings from './GraphSettings';

// vx imports
import { Group } from '@vx/group';
import { LinePath } from '@vx/shape';
import { AxisLeft, AxisBottom } from '@vx/axis';
import { scaleLinear } from '@vx/scale';
import { max } from 'd3-array';

const { SubMenu } = Menu;

const width = 450;
const height = 100;

const margin = { top: 0, right: 0, bottom: 0, left: 0};

class LineChart extends React.Component {
	constructor(props, context){
		super(props, context);
		this.state = {
			title: `Graph ${this.props.id}`,
			settingsVisible: false

		};
		this.rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];
	}
    
	setSettingsVisible(bool) {
		this.setState({ settingsVisible: bool});
	}

	changeTitle(title) {
		this.setState({ title });
	}

	updateValues(values) {
		console.log(values);
	}

	// onOpenChange(openKeys) {
	// 	const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
	// 	if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
	// 		this.setState({ openKeys });
	// 	} else {
	// 		this.setState({
	// 			openKeys: latestOpenKey ? [latestOpenKey] : [],
	// 		});
	// 	}
	// }
	
	render() {
		const xMax = max(this.props.data.map(v => v.x));
		const yMax = max(this.props.data.map(v => v.y));

		const xScale = scaleLinear({
			range: [0, width],
			domain: [xMax>WINDOW ? xMax-WINDOW : 0, xMax],
		});

		const yScale = scaleLinear({
			range: [height, 0],
			domain: [0, 1],
		});
		
		return (
			<div className="settings-drawer">
				<h4>
					{this.state.title}
					<Button
						size="small"
						type="text"
						icon={<EditOutlined />}
						onClick={() => this.setSettingsVisible(true)}
					/>
				</h4>
				<svg width={width} height={height}>
					<Group left={margin.left} top={margin.top}>
						<AxisBottom
							scale={xScale}
							top={height}
							stroke={'#3a3a3a'}
						/>
						<AxisLeft scale={yScale} stroke={'#3a3a3a'}/>
						<LinePath
							data={this.props.data}
							x={d => xScale(d.x)}
							y={d => yScale(d.y)}
							strokeWidth={2}
							stroke={'#f5222d'}
						/>
					</Group>
				</svg>
				<Modal
					title="Graph Settings"
					visible={this.state.settingsVisible}
					onOk={() => this.setSettingsVisible(false)}
					onCancel={() => this.setSettingsVisible(false)}
				>
					{/* <Input placeholder="Rename card" onPressEnter={(e) => this.changeTitle(e.target.value)} />
					<Menu
						mode="inline"
						openKeys={this.state.openKeys}
						onOpenChange={(openKeys) => this.onOpenChange(openKeys)}
					>
						<SubMenu key="sub1" title="Data 1">
							<Menu.Item key="1">Option 1</Menu.Item>
							<Menu.Item key="2">Option 2</Menu.Item>
							<Menu.Item key="3">Option 3</Menu.Item>
							<Menu.Item key="4">Option 4</Menu.Item>
						</SubMenu>
						<SubMenu key="sub2" title="Navigation Two">
							<Menu.Item key="5">Option 5</Menu.Item>
							<Menu.Item key="6">Option 6</Menu.Item>
							<SubMenu key="sub3" title="Submenu">
								<Menu.Item key="7">Option 7</Menu.Item>
								<Menu.Item key="8">Option 8</Menu.Item>
							</SubMenu>
						</SubMenu>
						<SubMenu key="sub4" title="Navigation Three">
							<Menu.Item key="9">Option 9</Menu.Item>
							<Menu.Item key="10">Option 10</Menu.Item>
							<Menu.Item key="11">Option 11</Menu.Item>
							<Menu.Item key="12">Option 12</Menu.Item>
						</SubMenu>
					</Menu> */}
					<GraphSettings
						values={(values) => this.updateValues(values)}
					/>
				</Modal>
			</div>
		);
	}
}
		
function mapStateToProps({ mqttDataReducer, settingsReducer }) {
	return {
		data: mqttDataReducer.data,
		settings: settingsReducer.settings
	};
}
		
export default connect(mapStateToProps)(LineChart);