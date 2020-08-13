import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { Username, Avatar } from 'ui';

const Container = styled.div`
  width: 100%;
  padding: 7px 0px;
  margin: 6px 0px;
  background: linear-gradient(315deg, #58424a 0, #e0003e 100%);
  a {
    color: red;
  }
  color: #fff;
  word-break: break-all;
`;

export default function YoutubeNotification({ user, url, title, thumbnail }) {
  return (
    <Container>
      <div className='d-flex px-2'>
        <Link as={`/user/${user.userslug}`} href={`/user?slug=${user.userslug}`}>
          <a>
            <Avatar user={user} imgUrl={user.picture} showIndicator={true} />
          </a>
        </Link>
        <div className='ml-2'>
          <Username className='mr-2' user={user}>
            {user.username}
          </Username>
          playing youtube
        </div>
      </div>
      <div className='px-2'>
        <a href={url} target='_blank'>
          {title}
          <br />
          <img className='img-responsive' src={thumbnail} />
        </a>
      </div>
    </Container>
  );
}
