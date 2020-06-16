import React from 'react';
import styled from 'styled-components';

const Unread = styled.span`
  background: #349be4;
  border-radius: 50%;
  height: 8px;
  margin: 0 3px 1px 0;
  vertical-align: middle;
  width: 8px;
  display: inline-block;
`;

export default function UnreadIndicator({ className }) {
  return <Unread className={className} />;
}
