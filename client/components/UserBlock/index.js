import React, { Component } from 'react';
import LogOutButton from './LogOutButton';
import MessagesButton from './MessagesButton';
import Link from 'next/link';
import { AvatarUpload } from 'ui';
import { connect } from 'react-redux';
import { Container, Username, Usermenu } from './index.css';
import * as sessionActions from 'areas/session/actions';
import Connection from './Connection';

class UserBlock extends Component {
  render() {
    const userDetails = this.props.auth.user;
    const href = {
      pathname: '/settings',
      query: { userSlug: userDetails.userslug }
    };

    return (
      <Container className='mt-1'>
        <Connection />
        <Link href={href} as={`/user/${userDetails.userslug}/edit`}>
          <div>
            <AvatarUpload user={userDetails} src={userDetails.picture} size='30' />
          </div>
        </Link>
        <div className='px-2'>
          <Link href={`/user/${userDetails.userslug}`} passHref>
            <Username>{userDetails.username}</Username>
          </Link>
        </div>
        <Usermenu className='px-2'>
          <MessagesButton messagesCount={this.props.unreadCount} />
          <LogOutButton onClick={this.props.logout} />
        </Usermenu>
      </Container>
    );
  }
}

const actionCreators = {
  logout: sessionActions.logout
};

function mapStateToProps(state) {
  return {
    auth: state.authentication,
    unreadCount: state.chat.unreadCount
  };
}

export default connect(mapStateToProps, actionCreators)(UserBlock);
