const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [ 1080, 1080 ]
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    context.fillStyle = 'rgb(0, 0, 0)';

    const cx = 0;
    const cy = 0;
    let x, y;

    const w = width * 0.01;
    const h = height * 0.1;

    const num = 65;
    const radius = width;
    const gradientStep = 255 / num;
    const colourStart = 0;

    for(let i = 0; i < num; i++) {
      const slice = math.degToRad(360 / num);
      const angle = slice * i;

      const color =  colourStart + (gradientStep * i);

      context.fillStyle = 'rgb('+ color +','+ color +','+ color +')';

      x = cx + radius * Math.sin(angle);
      y = cy + radius * Math.cos(angle);

      // Clock //
      context.save();
      context.translate(x, y);
      context.rotate(-angle);
      context.scale(random.range(0.1, 2), random.range(0.2, 0.5));
  
      context.beginPath();
      context.rect(-w * 0.5, random.range(0, -h * 0.5), w, h);
      context.fill();
      context.restore();
      // End clock //

      // Start eye
      context.save();
      context.strokeStyle = 'rgb('+ color +','+ color +','+ color +')';
      context.translate(cx, cy);
      context.rotate(angle);
      context.lineWidth = random.range(5, 25);
      context.beginPath();
      context.arc(0, 0, radius * random.range(0.7, 1.3), slice * random.range(1, -8), slice * random.range(1, 5));
      context.stroke();      
      context.restore();
      // End eye

      // Start pupil
      context.save();
      context.strokeStyle = 'rgb('+ (color + 100 ) +','+ (color - 50) +','+ (color - 50)  +')';
      context.translate(cx, cy);
      context.rotate(angle);
      context.lineWidth = random.range(1, 6);
      context.beginPath();
      context.arc(0, 0, radius / 3 * random.range(0.2, 1.3), slice * random.range(1, -20), slice * random.range(1, 5));
      context.stroke();      
      context.restore();
      // End pupil

      // Start eye ball
      context.save();
      context.strokeStyle = 'rgba('+ (color + 100 ) +','+ (color - 50) +','+ (color - 50)  +', 0.1)';
      context.translate(cx, cy);
      context.rotate(angle);
      context.lineWidth = random.range(1, 6);
      context.beginPath();
      context.arc(0, 0, radius / 2 * random.range(0.2, 1.3), slice * random.range(1, -20), slice * random.range(1, 5));
      context.stroke();      
      context.restore();
      // End eye ball
    }   
  };
};

canvasSketch(sketch, settings);
