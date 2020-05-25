import React, { Component } from 'react';
import { connect } from 'react-redux';
import Head from 'next/head';
import axios from 'axios';
import { Tag, Comment, Tooltip, Avatar, Row, Col, Divider, Card, Steps } from 'antd';
import { UserOutlined, SolutionOutlined, LoadingOutlined, SmileOutlined } from '@ant-design/icons';
import { withTranslation, translateNodeBBTemplate } from '_core/i18n';
import { Chat } from 'areas/lost_priv/components/Chat';
import { RequestDataRow } from 'areas/lost_priv/components/RequestDataRow';
import { RequestInfo } from 'areas/lost_priv/components/RequestInfo';
import { Box, Breadcrumbs } from 'ui';

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
      const response = await axios.get(
        `http://fleshas.lt/php/api/lostPriv/request_info.php?id=${this.props.id}`
      );
      console.log('response.data', response.data);

      this.setState({ request: response.data, requestLoading: false, requestFailed: false });
    } catch (error) {
      this.setState({ request: {}, requestLoading: false, requestFailed: true });
    }
    try {
      const response = await axios.get(
        `http://fleshas.lt/php/api/lostPriv/request_messages.php?id=${this.props.id}`
      );
      console.log('response.data', response.data);

      this.setState({
        messages: response.data || [],
        messagesLoading: false,
        messagesFailed: false
      });
    } catch (error) {
      this.setState({ messages: [], messagesLoading: false, messagesFailed: true });
    }
  }

  render() {
    const { t, id } = this.props;
    const {
      request,
      requestLoading,
      requestFailed,
      messages,
      messagesLoading,
      messagesFailed
    } = this.state;
    console.log('request', request);

    return (
      <div className='container mt-3'>
        <Head>
          <title>Lost Priv</title>
        </Head>
        <Row gutter={24}>
          <Col xs={{ span: 24 }} lg={{ span: 15 }}>
            {!requestLoading && !requestFailed ? <RequestInfo request={request} /> : null}
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 8 }}>
            <Box headerText='Chat' className='p-2'>
              <Chat
                loading={messagesLoading}
                failed={messagesFailed}
                messages={messages}
                requestId={id}
              />
            </Box>
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
    user
  };
}
export default connect(mapStateToProps)(withTranslation('common')(Settings));
