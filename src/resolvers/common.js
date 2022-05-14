const { getStatus } = require('../services');

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
	},
	status: {
		name: 'status',
		description: 'Server Status',
		execute(message) {
			getStatus().then((data) => {
				message.channel.send(`**Status:** ${data.status}`);
			});
		}
	}
};
