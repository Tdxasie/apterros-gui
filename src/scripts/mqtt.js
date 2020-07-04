// const mqtt = require('mqtt');
import mqtt from 'mqtt';
// const fs = require('fs');

// const NEWDATA = require('../constants/action_types');

import { NEWDATA } from '../constants/action_types';

const ip = 'mqtt://localhost:1883';
const channels = ['test_channel'];

export default class MQTTReciever {
	constructor(_store, _ip = ip, _channels = channels){
		this.store = _store;
		this.ip = _ip;
		this.channels = _channels;
	}
    
	connect(){
		const client = mqtt.connect(this.ip);
		client.on('connect',  () => {
			console.log(`Connected to ${this.ip}`);
			console.log(this.channels);
			console.log(this.ip);
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
					throw 'ta mere fdp';
			}
		});
	}
    
	handleTestMessage(message) {
		this.store.dispatch({
			type: NEWDATA,
			payload: message
		});
	}
} 