import React, { Component } from 'react';
import styled from 'styled-components';
import { Avatar, Box } from 'ui';
import axios from 'axios';
import Link from 'next/link';
import Head from 'next/head';
import { connect } from 'react-redux';
import { Col, Row, Button, Result, Tag } from 'antd';
import { MailOutlined, HeartOutlined, SmileOutlined } from '@ant-design/icons';
import { startConversation } from 'areas/chat/actions';
import { buildUserUrl, messageDate, dateTime, buildUserSettingsUrl } from '_core/utils';
import ProfileCover from 'areas/user/components/ProfileCover';
import { updateUserCoverImage } from 'areas/user/actions';
import { withTranslation, translateNodeBBTemplate } from '_core/i18n';
import { LatestPosts } from 'areas/user';
import Medals from 'ui/Medals';

const ProfileAvatar = styled(Avatar)`
  border-radius: 0px;
`;

const ProfileBox = styled.div`
  position: relative;
`;

const Reputation = (props) => {
  const rep = props.children;
  if (rep > 0) {
    return (
      <>
        <HeartOutlined theme='twoTone' twoToneColor='#eb2f96' className='mr-2' />
        <span style={{ color: '#eb2f96' }}>+{rep}</span>
      </>
    );
  } else if (rep < 0) {
    return (
      <>
        <SmileOutlined theme='twoTone' twoToneColor='red' rotate={180} className='mr-2' />
        <span style={{ color: 'red' }}>{rep}</span>
      </>
    );
  }
  return <span>{rep}</span>;
};

class UserProfile extends Component {
  static async getInitialProps({ query, req, store }) {
    const isServer = !!req;

    if (!isServer) {
      const url = '/api' + buildUserUrl(query.slug).url;
      const response = await axios.get(url);
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

  renderProfileElement(title, text) {
    if (!text) return null;
    return (
      <>
        <span className='text-muted'>{title}: </span>
        {text}
        <br />
      </>
    );
  }

  onCoverSubmit = (data) => {
    data.uid = this.props.screenData.uid;
    this.props.updateUserCoverImage(data);
  };

  render() {
    const { t, screenData: user, browserTitle } = this.props;
    if (!user) {
      return <Result status='404' title='404' subTitle={t('user-not-exists')} />;
    }
    const userSettingsUrl = buildUserSettingsUrl(user.userslug);
    return (
      <div>
        <Head>
          <title>{translateNodeBBTemplate(browserTitle, t)}</title>
        </Head>
        <ProfileCover
          src={user['cover:url']}
          onSubmit={this.onCoverSubmit}
          allowEdit={user.canEdit && user.allowCoverPicture}
        >
          <ProfileBox className='container d-flex my-3'>
            <ProfileAvatar imgUrl={user.picture} size='big' className='mb-3 mr-3' />
          </ProfileBox>
          <div>
            {this.props.auth.user &&
            this.props.auth.user.uid &&
            user.uid != this.props.auth.user.uid ? (
              <Button type='primary' onClick={this.handleChatButton}>
                <MailOutlined />
                {t('send-message')}
              </Button>
            ) : null}

            {user.canEdit ? (
              <Link href={userSettingsUrl.path} as={userSettingsUrl.url}>
                <Button type='primary' className='ml-3'>
                  {t('edit')}
                </Button>
              </Link>
            ) : null}
          </div>
        </ProfileCover>
        <div className='container mt-5'>
          <Row gutter={24}>
            <Col xs={{ span: 24 }} lg={{ span: 12 }}>
              {user.banned ? (
                <Box className='mb-3 px-3 py-2'>
                  <h3 style={{ color: 'red' }}>Banned</h3>
                  Banned until: {dateTime(user.banned_until)}
                </Box>
              ) : null}
              {user.ips && user.ips.length ? (
                <Box headerText='IP address' className='mb-3'>
                  <div className='p-2'>{user.ips.join(', ')}</div>
                </Box>
              ) : null}
              <LatestPosts data={{ topics: user.posts }} className='mb-3' />
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 12 }}>
              <Box headerText={user.username}>
                <div className='p-2'>
                  {this.renderProfileElement(t('email'), user.email)}
                  {this.renderProfileElement(t('age'), user.age)}
                  <span className='text-muted'>{t('reputation')}:</span>{' '}
                  <Reputation>{user.reputation}</Reputation>
                  <br />
                  <span className='text-muted'>{t('join-date')}:</span> {messageDate(user.joindate)}
                  <br />
                  <span className='text-muted'>{t('last-login')}:</span>{' '}
                  {messageDate(user.lastonline)}
                  <br />
                  <span className='text-muted'>{t('profile-views')}:</span> {user.profileviews}
                  <br />
                  <span className='text-muted'>{t('forum-posts-number')}:</span> {user.postcount}
                  <br />
                  {user.groups.length ? <span className='text-muted'>{t('groups')}: </span> : ''}
                  {user.groups.map((group) => (
                    <Tag
                      color={group.labelColor}
                      key={group.name}
                      style={{ color: group.textColor }}
                      className='mr-1'
                    >
                      {group.name}
                    </Tag>
                  ))}
                </div>
              </Box>
              {user.aboutme ? (
                <Box headerText={t('about-me')} className='mt-3'>
                  <div dangerouslySetInnerHTML={{ __html: user.aboutme }} className='p-2' />
                </Box>
              ) : null}
              {user.signature ? (
                <Box headerText={t('signature')} className='mt-3'>
                  <div dangerouslySetInnerHTML={{ __html: user.signature }} className='p-2' />
                </Box>
              ) : null}
              {user.nsRewards && user.nsRewards.length ? (
                <Box headerText={t('medals-title')} className='mt-3'>
                  <Medals medals={user.nsRewards} />
                </Box>
              ) : null}
            </Col>
          </Row>
        </div>
      </div>
    );
  }

  handleChatButton = () => {
    this.props.startConversation(this.props.screenData.uid);
  };
}

const actionsToProps = {
  updateUserCoverImage,
  startConversation
};

function mapStateToProps(state) {
  return {
    auth: state.authentication,
    chatsOpened: state.chat.chatsOpened
  };
}

export default connect(mapStateToProps, actionsToProps)(withTranslation('common')(UserProfile));
