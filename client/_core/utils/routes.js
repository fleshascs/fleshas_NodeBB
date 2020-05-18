export function buildCategoryUrl(pageNumber, slug) {
  const page = pageNumber > 1 ? `?page=${pageNumber}` : '';
  const path = {
    pathname: '/category',
    query: { slug: slug + page }
  };
  const url = '/category/' + slug + page;
  return { path, url };
}

export function buildNewTopicUrl(cid) {
  const path = {
    pathname: '/new_topic',
    query: { cid: cid }
  };
  const url = '/new-topic/' + cid;
  return { path, url };
}

export function buildTopicUrl(pageNumber, slug, teaserIndex) {
  const page = pageNumber > 1 ? `?page=${pageNumber}` : '';
  const teaser = teaserIndex ? '/' + teaserIndex : '';
  const path = {
    pathname: '/topic',
    query: { slug: slug + (page || teaser) }
  };
  const url = '/topic/' + slug + (page || teaser);
  return { path, url };
}

export function buildUserUrl(slug) {
  const path = {
    pathname: '/user',
    query: { slug: slug }
  };
  const url = '/user/' + slug;
  return { path, url };
}

export function buildUserSettingsUrl(slug) {
  const path = {
    pathname: '/settings',
    query: { userSlug: slug }
  };
  const url = '/user/' + slug + '/edit';
  return { path, url };
}

export function buildSlugFromLocation() {
  return window.location.pathname.split('/').slice(2).join('/');
}
