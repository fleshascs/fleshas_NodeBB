import React, { Component } from 'react';
import styled from 'styled-components';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import axios from 'axios';

const EmojiPickerContainer = styled.div`
  position: absolute;
  bottom: 125%;
  z-index: 3;

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 10px;
    margin-left: -5px;
    border-width: 10px;
    border-style: solid;
    border-color: #555 transparent transparent transparent;
  }
`;

const EMOJI_PATH = '/plugins/nodebb-plugin-emoji/emoji';

async function fetchEmojis() {
  const response = await axios.get(EMOJI_PATH + '/table.json'); //customizations
  const filtered = Object.keys(response.data).reduce((emojis, emoji) => {
    if (emoji.pack === 'customizations') {
      emijos.push({
        name: emoji.name,
        short_names: [emoji.name],
        text: '',
        emoticons: [],
        keywords: emoji.keywords ?? [],
        imageUrl: `${EMOJI_PATH}/${emoji.pack}/${emoji.image}`
      });
    }
  }, []);
  return filtered;
}

class EmojiPicker extends Component {
  state = {
    customEmojis: []
  };
  async componentDidMount() {
    const emojis = await fetchEmojis();
    this.setState({ customEmojis: emojis });
  }
  render() {
    return (
      <EmojiPickerContainer>
        <Picker
          theme='dark'
          onSelect={this.props.onEmojiSelect}
          native={true}
          emojiSize={18}
          custom={this.state.customEmojis}
          //set={'apple'}
        />
      </EmojiPickerContainer>
    );
  }
}

export default EmojiPicker;
