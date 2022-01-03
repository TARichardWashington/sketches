const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');
const Tweakpane = require('tweakpane');


const settings = {
  dimensions: [ 1080, 1080 ],
  animate: true
};

const params = {
  cols: 10,
  rows: 10,
};

const sketch = () => {
  return ({ context, width, height, frame }) => {
    context.fillStyle = 'white';
    context.strokeStyle = 'black';
    context.lineWidth = 2;
    context.fillRect(0, 0, width, height);

    const cols = params.cols;
    const rows = params.rows;
    const numCells = cols * rows;

    const gridw = width * 0.8;
    const gridh = height * 0.8;

    const cellw = gridw / cols;
    const cellh = gridh / rows;

    const margx = (width - gridw) * 0.5;
    const margy = (height - gridh) * 0.5;

    for(let i = 0; i < numCells; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);

      const x = col * cellw;
      const y = row * cellh;

      const w = cellw * 0.5;
      const h = cellw * 0.5;

      const n = random.noise3D(x, y, frame, 0.01);

      const angle = n * Math.PI * 0.05;

      context.save();
      context.translate(x, y);
      context.translate(margx, margy);
      context.translate(cellw * 0.5, cellh * 0.5);

      let cat = new Cat(w, h, angle);
      cat.draw(context);
      
      context.restore();
    }


  };
};

class Cat {
  constructor(w, h, n) {
    this.w = w;
    this.h = h;
    this.n = n;

    console.log(this.n);
  }

  draw(context) {
    context.rotate(this.n);

    context.fillStyle = '#533F2E';

    // Face
    context.beginPath();
    context.moveTo(this.w * -0.5, this.h * -0.7);
    context.lineTo(this.w * -0.5, this.h * -0.3);
    context.lineTo(this.w * -0.6, this.h * -0.2);
    context.lineTo(this.w * -0.6, this.h * -0.1);
    context.lineTo(this.w * -0.1, this.h * 0.3);
    context.lineTo(this.w * 0.1, this.h * 0.3);
    context.lineTo(this.w * 0.6, this.h * -0.1);
    context.lineTo(this.w * 0.6, this.h * -0.2);
    context.lineTo(this.w * 0.5, this.h * -0.3); 
    context.lineTo(this.w * 0.5, this.h * -0.7);
    context.lineTo(this.w * 0.3, this.h * -0.4);
    context.lineTo(this.w * -0.3, this.h * -0.4);
    context.lineTo(this.w * -0.5, this.h * -0.7);
    context.stroke();   
    context.fill();

    // Eyes
    context.save();
    context.fillStyle = '#746830';

    context.beginPath();
    context.scale(1, 0.8);
    context.arc(this.w * -0.2, this.h * -0.2, this.w / 9, 0, 2 * Math.PI);
    context.fill(); 
    context.arc(this.w * 0.2, this.h * -0.2, this.w / 9, 0, 2 * Math.PI);
    context.fill(); 


    context.fillStyle = '#090109';

    context.beginPath();
    context.arc(this.w * -0.2, this.h * -0.2, this.w / 11, 0, 2 * Math.PI);
    context.fill(); 
    context.arc(this.w * 0.2, this.h * -0.2, this.w / 11, 0, 2 * Math.PI);
    context.fill(); 

    context.fillStyle = 'white';

    context.beginPath();
    context.arc(this.w * -0.24, this.h * -0.25, this.w / 50, 0, 2 * Math.PI);
    context.fill(); 
    context.arc(this.w * 0.16, this.h * -0.25, this.w / 50, 0, 2 * Math.PI);
    context.fill(); 

    context.restore();

    // Whiskers
    context.fillStyle = 'black';

    context.beginPath();
    context.moveTo(this.w * -0.3, this.h * 0.1);
    context.lineTo(this.w * -0.6, this.h * 0.2);

    context.moveTo(this.w * -0.25, this.h * 0.125);
    context.lineTo(this.w * -0.6, this.h * 0.3);

    context.moveTo(this.w * -0.2, this.h * 0.15);
    context.lineTo(this.w * -0.6, this.h * 0.4);

    context.moveTo(this.w * 0.3, this.h * 0.1);
    context.lineTo(this.w * 0.6, this.h * 0.2);

    context.moveTo(this.w * 0.25, this.h * 0.125);
    context.lineTo(this.w * 0.6, this.h * 0.3);

    context.moveTo(this.w * 0.2, this.h * 0.15);
    context.lineTo(this.w * 0.6, this.h * 0.4);

    context.stroke(); 

    // Stripe
    context.fillStyle = '#EECDA5';

    context.beginPath();
    context.rect(this.w * -0.08, 0, this.w * 0.1, this.h * -0.3);
    context.fill();

    context.beginPath();
    context.rect(this.w * -0.08, this.h * 0.2, this.w * 0.1, this.h * 0.1);
    context.fill();

    // Nose
    context.fillStyle = 'pink';

    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(this.w * -0.1, 0);
    context.lineTo(0, this.h * 0.07);
    context.lineTo(this.w * 0.1, 0);
    context.lineTo(0, 0);
    context.stroke(); 
    context.fill(); 

    // Ears
    context.fillStyle = '#21120B';

    context.beginPath();
    context.moveTo(this.w * -0.33, this.h * -0.4);
    context.lineTo(this.w * -0.49, this.h * -0.65);
    context.lineTo(this.w * -0.49, this.h * -0.3);
    context.stroke(); 
    context.fill(); 

    context.beginPath();
    context.moveTo(this.w * 0.33, this.h * -0.4);
    context.lineTo(this.w * 0.49, this.h * -0.65);
    context.lineTo(this.w * 0.49, this.h * -0.3);
    context.stroke(); 
    context.fill(); 

    // Mouth
    context.fillStyle = '#21120B';

    context.beginPath();
    context.moveTo(0, this.h * 0.07);
    context.lineTo(0, this.h * 0.15); 
    
    context.arc(0 - this.w / 20, this.h * 0.15, this.w / 20, 0, Math.PI);
    context.moveTo(0 + this.w / 10, this.h * 0.15);
    context.arc(0 + this.w / 20, this.h * 0.15, this.w / 20, 0, Math.PI);

    context.stroke(); 
  }
}

const createPane = () => {
  const pane = new Tweakpane.Pane();  
  let folder;

  folder = pane.addFolder({ title: 'Grid'});
};

createPane();

canvasSketch(sketch, settings);
