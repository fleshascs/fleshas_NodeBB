export const OPEN_CHAT = 'areas/chat/open_chat';
export const CLOSE_CHAT = 'areas/chat/close_chat';
export const UPDATE_UNREAD_COUNT = 'areas/chat/update_unread_count';
export const CHATS_OPENED = 'areas/chat/chats_opened';
export const START_CONVERSATION = 'areas/chat/start_conversations';
export const SEND_MESSAGE = 'areas/chat/send_message';

export function startConversation(uid) {
  return { type: START_CONVERSATION, uid };
}

export function openChat(chat) {
  return { type: OPEN_CHAT, chat };
}

export function closeChat(chat) {
  return { type: CLOSE_CHAT, chat };
}
export function chatsOpened(chatsOpened) {
  return { type: CHATS_OPENED, chatsOpened };
}

export function updateUnreadCount(count) {
  return { type: UPDATE_UNREAD_COUNT, count };
}

export function sendMessage(roomId, message, callback) {
  return { type: SEND_MESSAGE, roomId, message, callback };
}
