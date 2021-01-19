const { prefix } = require('../../config.json');

module.exports = {
	name: 'guild',
	description: 'Display info about this guild.',
  options: ['fetch', 'track', 'untrack'],
  guildOnly: true,
  usage: '<option> <name>',
	execute(message, args) {
    if (!args.length) {
      return message.channel.send(`**Guild name**: ${message.guild.name}\n **Total members**: ${message.guild.memberCount}`);
    }

    const option = args[0].toLowerCase();
    if (args.length !== 2 || !this.options.includes(option)) {
      return message.reply(`Invalid command, try \`${prefix}help guild\``);
    }

    message.channel.send(`You have tried to get info on ${option} ${args[1]}`)
	},
};
