import React, { createElement, useState } from 'react';
import { Comment, Tooltip, Avatar, Button } from 'antd';
import moment from 'moment';
import styled from 'styled-components';
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';
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
      <Col>{value}</Col>
    </Row>
  );
};
