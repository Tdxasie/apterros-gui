import React from 'react';
import { connect } from 'react-redux';
import { WINDOW } from '../constants/settings';
import { Button, Modal, Input, Menu } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import GraphSettings from './GraphSettings';

// vx imports
import { Group } from '@vx/group';
import { LinePath } from '@vx/shape';
import { AxisLeft, AxisBottom } from '@vx/axis';
import { scaleLinear } from '@vx/scale';
import { max } from 'd3-array';

const { SubMenu } = Menu;

const margin = { top: 0, right: 0, bottom: 0, left: 0};

class LineChart extends React.Component {
	constructor(props, context){
		super(props, context);
		this.state = {
			title: `Graph ${this.props.id}`,
			settingsVisible: false,
			width: 450,
			height: 100,
			maxPoints: 400
		};
		this.rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];
		this.values = undefined;
	}
    
	setSettingsVisible(bool) {
		this.setState({ settingsVisible: bool});
	}

	changeTitle(title) {
		this.setState({ title });
	}

	updateValues(values) {
		if(values.type == 'XY') {
			values = { ...values, width: 300, height: 300 };
		} else if (values.type == 'time') {
			values = { ...values, width: 450, height: 100};
		}
		this.values = values;
	}

	onOk(){
		this.setSettingsVisible(false);
		this.setState(this.values);
	}

	unMountMe() {
		this.props.unMountMe(this.props.id);
	}
	
	render() {
		const xMax = max(this.props.data.map(v => v.x));
		const yMax = max(this.props.data.map(v => v.y));

		const xScale = scaleLinear({
			range: [0, this.state.width],
			domain: [xMax > this.state.maxPoints ? xMax - this.state.maxPoints : 0, xMax],
		});

		const yScale = scaleLinear({
			range: [this.state.height, 0],
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
					<Button
						size="small"
						type="text"
						icon={<DeleteOutlined />}
						onClick={() => this.unMountMe()}
					/>
				</h4>
				<svg width={this.state.width} height={this.state.height}>
					<Group left={margin.left} top={margin.top}>
						<AxisBottom
							scale={xScale}
							top={this.state.height}
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
					onOk={() => this.onOk()}
					onCancel={() => this.setSettingsVisible(false)}
				>
					<GraphSettings
						values={(values) => this.updateValues(values)}
						title={this.state.title}
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