let pointContainer = document.querySelector('.points-container');
let pointCounter = document.getElementById('counter');
let startBtn = document.getElementById('start');
let stopBtn = document.getElementById('stop');
let startInterval, processIsStarted = false;
let counter = 0;

let stage = new Konva.Stage({
    container: 'container',
    width: window.innerWidth,
    height: window.innerHeight,
});

let layer = new Konva.Layer();

layer.offsetX(-window.innerWidth/2)
layer.offsetY(-window.innerHeight + 50)

let coord_x = 0;
let coord_y = 0;


startBtn.addEventListener('click', function(){
    if(startInterval) return;
    processIsStarted = true;
    startInterval = setInterval(drawRandomPoint, 1);
    pointContainer.style.display = "";
    stopBtn.style.display = "";
})
stopBtn.addEventListener('click', function(){
    clearInterval(startInterval);
    startInterval = null
})

function drawRandomPoint(){
    let zx, zy;
    let rand = Math.random()*100;
    if (rand < 1) {
        zx = 0;
        zy = 0.16 * coord_y;
    } else if (rand < 86) {
        zx = 0.85 * coord_x + 0.04 * coord_y;
        zy = -0.04 * coord_x + 0.85 * coord_y + 1.6;
    } else if (rand < 94) {
        zx = 0.2 * coord_x - 0.26 * coord_y;
        zy = 0.23 * coord_x + 0.22 * coord_y + 1.6;
    } else {
        zx = -0.15 * coord_x + 0.28 * coord_y;
        zy = 0.26 * coord_x + 0.24 * coord_y + 0.44;
    }

    coord_x = zx;
    coord_y = zy;

    let point = new Konva.Circle({
      x: coord_x * 50,
      y: -coord_y * 50,
      width: 2,
      height: 2,
      fill: '#009402',
    });
    layer.add(point);
    layer.draw();

    counter++;
    pointCounter.innerText = counter;
}


stage.add(layer);
