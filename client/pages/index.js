import React from 'react';
import LatestPosts from 'areas/forum/components/LatestPosts';
import Head from 'next/head';
//import { TeamSpeakPanel } from 'areas/teamSpeak/components';
import { DiscordPanel } from 'areas/discord/components';
import axios from 'axios';
import styled from 'styled-components';
import { Row, Col } from 'antd';
import { ServerList } from 'ui';
//import VideoPlayer from 'areas/VideoPlayer/components/Player';
//import NewsCard from 'ui/News';
import FaceBookPanel from 'ui/FaceBookPanel';
//import Placeholder from 'areas/videoPlayer/components/Placeholder';
import { withTranslation, translateNodeBBTemplate } from '_core/i18n';

const HelperButton = styled.a`
  display: block;
  text-align: center;
  background: linear-gradient(315deg, #58424a 0, #e0003e 100%);
  color: #fff !important;
  padding: 10px;
  border: 1px solid #2d73c0;
  border-radius: 2px;
`;

class Index extends React.Component {
  static async getInitialProps({ query, req }) {
    const isServer = !!req;

    if (!isServer) {
      const response = await axios.get('/api/recent');
      query.recent = response.data;
    }

    return {
      recent: query.recent,
      namespacesRequired: ['common']
    };
  }

  render() {
    const { t } = this.props;
    return (
      <div className='container mt-3'>
        <Head>
          <title>{translateNodeBBTemplate('[[pages:home]]', t)}</title>
        </Head>
        <Row gutter={24}>
          <Col xs={{ span: 24 }} lg={{ span: 8 }} className='mb-3'>
            {/* <Placeholder/> */}
            <ServerList />
            {/* <TeamSpeakPanel /> */}
            <DiscordPanel />
            <FaceBookPanel />
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 15 }}>
            {/* <NewsCard />
    				<VideoPlayer /> */}
            <LatestPosts topics={this.props.recent.topics} />
            {this.renderHelpButtons()}
          </Col>
        </Row>
      </div>
    );
  }

  renderHelpButtons() {
    const { t } = this.props;
    return (
      <Row gutter={24}>
        <Col xs={{ span: 24 }} lg={{ span: 8 }} className='mt-3'>
          <HelperButton href='/category/12/demo-ss-ir-wg-failai'>{t('ss-and-demo')}</HelperButton>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 8 }} className='mt-3'>
          <HelperButton href='/lost-priv'>{t('recover-privilegies')}</HelperButton>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 8 }} className='mt-3'>
          <HelperButton href='/category/5/unban'>{t('unban-request')}</HelperButton>
        </Col>
      </Row>
    );
  }
}

export default withTranslation('common')(Index);
