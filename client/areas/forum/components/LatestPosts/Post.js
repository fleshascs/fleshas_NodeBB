import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Avatar, Username } from 'ui';
import Link from 'next/link';
import { withTranslation } from '_core/i18n';
import { messageDate, buildTopicUrl } from '_core/utils';
import { primaryColor, rowHoverColor, rowLinkColor, defaultFontColor } from '_theme';

const Container = styled.div`
  display: flex;
  padding-left: 0.5rem;
  padding-bottom: 0.25rem;
  padding-top: 0.25rem;
  padding-right: 0.5rem;
  color: #000;

  &:hover {
    color: ${primaryColor} !important;
    text-decoration: none;
    background: ${rowHoverColor};
  }
`;

const AuthorColumn = styled.div`
  display: flex;
  flex: 1.4;

  @media (max-width: 750px) {
    display: none;
  }
`;
const ViewsColumn = styled.div`
  flex: 1;
  text-align: center;
`;

const AnswersColumn = styled.div`
  flex: 1;
  text-align: center;
`;

const Important = styled.div`
  color: ${defaultFontColor};
  font-weight: 100;
  font-size: 1rem;
`;
const NotImportant = styled.div`
  font-size: 12px;
  color: #9c9c9c;
`;

const ThreadNameNCategoryContainer = styled.div`
  overflow: hidden;
  width: 100%;
  flex: 3;

  & a {
    color: ${rowLinkColor};
  }
`;
const ThreadName = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 450;
  font-size: 13px;
`;
const ThreadCategory = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 12px;
  color: #9c9c9c;
`;
const ThreadLink = styled.a`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    text-decoration: none;
  }
`;

class Post extends PureComponent {
  render() {
    const { topic, t } = this.props;
    let { teaser, viewcount, postcount, title } = topic;
    const link = buildTopicUrl(null, topic.slug, topic.teaser ? topic.teaser.index : null);
    if (!teaser) {
      teaser = {
        user: topic.user,
        timestamp: topic.timestamp,
        content: topic.category.name
      };
    }

    return (
      <Container>
        <ThreadNameNCategoryContainer>
          <Link href={link.path} as={link.url} passHref>
            <ThreadLink>
              <ThreadName
                dangerouslySetInnerHTML={{
                  __html: `${topic.locked ? '🔒 ' : ''}
                ${topic.pinned ? '📌 ' : ''}
                ${title}`
                }}
              />
              <ThreadCategory
                dangerouslySetInnerHTML={{ __html: teaser.content.substring(0, 60) }}
              />
            </ThreadLink>
          </Link>
        </ThreadNameNCategoryContainer>

        <ViewsColumn>
          <Important>{viewcount}</Important>
          <NotImportant>{t('views')}</NotImportant>
        </ViewsColumn>
        <AnswersColumn>
          <Important>{postcount}</Important>
          <NotImportant>{t('answers')}</NotImportant>
        </AnswersColumn>
        <AuthorColumn>
          <Avatar user={teaser.user} imgUrl={teaser.user.picture} showIndicator={true} />
          <div className='ml-2'>
            <Username user={teaser.user}>{teaser.user.username}</Username>
            <NotImportant>{messageDate(teaser.timestamp)}</NotImportant>
          </div>
        </AuthorColumn>
      </Container>
    );
  }
}
export default withTranslation('common')(Post);
