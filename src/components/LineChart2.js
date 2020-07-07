import React from 'react';
import { connect } from 'react-redux';


class LineChart2 extends React.Component {
	
	render() {
		
		return (
			<>
			</>
		);}
}
		
function mapStateToProps({ mqttDataReducer }) {
	return {
		data: mqttDataReducer
	};
}
		
export default connect(mapStateToProps)(LineChart2);