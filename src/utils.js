const config = require('../config.json');

const getCommand = (message) {
  const { prefix } = config;
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

  return {
    args,
    command
  };
}

module.exports = {
  getCommand,
}
