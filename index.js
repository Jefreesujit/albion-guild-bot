const Discord = require('discord.js');
const { prefix } = require('./config.json');
const resolvers = require('./src/resolvers');
require('dotenv').config();

const client = new Discord.Client();
client.commands = new Discord.Collection();

for (const key in resolvers) {
  const command = resolvers[key];
  client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('Albion Bot Server Ready!');
});

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (!client.commands.has(command)) return;

  if (command.guildOnly && message.channel.type === 'dm') {
    return message.reply('I can\'t execute that command inside DMs!');
  }

	try {
		client.commands.get(command).execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});

client.login(process.env.CLIENT_TOKEN);
