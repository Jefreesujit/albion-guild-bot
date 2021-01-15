module.exports = {
	name: 'guild',
	description: 'Display info about this guild.',
	execute(message) {
		message.channel.send(`Guild name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
	},
};
