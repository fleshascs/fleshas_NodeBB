import React, { Component } from 'react';
import throttle from 'lodash.throttle';
import { connect } from 'react-redux';
import { Button, Modal } from 'antd';
import Message from './Message';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import {
  ShoutboxContainer,
  MessgesList,
  NotLoggedIn,
  Container,
  Top,
  Textarea
} from './shoutBox.css.js';
import MoreMessagesToScroll from './MoreMessagesToScroll';
import ShoutsPlaceHolder from './ShoutsPlaceHolder';
import socket from 'areas/socket/services';
import { withTranslation } from '_core/i18n';
import { whenAllImagesLoads } from '_core/utils';
import { EmojiButton } from 'ui/EmojiButton';
import { GifButton } from 'ui/GifButton';
import { messageDate } from '_core/utils';
import { getIsLoggedIn } from 'areas/session/selectors';
import dynamic from 'next/dynamic';
const YoutubeNotification = dynamic(() => import('./YoutubeNotification'), {
  ssr: false
});
const ServerChatMessage = dynamic(() => import('./ServerChatMessage'), {
  ssr: false
});

//https://codesandbox.io/s/04v892702v
const { confirm } = Modal;

class ShoutboxComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
      messages: [],
      messagesLoading: true,
      loadingError: false,
      showScrollHelper: false,
      soundEnabled: true,
      isServer: true
    };

    this.handleScroll = throttle(this.handleScroll, 500);
    this.scrollableBox = React.createRef();
    this.input = React.createRef();
  }

  onEmojiSelect = (emoji) => {
    this.setState((prevState, props) => {
      return { message: prevState.message + emoji };
    });

    this.input.current.focus();
  };

  handleVideo = (video) => {
    const messages = [...this.state.messages, { type: 'youtubePlayer', ...video }];
    this.setState({ messages });
  };

  handleServerChatMessage = (data) => {
    const messages = [...this.state.messages, { type: 'serverChatMessage', ...data }];
    this.setState({ messages });
  };

  componentDidMount() {
    this.setState({ isServer: false });
    this.newMsgAudio = new Audio('/static/sound/newMessageShoutbox.mp3');
    socket.on('event:playVideo', this.handleVideo);
    socket.on('event:serverChatMessage', this.handleServerChatMessage);
    socket.on('shoutbox::message', this.addMessage);
    socket.on('event:shoutbox.edit', this.updateMessageList);
    socket.on('event:shoutbox.delete', (data) => {
      this.updateMessage({ ...data, deleted: 1 });
    });

    socket.emit('plugins.shoutbox.get', null, (error, messages) => {
      let state = { messagesLoading: false };
      if (error) {
        state.loadingError = true;
      } else {
        //istrynus zinute nodebb grazina ja kaip tuscia objekta
        //todel reikia prafiltruot
        state.messages = messages.filter((msg) => msg && msg.sid);
        this.scrollToBottomWhenImagesLoads(state.messages);
      }

      this.setState(state);
    });
    socket.on('event:shoutbox.receive', (messages) => {
      messages.map(this.addMessage);
    });

    window.addEventListener('resize', this.scrollToBottom);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.scrollToBottom);
  }

  scrollToBottomWhenImagesLoads = (messages) => {
    whenAllImagesLoads(messages).then(() => {
      this.scrollToBottom();
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const { showScrollHelper, isServer, messages } = this.state;
    const haveNewMessages = messages != prevState.messages;
    const shouldScrollDown = haveNewMessages && !isServer && !this.state.messagesLoading;
    if ((shouldScrollDown || this.props.isOpenOnMobile === true) && !showScrollHelper) {
      this.scrollToBottom();
      this.scrollToBottomWhenImagesLoads(messages);
    }
  }

  render() {
    const { loggedIn, t } = this.props;
    if (this.state.loadingError) {
      return <div>{t('technical-error')}</div>;
    }

    let MessagesHTML = null;
    if (this.state.messagesLoading) {
      MessagesHTML = <ShoutsPlaceHolder />;
    } else {
      MessagesHTML = <MessgesList>{this.state.messages.map(this.renderMessage)}</MessgesList>;
    }

    return (
      <Container>
        <Top className='text-right my-1 px-2' onClick={this.toggleSound}>
          <i className='material-icons text-muted' style={{ fontSize: '18px' }}>
            {this.state.soundEnabled ? 'volume_up' : 'volume_off'}
          </i>
          {/* <OnlineUsersBadge online={onlineUsers.length} /> */}
        </Top>
        <ShoutboxContainer onScroll={this.handleScroll} ref={this.scrollableBox}>
          {MessagesHTML}
        </ShoutboxContainer>

        <MoreMessagesToScroll show={this.state.showScrollHelper} onClick={this.scrollToBottom} />
        {!loggedIn ? (
          <NotLoggedIn className='px-3 pt-2'>{t('you-are-not-logged-in')}</NotLoggedIn>
        ) : null}

        <div className='mx-3 py-2'>
          <Textarea
            onKeyDown={this.onKeyPressed}
            className='w-100'
            onChange={this.handleMessageChange}
            value={this.state.message}
            ref={this.input}
            aria-label='Send a message'
          />
          <div className='d-flex'>
            <EmojiButton onEmojiSelect={this.onEmojiSelect} />
            <GifButton onEmojiSelect={this.onEmojiSelect} />
            <Button
              type='primary'
              disabled={!(this.state.message && loggedIn)}
              onClick={this.handleMessageSubmit}
              className='ml-auto'
            >
              {t('submit-message')}
            </Button>
          </div>
        </div>
      </Container>
    );
  }

  toggleSound = () => {
    this.setState((prevState, props) => {
      return { soundEnabled: !prevState.soundEnabled };
    });
  };

  handleScroll = (e) => {
    e.persist();
    const target = this.scrollableBox.current;
    const containerHeight = target.offsetHeight;
    const scrollableAreaHeight = target.scrollHeight;
    const scrolledHeight = target.scrollTop;

    const scrollHeight = scrollableAreaHeight - containerHeight;
    const scrolledPercent = (scrolledHeight / scrollHeight) * 100;

    let showScrollHelper = false;
    if (scrolledPercent < 90) {
      showScrollHelper = true;
    }
    if (!e.isTrusted && showScrollHelper) return;

    if (this.state.showScrollHelper === showScrollHelper) return;
    this.setState({ showScrollHelper });
  };

  onMessageDelete = (sid) => {
    confirm({
      title: 'Do you Want to delete this message?',
      icon: <ExclamationCircleOutlined />,
      content: 'Message will be deleted permanently',
      onOk() {
        socket.emit('plugins.shoutbox.remove', { sid });
      }
    });
  };

  renderMessage = (msg) => {
    if (msg.type === 'youtubePlayer') {
      return (
        <YoutubeNotification
          user={msg.user}
          url={msg.url}
          key={msg.url}
          title={msg.title}
          thumbnail={msg.thumbnail}
        />
      );
    }
    if (msg.type === 'serverChatMessage') {
      return <ServerChatMessage message={msg.message} key={msg.message} />;
    }
    const { auth } = this.props;
    const canDelete = auth?.user.isAdmin || auth?.user.isGlobalMod || auth?.user.isMod;
    return (
      <Message
        likes={0}
        user={msg.user}
        deleted={msg.deleted}
        timestamp={msg.timestamp}
        friendlyDate={messageDate(msg.timestamp)}
        content={msg.content}
        key={msg.sid}
        sid={msg.sid}
        canDelete={canDelete}
        onDelete={this.onMessageDelete}
      />
    );
  };

  addMessage = (msg) => {
    if (this.state.soundEnabled) {
      this.newMsgAudio.play();
    }

    this.setState((prevState) => {
      return {
        messages: [...prevState.messages, msg]
      };
    });
  };

  updateMessageList = (messageList) => {
    const mapBySid = (list) =>
      list.reduce((accumulator, message) => {
        accumulator[message.sid] = message;
        return accumulator;
      }, {});
    const sidMap = mapBySid(messageList);
    const keys = Object.keys(sidMap);
    function generateUpdatedMessage(el) {
      const update = sidMap[el.sid];
      return {
        ...el,
        ...update
      };
    }
    const messages = this.state.messages.map((el) =>
      keys.includes(String(el.sid)) ? generateUpdatedMessage(el) : el
    );
    this.setState({ messages });
  };

  updateMessage = (newMessage) => {
    const sid = parseInt(newMessage.sid);
    const index = this.state.messages.findIndex((msg) => msg.sid === sid);
    const updatedMessage = {
      ...this.state.messages[index],
      ...newMessage
    };

    const messages = this.state.messages.map((el) => (el.sid === sid ? updatedMessage : el));
    this.setState({ messages });
  };

  scrollToBottom = () => {
    window.cancelAnimationFrame(this.frameRequest || 0);
    this.frameRequest = window.requestAnimationFrame(() => {
      const scrollContent = this.scrollableBox.current;
      scrollContent && (scrollContent.scrollTop = scrollContent.scrollHeight);
    });
  };

  handleMessageChange = (e) => {
    this.setState({ message: e.currentTarget.value });
  };

  onKeyPressed = (e) => {
    if (e.which === 13 && !e.shiftKey) {
      this.handleMessageSubmit();
      e.preventDefault();
    }
  };

  handleMessageSubmit = () => {
    if (!this.props.loggedIn || !this.state.message.trim().length) return;
    const msg = { message: this.state.message };
    socket.emit('plugins.shoutbox.send', msg, (error, response) => {
      if (error) {
        console.log(error);
        return;
      }
    });
    this.setState({ message: '' });
  };
}

function mapStateToProps(state) {
  return {
    loggedIn: getIsLoggedIn(state),
    auth: state.authentication
  };
}

export default connect(mapStateToProps, null, null, { forwardRef: true })(
  withTranslation('common')(ShoutboxComponent)
);
