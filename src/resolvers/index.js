const common = require('./common');
const guild = require('./guild');
const player = require('./player');

module.exports = {
  player,
  guild,
  ...common
};
