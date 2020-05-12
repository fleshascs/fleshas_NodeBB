import React, { PureComponent } from 'react';
import { Avatar, Username } from 'ui';
import Link from 'next/link';
import {
  Container,
  LastPost,
  ViewsColumn,
  ImportantBig,
  NotImportant,
  CategoryName,
  CategoryDescription,
  AnswersColumn,
  PostLink
} from './Category.css';
import { messageDate, buildTopicUrl, buildCategoryUrl } from '_core/utils';
import { withTranslation } from '_core/i18n';

class Category extends PureComponent {
  render() {
    const { category, t } = this.props;
    const categoryLink = buildCategoryUrl(null, category.slug);
    const recentPost = category.posts[0];
    const topicLink = recentPost
      ? buildTopicUrl(null, recentPost.topic.slug, recentPost.index)
      : null;
    return (
      <Container>
        <div className='col-sm-5'>
          <Link href={categoryLink.path} as={categoryLink.url}>
            <a>
              <CategoryName dangerouslySetInnerHTML={{ __html: category.name }} />
            </a>
          </Link>
          <CategoryDescription
            className='text-muted'
            dangerouslySetInnerHTML={{ __html: category.description }}
          />
        </div>
        <ViewsColumn>
          <ImportantBig>{category.post_count}</ImportantBig>
          <NotImportant>{t('posts-title')}</NotImportant>
        </ViewsColumn>
        <AnswersColumn style={{ borderRight: `4px solid ${category.bgColor}` }}>
          <ImportantBig>{category.topic_count}</ImportantBig>
          <NotImportant>{t('topics-title')}</NotImportant>
        </AnswersColumn>
        {recentPost ? (
          <LastPost className='col-sm-3 '>
            <Avatar
              size='28'
              imgUrl={recentPost.user.picture}
              user={recentPost.user}
              showIndicator={true}
            />
            <div className='mr-2 pl-3 w-100'>
              <div className='d-flex w-100'>
                <Username user={recentPost.user}>{recentPost.user.username}</Username>
                <small className='text-muted ml-auto'>{messageDate(recentPost.timestamp)}</small>
              </div>
              <Link href={topicLink.path} as={topicLink.url} passHref>
                <PostLink>
                  <small
                    dangerouslySetInnerHTML={{ __html: recentPost.content.substring(0, 60) }}
                  />
                </PostLink>
              </Link>
            </div>
          </LastPost>
        ) : (
          <div className='text-muted float-right col-sm-3 pl-3 mobile-d-none'>
            {t('empty-topics')}
          </div>
        )}
      </Container>
    );
  }
}

export default withTranslation('common')(Category);
