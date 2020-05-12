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

//422["user.changeUsernameEmail",{"uid":"1","email":"cancel.k.k@gmail.com","password":"dd123asd"}]
//http://localhost:4567/user/fleshas-lt/edit/email
//http://localhost:4567/api/user/fleshas-lt/edit/email?_=1554148475050
export function EmailChange({ email, onSubmit }) {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const onFinish = (values) => {
    onSubmit(values);
  };

  const initialValues = {
    email: email
  };

  return (
    <Form
      name='emailChange'
      initialValues={initialValues}
      {...formItemLayout}
      form={form}
      onFinish={onFinish}
    >
      <Form.Item
        name='email'
        label={t('email')}
        rules={[
          {
            required: true,
            message: t('email-required'),
            whitespace: true
          }
        ]}
      >
        <Input type='email' />
      </Form.Item>
      <Form.Item
        name='password'
        label={t('password')}
        rules={[
          {
            required: true,
            message: t('password-required'),
            whitespace: true
          }
        ]}
      >
        <Input type='password' placeholder={t('password')} autoComplete='on' />
      </Form.Item>
      <Button htmlType='submit' type='primary' className='float-right mt-2'>
        {t('save')}
      </Button>
    </Form>
  );
}
