import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Youtube from './youtube';
import Footer from './Footer';
import { getVideo } from '../selectors';
import { diff_seconds } from '../utils';
import { useSelector } from 'react-redux';

const Container = styled.div`
  background: #181717;
  width: 100%;
`;

const IframeContainer = styled.div`
  position: relative;
  flex: 1;
  height: ${(props) => (props.minimized ? '250px' : '360px')};
  & > iframe {
    height: 100%;
    width: 100%;
  }
`;

const Canvas = styled.canvas`
  z-index: 2;
  position: absolute;
  height: 100%;
  width: 100%;
`;

const ProgressContainer = styled.div`
  height: 3px;
  display: flex;
  transition: transform 0.1s cubic-bezier(0.4, 0, 1, 1);
  position: relative;
`;

const ProgressLine = styled.div`
  background: ${(props) => props.color};
  transform: scaleX(0);
  position: absolute;
  left: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  transform-origin: 0 0;
`;

function Progress({ progress, color }) {
  return <ProgressLine color={color} style={{ transform: `scaleX(${progress})` }} />;
}

export default function Player({ minimized }) {
  const [buffered, setBuffered] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(100);
  const video = useSelector(getVideo);
  const youtube = useRef();
  const initialised = useRef(false);

  const onBuffered = (buffered) => {
    setBuffered(buffered);
  };

  const onProgress = (progress) => {
    setProgress(progress);
    if (!initialised.current) {
      setIsMuted(youtube.current.media.isMuted());
      setVolume(youtube.current.media.getVolume());
      initialised.current = true;
    }
  };

  useEffect(() => {
    if (video?.id) {
      const diff = video.createtime ? diff_seconds(+new Date(), video.createtime) : 0;
      console.log('diff', diff, 'startTime', video.startTime, ' sum', diff + video.startTime);
      loadPlayer(() => {
        youtube.current.playVideo(video.id, diff + video.startTime);
      });
    }
  }, [video]);

  useEffect(() => {
    youtube.current = new Youtube();
    youtube.current.events.on('buffered', onBuffered);
    youtube.current.events.on('progress', onProgress);
    youtube.current.events.on('isMuted', setIsMuted);
    youtube.current.events.on('volume', setVolume);
    return () => {
      youtube.current.events.off('volume', setVolume);
      youtube.current.events.off('isMuted', setIsMuted);
      youtube.current.events.off('buffered', onBuffered);
      youtube.current.events.off('progress', onProgress);
    };
  }, []);

  const setMediaVolume = useRef((value) => {
    if (youtube.current.media) {
      setVolume(value);
      youtube.current.media.setVolume(value);
    }
  });

  const toggleAudio = () => {
    if (youtube.current.media) {
      if (youtube.current.media.isMuted()) {
        youtube.current.media.unMute();
        return;
      }
      youtube.current.media.mute();
    }
  };

  const play = () => {
    if (youtube.current.media) {
      youtube.current.media.play();
    }
  };

  return (
    <Container>
      <div>
        <IframeContainer onClick={play} minimized={minimized}>
          <Canvas />
          <div id='videoContainer' />
        </IframeContainer>
        <ProgressContainer>
          <Progress color='#464440' progress={1} />
          <Progress color='#6d6b6b' progress={buffered} />
          <Progress color='#ff0909' progress={progress} />
        </ProgressContainer>
      </div>
      <div>
        {!minimized ? (
          <Footer
            url={video?.url}
            user={video.user}
            isMuted={isMuted}
            setVolume={setMediaVolume.current}
            volume={volume}
            toggleAudio={toggleAudio}
          />
        ) : null}
      </div>
    </Container>
  );
}

//💩
function loadPlayer(callback) {
  if (typeof YT == 'undefined' || typeof YT.Player == 'undefined') {
    var tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    window.onYouTubePlayerAPIReady = function () {
      callback();
    };
  } else {
    callback();
  }
}
