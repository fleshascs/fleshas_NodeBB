const SocketIndex = require('../../src/socket.io/index');
const sockets = require('../../src/socket.io/plugins');
const Board = require('./Board');
const { createCanvas, loadImage, Image } = require('canvas');
const makeQuerablePromise = require('./makeQuerablePromise');
const pluginName = 'drawingBoard';

const commands = {
  '!draw': toggleDrawingBoard
};

let isBoardEnabled = false;
let currentBoard = [];
let currentBoardImg = null;

module.exports.drawingBoard = async function (socket) {
  socket.on('plugins.shoutbox.send', (data) => onShoutboxMessage(socket, data));
  sockets[pluginName] = {};
  sockets[pluginName].getIsBoardEnabled = getIsBoardEnabled;
  sockets[pluginName].getBoard = getBoard;
  sockets[pluginName].drawPath = drawPath;
};

async function drawPath(socket, data) {
  try {
    if (!socket.uid) return;
    const board = { path: data.path, color: data.color };
    currentBoard.push(board);
    socket.broadcast.emit('event:drawPath', { uid: socket.uid, ...board });
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

let cooldownTask = null;
let generateImgTask = null;
function checkToGenerateImg() {
  if (generateImgTask && !generateImgTask.isFulfilled()) {
    return;
  }
  if (cooldownTask && !cooldownTask.isFulfilled()) {
    return;
  }
  generateImgTask = makeQuerablePromise(generateImg());
  cooldownTask = makeQuerablePromise(new Promise((r) => setTimeout(r, 60000 * 2))); //two minutes
}

function generateImg() {
  return new Promise((resolve, reject) => {
    try {
      if (!currentBoard.length) {
        resolve();
        return;
      }
      if (currentBoardImg) {
        const img = new Image();
        img.onload = () => {
          //trash
          const canvas = createCanvas(800, 400);
          const board = new Board(canvas, false);
          canvas.getContext('2d').drawImage(img, 0, 0);
          const copyOfArray = Array.from(currentBoard);
          copyOfArray.forEach(({ path, color }) => {
            board.drawPatah(path, color);
          });
          currentBoard.splice(0, copyOfArray.length);
          currentBoardImg = canvas.toDataURL();
          resolve();
        };
        img.onerror = reject;
        img.src = currentBoardImg;
      } else {
        //trash
        const canvas = createCanvas(800, 400);
        const board = new Board(canvas);
        const copyOfArray = Array.from(currentBoard);
        copyOfArray.forEach(({ path, color }) => {
          board.drawPatah(path, color);
        });
        currentBoard.splice(0, copyOfArray.length);
        currentBoardImg = canvas.toDataURL();
        resolve();
      }
    } catch (error) {
      reject(error);
    }
  });
}

async function getBoard(socket) {
  try {
    checkToGenerateImg();
    return { isBoardEnabled, board: currentBoard, currentBoardImg };
  } catch (error) {
    console.log('getBoard error', error);
    return error;
  }
}

async function toggleDrawingBoard(socket) {
  if (!socket.uid) return;
  isBoardEnabled = !isBoardEnabled;
  currentBoard = [];
  currentBoardImg = null;
  SocketIndex.server.sockets.emit('event:toggleDrawingBoard', isBoardEnabled);
}

function onShoutboxMessage(socket, { message }) {
  message = message.trim();
  if (!message.startsWith('!')) return;
  const [key, ...args] = message.split(' ');
  if (typeof commands[key] === 'function') {
    commands[key](socket, args);
  }
}
