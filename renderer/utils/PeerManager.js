import io from 'socket.io-client';
import { attachMediaStream,requestUserMedia } from './adapter';
import Emitter from "./Emitter";
export const PeerManager = (function () {
    // var localId,
    var peerDatabase = {}, animationId, localId, mediaRecorder, qualityLevel, peer, camera = {}, socket = io("http://localhost:3001")

    socket.on('message', handleMessage);
    socket.on('id', function (id) {
        localId = id;
    });

    function roundedImage(ctx,x,y,width,height,radius){
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
      }

    const updateCanvas = function () {
        var context = peer.canvasEl.getContext('2d', { alpha: false });
        if (!peer.remoteVideoEl.paused && !peer.remoteVideoEl.ended) {
            if (peer.imageEl) {
                context.drawImage(peer.imageEl, 0, 0, peer.imageEl.width / 2, peer.imageEl.height / 2);
                // roundedImage(context,peer.overlay.coordinates.feed.x, peer.overlay.coordinates.feed.y, peer.canvasEl.width / peer.overlay.coordinates.feed.width, peer.canvasEl.height / peer.overlay.coordinates.feed.height,10);
                // context.clip();
                context.drawImage(peer.remoteVideoEl, peer.overlay.coordinates.feed.x, peer.overlay.coordinates.feed.y, peer.canvasEl.width / peer.overlay.coordinates.feed.width, peer.canvasEl.height / peer.overlay.coordinates.feed.height);
                if (camera.preview) {
                    context.drawImage(camera.preview, peer.overlay.coordinates.camera.x, peer.overlay.coordinates.camera.y, peer.overlay.coordinates.camera.width, peer.overlay.coordinates.camera.height);
                }
            } else {
                context.drawImage(peer.remoteVideoEl, 0, 0, peer.canvasEl.width, peer.canvasEl.height);
            }

        }
        animationId = requestAnimationFrame(updateCanvas);
    }


    function addPeer(remoteId, canvasRef) {
        var peer = new Peer(canvasRef);
        peer.pc.onicecandidate = function (event) {
            if (event.candidate) {
                send('candidate', remoteId, {
                    label: event.candidate.sdpMLineIndex,
                    id: event.candidate.sdpMid,
                    candidate: event.candidate.candidate
                });
            }
        };

        peer.pc.onaddstream = function (event) {
            attachMediaStream(peer.remoteVideoEl, event.stream);
            animationId = requestAnimationFrame(updateCanvas);
            Emitter.emit("canvas-status", {
                canvasEnabled: true
            });
        };


        peer.pc.oniceconnectionstatechange = function (event) {
            switch (
            (event.srcElement // Chrome
                || event.target) // Firefox
                .iceConnectionState) {
                case 'disconnected':
                    cancelAnimationFrame(animationId);
                    var context = peer.canvasEl.getContext('2d', { alpha: false });
                    context.clearRect(0, 0, peer.canvasEl.width, peer.canvasEl.height);
                    delete peerDatabase[remoteId];


                    if (peer.isStreaming) {
                        if (mediaRecorder) {
                            if (mediaRecorder.state !== "inactive") {
                                mediaRecorder.stop();
                            }
                        }
                        socket.emit("stopstream");
                        Emitter.emit("stream-status", {
                            streamEnabled: false
                        });
                    }

                    Emitter.emit("canvas-status", {
                        canvasEnabled: false
                    });

                    break;
            }
        };
        peerDatabase[remoteId] = peer;

        return peer;
    }

    function answer(remoteId) {
        var pc = peerDatabase[remoteId].pc;
        pc.createAnswer(
            function (sessionDescription) {
                pc.setLocalDescription(sessionDescription);
                send('answer', remoteId, sessionDescription);
            },
            error
        );
    }

    function offer(remoteId) {
        var pc = peerDatabase[remoteId].pc;
        pc.createOffer(
            function (sessionDescription) {
                pc.setLocalDescription(sessionDescription);
                send('offer', remoteId, sessionDescription);
            },
            error
        );
    }

    function handleMessage(message) {
        var type = message.type,
            from = message.from,
            pc = (peerDatabase[from] || addPeer(from)).pc;

        console.log('received ' + type + ' from ' + from);

        switch (type) {
            case 'offer':
                pc.setRemoteDescription(new RTCSessionDescription(message.payload), function () { }, error);
                answer(from);
                break;
            case 'answer':
                pc.setRemoteDescription(new RTCSessionDescription(message.payload), function () { }, error);
                break;
            case 'candidate':
                if (pc.remoteDescription) {
                    pc.addIceCandidate(new RTCIceCandidate({
                        sdpMLineIndex: message.payload.label,
                        sdpMid: message.payload.id,
                        candidate: message.payload.candidate
                    }), function () { }, error);
                }
                break;
        }
    }

    function send(type, to, payload) {
        console.log('sending ' + type + ' to ' + to);

        socket.emit('message', {
            to: to,
            type: type,
            payload: payload
        });
    }


    function error(err) {
        console.log(err);
    }

    return {

        changeQuality: (value) => {
            qualityLevel = value;
        },

        startStream: (canvasRef) => {
            socket.emit("startstream", (status) => {
                peer.isStreaming = true;
                if (status) {
                    const mediaStream = canvasRef.current.captureStream(60); // 30 FPS
                    mediaRecorder = new MediaRecorder(mediaStream, {
                        mimeType: 'video/webm;codecs=h264',
                        videoBitsPerSecond: qualityLevel
                    });

                    mediaRecorder.addEventListener('dataavailable', (e) => {
                        socket.emit("mediadata", e.data);
                    });

                    mediaRecorder.start(1000);
                    Emitter.emit("stream-status", {
                        streamEnabled: true
                    });
                }
            })

        },

        stopStream: () => {
            peer.isStreaming = false;
            mediaRecorder.stop();
            socket.emit("stopstream");
            Emitter.emit("stream-status", {
                streamEnabled: false
            });
        },

        peerInit: function (remoteId, canvasRef) {
            peer = peerDatabase[remoteId] || addPeer(remoteId, canvasRef);
            send('init', remoteId, null);
        },

        peerRenegociate: function (remoteId) {
            offer(remoteId);
        },

        send: function (type, payload) {
            socket.emit(type, payload);
        },

        setOverlay: (overlay) => {
            peer.overlay = overlay;
            if (!peer.imageEl) {
                peer.imageEl = document.createElement('img');
            }
            peer.imageEl.src = peer.overlay.url
            peer.canvasEl.width = peer.imageEl.width / 2
            peer.canvasEl.height = peer.imageEl.height / 2
        },

        startCamera: () => {
            var mediaConfig = {
                audio: true,
                video: {
                    mandatory: {},
                    optional: []
                }
            };
            camera.preview = document.createElement('video')
            camera.preview.controls = false;
            camera.preview.autoplay = true;
            return requestUserMedia(mediaConfig)
                .then(function (stream) {
                    attachMediaStream(camera.preview, stream);
                    camera.stream = stream;
                })
                .catch(Error('Failed to get access to local media.'));
        },

        stopCamera: () => {
            for (var track in camera.stream.getTracks()) {
                track.stop();
            }
            camera.preview.src = '';
        }
    };

});

const Peer = function (canvasRef) {
    this.pc = new RTCPeerConnection();
    this.remoteVideoEl = document.createElement('video');
    this.canvasEl = canvasRef.current;
    this.remoteVideoEl.controls = false;
    this.overlay = {};
    this.remoteVideoEl.autoplay = true;
    this.isStreaming = false;
}