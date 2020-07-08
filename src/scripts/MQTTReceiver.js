import mqtt from 'mqtt';
import { NEWDATA } from '../constants/action_types';
import { MQTTSTATUS } from '../constants/action_types';

const ip = 'mqtt://localhost:1883';
const channels = ['test_channel'];

export default class MQTTReceiver {
	constructor(_store, _ip = ip, _channels = channels){
		this.store = _store;
		this.ip = _ip;
		this.channels = _channels;
		// this.store.subscribe(() => {
		// 	console.log(this.store.getState());
		// });
	}
    
	connect(){
		const options = {
			keepalive: 10,
			reconnectPeriod: 1000,
		};
		const client = mqtt.connect(this.ip, options);
        
		client.on('connect',  () => {
			console.log(`Connected to ${this.ip}`);
			this.store.dispatch({
				type: MQTTSTATUS,
				payload: {
					connection: true,
					receiving_data: false
				}
			});
			this.channels.forEach(chnl => {
				client.subscribe(chnl);
				console.log(`Subscribed to ${chnl}`);
			});
		});

		client.on('message', (topic, message) => {
			switch(topic){
				case 'test_channel':
					return this.handleTestMessage(message);
				default:
					console.log(`Recieved message on ${topic}`);
			}
		});
        
		client.on('close', ()=>{
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
    
	handleTestMessage(message) {
		this.store.dispatch({
			type: NEWDATA,
			payload: JSON.parse(message.toString())
		});
	}
    
} 