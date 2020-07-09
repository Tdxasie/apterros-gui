import mqtt from 'mqtt';
import { MEANWINDOW } from '../constants/settings';

// redux actions
import { NEWDATA } from '../constants/action_types';
import { MQTTSTATUS } from '../constants/action_types';
import { MQTTPUBLISH } from '../constants/action_types';

const ip = 'mqtt://localhost:1883';
const channels = ['test_channel'];

const options = {
	clientId: 'apterros_gui',
	keepalive: 10,
	reconnectPeriod: 200,
};

export default class MQTTReceiver {
	constructor(_store, _ip = ip, _channels = channels){
		this.store = _store;
		this.ip = _ip;
		this.channels = _channels;
		this.timeout = undefined;
		this.mean_index = 0;
		this.total = 0;
		this.packet_index = 0;
		this.store.subscribe(() => {
			this.publisher(this.store.getState().mqttPublishReducer);
		});
	}
    
	connect(){
		this.client = mqtt.connect(this.ip, options);
        
		this.client.on('connect',  () => {
			console.log(`Connected to ${this.ip}`);
			this.store.dispatch({
				type: MQTTSTATUS,
				payload: {
					connection: true,
					receiving_data: false
				}
			});
			this.channels.forEach(chnl => {
				this.client.subscribe(chnl);
				console.log(`Subscribed to ${chnl}`);
			});
		});

		this.client.on('message', (topic, message) => {
			this.updateStatus();
			switch(topic){
				case 'test_channel':
					return this.handleTestMessage(message);
				default:
					console.log(`Recieved message on ${topic}`);
			}
		});
        
		this.client.on('close', ()=>{
			console.log('MQTT DISCONNECTED');
			this.store.dispatch({
				type: MQTTSTATUS,
				payload: {
					connection: false,
					receiving_data: false
				}
			});
		});
	}

	updateStatus() {
		if (this.timeout === undefined) {
			this.store.dispatch({
				type: MQTTSTATUS,
				payload: {
					connection: true,
					receiving_data: true
				}
			});
		}
		this.timeout = clearTimeout(this.timeout);
		this.timeout = setTimeout(() => {
			this.timeout = undefined;
			this.store.dispatch({
				type: MQTTSTATUS,
				payload: {
					connection: true,
					receiving_data: false
				}
			});
		}, 1000);
	}

	publisher(publishPacket){
		if (publishPacket.topic !== undefined){
			const topic = publishPacket.topic;
			const message = publishPacket.message;
			this.store.dispatch({
				type: MQTTPUBLISH,
				payload: {
					topic: undefined,
					message: undefined,
					done: false
				}
			});
			this.client.publish(topic, message, { qos:0 }, (err) => {
				if (!err){
					console.log('PUBLISH SUCCESSFUL');
					this.store.dispatch({
						type: MQTTPUBLISH,
						payload: {
							topic: undefined,
							message: undefined,
							done: true
						}
					});
				} else {
					console.log('ERROR: ', err);
				}
			});
		}
	}

	handleTestMessage(buffer) {
		let message = JSON.parse(buffer.toString());
		this.mean_index ++;
		this.total += message.y;
		if(this.mean_index === MEANWINDOW){
			this.packet_index ++;
			this.store.dispatch({
				type: NEWDATA,
				payload: {
					x: this.packet_index,
					y: this.total/MEANWINDOW
				}
			});
			this.mean_index = 0;
			this.total = 0;
		}
		
	}
    
} 