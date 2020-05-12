import socket from 'areas/socket/services';

export function GetConversationHistory(room, user) {
  return fetch(`/api/user/${user.userslug}/chats/${room.roomId}`).then((response) =>
    response.json()
  );
}

export async function getRecentChats(uid) {
  const payload = {
    uid,
    after: 0
  };
  const data = await socket.emitAsync('modules.chats.getRecentChats', payload);
  const rooms = data.rooms.filter(function (room) {
    return room.teaser;
  });
  return rooms;
}

export function hasPrivateChat(uid) {
  return socket.emitAsync('modules.chats.hasPrivateChat', uid);
}

//DnD -> status Do not disturb
export function isDnD(touid) {
  return socket.emitAsync('modules.chats.isDnD', touid);
}

export function createChat(touid) {
  return socket.emitAsync('modules.chats.newRoom', { touid: touid });
}
