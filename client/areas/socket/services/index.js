'use strict';
import io from 'socket.io-client';

var ioParams = {
  reconnectionAttempts: 5,
  reconnectionDelay: 1500,
  transports: ['polling', 'websocket'],
  path: '/socket.io'
};

let socket;
export function connectToSocket() {
  const isBrowser = typeof window !== 'undefined';
  if (!isBrowser) return;
  socket = io.connect('', ioParams);
  socket.emitAsync = function (event, payload) {
    return new Promise((resolve, reject) => {
      socket.emit(event, payload, (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  };
}

connectToSocket();

export default socket;
