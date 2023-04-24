class Effect {
  constructor(canvas, video) {
    this.canvas = canvas;
    this.video = video;
    this.ctx = canvas.getContext("2d");

    const audioCtx = new AudioContext();
    this.osc = audioCtx.createOscillator();
    this.osc.connect(audioCtx.destination);
    this.osc.frequency.value = 0;
    this.osc.start();

    this.#animate();
  }

  #animate() {
    const { ctx, canvas, video } = this;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    const locs = getLocationWithColor(imgData, { r: 255, g: 255, b: 0 });

    if (locs.length > 0) {
      const center = average(locs);

      const p = 1 - center.y / canvas.height;
      const freq = 200 + 500 * p;
      this.osc.frequency.value = freq;

      ctx.beginPath();
      ctx.strokeStyle = "blue";
      ctx.lineWidth = 5;
      ctx.moveTo(0, center.y);
      ctx.lineTo(canvas.width, center.y);
      ctx.stroke();
    } else {
      this.osc.frequency.value = 0;
    }
    requestAnimationFrame(this.#animate.bind(this));
  }
}
`
0

72
1
 
79
2
 
47
3
 
255
`;
