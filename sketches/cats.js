const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');
const Tweakpane = require('tweakpane');


const settings = {
  dimensions: [ 8080, 8080 ]
};

const params = {
  cols: 10,
  rows: 10,
};

class Cat {
  constructor(w, h, n) {
    this.w = w;
    this.h = h;
    this.n = n;

    this.stripe = Math.random() > 0.9;

    this.blep = Math.random() > 0.95;

    const colours = ['#685E44', '#655951', '#4E3B31', '#615D4E', '#3F3433', '#B2875F'];
    this.colour = colours[Math.floor(Math.random() * colours.length)];

    const eyeColours = ['#3E5E73', '#79461D', '#92893B', '#FCE161'];
    this.eyecolour = eyeColours[Math.floor(Math.random() * eyeColours.length)];

    const earColours = ['#21120B', '#F7DFD3', '#4E3C2E'];
    this.earColour = earColours[Math.floor(Math.random() * earColours.length)];

    const noseColours = ['#160D08', '#693520', '#91504E', '#C69293'];
    this.noseColour = noseColours[Math.floor(Math.random() * noseColours.length)];

    this.dialation = random.range(0.06, 1);

    const looking = [0.03,-0.03 , 0 ,0 ,0 ,0 ];
    this.looking = looking[Math.floor(Math.random() * looking.length)] * this.dialation;

    const hairstyles = ['flat','flat','flat','flat','spike-left','spike-right','spike-center','mohawk'];
    this.hairstyle = hairstyles[Math.floor(Math.random() * hairstyles.length)];

    console.log(this.colour + ' ' + this.eyecolour + ' ' + this.stripe + ' ' + this.hairstyle + ' ' + this.blep);

    if(this.colour === '#685E44' && this.eyecolour === '#92893B' && this.stripe === true && this.noseColour === '#C69293' && this.earColour === '#F7DFD3') {
      this.bagel = true;
      console.log(this.colour + ' ' + this.eyecolour + ' ' + this.stripe + ' ' + this.blep);
      console.log('Meeperation');
    } 
  }

  update(context, n) {
    this.n = n * 0.1;
    context.rotate(this.n);
  }

  draw(context) {
    context.lineWidth = 1;
    context.fillStyle = this.colour;

    // Face
    context.beginPath();
    context.moveTo(this.w * -0.5, this.h * -0.7);
    context.lineTo(this.w * -0.5, this.h * -0.3);
    context.lineTo(this.w * -0.55, this.h * -0.2);
    context.lineTo(this.w * -0.55, this.h * 0);
    context.lineTo(this.w * -0.1, this.h * 0.3);
    context.lineTo(this.w * 0.1, this.h * 0.3);
    context.lineTo(this.w * 0.55, this.h * -0);
    context.lineTo(this.w * 0.55, this.h * -0.2);
    context.lineTo(this.w * 0.5, this.h * -0.3); 
    context.lineTo(this.w * 0.5, this.h * -0.7);
    context.lineTo(this.w * 0.3, this.h * -0.4);

    if(this.hairstyle === 'flat') {
      context.lineTo(this.w * -0.3, this.h * -0.4);
    } else if(this.hairstyle === 'spike-left') {    
      context.lineTo(this.w * 0.2, this.h * -0.5);
      context.lineTo(this.w * 0.2, this.h * -0.4);
      context.lineTo(this.w * 0.1, this.h * -0.5);
      context.lineTo(this.w * 0.1, this.h * -0.4);
      context.lineTo(this.w * 0.0, this.h * -0.5);
      context.lineTo(this.w * 0.0, this.h * -0.4);
      context.lineTo(this.w * -0.1, this.h * -0.5);
      context.lineTo(this.w * -0.1, this.h * -0.4);
      context.lineTo(this.w * -0.2, this.h * -0.5);
      context.lineTo(this.w * -0.2, this.h * -0.4);
      context.lineTo(this.w * -0.3, this.h * -0.5);
      context.lineTo(this.w * -0.3, this.h * -0.4);
    }  else if(this.hairstyle === 'spike-center') {    
      context.lineTo(this.w * 0.3, this.h * -0.5);
      context.lineTo(this.w * 0.2, this.h * -0.4);
      context.lineTo(this.w * 0.2, this.h * -0.5);
      context.lineTo(this.w * 0.1, this.h * -0.4);
      context.lineTo(this.w * 0.1, this.h * -0.5);
      context.lineTo(this.w * 0.0, this.h * -0.4);
      context.lineTo(this.w * -0.1, this.h * -0.5);
      context.lineTo(this.w * -0.1, this.h * -0.4);
      context.lineTo(this.w * -0.2, this.h * -0.5);
      context.lineTo(this.w * -0.2, this.h * -0.4);
      context.lineTo(this.w * -0.3, this.h * -0.5);
      context.lineTo(this.w * -0.3, this.h * -0.4);
    }else if(this.hairstyle === 'spike-right') {    
      context.lineTo(this.w * 0.3, this.h * -0.5);
      context.lineTo(this.w * 0.2, this.h * -0.4);
      context.lineTo(this.w * 0.2, this.h * -0.5);
      context.lineTo(this.w * 0.1, this.h * -0.4);
      context.lineTo(this.w * 0.1, this.h * -0.5);
      context.lineTo(this.w * 0.0, this.h * -0.4);
      context.lineTo(this.w * -0.0, this.h * -0.5);
      context.lineTo(this.w * -0.1, this.h * -0.4);
      context.lineTo(this.w * -0.1, this.h * -0.5);
      context.lineTo(this.w * -0.2, this.h * -0.4);
      context.lineTo(this.w * -0.2, this.h * -0.5);
      context.lineTo(this.w * -0.3, this.h * -0.4);
    } else if(this.hairstyle === 'mohawk') {   
    
      context.lineTo(this.w * 0.1, this.h * -0.4);
      context.lineTo(this.w * 0.0, this.h * -0.45);
      context.lineTo(this.w * -0.1, this.h * -0.4);
      context.lineTo(this.w * -0.3, this.h * -0.4);
    }
    
    context.lineTo(this.w * -0.5, this.h * -0.7);
    context.fill();

    // Eyes
    context.save();
    context.fillStyle = this.eyecolour;

    context.beginPath();
    context.scale(1, 0.8);
    context.arc(this.w * -0.2, this.h * -0.2, this.w / 9, 0, 2 * Math.PI);
    context.fill(); 
    context.arc(this.w * 0.2, this.h * -0.2, this.w / 9, 0, 2 * Math.PI);
    context.fill();

    context.fillStyle = '#090109';

    context.save();
    context.beginPath();
    context.ellipse(this.w * (-0.20 + this.looking), this.h * -0.2, this.w / 11 * this.dialation, this.w / 10, 0, 0, 2 * Math.PI);
    context.fill(); 
    context.ellipse(this.w * (0.20 + this.looking), this.h * -0.2, this.w / 11 * this.dialation, this.w / 10, 0, 0, 2 * Math.PI);
    context.fill(); 
    context.restore();

    context.fillStyle = 'white';

    context.beginPath();
    context.arc(this.w * -0.27, this.h * -0.25, this.w / 60, 0, 2 * Math.PI);
    context.fill(); 
    context.arc(this.w * 0.13, this.h * -0.25, this.w / 60, 0, 2 * Math.PI);
    context.fill(); 

    context.restore();

    // Whiskers
    context.lineWidth = 3;
    context.fillStyle = 'black';

    context.beginPath();
    context.moveTo(this.w * -0.3, this.h * 0.1);
    context.lineTo(this.w * -0.7, this.h * 0.2);

    context.moveTo(this.w * -0.25, this.h * 0.125);
    context.lineTo(this.w * -0.6, this.h * 0.3);

    context.moveTo(this.w * -0.2, this.h * 0.15);
    context.lineTo(this.w * -0.5, this.h * 0.4);

    context.moveTo(this.w * 0.3, this.h * 0.1);
    context.lineTo(this.w * 0.7, this.h * 0.2);

    context.moveTo(this.w * 0.25, this.h * 0.125);
    context.lineTo(this.w * 0.6, this.h * 0.3);

    context.moveTo(this.w * 0.2, this.h * 0.15);
    context.lineTo(this.w * 0.5, this.h * 0.4);

    context.stroke();    

    // Stripe
    if(this.stripe) {
      context.fillStyle = '#EECDA5';

      context.beginPath();
      context.rect(this.w * -0.08, 0, this.w * 0.1, this.h * -0.3);
      context.fill();

      context.beginPath();
      context.rect(this.w * -0.08, this.h * 0.225, this.w * 0.1, this.h * 0.075);
      context.fill();
    }   

    // Nose
    context.fillStyle = this.noseColour;
    context.beginPath();
    context.moveTo(0 - (this.w * 0.1), -this.h * 0.02);
    context.lineTo(this.w * -0.1, 0);
    context.lineTo(0, this.h * 0.07);
    context.lineTo(this.w * 0.1, 0);
    context.lineTo(this.w * 0.1, -this.h * 0.02);
    context.lineTo(0 - (this.w * 0.1), -this.h * 0.02);
    context.fill(); 

    // Ears
    context.fillStyle = this.earColour;

    context.beginPath();
    context.moveTo(this.w * -0.32, this.h * -0.4);
    context.lineTo(this.w * -0.48, this.h * -0.65);
    context.lineTo(this.w * -0.48, this.h * -0.3);
    context.fill(); 

    context.beginPath();
    context.moveTo(this.w * 0.32, this.h * -0.4);
    context.lineTo(this.w * 0.48, this.h * -0.65);
    context.lineTo(this.w * 0.48, this.h * -0.3);
    context.fill(); 

    // Mouth
    context.beginPath();
    context.moveTo(0, this.h * 0.07);
    context.lineTo(0, this.h * 0.15); 
    context.lineTo(0 + this.h * 0.15, this.h * 0.22);
    context.moveTo(0, this.h * 0.15); 
    context.lineTo(0 + this.h * -0.15, this.h * 0.22);
    context.stroke(); 
    
    // Use an arc??
    //context.arc(0 - this.w / 20, this.h * 0.15, this.w / 20, 0, Math.PI);
    //context.moveTo(0 + this.w / 10, this.h * 0.15);
    //context.arc(0 + this.w / 20, this.h * 0.15, this.w / 20, 0, Math.PI);

    // Blep
    if(this.blep) {
      context.fillStyle = '#AC496B';
      context.beginPath();
      context.moveTo(0, this.h * 0.15); 
      context.arc(0, this.h * 0.15, this.h * 0.07, Math.PI * 2.14, Math.PI * 0.86);
      context.stroke()
      context.fill(); 
    } 

    // Meep
    if(this.bagel) {
      context.fillStyle = 'black';
      context.font = `${(this.w * 0.3)}px Arial`;
      context.fillText("Meeep!", 0 - (this.w * 0.5), this.h *0.8);
    }
  }
}

const sketch = ({ context, width, height, frame }) => {
    const cols = params.cols;
    const rows = params.rows;
    const numCells = cols * rows;

    const gridw = width * 0.8;
    const gridh = height * 0.8;

    const cellw = gridw / cols;
    const cellh = gridh / rows;

    const margx = (width - gridw) * 0.5;
    const margy = (height - gridh) * 0.5;

    let cats = [];

    for (let i = 0; i < numCells; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);

      const x = col * cellw;
      const y = row * cellh;

      const w = cellw * 0.5;
      const h = cellw * 0.5;

      const n = random.noise3D(x, y, frame, 0.01);

      const angle = n * Math.PI * 0.05;
      cats.push(new Cat(w, h, angle));  
    }

  return ({ context, width, height, frame }) => {
    context.fillStyle = 'white';
    context.strokeStyle = 'black';
    context.lineWidth = 1;
    context.fillRect(0, 0, width, height);    

    for(let i = 0; i < cats.length; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);

      const x = col * cellw;
      const y = row * cellh;

      const n = random.noise3D(x, y, frame, 0.01);

      context.save();
      context.translate(x, y);
      context.translate(margx, margy);
      context.translate(cellw * 0.5, cellh * 0.5);

      let cat = cats[i];

      cat.update(context, n);
      cat.draw(context);
      context.restore();
    }
  };
};

canvasSketch(sketch, settings);
