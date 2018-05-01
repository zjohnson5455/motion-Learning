var minRad = 0.5,
    maxRad = 100,
    interval = 1,
    radSpan = document.getElementById('value'),
    decRad = document.getElementById('dec'),
    incRad = document.getElementById('inc');


var setRadius = function(newRadius) {
  if (newRadius < minRad) {
    newRadius = minRad;
  }
  else if (newRadius > maxRad) {
    newRadius = maxRad;
  }
  radius = newRadius;
  context.lineWidth = radius * 2;

  radSpan.innerHTML = radius;
}

decRad.addEventListener('click', function() {
  setRadius(radius - interval);
})

incRad.addEventListener('click', function() {
  setRadius(radius + interval);
})
