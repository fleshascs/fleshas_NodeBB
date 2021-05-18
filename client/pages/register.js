import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Form, Input, Button } from 'antd';
import axios from 'axios';
import Head from 'next/head';
import { Box, Breadcrumbs } from 'ui';
import * as sessionActions from 'areas/session/actions';
import { isUserExists, isEmailExists } from 'areas/session/services';
import { withTranslation, translateNodeBBTemplate } from '_core/i18n';

const Container = styled.div`
  width: 400px;
  margin: 0 auto;

  @media (max-width: 750px) {
    width: 100%;
  }
`;

class RegisterPure extends React.Component {
  static async getInitialProps({ query, req }) {
    const isServer = !!req;
    if (!isServer) {
      const response = await axios.get('/api/register');
      query.screenData = response.data;
      query.browserTitle = response.data.title;
    } else {
      query.browserTitle = query.header.browserTitle;
    }

    return {
      browserTitle: query.browserTitle,
      screenData: query.screenData,
      namespacesRequired: ['common']
    };
  }
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
  }

  onFinish = (values) => {
    this.props.register(values);
  };

  validateUsername = async (rule, value) => {
    const { t } = this.props;
    if (value) {
      const userExists = await isUserExists(value);
      if (userExists) {
        return Promise.reject(t('username-taken'));
      }
    }
    return;
  };

  validateEmail = async (rule, value) => {
    const { t } = this.props;
    if (value) {
      const emailExists = await isEmailExists(value);
      if (emailExists) {
        return Promise.reject(t('email-taken'));
      }
    }
    return;
  };

  render() {
    const { t, screenData, browserTitle } = this.props;
    return (
      <div className='container mt-2'>
        <Head>
          <title>{translateNodeBBTemplate(browserTitle, t)}</title>
        </Head>
        {screenData && screenData.breadcrumbs ? (
          <Breadcrumbs breadcrumbs={screenData.breadcrumbs} />
        ) : null}
        <Container>
          <Box className='mt-5' bodyClassName='p-3' headerText={t('register')}>
            <Form name='register' ref={this.formRef} onFinish={this.onFinish}>
              <Form.Item
                name='email'
                label={t('email')}
                hasFeedback
                rules={[
                  {
                    type: 'email',
                    message: t('invalid-email')
                  },
                  {
                    required: true,
                    message: t('email-required')
                  },
                  {
                    validator: this.validateEmail
                  }
                ]}
              >
                <Input name='email' placeholder={t('email')} />
              </Form.Item>

              <Form.Item
                name='username'
                label={t('username')}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: t('username-required')
                  },
                  {
                    max: screenData.maximumUsernameLength,
                    message: t('maximum-symbols', {
                      number: screenData.maximumUsernameLength
                    })
                  },
                  {
                    min: screenData.minimumUsernameLength,
                    message: t('minimum-symbols', {
                      number: screenData.minimumUsernameLength
                    })
                  },
                  {
                    validator: this.validateUsername
                  }
                ]}
              >
                <Input name='username' placeholder={t('username')} autoComplete='off' />
              </Form.Item>
              <Form.Item
                name='password'
                label={t('password')}
                rules={[
                  {
                    required: true,
                    message: t('password-required')
                  },
                  {
                    min: screenData.minimumPasswordLength,
                    message: t('minimum-symbols', {
                      number: screenData.minimumPasswordLength
                    })
                  }
                ]}
                hasFeedback
              >
                <Input.Password autoComplete='off' />
              </Form.Item>
              <Form.Item
                name='password-confirm'
                label={t('password-confirm')}
                dependencies={['password']}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: t('password-confirm-required')
                  },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(t('passwords-dont-match'));
                    }
                  })
                ]}
              >
                <Input.Password autoComplete='off' />
              </Form.Item>
              <Form.Item>
                <div>
                  <Button type='primary' htmlType='submit' className='mt-3 w-100'>
                    {t('register')}
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
  register: sessionActions.register
};

export default connect(null, actionCreators)(withTranslation('common')(RegisterPure));
