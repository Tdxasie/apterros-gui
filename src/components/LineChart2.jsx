import React from 'react';
import { connect } from 'react-redux';
import { LinePath } from '@vx/shape';
import { scaleLinear } from '@vx/scale';
import { max } from 'd3-array';
import { WINDOW } from '../constants/settings';

class LineChart2 extends React.Component {
	
	render() {
		const width = 500;
		const height = 300;
        
		const xMax = max(this.props.data.map(v => v.x));
		const yMax = max(this.props.data.map(v => v.y));

		const xScale = scaleLinear({
			range: [0, width],
			domain: [xMax>WINDOW ? xMax-WINDOW : 0, xMax],
		});

		const yScale = scaleLinear({
			range: [height, 0],
			domain: [0, yMax],
		});
		
		return (
			<div>
				<svg width={width} height={height}>
					<LinePath
						data={this.props.data}
						x={d => xScale(d.x)}
						y={d => yScale(d.y)}
						strokeWidth={2}
						stroke={'#f5222d'}
					/>
				</svg>
			</div>
		);}
}
		
function mapStateToProps({ mqttDataReducer }) {
	return {
		data: mqttDataReducer.data
	};
}
		
export default connect(mapStateToProps)(LineChart2);