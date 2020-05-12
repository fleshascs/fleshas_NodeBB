import React, { Component } from 'react';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
const EmojiPicker = dynamic(() => import('./EmojiPicker'), {
  ssr: false
});

const EmojiContainer = styled.div`
  position: relative;
`;

const MaterialIconButton = styled.i`
  color: #7d7878;
  border-radius: 50%;
  padding: 0px 5px;

  &:hover {
    background: #e0e0e0;
    cursor: pointer;
  }
`;

class EmojiButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      emojiPickerOpened: false
    };
  }

  onEmojiSelect = (e) => {
    if (typeof this.props.onEmojiSelect === 'function') {
      this.props.onEmojiSelect(e.native);
    }

    this.setState({ emojiPickerOpened: false });
  };

  onEmojiButtonClick = () => {
    this.setState({ emojiPickerOpened: !this.state.emojiPickerOpened });
  };

  render() {
    return (
      <EmojiContainer>
        <MaterialIconButton className='material-icons' onClick={this.onEmojiButtonClick}>
          sentiment_satisfied_alt
        </MaterialIconButton>
        {this.state.emojiPickerOpened ? <EmojiPicker onEmojiSelect={this.onEmojiSelect} /> : null}
      </EmojiContainer>
    );
  }
}

export default EmojiButton;
