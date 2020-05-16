import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
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

class PhotoUploadButton extends Component {
  constructor(props) {
    super(props);
  }

  onPhotoUploadButtonClick() {}

  render() {
    return (
      <Container>
        <MaterialIconButton className='material-icons' onClick={this.onPhotoUploadButtonClick}>
          add_a_photo
        </MaterialIconButton>
      </Container>
    );
  }
}

export default PhotoUploadButton;
