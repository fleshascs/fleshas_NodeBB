import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  padding: 7px 0px;
  margin: 6px 0px;
  background: linear-gradient(315deg, #58424a 0, #e0003e 100%);
  color: #fff;
  word-break: break-all;
`;

export default function ServerChatMessage({ message }) {
  return (
    <Container>
      <div className='d-flex px-2'>{message}</div>
    </Container>
  );
}
