import React, { useState } from 'react';
import styled from 'styled-components';
//import { VolumeSlider } from './slider';
import { Slider } from 'antd';

const Container = styled.div`
  padding-bottom: 0.7rem;
  padding-top: 0.5rem;
  padding-left: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

const UrlInput = styled.input`
  background: none;
  border: none;
  flex: 1;
  color: grey;
  padding: 3px;
`;

const UrlInputContainer = styled.div`
  background: #292c35;
  border: 1px solid #424c58;
  display: flex;
  flex: 0.8;
  flex-direction: row;
  margin-right: 2rem;
`;

const SubmitButton = styled.button`
  background: #292c35;
  border: none;
  border-left: 1px solid #424c58;
  color: #d81c27;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Icon = styled.img`
  width: 30px;
  padding-right: 5px;
`;

export default function Footer(props) {
  const {
    onInputTextChange,
    inputValue,
    onSubmitLink,
    isMuted,
    volume,
    setVolume,
    toggleAudio
  } = props;
  return (
    <Container>
      <UrlInputContainer>
        <UrlInput onChange={onInputTextChange} type='text' placeholder='http://youtube.com/...' />
        <SubmitButton onClick={onSubmitLink}>
          <Icon src='/static/images/youtube/PikPng.com_youtube-icon-png_3020684.png' />
          Play for all
        </SubmitButton>
      </UrlInputContainer>
      <i className='material-icons text-muted' onClick={toggleAudio} style={{ fontSize: '1.5rem' }}>
        {isMuted ? 'volume_off' : 'volume_up'}
      </i>

      <div style={{ flex: '0.2', maxWidth: '6rem' }} className='px-3'>
        <Slider defaultValue={volume} onChange={setVolume} disabled={false} />
      </div>
    </Container>
  );
}
