var canvas = document.getElementById('drawing');
var context = canvas.getContext('2d');
var backgroundCanvas = document.getElementById('background')
var backgroundContext = backgroundCanvas.getContext('2d')
let radius = 5;
var dragging = false;
var erase = false;
let erButton = document.getElementById('eraser')

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

backgroundCanvas.width = window.innerWidth;
backgroundCanvas.height = window.innerHeight;

context.lineWidth = radius * 2;
backgroundContext.lineWidth = radius * 2;

var drawOnLoad = function() {
    backgroundContext.beginPath();
    backgroundContext.fillStyle = '#FFA500'
    backgroundContext.moveTo(175, 150);
    backgroundContext.lineTo(400, 175);
    backgroundContext.lineTo(500, 125);
    backgroundContext.lineTo(500, 625);
    backgroundContext.fill();
    backgroundContext.beginPath();
}

var putPoint = function(e) {
  if (dragging && !erase) {
    context.globalCompositeOperation="source-over";
    context.lineTo(e.clientX, e.clientY);
    context.stroke();
    context.beginPath();
    context.arc(e.clientX, e.clientY, radius, 0, Math.PI * 2);
    context.fill();
    context.beginPath();
    context.moveTo(e.clientX, e.clientY);
  }
  else if (dragging && erase) {
    context.globalCompositeOperation="destination-out"; // https://stackoverflow.com/questions/25907163/html5-canvas-eraser-tool-without-overdraw-white-color
    context.lineTo(e.clientX, e.clientY);
    context.stroke();
    context.beginPath();
    context.arc(e.clientX, e.clientY, radius, 0, Math.PI * 2);
    context.fill();
    context.beginPath();
    context.moveTo(e.clientX, e.clientY);

  }
}

var engage = function(e) {
  dragging = true;
  putPoint(e);
}

var disengage = function() {
  dragging = false;
  context.beginPath();
}
erButton.addEventListener('click', function() {
  erase = !erase;
  if(!erase) {
    erButton.innerHTML = "ERASE"
    context.beginPath();
  }
  else {
    erButton.innerHTML = "DRAW"
  }
})
canvas.addEventListener('mousedown', engage);
canvas.addEventListener('mousemove', putPoint);
canvas.addEventListener('mouseup', disengage);
