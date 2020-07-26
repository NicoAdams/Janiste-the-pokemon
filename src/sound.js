var audioContext;
import dingPath from "./assets/sounds/ding.mp3";

function initAudioContext() {
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  audioContext = new AudioContext();
}

function Sound(path) {
  const self = this;
  this.path = path;

  this.load = function () {
    const request = new XMLHttpRequest();
    request.open("GET", self.path, true);
    request.responseType = "arraybuffer";

    request.onload = function () {
      audioContext.decodeAudioData(request.response).then(function (buffer) {
        self.buffer = buffer;
      });
    };
    request.send();
  };

  this.play = function () {
    var source = audioContext.createBufferSource();
    source.buffer = self.buffer;
    source.connect(audioContext.destination);
    source.start(0);
  };

  this.load();
}

window.onclick = function () {
  // the audio context must be initialized AFTER user input
  initAudioContext();
  // sounds must be generated after the audio context is initialized
  const ding = new Sound(dingPath);

  // once ding is loaded it can be played any time.
  window.onclick = function () {
    ding.play();
  };
};
