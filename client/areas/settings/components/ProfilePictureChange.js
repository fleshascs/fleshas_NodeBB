import React, { PureComponent } from 'react';
import { withTranslation } from '_core/i18n';
import { AvatarUpload } from 'ui';
import { Button } from 'antd';

//["user.uploadCroppedPicture",{"uid":"1","imageData":"data:image/jpeg;base64,/9"}]
class ProfilePictureChangePure extends PureComponent {
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

  render() {
    const { t } = this.props;
    return (
      <div className='d-flex'>
        <div style={{ flex: 1 }}>
          <AvatarUpload src={this.state.picture} size='meddium' onClick={this.openFileUpload} />
          <FileUpload ref={this.fileUpload} onAvatarChange={this.onAvatarChange} />
        </div>
        {!this.state.isSaved ? (
          <>
            <Button htmlType='submit' type='primary' className='ml-5' onClick={this.handleSubmit}>
              {this.props.t('save')}
            </Button>

            <span className='pl-3'>{t('profile-img-save')}</span>
          </>
        ) : null}
      </div>
    );
  }
}

export const ProfilePictureChange = withTranslation('common')(ProfilePictureChangePure);

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
