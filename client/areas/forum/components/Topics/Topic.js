import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Avatar, Username } from 'ui';
import Link from 'next/link';
import { messageDate, buildTopicUrl, buildUserUrl } from '_core/utils';
import { withTranslation } from '_core/i18n';
import UnreadIndicator from 'ui/UnreadIndicator';
import {
  Container,
  AuthorColumn,
  ViewsColumn,
  AnswersColumn,
  NotImportant,
  ImportantBig,
  SubjectContainer,
  SmallText
} from './Topic.css';
import { rowLinkColor } from '_theme';

const TopicLink = styled.a`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: normal;
  color: ${rowLinkColor};
`;
const PostLink = styled.a`
  color: #9c9c9c;
`;

class Topic extends PureComponent {
  render() {
    const { topic, t } = this.props;
    const route = buildTopicUrl(null, topic.slug, topic.teaser && topic.teaser.index);
    const userRoute = buildUserUrl(topic.user.userslug);
    return (
      <Container deleted={topic.deleted}>
        <div>
          <Link href={userRoute.path} as={userRoute.url}>
            <a>
              <Avatar
                size='50'
                imgUrl={topic.user.picture}
                user={topic.user}
                showIndicator={true}
              />
            </a>
          </Link>
        </div>
        <SubjectContainer>
          <Link href={route.path} as={route.url} passHref>
            <TopicLink>
              {topic.unread ? <UnreadIndicator className='mr-1' /> : ''}
              {topic.locked ? '🔒 ' : ''}
              {topic.pinned ? '📌 ' : ''}
              <span
                dangerouslySetInnerHTML={{
                  __html: topic.title
                }}
              />
            </TopicLink>
          </Link>
          <SmallText>
            {messageDate(topic.timestamp)} •{' '}
            <Username user={topic.user}>{topic.user.username}</Username>
          </SmallText>
        </SubjectContainer>
        <AnswersColumn className='mobile-d-none'>
          <ImportantBig>{topic.postcount}</ImportantBig>
          <NotImportant>{t('answers-title')}</NotImportant>
        </AnswersColumn>
        <ViewsColumn className='mobile-d-none'>
          <ImportantBig>{topic.viewcount}</ImportantBig>
          <NotImportant>{t('views-title')}</NotImportant>
        </ViewsColumn>
        {topic.teaser ? (
          <AuthorDetails topic={topic} route={route} userRoute={userRoute} />
        ) : (
          <AuthorColumn
            className='mobile-d-none'
            style={{
              borderLeft: `3px solid #a8a6a6`,
              paddingLeft: '1rem'
            }}
          >
            <SmallText>{t('no-answers')}</SmallText>
          </AuthorColumn>
        )}
      </Container>
    );
  }
}

export default withTranslation('common')(Topic);

const AuthorDetails = (props) => {
  const { topic, route, userRoute } = props;
  return (
    <div
      className='mobile-d-none'
      style={{
        borderLeft: `3px solid #a8a6a6`,
        paddingLeft: '1rem',
        flex: 2,
        overflow: 'hidden'
      }}
    >
      <AuthorColumn>
        <Link href={userRoute.path} as={userRoute.url}>
          <div className='m-1'>
            <Avatar imgUrl={topic.user.picture} user={topic.user} showIndicator={true} />
          </div>
        </Link>

        <div className='ml-2 d-flex w-100'>
          <Username user={topic.teaser.user}>{topic.teaser.user.username}</Username>

          <NotImportant className='ml-auto'>{messageDate(topic.teaser.timestamp)}</NotImportant>
        </div>
      </AuthorColumn>
      <NotImportant>
        <Link href={route.path} as={route.url} passHref>
          <PostLink dangerouslySetInnerHTML={{ __html: topic.teaser.content.substring(0, 60) }} />
        </Link>
      </NotImportant>
    </div>
  );
};
