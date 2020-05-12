const utils = require('./utils');
const user = require('../../src/user');
const SocketIndex = require('../../src/socket.io/index');

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

async function youtubeVideoPlayer(socket) {
  console.log('server init youtube socket ');

  socket.on('event:playVideo', async ({ url }) => {
    console.log('server event:playVideo ', url);
    if (!url || !socket.uid) return;
    const { id, startTime } = parseVideo(url);
    if (!id) return;
    const userData = await getUserData(socket.uid);
    SocketIndex.server.sockets.emit('event:playVideo', {
      url,
      id,
      startTime,
      user: userData
    });
  });
}

function addSocketListeners() {
  SocketIndex.server.on('connection', (socket) => {
    onlineUsersSocket(socket);
    youtubeVideoPlayer(socket);
  });
}

module.exports = addSocketListeners;
