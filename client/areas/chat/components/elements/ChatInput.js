import React, { Component } from 'react';
import styled from 'styled-components';
import { EmojiButton } from 'ui/EmojiButton';
import { withTranslation } from '_core/i18n';
//https://www.npmjs.com/package/emoji-picker-react
import { primaryColor, chatBackgroundColor, chatInnerBorderColor } from '_theme';

const InputContainer = styled.div`
  border-top: 1px solid ${chatInnerBorderColor};
`;

const Input = styled.input`
  background: ${chatBackgroundColor};
  border-radius: 0px;
  border: none;
  padding-left: 7px;
  width: 100%;
  &:focus {
    border: none;
    outline: none;
  }
`;

const SubmitIcon = styled.i`
  color: ${primaryColor};
  filter: brightness(150%);
  &:hover {
    filter: brightness(300%);
  }
`;

class ChatInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: ''
    };

    this.submitButton = React.createRef();
    this.input = React.createRef();
  }

  componentDidMount() {
    this.input.current.focus();
  }

  onInputTextChange = (e) => {
    this.setState({ message: e.target.value });
  };

  onSubmitClick = () => {
    this.submitButton.current.click();
    this.input.current.focus();
  };

  render() {
    const { t } = this.props;
    return (
      <InputContainer>
        <form onSubmit={this.handleMessageSubmit}>
          <Input
            type='text'
            placeholder={t('type-a-message')}
            autoComplete='off'
            value={this.state.message}
            ref={this.input}
            onChange={this.onInputTextChange}
          />
          <input type='submit' ref={this.submitButton} className='d-none' />
        </form>
        <div className='d-flex'>
          <div>
            <EmojiButton onEmojiSelect={this.onEmojiSelect} />
          </div>
          <div className='ml-auto'>
            {this.state.message ? (
              <SubmitIcon className='material-icons mr-1 fadeMe' onClick={this.onSubmitClick}>
                send
              </SubmitIcon>
            ) : null}
          </div>
        </div>
      </InputContainer>
    );
  }

  handleMessageSubmit = (e) => {
    e.preventDefault();
    if (this.state.message.length < 1) return false;
    this.props.onSubmit(this.state.message, (error) => {
      if (error) return;
      this.setState({ message: '' });
    });
  };

  onEmojiSelect = (emoji) => {
    this.setState((prevState, props) => {
      return { message: prevState.message + emoji };
    });

    this.input.current.focus();
  };
}

export default withTranslation('common')(ChatInput);
