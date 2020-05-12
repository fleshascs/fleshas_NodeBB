import React, { PureComponent } from 'react';
import { withTranslation } from '_core/i18n';
import { Form, Input, Button, DatePicker } from 'antd';
import { htmlDecodeObject } from '_core/utils';
import MarkdownEditor from 'ui/markdownEditor';
import { Label } from 'ui';
import moment from 'moment';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 }
  }
};

// "user.updateProfile"
// {aboutme: "fghjk About me,,,,,,,"
// birthday: "04/05/2006"
// fullname: "kebabas"
// groupTitle: "["administrators"]"
// location: "vilno"
// signature: "# H1↵## H2↵### H3↵#### H4↵##### H5↵###### H6"
// uid: "1"
// website: "http://fleshas.lt"}
//http://localhost:4567/user/fleshas-lt/edit
//http://localhost:4567/api/user/fleshas-lt/edit?_=1554064019904
class GeneralChangePure extends PureComponent {
  constructor(props) {
    super(props);

    //possibility for xss
    this.state = htmlDecodeObject(this.props.userData) || {};
    this.state = this.props.userData || {};
    this.aboutMeTextInput = React.createRef();
    this.signatureTextInput = React.createRef();
    this.formRef = React.createRef();
  }

  onFinish = async (values) => {
    values.birthday = values.birthday ? values.birthday.format('MM/DD/YYYY') : '';
    values.aboutme = await this.aboutMeTextInput.current.getValue();
    values.signature = await this.signatureTextInput.current.getValue();
    this.props.onSubmit(values);
  };

  render() {
    const { t } = this.props;
    const initialValues = {
      fullname: this.state.fullname,
      website: this.state.website,
      location: this.state.location,
      birthday: this.state.birthday ? moment(this.state.birthday) : null
    };
    return (
      <Form
        {...formItemLayout}
        initialValues={initialValues}
        ref={this.formRef}
        name='GeneralChange'
        onFinish={this.onFinish}
      >
        <Form.Item name='fullname' label={t('fullname')}>
          <Input placeholder={t('your-name-placeholder')} />
        </Form.Item>
        <Form.Item name='website' label={t('website')}>
          <Input placeholder={t('your-websilte-placeholder')} />
        </Form.Item>
        <Form.Item name='location' label={t('location')}>
          <Input placeholder={t('your-location-placeholder')} />
        </Form.Item>
        <Form.Item name='birthday' label={t('birthday')}>
          <DatePicker />
        </Form.Item>
        <Label className='mt-3'>{t('about-me')}</Label>
        <MarkdownEditor
          className='mb-3'
          defaultValue={this.state.aboutme}
          ref={this.aboutMeTextInput}
        />
        <Label className='mt-3'>{t('signature')}</Label>
        <MarkdownEditor
          className='mb-3'
          defaultValue={this.state.signature}
          ref={this.signatureTextInput}
        />
        <Button htmlType='submit' type='primary' onClick={this.onSave} className='float-right mt-2'>
          {this.props.t('save')}
        </Button>
      </Form>
    );
  }
}

export const GeneralChange = withTranslation('common')(GeneralChangePure);
