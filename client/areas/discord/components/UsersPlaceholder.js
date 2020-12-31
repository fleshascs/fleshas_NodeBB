import React from 'react';
import styled from 'styled-components';
import ListItem from './ListItem';
import { contentPlaceholderColor } from '_theme';

const PPlaceholder = styled.div`
  background: ${contentPlaceholderColor};
  height: ${(props) => props.h};
  width: ${(props) => props.w};
  display: inline-block;
  margin-left: 3px;
  margin-right: 3px;
  border-radius: 4px;
`;

const Avatar = styled.div`
  background: ${contentPlaceholderColor};
  border-radius: 100%;
  width: 24px;
  height: 24px;
  border: solid 2px #fff;
  border-color: #3a3a3a;
  margin-right: 5px;
  display: inline-block;
`;

function createPlaceHolder(shoutsNum = 1) {
  let placeHolders = [];
  for (let j = 0; j < shoutsNum; j++) {
    placeHolders.push(
      <ListItem key={j} username={<PPlaceholder h='14px' w='50px' />} avatar={<Avatar />} />
    );
  }
  return placeHolders;
}

const ShoutsPlaceHolder = () => createPlaceHolder(11);
export default ShoutsPlaceHolder;
