import socket from 'areas/socket/services';

export async function getIsBoardEnabled() {
  return socket.emitAsync('plugins.drawingBoard.getIsBoardEnabled');
}

export function loadImgData(canvas, imgDataURL, callback) {
  if (imgDataURL) {
    var img = new window.Image();
    img.addEventListener('load', function () {
      canvas.getContext('2d').drawImage(img, 0, 0);
      callback();
    });
    img.setAttribute('src', imgDataURL);
    return;
  }
  callback();
}
