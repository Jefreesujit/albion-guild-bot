'use strict';

const { getPlayerInfo, getGuildInfo, search } = require('albion-api');

const promisify = foo => new Promise((resolve, reject) => {
  foo((error, result) => {
    if(error) {
      reject(error)
    } else {
      console.log('result', result)
      resolve(result)
    }
  })
})

const getPlayerDetails = (playerName, cb) => {
  console.log('Player details', playerName);
  search(playerName, (err, data) => {
    const { players: [ player ] } = data;
    cb(player);
  });
}

const getGuildDetails = (guildName) => new Promise((res, rej) => {
  search(guildName, (err, data) => {
    if (err) rej(err);
    console.log('Guild details', data);
    const { guilds: [ guild ] } = data;
    res(guild);
  });
});

module.exports = {
  getPlayerDetails,
  getGuildDetails,
}