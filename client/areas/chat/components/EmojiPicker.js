import React, { Component } from 'react';
import styled from 'styled-components';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
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
  const response = await axios.get(EMOJI_PATH + '/table.json');
  const filtered = Object.keys(response.data).reduce((emojis, emojiKey) => {
    const emoji = response.data[emojiKey];
    if (emoji.pack === 'customizations') {
      emojis.push({
        name: emoji.name,
        short_names: emoji.aliases,
        text: '',
        emoticons: [],
        keywords: emoji.keywords ?? [],
        imageUrl: `${EMOJI_PATH}/${emoji.pack}/${emoji.image}`
      });
    }
    return emojis;
  }, []);
  return filtered;
}

class EmojiPicker extends Component {
  state = {
    customEmojis: [],
    customEmojiLoading: true
  };
  async componentDidMount() {
    try {
      const emojis = await fetchEmojis();
      this.setState({ customEmojis: emojis, customEmojiLoading: false });
    } catch {
      this.setState({ customEmojis: [], customEmojiLoading: false });
    }
  }

  placeholder() {
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    return <Spin indicator={antIcon} />;
  }

  render() {
    return (
      <EmojiPickerContainer>
        {this.state.customEmojiLoading ? (
          this.placeholder()
        ) : (
          <Picker
            onSelect={this.props.onEmojiSelect}
            native={true}
            emojiSize={18}
            custom={this.state.customEmojis}
            //set={'apple'}
            title=''
          />
        )}
      </EmojiPickerContainer>
    );
  }
}

export default EmojiPicker;
