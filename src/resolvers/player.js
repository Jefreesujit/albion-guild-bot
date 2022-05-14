const Discord = require('discord.js');
const { prefix } = require('../../config.json');
const { getPlayerDetails } = require('../services');

module.exports = {
	name: 'player',
	description: 'Display info about player.',
  options: ['fetch', 'stats', 'untrack'],
  guildOnly: true,
  usage: '<option> <name>',
	execute(message, args) {
    if (!args.length) {
      return message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
    }

    const option = args.shift().toLowerCase();
    if (args.length !== 1 || !this.options.includes(option)) {
      return message.reply(`Invalid command, try \`${prefix}help player\``);
    }

    const name = args[0];
    if (option === 'fetch') {
      getPlayerDetails(name).then((data) => {
        const playerDetails = new Discord.MessageEmbed()
              .setColor('#0099ff')
              .setTitle('Player Info')
              .setThumbnail('https://i.imgur.com/BgWeozT.png')
              .addFields(
                { name: 'Player Name', value: data.Name },
                { name: '\u200B', value: '\u200B' },
                { name: 'Guild', value: data.GuildName },
                { name: 'Alliance', value: data.AllianceName },
                { name: 'PVE Fame', value: data.pveFame },
                { name: 'Kill Fame', value: data.KillFame },
                { name: 'Death Fame', value: data.DeathFame },
                )
              .setTimestamp()
              .setFooter('Albion guild bot', 'https://i.imgur.com/BgWeozT.png');
  
        message.channel.send(playerDetails);
      });
    } else if (option === 'stats') {
      message.channel.send(`Fetching stats for player ${name}..`);
    }
	},
};
