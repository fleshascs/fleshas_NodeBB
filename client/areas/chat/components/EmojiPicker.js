import React, { Component } from 'react';
import styled from 'styled-components';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';

const EmojiPickerContainer = styled.div`
	position: absolute;
	bottom: 125%;
	//margin-bottom: 20px;
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

const customEmojis = [
	{
		name: 'Patric',
		short_names: ['patric'],
		text: ':patric',
		emoticons: [],
		keywords: ['patric'],
		imageUrl:
			'http://fleshas.lt:4567/plugins/nodebb-plugin-emoji/emoji/customizations/e39138d1-d72f-4c60-a18a-290f07ff5714-patric.png?v=5p4n6fc77sj',
	},
	// {
	//   name: 'Test Flag',
	//   short_names: ['test'],
	//   text: '',
	//   emoticons: [],
	//   keywords: ['test', 'flag'],
	//   spriteUrl: 'https://unpkg.com/emoji-datasource-twitter@4.0.4/img/twitter/sheets-256/64.png',
	//   sheet_x: 1,
	//   sheet_y: 1,
	//   size: 64,
	//   sheetColumns: 52,
	//   sheetRows: 52,
	// },
];

class EmojiPicker extends Component {
	render() {
		return (
			<EmojiPickerContainer>
				<Picker
					onSelect={this.props.onEmojiSelect}
					native={true}
					emojiSize={18}
					custom={customEmojis}
					//set={'apple'}
				/>
			</EmojiPickerContainer>
		);
	}
}

export default EmojiPicker;
