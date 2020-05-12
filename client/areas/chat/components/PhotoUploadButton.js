import React, { Component } from 'react';
import styled from 'styled-components';

const EmojiContainer = styled.div`
	position: relative;
`;
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

const MaterialIconButton = styled.i`
	color: #7d7878;
	border-radius: 50%;
	padding: 3px;

	&:hover {
		background: #e0e0e0;
		cursor: pointer;
	}
`;

class EmojiButton extends Component {
	constructor(props) {
		super(props);

		this.state = {
			emojiPickerOpened: false,
		};

		this.onEmojiSelect = this.onEmojiSelect.bind(this);
		this.onEmojiButtonClick = this.onEmojiButtonClick.bind(this);
	}

	onEmojiSelect(e) {
		if (typeof this.props.onEmojiSelect === 'function') {
			this.props.onEmojiSelect(e);
		}
	}

	onEmojiButtonClick() {
		this.setState({ emojiPickerOpened: !this.state.emojiPickerOpened });
	}

	render() {
		return (
			<EmojiContainer>
				<MaterialIconButton
					className="material-icons"
					onClick={this.onEmojiButtonClick}
				>
					add_a_photo
				</MaterialIconButton>
			</EmojiContainer>
		);
	}
}

export default EmojiButton;
