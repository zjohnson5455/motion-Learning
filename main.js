var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
let radius = 5;
var dragging = false;
var erase = false;
let erButton = document.getElementById('eraser')

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

context.lineWidth = radius * 2;

var drawOnLoad = function() {
    context.beginPath();
    context.fillStyle = '#FFA500'
    context.moveTo(175, 150);
    context.lineTo(400, 175);
    context.lineTo(500, 125);
    context.lineTo(500, 625);
    context.fill();
    context.beginPath();
    context.fillStyle = 'black'
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
