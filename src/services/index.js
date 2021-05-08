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

const getPlayerDetails = (playerName) => new Promise((res, rej) => {
  search(playerName, (err, data) => {
    if (err) rej(err);
    console.log('Player details', data);
    const { players: [ player ] } = data;
    res(player);
  });
});

const getGuildDetails = (guildName) => new Promise((res, rej) => {
  search(guildName, (err, data) => {
    if (err) rej(err);
    const { guilds: [{ Id }] } = data;
    getGuildInfo(Id, (err, data) => {
      if (err) rej(err);
      console.log('Guild details', data);
      res(data);
    })
  });
});

module.exports = {
  getPlayerDetails,
  getGuildDetails,
};
