const draw = (streamsContainer, time = 0) => {
  drawVideo(streamsContainer, time);
  // drawInterface(streamsContainer, time);
  requestAnimationFrame(time => draw(streamsContainer, time));
};

const main = () => {
  navigator.mediaDevices
    .getUserMedia({
      video: true,
      audio: true
    })
    .then(stream => {
      const streamsContainer = new StreamContainer({
        mediaStream: stream,
        video: true,
        audio: true,
        selector: "video"
      });
      return streamsContainer;
    })
    .then(draw);
};

window.onload = main;