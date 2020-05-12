import React, { Component } from 'react';
import * as chatActions from '../actions';
import { connect } from 'react-redux';
import ChatInput from './elements/ChatInput';
import MessagesList from './elements/MessagesList';
import UsernamesList from './elements/UsernamesList';
import MoreMessagesToScroll from 'ui/Shoutbox/MoreMessagesToScroll';
import socket from 'areas/socket/services';
import { whenAllImagesLoads } from '_core/utils';
import { GetConversationHistory } from 'areas/chat/services';
import { getUser } from 'areas/session/selectors';
import { getOnlineUsersObj } from 'areas/user/selectors';
import { getChatsOpened } from '../selectors';

import {
  ChatContainer,
  PopUpHeader,
  PopUpContainer,
  MessagesContainer,
  OnlineIcon,
  CloseButton
} from './ChatPopUp.css';

class Chat extends Component {
  constructor(props) {
    super(props);

    this.scrolledPercent = 0;
    this.loading = true;

    this.state = {
      messages: [],
      loading: true,
      loadingError: false,
      showScrollHelper: false,
      users: this.props.room.users || []
    };

    this.scrollableBox = React.createRef();
  }

  //public/src/client/chat/messages.js
  //public/src/modules/notifications.js
  //public/src/modules/chat.js
  componentDidMount() {
    this.getConversationHistory();
    socket.on('event:chats.receive', this.onNewMessage.bind(this));
    socket.emit('modules.chats.markRead', this.props.room.roomId);
    window.addEventListener('resize', this.scrollToBottom);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.scrollToBottom);
  }

  onNewMessage = (data) => {
    if (this.props.room.roomId != data.roomId) return;

    this.setState((prevState) => {
      return { messages: [...prevState.messages, data.message] };
    });
    //kadangi chatas atidarytas, gavus zinute pazymesim, kad ji perskaityta
    socket.emit('modules.chats.markRead', this.props.room.roomId);
  };

  componentDidUpdate(prevProps, prevState) {
    const haveNewMessages = this.state.messages !== prevState.messages;
    if (haveNewMessages && !this.state.showScrollHelper) {
      this.scrollToBottom();
      this.scrollToBottomWhenImagesLoads(this.state.messages);
    }
  }

  isAnyoneOnline() {
    return this.state.users.some((user) => this.props.users[user.uid]);
  }

  scrollToBottomWhenImagesLoads = (messages) => {
    whenAllImagesLoads(messages).then(() => {
      this.scrollToBottom();
    });
  };

  render() {
    const isOnline = this.isAnyoneOnline();
    return (
      <ChatContainer>
        <PopUpContainer>
          <PopUpHeader>
            <div className='d-flex pl-1' style={{ alignItems: 'center' }}>
              <OnlineIcon isOnline={isOnline} />
              <UsernamesList users={this.state.users} />
              <CloseButton className='material-icons ml-auto' onClick={this.handleChatClose}>
                close
              </CloseButton>
            </div>
          </PopUpHeader>

          <MessagesContainer onScroll={this.handleScroll} ref={this.scrollableBox}>
            <MessagesList messages={this.state.messages} loading={this.state.loading} />

            <div className='pt-3' />
          </MessagesContainer>

          <MoreMessagesToScroll show={this.state.showScrollHelper} onClick={this.scrollToBottom} />
          <ChatInput onSubmit={this.onSubmit} />
        </PopUpContainer>
      </ChatContainer>
    );
  }

  handleScroll = (e) => {
    const previosScrolledPercent = this.scrolledPercent;
    this.scrolledPercent = getScrolledPercent();

    let showScrollHelper = false;
    if (this.scrolledPercent < 90) {
      showScrollHelper = true;
    }

    if (this.scrolledPercent < 5 && previosScrolledPercent > this.scrolledPercent) {
      this.loadPreviosMessages();
    }

    this.setState({ showScrollHelper });

    function getScrolledPercent() {
      const containerHeight = e.target.offsetHeight;
      const scrollableAreaHeight = e.target.scrollHeight;
      const scrolledHeight = e.target.scrollTop;
      const scrollHeight = scrollableAreaHeight - containerHeight;

      return (scrolledHeight / scrollHeight) * 100;
    }
  };

  loadPreviosMessages() {
    if (!this.state.loading && !this.loading) {
      this.loading = true;
      this.setState({ loading: true });

      const start = this.state.messages.length;
      socket.emit(
        'modules.chats.getMessages',
        {
          roomId: this.props.room.roomId,
          uid: this.props.user.uid,
          start: start
        },
        (err, messages) => {
          console.log('response');

          if (err) {
            this.setState({ loading: false });
            this.loading = false;
            return;
          }

          if (!messages.length) {
            this.setState({ loading: false });
            this.loading = false;
            return;
          }

          this.setState((prevState) => {
            return {
              messages: [...messages, ...prevState.messages],
              loading: false
            };
          });
          this.loading = false;
        }
      );
    }
  }

  scrollToBottom = () => {
    const scrollableBox = this.scrollableBox.current;
    scrollableBox.scrollTo(0, scrollableBox.scrollHeight);
  };

  handleChatClose = () => {
    this.props.dispatch(chatActions.closeChat(this.props.room));
  };

  onSubmit = (message, callback) => {
    this.props.dispatch(chatActions.sendMessage(this.props.room.roomId, message, callback));
  };

  getConversationHistory() {
    GetConversationHistory(this.props.room, this.props.user)
      .then((response) => {
        this.setState(
          {
            users: response.users,
            messages: response.messages,
            loading: false
          },
          () => {
            this.scrollToBottomWhenImagesLoads(response.messages);
          }
        );
        this.loading = false;
      })
      .catch((e) => {
        this.setState({
          loading: false
        });
        this.loading = false;
      });
  }
}

function mapStateToProps(state) {
  return {
    user: getUser(state),
    chatsOpened: getChatsOpened(state),
    users: getOnlineUsersObj(state)
  };
}

export default connect(mapStateToProps)(Chat);
