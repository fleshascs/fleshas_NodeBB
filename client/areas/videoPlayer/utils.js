import socket from 'areas/socket/services';

export async function getLatestVideo() {
  return socket.emitAsync('plugins.youtubePlayer.getCurrent');
}

export function diff_seconds(t2, t1) {
  var dif = t1 - t2;
  var Seconds_from_T1_to_T2 = dif / 1000;
  return Math.round(Math.abs(Seconds_from_T1_to_T2));
}
