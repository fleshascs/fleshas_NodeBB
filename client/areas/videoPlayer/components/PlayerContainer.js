import VideoPlayer from './Player';
import React, { useEffect, useState, useCallback } from 'react';
import Router, { useRouter } from 'next/router';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { isPlayerVisible } from '../selectors';

const PlayerWrapper = styled.div`
  background: #181717;
  &.minimized {
    position: fixed;
    z-index: 2;
    right: 12px;
    bottom: 0px;
    left: 78px;
    width: 400px;

    @media (max-width: 750px) {
      display: none;
    }
  }
`;

const Placeholder = styled.div`
  background: #181717;
  height: 418px;
`;

function PlayerContainer({ isPlayerVisible }) {
  if (!isPlayerVisible) {
    return null;
  }
  const router = useRouter();
  const [minimized, setMinimized] = useState(false);
  const handleScroll = useCallback((e) => {
    const scrolledHeight = e.target.scrollTop;
    if (scrolledHeight > 300) {
      setMinimized(true);
      return;
    }
    setMinimized(false);
  }, []);

  const onRouteChange = useCallback((url) => {
    if (url === '/') {
      setMinimized(false);
      return;
    }
    setMinimized(true);
  }, []);

  useEffect(() => {
    if (window.innerWidth >= 900) {
      Router.events.on('routeChangeStart', onRouteChange);
    }

    return () => {
      Router.events.off('routeChangeComplete', onRouteChange);
    };
  }, []);

  useEffect(() => {
    if (window.innerWidth >= 900) {
      document.querySelector('.middle-container').addEventListener('scroll', handleScroll);
    }
    return () => {
      document.querySelector('.middle-container').removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      {minimized && router.pathname === '/' ? <Placeholder /> : null}
      <PlayerWrapper className={router.pathname != '/' || minimized ? 'minimized' : ''}>
        <VideoPlayer minimized={router.pathname === '/' ? minimized : true} />
      </PlayerWrapper>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    isPlayerVisible: isPlayerVisible(state)
  };
}

export default connect(mapStateToProps, null)(PlayerContainer);
