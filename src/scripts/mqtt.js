import mqtt from 'mqtt';

const client = mqtt.connect('mqtt://169.254.57.10:1883');

client.on('connect', function () {
	console.log('mdr');
	client.subscribe('test_channel');
});

client.on('message', function (topic, message) {
	console.log(message.toString());
	//   client.end()
});