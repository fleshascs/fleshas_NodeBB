import React, { Component } from 'react';
import { Dropdown, Menu, Avatar, Spin } from 'antd';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { getRecentChats } from 'areas/chat/services';
import { messageDate } from '_core/utils';
import { NumberOfMessages, MessagesButtonContainer } from './MessagesButton.css';
import { openChat } from 'areas/chat/actions';
import { error } from '_core/utils';
import { getUser } from 'areas/session/selectors';
import { withTranslation } from '_core/i18n';

const UnreadIndicator = styled.div`
  background: #107def;
  border-radius: 50%;
  height: 10px;
  margin: 0 3px 1px 0;
  vertical-align: middle;
  width: 10px;
  display: inline-block;
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
`;

const RoomItem = styled.div`
  width: 400px;
  display: flex;

  @media (max-width: 400px) {
    width: auto;
  }
`;

class MessagesButton extends Component {
  state = {
    loading: false,
    items: []
  };

  onVisibleChange = async (isVisible) => {
    try {
      if (isVisible) {
        this.setState({ loading: true });
        const rooms = await getRecentChats(this.props.user.uid);
        const items = rooms.reduce((items, room, index) => {
          items.push(createRoomItem(room, this.props.openChat));
          if (index !== rooms.length - 1) {
            items.push(<Menu.Divider key={'separator' + room.roomId} />);
          }
          return items;
        }, []);
        if (!items.length) {
          items.push(createEmptyItem(this.props.t));
        }

        this.setState({ items: items });
      }
    } catch (e) {
      error.showError(e.message);
    } finally {
      this.setState({ loading: false });
    }
  };

  renderSpinner() {
    return (
      <div className='text-center mt-1'>
        <Spin />
      </div>
    );
  }

  render() {
    const { messagesCount } = this.props;
    const classList = 'material-icons mr-3' + (messagesCount ? ' active' : '');
    return (
      <Dropdown
        overlay={<Menu>{this.state.loading ? this.renderSpinner() : this.state.items}</Menu>}
        onVisibleChange={this.onVisibleChange}
        trigger={['click']}
      >
        <MessagesButtonContainer>
          <i className={classList}>mail_outline</i>
          <NumberOfMessages>{messagesCount}</NumberOfMessages>
        </MessagesButtonContainer>
      </Dropdown>
    );
  }
}

const actionsToProps = {
  openChat
};

function mapStateToProps(state) {
  return {
    user: getUser(state)
  };
}

export default connect(mapStateToProps, actionsToProps)(withTranslation('common')(MessagesButton));

function createRoomItem(room, openChat) {
  const firstUser = room.users[0];
  return (
    <Menu.Item key={room.roomId}>
      <RoomItem className='pr-2' onClick={() => openChat(room)}>
        <Avatar src={firstUser.picture} shape='square' alt={firstUser.username} />
        <div className='pl-2 w-100'>
          <div className='text-muted d-flex'>
            <div>{firstUser.username}</div>
            <div className='ml-auto pl-3'>{messageDate(room.teaser.timestamp)}</div>
          </div>
          <Footer>
            <div className='text-muted' style={{ flex: 1 }}>
              {room.teaser.content.substr(0, 25)}
            </div>
            {room.unread ? <UnreadIndicator /> : null}
          </Footer>
        </div>
      </RoomItem>
    </Menu.Item>
  );
}

function createEmptyItem(t) {
  return (
    <Menu.Item key='emptylist'>
      <div className='d-flex pr-2 pl-2 text-muted' style={{ width: '400px' }}>
        {t('no-chat-rooms')}
      </div>
    </Menu.Item>
  );
}
