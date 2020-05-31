import React, { Component } from 'react';
import { connect } from 'react-redux';
import Head from 'next/head';
import axios from 'axios';
import { Row, Col } from 'antd';
import { withTranslation } from '_core/i18n';
import { Chat } from 'areas/lost_priv/components/Chat';
import { RequestInfo } from 'areas/lost_priv/components/RequestInfo';
import { Box, Breadcrumbs } from 'ui';
import { getCSRF } from 'areas/general/selectors';
import { error } from '_core/utils';

class Settings extends Component {
  static async getInitialProps({ query, req }) {
    return {
      id: query.id,
      namespacesRequired: ['common']
    };
  }

  state = {
    request: {},
    requestLoading: true,
    requestFailed: false,
    messages: [],
    messagesLoading: true,
    messagesFailed: false
  };

  async componentDidMount() {
    try {
      const response = await axios.get(`/api/lost-priv/${this.props.id}`);
      this.setState({ request: response.data, requestLoading: false, requestFailed: false });
    } catch (error) {
      this.setState({ request: {}, requestLoading: false, requestFailed: true });
    }
    try {
      const response = await axios.get(`/api/lost-priv/chat/${this.props.id}`);
      this.setState({
        messages: response.data || [],
        messagesLoading: false,
        messagesFailed: false
      });
    } catch (error) {
      this.setState({ messages: [], messagesLoading: false, messagesFailed: true });
    }
  }

  onSendMessage = async (data) => {
    try {
      const response = await axios.post('/api/lost-priv/chat/send', data, {
        headers: { 'x-csrf-token': this.props.csrf }
      });
      if (response.data !== true) {
        throw new Error(response.data);
      }
      this.setState({
        messages: [
          ...this.state.messages,
          {
            message: data.message,
            created_at: new Date().getTime(),
            fromuser: this.props.user
          }
        ]
      });
      return true;
    } catch (e) {
      error.showError(e);
      console.log('error', e);
      return false;
    }
  };

  render() {
    const { t, id, loggedIn } = this.props;
    const {
      request,
      requestLoading,
      requestFailed,
      messages,
      messagesLoading,
      messagesFailed
    } = this.state;
    console.log('request', request);

    if (!loggedIn) {
      return (
        <div className='container mt-3' style={{ maxWidth: '700px' }}>
          <Head>
            <title>Lost priv</title>
          </Head>
          <Breadcrumbs
            breadcrumbs={[
              {
                text: '[[global:home]]',
                url: '/'
              },
              { url: '/lost-priv', text: 'Lost priv' },
              { text: '#' + id }
            ]}
          />
          <Box>
            <div className='p-2'>Only Logged in users can see this request</div>
          </Box>
        </div>
      );
    }

    return (
      <div className='container mt-3'>
        <Head>
          <title>Lost Priv</title>
        </Head>
        <Breadcrumbs
          breadcrumbs={[
            {
              text: '[[global:home]]',
              url: '/'
            },
            { url: '/lost-priv', text: 'Lost priv' },
            { text: '#' + id }
          ]}
        />
        <Row gutter={24}>
          <Col xs={{ span: 24 }} lg={{ span: 15 }}>
            {!requestFailed ? <RequestInfo request={request} loading={requestLoading} /> : null}
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 8 }}>
            {!messagesFailed ? (
              <Box headerText='Chat'>
                <div className='p-2'>
                  <Chat
                    onSendMessage={this.onSendMessage}
                    loading={messagesLoading}
                    failed={messagesFailed}
                    messages={messages}
                    requestId={id}
                    isRequestOpen={request.Checked === '0'}
                  />
                </div>
              </Box>
            ) : null}
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { loggedIn, user } = state.authentication;
  return {
    loggedIn,
    user,
    csrf: getCSRF(state)
  };
}
export default connect(mapStateToProps)(withTranslation('common')(Settings));
