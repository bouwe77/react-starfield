import { useEffect, useRef } from "react";

export default function Starfield({ speed, ...rest }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    createStarfield(canvas, speed);
  }, [speed]);

  return <canvas ref={canvasRef} {...rest} />;
}

function createStarfield(canvas, speed) {
  var context = canvas.getContext("2d");

  /*
For fullscreen:
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
*/
  // constants
  canvas.width = 200; // 1200;
  canvas.height = 200; //700;
  var numStars = 100;
  var centerX = canvas.width / 2;
  var centerY = canvas.height / 2;

  var stars = [];

  const randomPlanetIndex = 123123; // disabled for now
  const planetSize = 20;
  const weightedStarSizes = Array(1)
    .fill(0.1)
    .concat(Array(2).fill(0.2))
    .concat(Array(3).fill(0.3))
    .concat(Array(4).fill(0.4))
    .concat(Array(5).fill(0.5));
  for (var i = 0; i < numStars; i++) {
    stars[i] = new Star(
      i === randomPlanetIndex
        ? planetSize
        : weightedStarSizes[
            Math.floor(Math.random() * weightedStarSizes.length)
          ]
    );
  }

  function Star(size) {
    this.x = Math.random() * canvas.width; // x location
    this.y = Math.random() * canvas.height; // y location
    this.z = Math.random() * canvas.width; // z location (depth of star)

    this.move = function () {
      this.z = this.z - speed;
      if (this.z <= 0) {
        this.z = canvas.width;
      }
    };

    this.show = function () {
      var x, y, s;
      x = (this.x - centerX) * (canvas.width / this.z);
      x = x + centerX;

      y = (this.y - centerY) * (canvas.width / this.z);
      y = y + centerY;

      s = size * (canvas.width / this.z);

      context.beginPath();
      context.fillStyle = "white";
      context.arc(x, y, s, 0, Math.PI * 2);
      context.fill();
    };
  }

  function draw() {
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < numStars; i++) {
      stars[i].show();
      stars[i].move();
    }
  }

  function update() {
    draw();
    window.requestAnimationFrame(update);
  }

  update();
}
