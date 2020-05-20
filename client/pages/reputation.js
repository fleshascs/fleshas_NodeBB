import React, { Component } from 'react';
import styled from 'styled-components';
import { Avatar, Box } from 'ui';
import axios from 'axios';
import Link from 'next/link';
import Head from 'next/head';
import { connect } from 'react-redux';
import { Button, Result, message } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { startConversation } from 'areas/chat/actions';
import { buildUserUrl, buildUserSettingsUrl } from '_core/utils';
import ProfileCover from 'areas/user/components/ProfileCover';
import { updateUserCoverImage } from 'areas/user/actions';
import { withTranslation, translateNodeBBTemplate } from '_core/i18n';
import { Testimonials } from 'areas/reputation/components';
import socket from 'areas/socket/services';
import { getIsLoggedIn } from 'areas/session/selectors';
import GiveReputation from 'areas/reputation/components/GiveReputation';
import { error } from '_core/utils';

const ProfileAvatar = styled(Avatar)`
  border-radius: 0px;
`;

const ProfileBox = styled.div`
  position: relative;
`;

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

  constructor(props) {
    super(props);

    this.state = {
      testimonials: [],
      testimonialsLoading: true,
      testimonialsFailed: false
    };
  }

  handleChatButton = () => {
    this.props.startConversation(this.props.screenData.uid);
  };

  onReputationSubmit = (content, repType, callback) => {
    const { screenData, t } = this.props;
    socket.emit(
      'plugins.ns-testimonials.giveReputation',
      {
        userId: screenData.uid,
        reason: content,
        type: repType
      },
      (e) => {
        if (e) {
          error.showError(e);
          return;
        }
        const howManyCanGive = this.state.howManyCanGive - 1;
        const canGive = howManyCanGive !== 0;
        this.setState({
          howManyCanGive,
          alreadyGave: !canGive,
          canGive: canGive
        });
        message.success(t('reputation-added'));
        callback();
      }
    );
  };

  fetchTestimonials = () => {
    socket.on('event:ns-testimonials.receivedTestimonial', (testimonial) => {
      this.setState({
        testimonials: [testimonial].concat(this.state.testimonials)
      });
    });

    socket.emit(
      'plugins.ns-testimonials.getUserTestimonials',
      {
        uid: this.props.screenData.uid
      },
      (e, testimonials) => {
        if (e) {
          this.setState({
            testimonialsLoading: false,
            testimonialsFailed: true
          });
          return;
        }
        this.setState({
          testimonialsLoading: false,
          notEnoughPosts: testimonials.notEnoughPosts,
          canGive: testimonials.canGive,
          alreadyGave: testimonials.alreadyGave,
          testimonials: testimonials.testimonials,
          howManyCanGive: testimonials.howManyCanGive
        });
      }
    );
  };

  componentDidMount() {
    const { screenData: user } = this.props;
    if (user) {
      this.fetchTestimonials();
    }
  }

  render() {
    const { t, screenData: user, browserTitle, loggedIn, auth } = this.props;

    if (!user) {
      return <Result status='404' title='404' subTitle={t('user-not-exists')} />;
    }
    const {
      notEnoughPosts,
      canGive,
      alreadyGave,
      testimonials,
      testimonialsLoading,
      testimonialsFailed
    } = this.state;

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
            {user.uid != auth?.user?.uid ? (
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

        <div className='container mt-5' style={{ margin: '0 auto', maxWidth: '700px' }}>
          {loggedIn &&
          user.uid != auth?.user?.uid &&
          !testimonialsLoading &&
          !testimonialsFailed ? (
            <Box headerText={t('reputation-give-title')} className='mt-5'>
              <div className='p-2 text-center'>
                <GiveReputation
                  notEnoughPosts={notEnoughPosts}
                  canGive={canGive}
                  alreadyGave={alreadyGave}
                  onSubmit={this.onReputationSubmit}
                />
              </div>
            </Box>
          ) : null}
          <Box headerText={t('reputation-testimonials-title')} className='mt-5'>
            <div className='p-2'>
              <Testimonials testimonials={testimonials} loading={testimonialsLoading} />
            </div>
          </Box>
        </div>
      </div>
    );
  }
}

const actionsToProps = {
  updateUserCoverImage,
  startConversation
};

function mapStateToProps(state) {
  return {
    auth: state.authentication,
    chatsOpened: state.chat.chatsOpened,
    loggedIn: getIsLoggedIn(state)
  };
}

export default connect(mapStateToProps, actionsToProps)(withTranslation('common')(UserProfile));
