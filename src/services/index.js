'use strict';
const { search, getServerStatus, getGuildInfo, getGuildTopKills, getPlayerTopKills, getPlayerInfo } = require('./api');

const getStatus = async () => {
  const { live } = await getServerStatus();
  return live;
}

const getPlayerDetails = async (playerName) => {
  const { players: [ player ] } = await search(playerName);
  const { LifetimeStatistics: { PvE }} = await getPlayerInfo(player.Id);
  return {
    ...player,
    pveFame: PvE.Total
  };
};

const getPlayerKillDetails = async (guildName) => {
  const { guilds: [{ Id }] } = await search(guildName);
  const data = await getPlayerTopKills(Id);
  return data;
};

const getGuildDetails = async (guildName) => {
  const { guilds: [{ Id }] } = await search(guildName);
  const data = await getGuildInfo(Id);
  return data;
};

const getGuildKillDetails = async (guildName) => {
  const { guilds: [{ Id }] } = await search(guildName);
  const data = await getGuildTopKills(Id);
  return data;
};

module.exports = {
  getStatus,
  getPlayerDetails,
  getGuildDetails,
  getPlayerKillDetails,
  getGuildKillDetails
};
