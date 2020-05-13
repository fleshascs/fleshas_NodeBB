import React from 'react';
import styled from 'styled-components';
import { Avatar, Username } from 'ui';
import Link from 'next/link';
import { Tooltip } from 'antd';

const UserContainer = styled.div`
  display: inline-flex;
  vertical-align: middle;
  align-items: center;
  margin-left: ${(props) => (props.leftBarOpened ? '13px' : '0px')};
`;

const AvatarWrapper = styled.a`
  &:hover {
    cursor: pointer;
  }
`;

export default (props) => {
  const { leftBarOpened, user } = props;
  return (
    <UserContainer
      className={`w-100 mt-3 ${leftBarOpened ? 'text-left' : ''}`}
      leftBarOpened={leftBarOpened}
    >
      <Tooltip placement='right' title={user.username}>
        <div className={`${leftBarOpened ? '' : 'mx-auto'} `}>
          <Link as={`/user/${user.userslug}`} href={`/user?slug=${user.userslug}`} passHref>
            <AvatarWrapper>
              <Avatar
                user={user}
                showIndicator={true}
                imgUrl={user.picture}
                size='40'
                //circle={true}
              />
            </AvatarWrapper>
          </Link>
        </div>
      </Tooltip>
      {leftBarOpened ? (
        <Username
          user={user}
          bold={false}
          className='ml-3'
          style={{ fontSize: '1.1em', color: 'rgb(98, 127, 156)' }}
        >
          {user.username}
        </Username>
      ) : null}
    </UserContainer>
  );
};
