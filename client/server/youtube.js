const utils = require('./utils');
const user = require('../../src/user');
const sockets = require('../../src/socket.io/plugins');
const db = require('../../src/database');
const SocketIndex = require('../../src/socket.io/index');
const ytdl = require('ytdl-core');
const { parseVideo, diff_seconds } = require('./videoPlayer');
const getUserData = utils.promisify(user.getUserData);
const pluginName = 'youtubePlayer';
const currentVideoKey = pluginName + ':latestVideo';
const commands = {
  '!p': play,
  '!play': play
};
const MINIMUM_REPUTATION = 5;

let lastVideoCache = {};
let errorCount = [];
const MAX_FETCH_RETRY = 5;

module.exports.youtubeVideoPlayer = async function (socket) {
  socket.on('plugins.shoutbox.send', (data) => onShoutboxMessage(socket, data));
  sockets[pluginName] = {};
  sockets[pluginName].getCurrent = onGetCurrent;
};

async function onGetCurrent(socket) {
  let video;
  try {
    video = await db.getObject(currentVideoKey);
    if (!video) {
      return;
    }
    video.createtime = parseInt(video.createtime);
    video.startTime = parseInt(video.startTime);
    let info;
    if (lastVideoCache.videoDetails && lastVideoCache.videoDetails.videoId === video.id) {
      info = lastVideoCache;
    } else {
      if (errorCount[0] === video.id && errorCount[1] >= MAX_FETCH_RETRY) {
        throw new Error('MAX FETCH RERTRY reached, error count=' + errorCount[1]);
      }
      info = await ytdl.getBasicInfo(video.url);
      lastVideoCache = info;
    }
    video.duration = info.videoDetails.lengthSeconds || 0;
    var diff = diff_seconds(+new Date(), video.createtime) + video.startTime;
    if (diff > video.duration) {
      return;
    }
    const userData = await getUserData(video.uid);
    if (!userData) return;
    video.user = userData;
    return video;
  } catch (error) {
    if (video && video.id) {
      if (errorCount[0] === video.id) {
        errorCount[1] = errorCount[1] + 1;
      } else {
        errorCount[0] = video.id;
        errorCount[1] = 1;
      }
    }
    console.log('onGetCurrent error', error);
    return error;
  }
}

async function play(socket, args) {
  const url = args[0];
  if (!socket.uid) return;
  const { id, startTime } = parseVideo(url);
  if (!id) return;
  const createTime = Date.now();
  const video = {
    url,
    id,
    startTime,
    createtime: createTime,
    uid: socket.uid
  };
  const userData = await getUserData(socket.uid);
  if (userData.reputation < MINIMUM_REPUTATION) {
    utils.sendServerChatMessage('Minimum reputation to use this feature is ' + MINIMUM_REPUTATION);
    return;
  }
  const info = await ytdl.getBasicInfo(video.url);
  const title = info.videoDetails.title;
  if (title.toLowerCase().indexOf('rape') != -1) {
    return;
  }
  await db.setObject(currentVideoKey, video);
  lastVideoCache = info;
  SocketIndex.server.sockets.emit('event:playVideo', {
    url,
    id,
    startTime,
    user: userData,
    title,
    thumbnail: info.videoDetails.thumbnails[0].url
  });
}

function onShoutboxMessage(socket, { message }) {
  if (!message.startsWith('!')) return;
  const [key, ...args] = message.split(' ');
  if (typeof commands[key] === 'function') {
    commands[key](socket, args);
  }
}
