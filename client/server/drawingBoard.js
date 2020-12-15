const SocketIndex = require('../../src/socket.io/index');
const sockets = require('../../src/socket.io/plugins');
const pluginName = 'drawingBoard';

const commands = {
  '!draw': toggleDrawingBoard
};

let isBoardEnabled = false;
let currentBoard = [];

module.exports.drawingBoard = async function (socket) {
  socket.on('plugins.shoutbox.send', (data) => onShoutboxMessage(socket, data));
  sockets[pluginName] = {};
  sockets[pluginName].getIsBoardEnabled = getIsBoardEnabled;
  sockets[pluginName].getBoard = getBoard;
  sockets[pluginName].drawPath = drawPath;
};

async function drawPath(socket, data) {
  try {
    //console.log('**drawPath', data);
    if (!socket.uid) return;
    const board = { path: data.path, color: data.color };
    currentBoard.push(board);
    SocketIndex.server.sockets.emit('event:drawPath', { uid: socket.uid, ...board });
  } catch (error) {
    console.log('drawPath error', error);
    return error;
  }
}

async function getIsBoardEnabled(socket) {
  try {
    return { isBoardEnabled };
  } catch (error) {
    console.log('getIsBoardEnabled error', error);
    return error;
  }
}
async function getBoard(socket) {
  try {
    return { isBoardEnabled, board: currentBoard };
  } catch (error) {
    console.log('getBoard error', error);
    return error;
  }
}

async function toggleDrawingBoard(socket) {
  if (!socket.uid) return;
  isBoardEnabled = !isBoardEnabled;
  currentBoard = [];
  SocketIndex.server.sockets.emit('event:toggleDrawingBoard', isBoardEnabled);
}

function onShoutboxMessage(socket, { message }) {
  if (!message.startsWith('!')) return;
  const [key, ...args] = message.split(' ');
  if (typeof commands[key] === 'function') {
    commands[key](socket, args);
  }
}
