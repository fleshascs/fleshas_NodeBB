import React from 'react';
import styled from 'styled-components';
import { Avatar, Username } from 'ui';
import { escapeHTML, escapeHTMLEntities, messageDate } from '_core/utils';
import Link from 'next/link';
import { withTranslation } from '_core/i18n';
import { primaryColor, rowLinkColor, defaultFontColor, rowHoverColor } from '_theme';

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
  width: 100%;
  flex: 3;
  overflow: hidden;

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

class Post extends React.Component {
  render() {
    const { topic, t } = this.props;
    return (
      <Container>
        <ThreadNameNCategoryContainer>
          <Link href={'/post/' + topic.pid} passHref>
            <ThreadLink>
              <ThreadName dangerouslySetInnerHTML={{ __html: topic.topic.title }} />
              <ThreadCategory>
                {escapeHTML(escapeHTMLEntities(topic.content)).substring(0, 60)}
              </ThreadCategory>
            </ThreadLink>
          </Link>
        </ThreadNameNCategoryContainer>
        <AnswersColumn>
          <Important>{topic.topic.postcount}</Important>
          <NotImportant>{t('answers-title')}</NotImportant>
        </AnswersColumn>
        <AuthorColumn>
          <Avatar user={topic.user} imgUrl={topic.user.picture} showIndicator={true} />
          <div className='ml-2'>
            <Username user={topic.user}>{topic.user.username}</Username>
            <NotImportant>{messageDate(topic.timestamp)}</NotImportant>
          </div>
        </AuthorColumn>
      </Container>
    );
  }
}
export default withTranslation('common')(Post);
