import React from 'react';
import styled from 'styled-components';
import OnlineUser from './OnlineUser';

const Container = styled.div`
  flex-direction: column;
  text-align: center;
  overflow-y: ${(props) => (props.opened ? 'auto' : 'hidden')};
  overflow-x: hidden;
  flex: 1;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export default (props) => {
  return (
    <Container opened={props.opened}>
      {props.users.map((user) => (
        <OnlineUser user={user} leftBarOpened={props.opened} key={JSON.stringify(user)} />
      ))}
    </Container>
  );
};
