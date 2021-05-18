import React from 'react';
import styled from 'styled-components';
import Chat from './ChatPopUp';

const Container = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  position: absolute;
  justify-content: flex-end;
`;
const ContainerWrapper = styled.div`
  width: 80%;
  display: flex;
  position: relative;

  @media (max-width: 1370px) {
    width: 74%;
  }

  @media (max-width: 600px) {
    width: 100%;
  }
`;

const ChatContainer = ({ chatsOpened }) => {
  return (
    <ContainerWrapper>
      <Container>
        {Object.keys(chatsOpened).map((chatKey) => (
          <Chat key={chatsOpened[chatKey].roomId} room={chatsOpened[chatKey]} />
        ))}
      </Container>
    </ContainerWrapper>
  );
};

export default ChatContainer;
