import React, { PureComponent } from 'react';
import { Box } from 'ui';
import Post from './Post';
import { withTranslation } from '_core/i18n';

class LatestPosts extends PureComponent {
  render() {
    if (!this.props.topics) return null;
    return (
      <Box className={this.props.className} headerText={this.props.t('panel-newest-posts')}>
        {this.props.topics.map((topic) => {
          return <Post topic={topic} key={topic.slug} />;
        })}
      </Box>
    );
  }
}

export default withTranslation('common')(LatestPosts);
