const common = require('./common');
const guild = require('./guild');
const player = require('./player');
const help = require('./help');

module.exports = {
  player,
  guild,
  help,
  ...common
};
