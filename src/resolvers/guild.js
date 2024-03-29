const Discord = require('discord.js');
const { prefix } = require('../../config.json');
const { getGuildDetails } = require('../services');

module.exports = {
	name: 'guild',
	description: 'Display info about this guild.',
  options: ['fetch', 'stats', 'topkills'],
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
    if (option === 'fetch') {
      getGuildDetails(name).then((data) => {
        const guildDetails = new Discord.MessageEmbed()
              .setColor('#0099ff')
              .setTitle('Guild Info')
              .setThumbnail('https://i.imgur.com/BgWeozT.png')
              .addFields(
                { name: 'Guild Name', value: data.Name },
                { name: '\u200B', value: '\u200B' },
                { name: 'Founder', value: data.FounderName },
                { name: 'Alliance', value: data.AllianceTag },
                { name: 'Members', value: data.MemberCount },
                { name: 'Kill Fame', value: data.killFame },
                { name: 'Death Fame', value: data.DeathFame },
                )
              .setTimestamp()
              .setFooter('Albion guild bot', 'https://i.imgur.com/BgWeozT.png');

        message.channel.send(guildDetails);
      });
    } else if (option === 'topkills') {
      message.channel.send(`Getting top kills for ${name}..`);
    }
	},
};
