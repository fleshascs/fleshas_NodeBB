import React, { Component } from 'react';
import styled from 'styled-components';
import Chat from './ChatPopUp';
import { connect } from 'react-redux';
import socket from 'areas/socket/services';
import * as chatActions from '../actions';

const Container = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  position: absolute;
  justify-content: flex-end;
`;
const ContainerWrapper = styled.div`
  width: 80%;
  display: flex;
  position: relative;

  @media (max-width: 1370px) {
    width: 74%;
  }

  @media (max-width: 600px) {
    width: 100%;
  }
`;

class ChatController extends Component {
  componentDidMount() {
    this.newMsgAudio = new Audio('/static/sound/intuition.mp3');

    socket.on('event:chats.receive', this.onNewMessage);
    socket.on('event:unread.updateChatCount', (count) => {
      this.props.dispatch(chatActions.updateUnreadCount(count));
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
      this.props.dispatch(chatActions.openChat(data));
    }
  };

  openChatsFromLocalStrorage() {
    const user = this.props.auth.user;
    const storeKey = 'chatsOpened-' + user.uid;
    const chatsOpened = JSON.parse(localStorage.getItem(storeKey)) || {};
    //render opened chats
    Object.keys(chatsOpened).map((key) =>
      this.props.dispatch(chatActions.openChat(chatsOpened[key]))
    );
  }

  render() {
    const { chatsOpened } = this.props.chat;
    if (!this.props.auth.loggedIn) {
      return null;
    }
    return (
      <ContainerWrapper>
        <Container>
          {Object.keys(chatsOpened).map((chatKey) => (
            <Chat key={chatsOpened[chatKey].roomId} room={chatsOpened[chatKey]} />
          ))}
        </Container>
      </ContainerWrapper>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    chatsOpened: state.chat.chatsOpened,
    auth: state.authentication,
    chat: state.chat
  };
}

export default connect(mapStateToProps)(ChatController);
