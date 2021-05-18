import React from 'react';
import styled from 'styled-components';
import { Comment } from 'antd';
import { contentPlaceholderColor } from '_theme';

function createPlaceHolder(shoutsNum) {
  let placeHolders = [];
  for (let j = 0; j < shoutsNum; j++) {
    placeHolders.push(<Placeholder key={j} />);
  }
  return placeHolders;
}

const ShoutsPlaceHolder = () => <div>{createPlaceHolder(31)}</div>;
export default ShoutsPlaceHolder;

const PPlaceholder = styled.div`
  background: ${contentPlaceholderColor};
  height: ${(props) => props.h};
  width: ${(props) => props.w};
  display: inline-block;
  margin-left: 3px;
  margin-right: 3px;
  border-radius: 4px;
`;

function Placeholder() {
  return (
    <Comment
      className='ml-1'
      author={<PPlaceholder w='38px' h='14px' />}
      avatar={<PPlaceholder w='32px' h='32px' />}
      content={<PPlaceholder w='128px' h='14px' />}
    />
  );
}
