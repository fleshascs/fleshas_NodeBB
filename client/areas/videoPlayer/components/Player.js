import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import socket from 'areas/socket/services';
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
  height: 360px;
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
  transform: scaleX(${(props) => props.progress});
  position: absolute;
  left: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  transform-origin: 0 0;
`;

export default function Player({ minimized }) {
  const [inputValue, setInputValue] = useState('');
  const [buffered, setBuffered] = useState(0);
  const [progress, setProgress] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [id, setId] = useState(null);
  const video = useSelector(getVideo);
  const youtube = useRef();
  const lastSend = useRef(null);

  const onBuffered = (buffered) => {
    setBuffered(buffered);
  };

  const onProgress = (progress) => {
    setProgress(progress);
  };

  const handleVideoPlay = ({ url, id, startTime }) => {
    console.log('handleVideoPlay', url, id, startTime);
    loadPlayer(() => {
      console.log('player loaded');
      youtube.current.playVideo(id);
    });

    setInputValue(url);
    setId(id);
    setStartTime(startTime);
  };

  const submitLink = () => {
    console.log('submit inputValue');
    socket.emit('event:playVideo', { url: inputValue });
  };

  const onInputTextChange = (event) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    console.log('***************************************************check for video', video);
    if (video.update_time) {
      lastSend.current = new Date(parseInt(video.update_time) * 1000);
      var diff = diff_seconds(new Date(), lastSend.current);
      console.log('diff', diff, 'duration', video.duration);
      if (diff < video.duration) {
        console.log('************Play');
        loadPlayer(() => {
          const videoId = parseId(video.videoUrl);
          youtube.current.playVideo(videoId, diff);
        });
      }

      console.log('************Play');
      loadPlayer(() => {
        const videoId = parseId(video.videoUrl);
        youtube.current.playVideo(videoId, 0);
      });
    }
  }, [video]);

  useEffect(() => {
    youtube.current = new Youtube();
    youtube.current.events.on('buffered', onBuffered);
    youtube.current.events.on('progress', onProgress);
    socket.on('event:playVideo', handleVideoPlay);
  }, []);

  const isMuted = () => {
    if (youtube.current && youtube.current.media) {
      return youtube.current.media.isMuted();
    }
    return false;
  };

  const setVolume = (value) => {
    if (youtube.current && youtube.current.media) {
      return youtube.current.media.setVolume(value);
    }
  };
  const getVolume = () => {
    if (youtube.current && youtube.current.media) {
      return youtube.current.media.getVolume();
    }
  };
  const toggleAudio = () => {
    if (youtube.current && youtube.current.media) {
      if (getVolume() === 0) {
        setVolume(100);
        return;
      }
      setVolume(0);
    }
  };

  return (
    <Container minimized={minimized}>
      <div>
        <IframeContainer>
          {/* <Canvas/>  */}
          {/* <EmojiContainer>
					</EmojiContainer> */}
          <div id='videoContainer' />
        </IframeContainer>
        <ProgressContainer>
          <ProgressLine color='#464440' progress={1} />
          <ProgressLine color='#6d6b6b' progress={buffered} />
          <ProgressLine color='#ff0909' progress={progress} />
        </ProgressContainer>
      </div>
      <div>
        {!minimized ? (
          <Footer
            onInputTextChange={onInputTextChange}
            inputValue={inputValue}
            isMuted={isMuted()}
            onSubmitLink={submitLink}
            setVolume={setVolume}
            volume={getVolume()}
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

function parseId(url) {
  if (!url) {
    return null;
  }

  const regex = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  return url.match(regex) ? RegExp.$2 : url;
}
