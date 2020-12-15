import socket from 'areas/socket/services';

export async function getIsBoardEnabled() {
  return socket.emitAsync('plugins.drawingBoard.getIsBoardEnabled');
}
