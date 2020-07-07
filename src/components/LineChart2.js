import React from 'react';
import { connect } from 'react-redux';
import { appleStock } from '@vx/mock-data';
import { LinePath } from '@vx/shape';
import { scaleLinear } from '@vx/scale';
import { max } from 'd3-array';
import data from './sample_data';

// We'll use some mock data from `@vx/mock-data` for this.
// const data = appleStock;
console.log(data);

// Data accessors
// const xAccessor = d => d.x;
// const yAccessor = d => d.y;

class LineChart2 extends React.Component {
	
	render() {

		const width = 500;
		const height = 300;

		const xMax = max(data, data.x);
		const yMax = max(data, data.y);

		const xScale = scaleLinear({
			range: [0, width],
			domain: [1000, xMax],
		});

		const yScale = scaleLinear({
			range: [height, 0],
			domain: [0, yMax],
		});
		
		return (
			<div>
				<svg width={width} height={height}>
					<LinePath
						data={data}
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
		data: mqttDataReducer
	};
}
		
export default connect(mapStateToProps)(LineChart2);