const utils = require('./utils');
const user = require('../../src/user');
const SocketIndex = require('../../src/socket.io/index');
const { youtubeVideoPlayer } = require('./youtube');
const { drawingBoard } = require('./drawingBoard');

const getUserData = utils.promisify(user.getUserData);

function findClientsSocket(io, roomId, namespace) {
  var res = [],
    ns = io.of(namespace || '/'); // the default namespace is "/"

  if (ns) {
    for (var id in ns.connected) {
      if (roomId) {
        // ns.connected[id].rooms is an object!
        var rooms = Object.values(ns.connected[id].rooms);
        var index = rooms.indexOf(roomId);
        if (index !== -1) {
          res.push(ns.connected[id]);
        }
      } else {
        res.push(ns.connected[id]);
      }
    }
  }
  return res;
}

function userSocketExists(sockets, uid) {
  return sockets.some((s) => s.uid === uid);
}

async function onlineUsersSocket(socket) {
  if (!socket.uid) {
    return;
  }
  const socketExits = userSocketExists(findClientsSocket(SocketIndex.server), socket.uid);
  if (!socketExits) {
    const userData = await getUserData(socket.uid);
    SocketIndex.server.sockets.emit('event:userconnection', userData);
  }
  socket.on('disconnect', async (reason) => {
    const socketExits = userSocketExists(findClientsSocket(SocketIndex.server), socket.uid);
    if (!socketExits) {
      SocketIndex.server.sockets.emit('event:userdisconnected', { uid: socket.uid });
    }
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
