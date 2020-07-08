import React from 'react';
import { connect } from 'react-redux';
import { Card, Badge } from 'antd';

class MQTTInterface extends React.Component{
	// constructor(props, context){
	// 	super(props, context);
	// 	this.state = {
	// 		status: 'processing',
	// 		connection_text: 'Connecting...'
	// 	};
	// }

	render(){
		return(
			<>
				<Card size="small" title="MQTT Status Check" style={{width: 170}}>
					<Badge status={this.props.status.connection ? 'success': 'processing'} 
						text={this.props.status.connection ? 'Connected' : 'Trying to connect..'} />
					{/* <Badge status="error" text="Error" /> */}
				</Card>
			</>
		);
	}
}

function mapStateToProps({ mqttStatusReducer }) {
	return {
		status: mqttStatusReducer
	};
}

export default connect(mapStateToProps)(MQTTInterface);