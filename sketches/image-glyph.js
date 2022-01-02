const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [ 686, 860 ]
};

let manager, img;

let backgroundColor = 'black';

const typeCanvas = document.createElement('canvas');
const typeContext = typeCanvas.getContext('2d');

const sketch = ({ context, width, height }) => {
  const cell = 10; 
  const cols = Math.floor(width / cell);
  const rows = Math.floor(height / cell);
  const numCells = cols * rows;

  typeCanvas.width = cols;
  typeCanvas.height = rows;

  return ({ context, width, height, frame }) => {    
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    context.fillStyle = 'rgb(0, 0, 0)';

    typeContext.save();
    typeContext.drawImage(img, 0, 0, cols, rows);
    typeContext.restore(); 
    
    const typeData = typeContext.getImageData(0, 0, cols, rows).data; 

    //context.drawImage(typeCanvas, 0, 0);
    
    for (let i = 0; i < numCells; i++) {

      const col = i % cols;
      const row = Math.floor(i / cols);

      const x = col * cell;
      const y = row * cell;

      const r = typeData[i * 4 + 0];
      const g = typeData[i * 4 + 1];
      const b = typeData[i * 4 + 2];
      const a = typeData[i * 4 + 3];

      const glyph = getGlyph(r);

      context.save();
      context.fillStyle = `rgb(${r}, ${g}, ${b})`;
      context.font = `${cell * Math.random() * 5}px serif`;
      const f = frame;
      const n = random.noise3D(x, y, f, 0.001);
      const angle = n * Math.PI * 0.5;

      context.translate(x, y);
      //context.translate(cell * 0.5, cell * 0.5);
      //context.fillRect(0 , 0, cell -1 , cell -1);
      //context.beginPath();
      //context.arc(0, 0, cell * 0.3, 0, Math.PI * 2);
      //context.fill();
      context.rotate(angle);
      context.fillText(glyph, 0, 0 );
      context.restore();

    }
  };
};

const getGlyph = (v) => {
  if(v < 150) {
    return 'the';
  }

  if(v < 200) {
    return 'red';
  }

  if(v < 255) {
    return 'wheelbarrow';
  }

  if(v < 150) {
    return '+';
  }

  const glyphs = '_= /'.split('');


  return random.pick(glyphs);
};

/*const onKeyUp = (e) => {
  text = e.key.toUpperCase();
  manager.render();
};

document.addEventListener('keyup', onKeyUp);*/

const url = 'https://images-na.ssl-images-amazon.com/images/I/8120V9sFVQL._RI_.jpg';

const start = async () => {
  img = await loadMeSomeImage(url);

  manager = await canvasSketch(sketch, settings);
};

const loadMeSomeImage = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject();
    img.src = url;
    img.crossOrigin = "Anonymous";
  });
};

start();

/*

const start = async () => {
  const img = await loadMeSomeImage(url);
  console.log('image width', img.width);
  console.log('this line');
};

const start = () => {
  loadMeSomeImage(url).then(img => {
    console.log('image width', img.width);
  });
  console.log('this line');
};

start();*/
