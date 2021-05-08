const Discord = require('discord.js');
const { prefix } = require('../../config.json');
const { getGuildDetails } = require('../services');

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

    const option = args.shift().toLowerCase();
    if (args.length === 0 || !this.options.includes(option)) {
      return message.reply(`Invalid command, try \`${prefix}help guild\``);
    }
    
    const name = args.join('+');

    getGuildDetails(name).then((data) => {
      const exampleEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setThumbnail('https://i.imgur.com/BgWeozT.png')
            .addFields(
              { name: 'Guild Name', value: data.Name },
              { name: '\u200B', value: '\u200B' },
              { name: 'Founder', value: data.FounderName, inline: true },
              { name: 'Alliance', value: data.AllianceTag, inline: true },
              { name: 'Kill Fame', value: data.killFame, inline: true },
              { name: 'Death Fame', value: data.DeathFame, inline: true },
              )
            .setTimestamp()
            .setFooter('Albion guild bot', 'https://i.imgur.com/BgWeozT.png');

      message.channel.send(exampleEmbed);
    });
	},
};
