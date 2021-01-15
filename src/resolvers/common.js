module.exports = {
	ping: {
		name: 'ping',
		description: 'Ping!',
		execute(message, args) {
			message.channel.send('Pong.');
		}
	},
	beep: {
		name: 'beep',
		description: 'Beep!',
		execute(message) {
			message.channel.send('Boop.');
		}
	}
};
