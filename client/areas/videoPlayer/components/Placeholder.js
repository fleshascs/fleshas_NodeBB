import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { isPlayerVisible } from '../selectors';
import { setVisible, setVideo } from '../actions';
import { getLatestVideo } from '../utils';
const Container = styled.div`
  padding-bottom: 0.7rem;
  padding-top: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  background: #181717;
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
  flex: 1;
  flex-direction: row;
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

function Footer(props) {
  const { onInputTextChange, isPlayerVisible, setVisible, setVideo } = props;
  const onSubmit = () => {
    console.log('submit');
    setVisible(true);
  };
  if (isPlayerVisible) {
    return null;
  }
  console.log('render*-**************************************');
  useEffect(() => {
    console.log('test**********************');
    getLatestVideo().then((video) => {
      setVisible(true);
      setVideo(video);
      console.log('video', video);
    });
  }, []);

  return (
    <Container>
      <UrlInputContainer>
        <UrlInput onChange={onInputTextChange} type='text' placeholder='http://youtube.com/...' />
        <SubmitButton onClick={onSubmit}>
          <Icon src='/static/images/youtube/PikPng.com_youtube-icon-png_3020684.png' />
          Play for all
        </SubmitButton>
      </UrlInputContainer>
    </Container>
  );
}
const actionsToProps = {
  setVisible,
  setVideo
};
function mapStateToProps(state) {
  return {
    isPlayerVisible: isPlayerVisible(state)
  };
}

export default connect(mapStateToProps, actionsToProps)(Footer);
