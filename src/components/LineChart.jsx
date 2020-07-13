import React from 'react';
import { connect } from 'react-redux';
import { WINDOW } from '../constants/settings';
import { Drawer, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';

// vx imports
import { Group } from '@vx/group';
import { LinePath } from '@vx/shape';
import { AxisLeft, AxisBottom } from '@vx/axis';
import { scaleLinear } from '@vx/scale';
import { max } from 'd3-array';


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
	}
    
	setSettingsVisible(bool) {
		console.log('love');
		this.setState({ settingsVisible: bool});
	}
	
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
				<Drawer
					title="Basic Drawer"
					placement="right"
					closable={false}
					onClose={() => this.setSettingsVisible(false)}
					visible={this.state.settingsVisible}
					getContainer={false}
					style={{ position: 'absolute' }}
				>
					<p>Some contents...</p>
				</Drawer>
			</div>
		);
	}
}
		
function mapStateToProps({ mqttDataReducer }) {
	return {
		data: mqttDataReducer.data
	};
}
		
export default connect(mapStateToProps)(LineChart);