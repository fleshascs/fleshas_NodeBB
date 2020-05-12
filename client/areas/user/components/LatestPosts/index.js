import React, { Component } from 'react';
import { Box } from 'ui';
import Post from './Post';
import { withTranslation } from '_core/i18n';

class LatestPosts extends Component {
  render() {
    const { t } = this.props;
    const topics = (this.props.data && this.props.data.topics) || [];

    return (
      <Box className={this.props.className} headerText={t('newest-topics')}>
        {!topics.length ? <div className='p-3'>{t('empty-topics')}</div> : null}
        {topics.map((topic) => {
          return <Post topic={topic} key={topic.timestamp} />;
        })}
      </Box>
    );
  }
}

export default withTranslation('common')(LatestPosts);
