import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { getConfig } from 'areas/general/selectors';

const EmojiPickerContainer = styled.div`
  position: absolute;
  bottom: 125%;
  z-index: 3;
`;

const EMOJI_PATH = '/plugins/nodebb-plugin-emoji/emoji';

async function fetchEmojis(cacheBuster) {
  const response = await axios.get(EMOJI_PATH + '/table.json?' + cacheBuster);
  const filtered = Object.keys(response.data).reduce((emojis, emojiKey) => {
    const emoji = response.data[emojiKey];
    if (emoji.pack === 'customizations') {
      emojis.push({
        name: emoji.name,
        short_names: emoji.aliases,
        text: emoji.character,
        emoticons: [],
        keywords: emoji.keywords ?? [],
        imageUrl: `${EMOJI_PATH}/${emoji.pack}/${emoji.image}`
      });
    }
    return emojis;
  }, []);
  return filtered;
}
function Placeholder() {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  return <Spin indicator={antIcon} />;
}

export default function EmojiPicker({ onEmojiSelect }) {
  const [customEmojis, setCustomEmojis] = useState([]);
  const [customEmojiLoading, setCustomEmojiLoading] = useState(true);
  const config = useSelector(getConfig);

  async function getEmojis() {
    try {
      const emojis = await fetchEmojis(config?.['cache-buster']);
      setCustomEmojis(emojis);
      setCustomEmojiLoading(false);
    } catch {
      setCustomEmojis([]);
      setCustomEmojiLoading(false);
    }
  }

  useEffect(() => {
    getEmojis();
  }, []);

  return (
    <EmojiPickerContainer>
      {customEmojiLoading ? (
        <Placeholder />
      ) : (
        <Picker
          onSelect={onEmojiSelect}
          native={true}
          emojiSize={18}
          custom={customEmojis}
          //set={'apple'}
          title=''
        />
      )}
    </EmojiPickerContainer>
  );
}
