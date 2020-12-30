import React, { Component } from 'react';
import dynamic from 'next/dynamic';
import { connect } from 'react-redux';
import socket from 'areas/socket/services';
import { updateUnreadCount, openChat } from '../actions';
const ChatContainer = dynamic(() => import('./ChatContainer'), {
  ssr: false
});

class ChatController extends Component {
  componentDidMount() {
    this.newMsgAudio = new Audio('/static/sound/intuition.mp3');

    socket.on('event:chats.receive', this.onNewMessage);
    socket.on('event:unread.updateChatCount', (count) => {
      this.props.dispatch(updateUnreadCount(count));
    });

    if (this.props.auth.user && this.props.auth.user.uid) {
      this.openChatsFromLocalStrorage();
    }
  }

  onNewMessage = (data) => {
    if (data.message.system) {
      return;
    }

    const user = this.props.auth.user;
    if (user.uid !== data.fromUid) {
      this.newMsgAudio.play();
    }

    if (!this.props.chatsOpened[data.roomId]) {
      this.props.dispatch(openChat(data));
    }
  };

  openChatsFromLocalStrorage() {
    const user = this.props.auth.user;
    const storeKey = 'chatsOpened-' + user.uid;
    const chatsOpened = JSON.parse(localStorage.getItem(storeKey)) || {};
    Object.keys(chatsOpened).map((key) => this.props.dispatch(openChat(chatsOpened[key])));
  }

  render() {
    const { chatsOpened } = this.props.chat;
    if (!this.props.auth.loggedIn || !Object.keys(chatsOpened).length) {
      return null;
    }
    return <ChatContainer chatsOpened={chatsOpened} />;
  }
}

function mapStateToProps(state) {
  return {
    chatsOpened: state.chat.chatsOpened,
    auth: state.authentication,
    chat: state.chat
  };
}

export default connect(mapStateToProps)(ChatController);
