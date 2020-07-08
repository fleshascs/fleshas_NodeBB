import React from 'react';
import { useTranslation } from '_core/i18n';
import { Form, Input, Button } from 'antd';

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

//http://localhost:4567/user/fleshas-lt/edit/password
//http://localhost:4567/api/user/fleshas-lt/edit/password?_=1554148517751
//422["user.changePassword",{"currentPassword":"dd123asd","newPassword":"dd123asd","uid":"1"}]
export function PasswordChange({ onSubmit }) {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const onFinish = (values) => {
    onSubmit(values);
  };

  return (
    <Form {...formItemLayout} form={form} onFinish={onFinish}>
      <Form.Item
        name='currentPassword'
        label={t('current-password')}
        rules={[
          {
            required: true,
            message: t('current-password-required')
          }
        ]}
      >
        <Input type='password' placeholder={t('current-password')} autoComplete='on' />
      </Form.Item>
      <Form.Item
        name='newPassword'
        label={t('new-password')}
        rules={[
          {
            required: true,
            message: t('new-passwrod-required')
          }
        ]}
      >
        <Input type='password' placeholder={t('new-password')} autoComplete='off' />
      </Form.Item>
      <Form.Item
        name='newPasswordConfirm'
        label={<span>{t('password-confirm')}</span>}
        rules={[
          {
            required: true,
            message: t('new-passwrod-required')
          }
        ]}
      >
        <Input type='password' placeholder={t('new-password')} autoComplete='off' />
      </Form.Item>
      <Button htmlType='submit' type='primary' className='float-right mt-2'>
        {t('save')}
      </Button>
    </Form>
  );
}
