const utils = require('./utils');
const user = require('../../src/user');
const SocketIndex = require('../../src/socket.io/index');
const { youtubeVideoPlayer } = require('./youtube');
const { drawingBoard } = require('./drawingBoard');

const getUserData = utils.promisify(user.getUserData);

async function onlineUsersSocket(socket) {
  if (!socket.uid) {
    return;
  }
  const userData = await getUserData(socket.uid);
  SocketIndex.server.sockets.emit('event:userconnection', userData);

  socket.on('disconnect', async (reason) => {
    const userData = await getUserData(socket.uid);
    SocketIndex.server.sockets.emit('event:userdisconnected', userData);
  });
}

function addSocketListeners() {
  SocketIndex.server.on('connection', (socket) => {
    onlineUsersSocket(socket);
    youtubeVideoPlayer(socket);
    drawingBoard(socket);
  });
}

module.exports = addSocketListeners;
