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

// https://media1.giphy.com/media/3oz8xODcLLAxb8Qyju/200.gif?cid=e1bb72ffe43d9f2452ae3899dcc9c725376052433de111ef&rid=200.gif

export function whenAllImagesLoads(messages) {
  const images = getImageUrls(messages);
  const promises = [];
  for (const url of images) {
    promises.push(loadingPromise(url));
  }

  function loadingPromise(url) {
    const img = new Image();
    img.src = url;

    if (img.complete) {
      return Promise.resolve();
    }

    return new Promise((resolve) => {
      img.onload = resolve;
    });
  }

  return Promise.all(promises);
}
