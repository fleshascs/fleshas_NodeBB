import socket from './index';

export function enterRoom(room) {
  return socket.emitAsync('meta.rooms.enter', {
    enter: room
  });
}

export const leaveCurrentRoom = function () {
  socket.emitAsync('meta.rooms.leaveCurrent');
};
