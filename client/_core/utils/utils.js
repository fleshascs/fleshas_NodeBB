import moment from 'moment';

export function messageDate(timestamp) {
  return moment(new Date(timestamp), 'YYYY-MM-DD HHmmss').fromNow();
}

export function dateTime(timestamp) {
  return moment(new Date(timestamp), 'YYYY-MM-DD HHmmss').format('LLL');
}

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

export function promisify(nodeFunction) {
  function promisified(...args) {
    return new Promise((resolve, reject) => {
      function callback(err, ...result) {
        if (err) return reject(err);
        if (result.length === 1) return resolve(result[0]);
        return resolve(result);
      }
      nodeFunction.call(null, ...args, callback);
    });
  }
  return promisified;
}

function createParser(removeEntities = false) {
  //http://www.howtocreate.co.uk/sidehtmlentity.html
  const hexMap = {
    '&amp;': '&',
    '&#x5C;': '\\',
    '&#x2F;': '/',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#x27;': "'",
    '&#x3D;': '='
  };
  //hope I get XSS after this :)
  const regexp = new RegExp(Object.keys(hexMap).join('|'), 'g');

  return function (str) {
    if (removeEntities) {
      return str.replace(regexp, '');
    }
    return str.replace(regexp, function (m) {
      return hexMap[m];
    });
  };
}

export const htmlDecode = createParser();

export const escapeHTMLEntities = (str) =>
  str.replace(/&(?:#x[a-f0-9]+|#[0-9]+|[a-z0-9]+);?/gi, '');

export function escapeHTML(unsafe) {
  return unsafe.replace(/<(?:.|\n)*?>/gm, '');
}

export function htmlDecodeObject(obj) {
  if (typeof obj !== 'object') {
    return obj;
  }
  for (var key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = htmlDecode(obj[key]);
    }
  }
  return obj;
}

export function setCookie(name, value, days) {
  var expires = '';
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = name + '=' + (value || '') + expires + '; path=/';
}

export function findImageUrls(str) {
  let match;
  const urls = [];
  //const rex = /<img[^>]+src="?([^"\s]+)"?\s*\/>/g;
  const rex = /<img.*?src="(.*?)"/g; ///<img.*?src="(.*?)"/g;
  while ((match = rex.exec(str))) {
    urls.push(match[1]);
  }
  return urls;
}

export function getImageUrls(messages) {
  const urls = messages.reduce(function (images, message) {
    const urls = findImageUrls(message.content);
    for (let url of urls) {
      images.add(url);
    }
    return images;
  }, new Set());
  return [...urls];
}

export function whenAllImagesLoads(messages) {
  const images = getImageUrls(messages);
  const promises = [];
  for (const url of images) {
    promises.push(loadingPromise(url));
  }

  function loadingPromise(url) {
    const img = new Image();
    img.src = url;
    return new Promise((resolve) => {
      img.onload = resolve;
    });
  }

  return Promise.all(promises);
}

// issue persist with html entity display in <meta /> tags
// https://github.com/facebook/react/issues/13838
// https://github.com/zeit/next.js/issues/2006
export function renderMetaTag(tag, translateContentFn = (t) => t) {
  delete tag.noEscape;
  tag.content = tag.content ? htmlDecode(translateContentFn(tag.content.replace(/\n/g, ' '))) : '';
  return <meta {...tag} key={tag.name || tag.property} />;
}

export function renderLinkTag(tag) {
  return <link {...tag} key={tag.rel} />;
}

export function formUrlencoded(body) {
  const params = new URLSearchParams();
  for (var key in body) {
    params.append(key, body[key]);
  }
  return params;
}
