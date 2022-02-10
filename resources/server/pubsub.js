const child_process = require('child_process');
const ffmpeg = require('ffmpeg-static');
const pubsub = (io, streams) => {
  // const rtmpUrl = "rtmp://sfo.contribute.live-video.net/app/live_103730989_uwUc4tObDngdgrXmOvygGWLmsDET1e" //decodeURIComponent(match[1]);
  const rtmpUrl = "rtmp://localhost:1935/live/rfBd56ti2SMtYvSgD5xAV0YU99zampta7Z7S575KLkIZ9PYk" //decodeURIComponent(match[1]);
  console.log('Target RTMP URL:', rtmpUrl);
  let ffmpeg_process;

  io.on('connection', function (client) {
    console.log('-- ' + client.id + ' joined --');
    client.emit('id', client.id);
    client.on('message', function (details) {
      var otherClient = io.sockets.connected[details.to];

      if (!otherClient) {
        return;
      }
      delete details.to;
      details.from = client.id;
      otherClient.emit('message', details);
    });

    client.on('readyToStream', function (options) {
      console.log('-- ' + client.id + ' is ready to stream --');
      streams.addStream(client.id, options.name);
    });

    client.on('update', function (options) {
      streams.update(client.id, options.name);
    });

    client.on("startstream", function (data,fn) {
      console.log("Inside PubSub" + data.streamUrl);
      ffmpeg_process = child_process.spawn(`${ffmpeg}`, [
        // Facebook requires an audio track, so we create a silent one here.
        // Remove this line, as well as `-shortest`, if you send audio from the browser.
        // '-f', 'lavfi', '-i', 'anullsrc',

        // FFmpeg will read input video from STDIN
        "-i",
        "-",

        // Because we're using a generated audio source which never ends,
        // specify that we'll stop at end of other input.  Remove this line if you
        // send audio from the browser.
        // '-shortest',

        // If we're encoding H.264 in-browser, we can set the video codec to 'copy'
        // so that we don't waste any CPU and quality with unnecessary transcoding.
        // If the browser doesn't support H.264, set the video codec to 'libx264'
        // or similar to transcode it to H.264 here on the server.
        "-vcodec",
        "copy",

        // AAC audio is required for Facebook Live.  No browser currently supports
        // encoding AAC, so we must transcode the audio to AAC here on the server.
        "-acodec",
        "aac",

        // FLV is the container format used in conjunction with RTMP
        "-f",
        "flv",

        // The output RTMP URL.
        // For debugging, you could set this to a filename like 'test.flv', and play
        // the resulting file with VLC.
        `rtmp://sfo.contribute.live-video.net/app/${data.streamUrl}`,
      ]);

      // If FFmpeg stops for any reason, close the WebSocket connection.
      ffmpeg_process.on("close", (code, signal) => {
        if (ffmpeg_process && ffmpeg_process.stdin) {
          ffmpeg_process.stdin.pause();
          ffmpeg_process.kill();
          ffmpeg_process = undefined;
          console.log(
            "FFmpeg child process closed, code " + code + ", signal " + signal
          );
        }
      });

      // Handle STDIN pipe errors by logging to the console.
      // These errors most commonly occur when FFmpeg closes and there is still
      // data to write.  If left unhandled, the server will crash.
      ffmpeg_process.stdin.on("error", (e) => {
        if (ffmpeg_process && ffmpeg_process.stdin) {
          ffmpeg_process.stdin.pause();
          ffmpeg_process.kill();
          ffmpeg_process = undefined;
          console.log("FFmpeg STDIN Error", e);
        }
      });

      // FFmpeg outputs all of its messages to STDERR.  Let's log them to the console.
      ffmpeg_process.stderr.on("data", (data) => {
        console.log("FFmpeg STDERR:", data.toString());
      });

      fn(true);
    });

    client.on('stopstream', () => {
      ffmpeg_process.stdin.pause();
      ffmpeg_process.kill();
      ffmpeg_process = undefined;
    });

    client.on('mediadata', function (data) {
      if (ffmpeg_process) {
        ffmpeg_process.stdin.write(data);
      }
    });

    function leave() {
      console.log('-- ' + client.id + ' left --');
      streams.removeStream(client.id);
    }

    client.on('disconnect', leave);
    client.on('leave', leave);
  });
};

export default pubsub;