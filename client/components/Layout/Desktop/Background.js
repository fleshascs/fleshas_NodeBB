import React from 'react';
import styled from 'styled-components';
import { backgroundColor } from '_theme';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: ${backgroundColor};
  position: absolute;
  left: 0;
  top: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  z-index: 0;
`;

const Backround = () => <Container />;

export default Backround;
