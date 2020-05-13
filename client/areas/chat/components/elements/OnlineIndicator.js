import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { getOnlineUsersObj } from 'areas/user/selectors';

export const OnlineIcon = styled.div`
  background: ${(props) => (props.isOnline ? '#42b72a' : 'grey')};
  border-radius: 50%;
  height: 6px;
  margin: 0 3px 1px 0;
  vertical-align: middle;
  width: 6px;
  display: inline-block;
`;

const Avatar = ({ isOnline }) => {
  return <OnlineIcon isOnline={isOnline} />;
};

function isAnyoneOnline(state, usersInChat) {
  const OnlineUsers = getOnlineUsersObj(state);
  return usersInChat.some((user) => OnlineUsers[user.uid]);
}

function mapStateToProps(state, props) {
  return {
    isOnline: isAnyoneOnline(state, props.usersInChat)
  };
}

export default connect(mapStateToProps)(Avatar);
