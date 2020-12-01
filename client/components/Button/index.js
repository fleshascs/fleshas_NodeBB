import React from 'react';
import styled from 'styled-components';
import { primaryColor } from '_theme';

const Button = styled.button`
  display: inline-flex;
  vertical-align: middle;
  align-items: center;
  border: none;
  background: none;
  position: relative;
  border-radius: 2px;

  &:hover {
    background: #ebe5e5;
    border: none;
    cursor: pointer;
  }

  &.white {
    background: #fff;
    padding: 10px;
  }

  &.blue {
    background: ${primaryColor};
    color: #fff;
    padding: 10px;
    border: 2px solid #355aa6;
  }
`;

export default function ButtonComponent({ children, ...other }) {
  return <Button {...other}>{children}</Button>;
}
