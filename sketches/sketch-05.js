const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [ 1080, 1080 ]
};

let manager;

let text = 'A';
let fontSize = 1200;
let fontFamily = 'serif'
let fontColor = 'white';
let backgroundColor = 'black';

const typeCanvas = document.createElement('canvas');
const typeContext = typeCanvas.getContext('2d');

const sketch = ({ context, width, height }) => {
  const cell = 20; 
  const cols = Math.floor(width / cell);
  const rows = Math.floor(height / cell);
  const numCells = cols * rows;

  typeCanvas.width = cols;
  typeCanvas.height = rows;

  return ({ context, width, height }) => {    
    typeContext.fillStyle = backgroundColor;
    typeContext.fillRect(0, 0, width, height);

    fontSize = cols * 1.2;

    typeContext.fillStyle = fontColor;

    typeContext.font = `${fontSize}px ${fontFamily}`;

    typeContext.textBaseline = 'top';

    const metrics = typeContext.measureText(text);
    mx = metrics.actualBoundingBoxLeft * -1;
    my = metrics.actualBoundingBoxAscent * -1;
    mw = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
    mh = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

    const tx = (cols - mw) * 0.5 -mx;
    const ty = (rows -mh) * 0.5 -my;
    
    typeContext.save();
    typeContext.translate(tx, ty);

    typeContext.beginPath();
    typeContext.rect(mx, my, mw, mh);
    typeContext.stroke();

    typeContext.fillText(text, 0, 0);
    typeContext.restore();

    context.textBaseline = 'middle';

    const typeData = typeContext.getImageData(0,0, cols, rows).data;

    //context.drawImage(typeCanvas, 0, 0);
    
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);
    
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

      context.font = `${cell * 2}px serif`;
      if(Math.random() < 0.1) {
        context.font = `${cell * 6}px serif`;
      }

      context.fillStyle = `rgb(${r}, ${g}, ${b})`;
      
      context.save();
      context.translate(x, y);
      context.translate(cell * 0.5, cell * 0.5);
      //context.fillRect(0 , 0, cell, cell);
      context.beginPath();
      //context.arc(0, 0, cell * 0.5, 0, Math.PI * 2);
      //context.fill();
      context.fillText(glyph, 0, 0 );

      context.restore();
    }
  };
};

const getGlyph = (v) => {
  if(v < 50) {
    return '';
  }

  if(v < 100) {
    return ',';
  }

  if(v < 150) {
    return '-';
  }

  if(v < 200) {
    return '+';
  }

  const glyphs = '_= /'.split('');


  return random.pick(glyphs);
};

const onKeyUp = (e) => {
  text = e.key.toUpperCase();
  manager.render();
};

document.addEventListener('keyup', onKeyUp);

const start = async () => {
  manager = await canvasSketch(sketch, settings);
};

start();

/*const url = 'https://picsum.photos/200';

const loadMeSomeImage = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject();
    img.src = url;
  });
};

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
