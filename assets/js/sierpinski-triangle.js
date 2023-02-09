let pointContainer = document.querySelector('.points-container');
let pointCounter = document.getElementById('counter');
let linePart = document.getElementById('line-part');
let startBtn = document.getElementById('start');
let stopBtn = document.getElementById('stop');
let startInterval, processIsStarted = false;

let stage = new Konva.Stage({
  container: 'container',
  width: window.innerWidth,
  height: window.innerHeight,
});

let layer = new Konva.Layer();
let points = [];
let lastPoint = null;
let counter = 0;
let linePartNum = 2;

stage.on('click', function (evt) {
    if(processIsStarted) return;
    let coord = evt.evt;
    let point = new Konva.Circle({
      x: coord.clientX,
      y: coord.clientY,
      width: 5,
      height: 5,
      fill: '#ff0000',
      draggable: true,
    });
    layer.add(point);
    layer.draw();

    if(lastPoint){
        points.push(lastPoint);
    }
    lastPoint = point;

    if(points.length > 2){
        startBtn.style.display = "";
        linePart.style.display = "";
    }
});


startBtn.addEventListener('click', function(){
    if(startInterval) return;
    processIsStarted = true;
    startInterval = setInterval(drawRandomPoint, 10);
    pointContainer.style.display = "";
    stopBtn.style.display = "";

    linePartNum = parseInt(linePart.value);
    linePart.disabled = true;
})
stopBtn.addEventListener('click', function(){
    clearInterval(startInterval);
    startInterval = null
})

function drawRandomPoint(){
    let random_point = Math.floor(Math.random() * points.length);
    let new_point_coord_x = (1 / linePartNum * lastPoint.attrs.x) + ((linePartNum - 1) / linePartNum * points[random_point].attrs.x);
    let new_point_coord_y = (1 / linePartNum * lastPoint.attrs.y) + ((linePartNum - 1) / linePartNum * points[random_point].attrs.y);

    let point = new Konva.Circle({
      x: new_point_coord_x,
      y: new_point_coord_y,
      width: 5,
      height: 5 ,
      fill: '#ffffff',
      draggable: true,
    });
    layer.add(point);
    layer.draw();

    lastPoint = point;

    counter++;
    pointCounter.innerText = counter;
}


stage.add(layer);
