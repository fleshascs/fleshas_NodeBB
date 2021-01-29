import React from 'react';
import styled from 'styled-components';
import Picker from 'react-giphy-picker-ololo';

const EmojiPickerContainer = styled.div`
  position: absolute;
  bottom: 125%;
  z-index: 3;
`;

export default function EmojiPicker({ onSelected }) {
  return (
    <EmojiPickerContainer>
      <Picker onSelected={onSelected} />
    </EmojiPickerContainer>
  );
}
