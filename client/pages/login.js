import React from 'react';
import { Box, Breadcrumbs } from 'ui';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Head from 'next/head';
import axios from 'axios';
import Link from 'next/link';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import * as sessionActions from 'areas/session/actions';
import * as commonSelectors from 'areas/general/selectors';
import { withTranslation, translateNodeBBTemplate } from '_core/i18n';

const Container = styled.div`
  width: 400px;
  margin: 0 auto;

  @media (max-width: 750px) {
    width: 100%;
  }
`;

class LoginPure extends React.Component {
  static async getInitialProps({ query, req }) {
    const isServer = !!req;
    if (!isServer) {
      const response = await axios.get('/api/login');
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
    this.props.login(values.username, values.password);
  };

  render() {
    const { t, screenData, browserTitle } = this.props;
    const initialValues = {
      remember: true
    };
    return (
      <div className='container mt-2'>
        <Head>
          <title>{translateNodeBBTemplate(browserTitle, t)}</title>
        </Head>
        {screenData && screenData.breadcrumbs ? (
          <Breadcrumbs breadcrumbs={screenData.breadcrumbs} />
        ) : null}
        <Container>
          <Box className='mt-5' bodyClassName='p-3' headerText={t('login')}>
            <Form
              method='post'
              ref={this.formRef}
              onFinish={this.onFinish}
              initialValues={initialValues}
            >
              <Form.Item
                name='username'
                rules={[{ required: true, message: t('username-required') }]}
              >
                <Input
                  name='username'
                  prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder='Username'
                />
              </Form.Item>
              <Form.Item
                name='password'
                rules={[{ required: true, message: t('password-required') }]}
              >
                <Input
                  name='password'
                  prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type='password'
                  placeholder='Password'
                  autoComplete='on'
                />
              </Form.Item>
              <input type='hidden' name='_csrf' value={this.props.csrf} />
              <input type='hidden' name='noscript' id='noscript' value='false' />
              <Form.Item name='remember' valuePropName='checked'>
                <Checkbox>{t('remember-me')}</Checkbox>
              </Form.Item>
              <div className='my-3'>
                <Button type='primary' htmlType='submit' className='w-100'>
                  {t('login')}
                </Button>
              </div>
              {t('or')}{' '}
              <Link href='/register'>
                <a> {t('register-now')}</a>
              </Link>
              <Link href='/reset'>
                <a className='float-right'>{t('forgot-password')}</a>
              </Link>
            </Form>
          </Box>
        </Container>
      </div>
    );
  }
}

const actionCreators = {
  login: sessionActions.login
};

function mapStateToProps(state) {
  return {
    csrf: commonSelectors.getCSRF(state)
  };
}

export default connect(mapStateToProps, actionCreators)(withTranslation('common')(LoginPure));
