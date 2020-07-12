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

let lastVideoCache = {};

module.exports.youtubeVideoPlayer = async function (socket) {
  socket.on('plugins.shoutbox.send', (data) => onShoutboxMessage(socket, data));
  sockets[pluginName] = {};
  sockets[pluginName].getCurrent = onGetCurrent;
};

async function onGetCurrent(socket) {
  try {
    let video = await db.getObject(currentVideoKey);
    if (!video) {
      return;
    }
    video.createtime = parseInt(video.createtime);
    video.startTime = parseInt(video.startTime);
    let info;
    if (lastVideoCache.id === video.id) {
      info = lastVideoCache;
    } else {
      info = await ytdl.getInfo(video.url);
      lastVideoCache = info;
    }
    video.duration = info.videoDetails.lengthSeconds || 0;
    var diff = diff_seconds(+new Date(), video.createtime) + video.startTime;
    if (diff > video.duration) {
      console.log(
        'video has ended diff:',
        diff,
        'video.startTime',
        video.startTime,
        'video.duration:',
        video.duration
      );
      return;
    }
    const userData = await getUserData(video.uid);
    if (!userData) return;
    video.user = userData;
    return video;
  } catch (error) {
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
  await db.setObject(currentVideoKey, video);
  const info = await ytdl.getInfo(video.url);
  lastVideoCache = info;
  const userData = await getUserData(socket.uid);
  SocketIndex.server.sockets.emit('event:playVideo', {
    url,
    id,
    startTime,
    user: userData,
    title: info.videoDetails.title,
    thumbnail: info.videoDetails.thumbnail.thumbnails[0].url
  });
}

function onShoutboxMessage(socket, { message }) {
  if (!message.startsWith('!')) return;
  const [key, ...args] = message.split(' ');
  if (typeof commands[key] === 'function') {
    commands[key](socket, args);
  }
}
