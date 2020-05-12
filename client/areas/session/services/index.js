import socket from 'areas/socket/services';

//["user.exists", {username: "fleshas.lt"}]
export function isUserExists(username) {
  return socket.emitAsync('user.exists', { username });
}

export function isEmailExists(email, callback, called) {
  return socket.emitAsync('user.emailExists', { email });
}
