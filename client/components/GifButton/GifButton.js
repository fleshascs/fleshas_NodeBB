import React, { Component } from 'react';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
const Picker = dynamic(() => import('./Picker'), {
  ssr: false
});

const Container = styled.div`
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

class GifButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pickerOpened: false
    };
  }

  onSelected = (gif) => {
    if (typeof this.props.onEmojiSelect === 'function') {
      const text = `![](${gif.preview_gif.url})`;
      this.props.onEmojiSelect(text);
    }

    this.setState({ pickerOpened: false });
  };

  onButtonClick = () => {
    this.setState({ pickerOpened: !this.state.pickerOpened });
  };

  render() {
    return (
      <Container>
        <MaterialIconButton className='material-icons' onClick={this.onButtonClick}>
          gif
        </MaterialIconButton>
        {this.state.pickerOpened ? <Picker onSelected={this.onSelected} /> : null}
      </Container>
    );
  }
}

export default GifButton;
