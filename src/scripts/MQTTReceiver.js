import mqtt from 'mqtt';
import { NEWDATA } from '../constants/action_types';

const ip = 'mqtt://localhost:1883';
const channels = ['test_channel'];

export default class MQTTReceiver {
	constructor(_store, _ip = ip, _channels = channels){
		this.store = _store;
		this.ip = _ip;
		this.channels = _channels;
	}
    
	connect(){
		const client = mqtt.connect(this.ip);
		client.on('connect',  () => {
			console.log(`Connected to ${this.ip}`);
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
	}
    
	handleTestMessage(message) {
		this.store.dispatch({
			type: NEWDATA,
			payload: JSON.parse(message.toString())
		});
	}
} 