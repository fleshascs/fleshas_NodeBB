import React from 'react';
import styled from 'styled-components';
import { shoutboxInputBorderColor } from '_theme';

export const Row = styled.div`
  border: 1px solid ${shoutboxInputBorderColor};
  display: flex;
`;
export const Col = styled.div`
  padding: 8px;
  flex: 1;
`;

export const RequestDataRow = ({ title, value }) => {
  return (
    <Row>
      <Col>{title}</Col>
      <Col>{value ?? ''}</Col>
    </Row>
  );
};
