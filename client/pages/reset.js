import React from 'react';
import Head from 'next/head';
import { connect } from 'react-redux';
import styled from 'styled-components';
import axios from 'axios';
import { Form, Input, Button, Alert } from 'antd';
import * as sessionActions from 'areas/session/actions';
import * as commonSelectors from 'areas/general/selectors';
import { Box, Breadcrumbs } from 'ui';
import { withTranslation, translateNodeBBTemplate } from '_core/i18n';

const Container = styled.div`
  width: 400px;
  margin: 0 auto;

  @media (max-width: 750px) {
    width: 100%;
  }
`;

class ResetPasswordPure extends React.Component {
  static async getInitialProps({ query, req }) {
    const isServer = !!req;
    if (!isServer) {
      const response = await axios.get('/api/reset' + query.code ? '/' + query.code : '');
      query.screenData = response.data;
      query.browserTitle = response.data.title;
    } else {
      query.browserTitle = query.header.browserTitle;
    }

    return {
      code: query.code,
      browserTitle: query.browserTitle,
      screenData: query.screenData,
      namespacesRequired: ['common']
    };
  }

  constructor(props) {
    super(props);
    this.formRef = React.createRef();
  }

  onFinish = ({ email, newPassword }) => {
    if (this.props.code) {
      this.props.resetPasswordCommit(newPassword, this.props.code);
      return;
    }
    this.props.resetPassword(email);
  };

  componentDidMount() {
    console.log('screenData', this.props.screenData);
  }

  render() {
    const { t, screenData, browserTitle, code } = this.props;
    return (
      <div className='container mt-2'>
        <Head>
          <title>{translateNodeBBTemplate(browserTitle, t)}</title>
        </Head>
        <Breadcrumbs breadcrumbs={screenData.breadcrumbs} />
        <Container>
          <Box className='mt-5' bodyClassName='p-3' headerText={t('reset-password')}>
            <Form name='reset-password' ref={this.formRef} onFinish={this.onFinish}>
              {code ? (
                <>
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
                    dependencies={['newPassword']}
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: t('new-passwrod-required')
                      },
                      ({ getFieldValue }) => ({
                        validator(rule, value) {
                          if (!value || getFieldValue('newPassword') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject('The two passwords that you entered do not match!');
                        }
                      })
                    ]}
                  >
                    <Input type='password' placeholder={t('new-password')} autoComplete='off' />
                  </Form.Item>
                </>
              ) : (
                <>
                  <Alert message={t('reset-password-info')} className='mb-3' type='info' />
                  <Form.Item
                    name='email'
                    label={t('email')}
                    rules={[
                      {
                        type: 'email',
                        message: t('invalid-email')
                      },
                      {
                        required: true,
                        message: t('email-required')
                      }
                    ]}
                  >
                    <Input name='email' placeholder={t('email')} />
                  </Form.Item>
                </>
              )}
              <Form.Item>
                <div>
                  <Button type='primary' htmlType='submit' className=' w-100'>
                    {t('reset-password')}
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </Box>
        </Container>
      </div>
    );
  }
}

const actionCreators = {
  resetPassword: sessionActions.resetPassword,
  resetPasswordCommit: sessionActions.resetPasswordCommit
};

export default connect(null, actionCreators)(withTranslation('common')(ResetPasswordPure));
