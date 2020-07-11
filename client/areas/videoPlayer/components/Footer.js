import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { Slider } from 'antd';
import { Username, Avatar } from 'ui';

const Container = styled.div`
  padding-bottom: 0.7rem;
  padding-top: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  color: #fff;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;
const SecondBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const UrlContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: 2rem;

  @media (max-width: 600px) {
    margin-right: 0px;
  }
`;

export default function Footer(props) {
  const { url, user, isMuted, volume, setVolume, toggleAudio } = props;
  return (
    <Container>
      <UrlContainer>
        <a href={url} target='_blank' className='ml-3'>
          {url}
        </a>
      </UrlContainer>
      <SecondBlock>
        <i
          className={`material-icons ${isMuted ? 'text-muted' : ''} ml-auto`}
          onClick={toggleAudio}
          style={{ fontSize: '1.5rem' }}
        >
          {isMuted ? 'volume_off' : 'volume_up'}
        </i>

        <div style={{ width: '6rem' }} className='px-3'>
          <Slider value={volume} onChange={setVolume} />
        </div>

        {user ? (
          <>
            Host:
            <Link as={`/user/${user.userslug}`} href={`/user?slug=${user.userslug}`}>
              <a>
                <Avatar className='ml-2' user={user} imgUrl={user.picture} showIndicator={true} />
              </a>
            </Link>
            <Username className='ml-2' user={user}>
              {user.username}
            </Username>
          </>
        ) : null}
      </SecondBlock>
    </Container>
  );
}
