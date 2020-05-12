import { Dispatcher } from '_core/utils';
export default function Youtube() {
  this.events = new Dispatcher();
}

Youtube.prototype.playVideo = function (videoId, startTime = 0) {
  const player = this;
  if (player.embed) {
    player.embed.loadVideoById(videoId, startTime);
    return;
  }
  player.media = {};
  player.timers = {};
  player.embed = new YT.Player('videoContainer', {
    playerVars: {
      //controls:0,
      cc_load_policy: 0,
      modestbranding: 1,
      enablejsapi: 1,
      widgetid: 3,
      showinfo: 0,
      rel: 0,
      showsearch: 0,
      iv_load_policy: 3
    },
    events: {
      onReady(event) {
        const instance = event.target;

        instance.loadVideoById(videoId, startTime);

        player.media.playById = (videoId) => {
          instance.loadVideoById(videoId, startTime);
        };

        player.media.play = () => {
          instance.playVideo();
        };

        player.media.isMuted = () => {
          const isMuted = instance.isMuted();
          console.log('isMuted', isMuted);
          return isMuted;
        };

        player.media.setVolume = (value) => {
          console.log('setVolume ', value);
          instance.setVolume(value);
        };

        player.media.getVolume = () => {
          const volume = instance.getVolume();
          console.log('volume', volume);
          return volume;
        };

        player.media.pause = () => {
          console.log('pause');
          instance.pauseVideo();
        };

        player.media.stop = () => {
          instance.stopVideo();
        };

        player.media.duration = instance.getDuration();

        Object.defineProperty(player.media, 'currentTime', {
          get() {
            return Number(instance.getCurrentTime());
          },
          set(time) {
            // If paused and never played, mute audio preventively (YouTube starts playing on seek if the video hasn't been played yet).
            if (player.paused && !player.embed.hasPlayed) {
              player.embed.mute();
            }

            // Set seeking state and trigger event
            player.media.seeking = true;
            //triggerEvent.call(player, player.media, 'seeking');

            // Seek after events sent
            instance.seekTo(time);
          }
        });

        player.timers.buffering = setInterval(() => {
          ///console.log('????????');
          // Get loaded % from YouTube
          player.media.buffered = instance.getVideoLoadedFraction();

          // Trigger progress only when we actually buffer something
          if (
            player.media.lastBuffered === null ||
            player.media.lastBuffered < player.media.buffered
          ) {
            player.events.dispatch('buffered', player.media.buffered);
            //console.log('player.media.buffered', player.media.buffered);
          }
          // Set last buffer point
          player.media.lastBuffered = player.media.buffered;
          // Bail if we're at 100%
          if (player.media.buffered === 1) {
            clearInterval(player.timers.buffering);

            // Trigger event
            //triggerEvent.call(player, player.media, 'canplaythrough');
          }
        }, 200);
      },
      onStateChange(event) {
        // Get the instance
        const instance = event.target;

        // Reset timer
        clearInterval(player.timers.playing);

        const seeked = player.media.seeking && [1, 2].includes(event.data);

        if (seeked) {
          // Unset seeking and fire seeked event
          player.media.seeking = false;
          triggerEvent.call(player, player.media, 'seeked');
        }

        // Handle events
        // -1   Unstarted
        // 0    Ended
        // 1    Playing
        // 2    Paused
        // 3    Buffering
        // 5    Video cued
        switch (event.data) {
          case -1:
            // Update scrubber
            //console.log('timeupdate');
            //triggerEvent.call(player, player.media, 'timeupdate');

            // Get loaded % from YouTube
            player.media.buffered = instance.getVideoLoadedFraction();
            //triggerEvent.call(player, player.media, 'progress');

            break;

          case 0:
            //assurePlaybackState.call(player, false);

            // YouTube doesn't support loop for a single video, so mimick it.
            if (player.media.loop) {
              // YouTube needs a call to `stopVideo` before playing again
              instance.stopVideo();
              instance.playVideo();
            } else {
              console.log('ended');
              //triggerEvent.call(player, player.media, 'ended');
            }

            break;

          case 1:
            // Restore paused state (YouTube starts playing on seek if the video hasn't been played yet)
            //if (!player.config.autoplay && player.media.paused && !player.embed.hasPlayed) {
            if (player.media.paused && !player.embed.hasPlayed) {
              player.media.pause();
            } else {
              //assurePlaybackState.call(player, true);

              //triggerEvent.call(player, player.media, 'playing');

              const playerTotalTime = instance.getDuration();

              // Poll to get playback progress
              player.timers.playing = setInterval(() => {
                const playerCurrentTime = instance.getCurrentTime();
                const playerTimeDifference = playerCurrentTime / playerTotalTime;
                //console.log('timeupdate', playerTimeDifference);
                player.events.dispatch('progress', playerTimeDifference);
                //triggerEvent.call(player, player.media, 'timeupdate');
              }, 200);

              // Check duration again due to YouTube bug
              // https://github.com/sampotts/plyr/issues/374
              // https://code.google.com/p/gdata-issues/issues/detail?id=8690
              if (player.media.duration !== instance.getDuration()) {
                player.media.duration = instance.getDuration();

                console.log('duration change', player.media.duration);
                //triggerEvent.call(player, player.media, 'durationchange');
              }
            }

            break;

          case 2:
            // Restore audio (YouTube starts playing on seek if the video hasn't been played yet)
            if (!player.muted) {
              //player.embed.unMute();
            }
            //assurePlaybackState.call(player, false);

            break;

          default:
            break;
        }

        // triggerEvent.call(player, player.elements.container, 'statechange', false, {
        // 	code: event.data,
        // });
      },
      onPlaybackRateChange(event) {
        // Get the instance
        const instance = event.target;

        // Get current speed
        player.media.playbackRate = instance.getPlaybackRate();

        //triggerEvent.call(player, player.media, 'ratechange');
        console.log('player.media.playbackRate', player.media.playbackRate);
      }
    }
  });

  function onPlayerReady(event) {}
};
