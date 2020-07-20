import React from 'react';
import { connect } from 'react-redux';

// vx imports
import { Group } from '@vx/group';
import { LinePath } from '@vx/shape';
import { AxisLeft, AxisBottom } from '@vx/axis';
import { scaleLinear } from '@vx/scale';
import { max } from 'd3-array';

class LineChart extends React.Component {

	render(){

		const margin = { top: 0, right: 0, bottom: 0, left: 0 };


		return (
			<svg width={this.state.width} height={this.state.height}>
				<Group left={margin.left} top={margin.top}>
					<AxisBottom
						scale={xScale}
						top={this.state.height}
						stroke={'#3a3a3a'}
					/>
					<AxisLeft scale={yScale} stroke={'#3a3a3a'} />
					<LinePath
						data={this.props.data}
						x={d => xScale(d.x)}
						y={d => yScale(d.y)}
						strokeWidth={2}
						stroke={'#f5222d'}
					/>
				</Group>
			</svg>
		);
	}

	

}

function mapStateToProps({ reducer }, ownprops){
	return {
		love: reducer
	};
}

export default connect(mapStateToProps)(LineChart);