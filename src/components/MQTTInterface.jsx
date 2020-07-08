import React from 'react';
import { connect } from 'react-redux';
import { Card, Badge, Button } from 'antd';

import { newMqttPublish } from '../actions';

class MQTTInterface extends React.Component{
	constructor(props, context){
		super(props, context);
		this.state = {
			status: 'processing',
			status_text: 'Connecting',
			idle: '#3a3a3a',
			idle_text: 'Idle',
			publish_loading: false
		};
	}

	componentDidUpdate(prevProps){
		if (this.props.status !== prevProps.status){
			if(this.props.status.connection){
				this.setState({
					status: 'success',
					status_text: 'Connected'
				});
			} else {
				this.setState({
					status: 'processing',
					status_text: 'Reconnecting'
				});
			}
			if (this.props.status.receiving_data){
				this.setState({ idle_text: 'Receiving Data'});
				this.interval = setInterval(() => {
					if (this.state.idle === '#3a3a3a') {
						this.setState({ idle: 'orange' });
					} else {
						this.setState({ idle: '#3a3a3a' });
					}
				}, 100);
			} else {
				clearInterval(this.interval);
				this.setState({ 
					idle: '#3a3a3a',
					idle_text: 'Idle'
				});
			}
		}
	}

	publish(){
		this.props.newMqttPublish({
			topic: '/love',
			message: 'love sos'
		});
	}

	render(){
		return(
			<>
				<Card size="small" title="MQTT Status Check" style={{width: 170}}>
					<Badge
						status={this.state.status}
						text={this.state.status_text}
					/>
					<br/>
					<Badge
						color={this.state.idle}
						text={this.state.idle_text}
					/>
					<br/>
					<br/>
					<Button 
						type="primary" 
						loading={this.state.publish_loading} 
						onClick={() => this.publish()}>
						Publish Test
					</Button>
				</Card>
			</>
		);
	}
}

function mapStateToProps({ mqttStatusReducer, mqttPublishReducer }) {
	return {
		status: mqttStatusReducer,
		publish: mqttPublishReducer
	};
}

export default connect(mapStateToProps, {newMqttPublish})(MQTTInterface);