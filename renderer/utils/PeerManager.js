import io from 'socket.io-client';
import { attachMediaStream, requestUserMedia } from './adapter';
import Emitter from "./Emitter";
export const PeerManager = (function () {

    var peerDatabase = {}, scence = {
        current: "main"
    }, animationId, localId, mediaRecorder, qualityLevel, peer, remoteVideoEl = {}, camera = {}, localAudioSource = {}, scenceAudioSource = {}, remoteAudioSource = {}, socket = io("http://localhost:3001")

    socket.on('message', handleMessage);
    socket.on('id', function (id) {
        localId = id;
    });

    const audioContext = new AudioContext();
    const mediaSourceAudioDestinationNode = new MediaStreamAudioDestinationNode(audioContext);

    function roundedImage(ctx, x, y, width, height, radius) {
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
        const videoPreviewReverseRation = remoteVideoEl.preview.videoHeight / remoteVideoEl.preview.videoWidth;
        switch (scence.current) {
            case "main":
                if (!remoteVideoEl.preview.paused && !remoteVideoEl.preview.ended) {
                    if (peer.imageElwallpaper) {
                        context.drawImage(peer.imageElwallpaper, 0, 0, peer.canvasEl.width, peer.canvasEl.height);
                    } else {
                        context.fillStyle = "#000000";
                        context.fillRect(0, 0, peer.canvasEl.width, peer.canvasEl.height);
                    }
                    context.drawImage(remoteVideoEl.preview, 0, (peer.canvasEl.height - (peer.canvasEl.width * videoPreviewReverseRation)) / 2, peer.canvasEl.width, peer.canvasEl.width * videoPreviewReverseRation);
                    if (camera.stream?.active) {
                        context.drawImage(camera.preview, peer.positionX, peer.positionY, 160, 90);
                    }
                }
                break;
            case "overlay":
                if (!remoteVideoEl.preview.paused && !remoteVideoEl.preview.ended) {
                    if (peer.imageEl) {
                        context.drawImage(peer.imageEl, 0, 0, peer.canvasEl.width, peer.canvasEl.height);
                        context.drawImage(remoteVideoEl.preview, peer.overlay.coordinates.feed.x, peer.overlay.coordinates.feed.y, peer.canvasEl.width / peer.overlay.coordinates.feed.width, (peer.canvasEl.width * videoPreviewReverseRation) / peer.overlay.coordinates.feed.height);
                        if (camera.stream?.active) {
                            context.drawImage(camera.preview, peer.overlay.coordinates.camera.x, peer.overlay.coordinates.camera.y, peer.overlay.coordinates.camera.width, peer.overlay.coordinates.camera.height);
                        }
                    } else {
                        context.fillStyle = "#000000";
                        context.fillRect(0, 0, peer.canvasEl.width, peer.canvasEl.height);
                        context.drawImage(remoteVideoEl.preview, 0, (peer.canvasEl.height - (peer.canvasEl.width * videoPreviewReverseRation)) / 2, peer.canvasEl.width, peer.canvasEl.width * videoPreviewReverseRation);
                        if (camera.stream?.active) {
                            context.drawImage(camera.preview, peer.positionX, peer.positionY, 160, 90);
                        }
                    }
                }
                break;
            case "starting":
            case "ending":
            case "break":
                context.drawImage(scence.preview, 0, 0, peer.canvasEl.width, peer.canvasEl.height);
                break;
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
            remoteVideoEl.preview = document.createElement('video');
            remoteVideoEl.preview.controls = false;
            remoteVideoEl.preview.autoplay = true;
            remoteVideoEl.preview.muted = "muted";
            remoteVideoEl.stream = event.stream;
            remoteVideoEl.preview.addEventListener('loadedmetadata', function () {
                console.log(`Remote video videoWidth: ${this.videoWidth}px,  videoHeight: ${this.videoHeight}px`);
            });
            attachMediaStream(remoteVideoEl.preview, event.stream);
            if (Object.keys(scenceAudioSource).length > 0) {
                scenceAudioSource?.disconnect();
            }
            remoteAudioSource = audioContext.createMediaStreamSource(event.stream);
            remoteAudioSource.connect(mediaSourceAudioDestinationNode);
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

                    var outputStreams = [];

                    const videoOutputStream = canvasRef.current.captureStream(60); // 30 FPS

                    outputStreams.push(videoOutputStream);
                    outputStreams.push(mediaSourceAudioDestinationNode.stream)

                    const outputStream = new MediaStream();

                    outputStreams.forEach(function (s) {
                        s.getTracks().forEach(function (t) {
                            outputStream.addTrack(t);
                        });
                    });

                    mediaRecorder = new MediaRecorder(outputStream, {
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
            if (mediaRecorder.state !== "inactive") {
                mediaRecorder.stop();
            }
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
        },

        setWallpaper: (wallpaper) => {
            if (!peer.imageElwallpaper) {
                peer.imageElwallpaper = document.createElement('img');
            }
            peer.imageElwallpaper.src = wallpaper
        },

        setCameraPosition: (position) => {
            switch (position) {
                case "bottom-left":
                    peer.positionY = (peer.canvasEl.height - 90);
                    peer.positionX = 0;
                    break;
                case "top-left":
                    peer.positionY = 0;
                    peer.positionX = 0;
                    break;
                case "top-right":
                    peer.positionX = (peer.canvasEl.width - 160);
                    peer.positionY = 0
                    break;
                case "bottom-right":
                    peer.positionX = (peer.canvasEl.width - 160);
                    peer.positionY = (peer.canvasEl.height - 90);
                    break;
            }
            peer.position = position
        },

        startCamera: () => {
            var mediaConfig = {
                audio: {
                    mandatory: {
                        echoCancellation: false,
                        googAutoGainControl: true,
                        googNoiseSuppression: true,
                        googHighpassFilter: true,
                        googTypingNoiseDetection: true,
                    },
                },
                video: {
                    mandatory: {},
                    optional: []
                }
            };
            if (!camera.preview) {
                camera.preview = document.createElement('video')
                camera.preview.controls = false;
                camera.preview.autoplay = true;
                camera.preview.muted = "muted";
            }
            return requestUserMedia(mediaConfig)
                .then(function (stream) {
                    attachMediaStream(camera.preview, stream);
                    camera.stream = stream;
                    localAudioSource = audioContext.createMediaStreamSource(camera.stream);
                    localAudioSource.connect(mediaSourceAudioDestinationNode);
                })
                .catch(Error('Failed to get access to local media.'));
        },

        stopCamera: () => {
            if (camera.stream) {
                camera.stream.getTracks().forEach(function (t) {
                    t.stop();
                });
            }
        },

        selectScence: (selectedScence, src) => {
            switch (selectedScence) {
                case "starting":
                case "ending":
                case "break":
                    if (camera.preview) {
                        camera.preview.pause();
                    }
                    if (!scence.preview) {
                        scence.preview = document.createElement('video')
                        scence.preview.controls = false;
                        scence.preview.autoplay = true;
                        scence.preview.mute = true;
                        scence.preview.loop = true;
                        scence.preview.crossOrigin = "anonymous";
                        scenceAudioSource = audioContext.createMediaElementSource(scence.preview);
                        scenceAudioSource.connect(mediaSourceAudioDestinationNode);

                    } else {
                        if (scence.preview.paused) {
                            scence.preview.play();
                        }
                    }

                    scenceAudioSource.connect(mediaSourceAudioDestinationNode);
                    scence.preview.src = src;
                    if (camera.preview) {
                        camera.stream.getTracks().forEach(function (t) {
                            t.enabled = false;
                        });
                    }

                    if (remoteVideoEl.preview) {
                        remoteVideoEl.stream.getTracks().forEach(function (t) {
                            t.enabled = false;
                        });
                    }

                    break;
                case "main":
                case "overlay":
                    if (camera.preview) {
                        camera.stream.getTracks().forEach(function (t) {
                            t.enabled = true;
                        });
                        camera.preview.play();
                    }

                    if (remoteVideoEl.preview) {
                        remoteVideoEl.stream.getTracks().forEach(function (t) {
                            t.enabled = true;
                        });
                        remoteVideoEl.preview.play();
                    }

                    if (scence.preview) {
                        scenceAudioSource?.disconnect();
                        scence.preview.pause();
                    }
                    break;
            }
            scence.current = selectedScence;
        },

        release: (remoteId) => {
            if (remoteId) {
                cancelAnimationFrame(animationId);
                var context = peer.canvasEl.getContext('2d', { alpha: false });
                context.clearRect(0, 0, peer.canvasEl.width, peer.canvasEl.height);
                peer.pc.close();
                delete peerDatabase[remoteId];
                if (camera.stream) {
                    camera.stream.getTracks().forEach(function (t) {
                        t.stop();
                    });
                }
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
            }
        }
    };



});

const Peer = function (canvasRef) {
    this.pc = new RTCPeerConnection();
    this.canvasEl = canvasRef.current;
    this.overlay = {};
    this.isStreaming = false;
}