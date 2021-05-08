const { prefix } = require('../../config.json');
const { getPlayerDetails } = require('../services');

module.exports = {
	name: 'player',
	description: 'Display info about player.',
  options: ['fetch', 'track', 'untrack'],
  guildOnly: true,
  usage: '<option> <name>',
	execute(message, args) {
    if (!args.length) {
      return message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
    }

    const option = args[0].toLowerCase();
    if (args.length !== 2 || !this.options.includes(option)) {
      return message.reply(`Invalid command, try \`${prefix}help player\``);
    }

    const name = args[1];
    getPlayerDetails(name, (data) => {
      console.log('Inside player CB', data);
      message.channel.send(`You have tried to perform ${option} on ${name}`);
    })
	},
};
