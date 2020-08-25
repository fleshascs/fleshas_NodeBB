import React from 'react';
import LatestPosts from 'areas/forum/components/LatestPosts';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { DiscordPanel } from 'areas/discord/components';
import axios from 'axios';
import styled from 'styled-components';
import { Row, Col } from 'antd';
import { ServerList } from 'ui';
const FaceBookPanel = dynamic(() => import('ui/FaceBookPanel'), {
  ssr: false
});
const AdSencePanel = dynamic(() => import('ui/AdSencePanel'), {
  ssr: false
});
import { withTranslation, translateNodeBBTemplate } from '_core/i18n';
import { buildCategoryUrl } from '_core/utils';
import Link from 'next/link';

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
            <ServerList />
            <AdSencePanel slotId='8875325074' />
            <DiscordPanel />
            <FaceBookPanel />
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 15 }}>
            {this.renderHelpButtons()}
            <LatestPosts topics={this.props.recent.topics} className='mt-3' />
          </Col>
        </Row>
      </div>
    );
  }

  renderHelpButtons() {
    const { t } = this.props;
    const ssDemo = buildCategoryUrl(1, '74/demo-ss-ir-wg-failai');
    const unban = buildCategoryUrl(1, '67/unban');
    return (
      <Row gutter={24}>
        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
          <Link href={ssDemo.path} as={ssDemo.url} passHref>
            <HelperButton>{t('ss-and-demo')}</HelperButton>
          </Link>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
          <Link href={{ pathname: '/lost_priv' }} as='/lost-priv' passHref>
            <HelperButton href='/lost-priv'>{t('recover-privilegies')}</HelperButton>
          </Link>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
          <Link href={unban.path} as={unban.url} passHref>
            <HelperButton>{t('unban-request')}</HelperButton>
          </Link>
        </Col>
      </Row>
    );
  }
}

export default withTranslation('common')(Index);
