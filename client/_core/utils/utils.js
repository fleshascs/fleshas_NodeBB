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

export function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
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

export function wrapEmojis(txt) {
  var regex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|[\ud83c[\ude50\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
  return txt.replace(regex, function (emoji) {
    return '<span class="emoji">' + emoji + '</span>';
  });
}
