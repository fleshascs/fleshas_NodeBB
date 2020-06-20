import React from 'react';
import { Box } from 'ui';
import Post from './Post';
import { useTranslation } from '_core/i18n';
import { getIsLoggedIn } from 'areas/session/selectors';
import { useSelector } from 'react-redux';

export default function LatestPosts({ topics, className }) {
  if (!topics) return null;
  const { t } = useTranslation();
  const isLoggedIn = useSelector(getIsLoggedIn);

  return (
    <Box className={className} headerText={t('panel-newest-posts')}>
      {topics.map((topic) => {
        return <Post topic={topic} key={topic.slug} isLoggedIn={isLoggedIn} />;
      })}
    </Box>
  );
}
