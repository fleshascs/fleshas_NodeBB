import React, { PureComponent } from 'react';
import { withTranslation } from '_core/i18n';
import { Button, Tooltip } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const ProfileCover = styled.div`
  background: #292c35;
  padding: 7px;
  background-size: cover;
  background-position: 50% 50%;
  position: relative;

  &::before {
    top: 0;
    left: 0;
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
  }
`;
const ButtonsContainer = styled.div`
  position: absolute;
  right: 7px;
  bottom: 7px;
`;

class CoverImagePure extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      picture: props.src,
      isSaved: true
    };
    this.fileUpload = React.createRef();
  }

  handleSubmit = () => {
    const data = {
      imageData: this.state.picture
    };
    this.props.onSubmit(data);
    this.setState({ isSaved: true });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.src != this.props.src) {
      this.setState({ picture: this.props.src });
    }
  }

  onAvatarChange = (event) => {
    const input = event.target;
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = (e) => {
        this.setState({ picture: e.target.result, isSaved: false });
      };

      reader.readAsDataURL(input.files[0]);
    }
  };

  openFileUpload = () => {
    this.fileUpload.current.openFileUpload();
  };

  renderConfirmation() {
    const { t } = this.props;
    return (
      <>
        <Button htmlType='submit' type='primary' className='ml-5' onClick={this.handleSubmit}>
          {this.props.t('save')}
        </Button>

        <span className='pl-3' style={{ color: '#fff' }}>
          {t('profile-img-save')}
        </span>
      </>
    );
  }

  render() {
    return (
      <div className='d-flex'>
        <div style={{ flex: 1 }}>
          <ProfileCover
            style={{
              backgroundImage: `url(${this.state.picture})`
            }}
          >
            {this.props.children}
            {this.props.allowEdit ? (
              <ButtonsContainer>
                {!this.state.isSaved ? (
                  this.renderConfirmation()
                ) : (
                  <Tooltip title={'Change cover image'}>
                    <Button type='primary' onClick={this.openFileUpload} className='ml-3'>
                      <UploadOutlined />
                    </Button>
                  </Tooltip>
                )}
              </ButtonsContainer>
            ) : null}
          </ProfileCover>

          <FileUpload ref={this.fileUpload} onAvatarChange={this.onAvatarChange} />
        </div>
      </div>
    );
  }
}

export default withTranslation('common')(CoverImagePure);

class FileUpload extends PureComponent {
  constructor(props) {
    super(props);

    this.input = React.createRef();
  }

  openFileUpload() {
    this.input.current.click();
  }

  getFIles() {
    return this.input.current.files[0];
  }

  render() {
    return (
      <form encType='multipart/form-data' style={{ display: 'none' }}>
        <input onChange={this.props.onAvatarChange} type='file' name='file' ref={this.input} />
      </form>
    );
  }
}
