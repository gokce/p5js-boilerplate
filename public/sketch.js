let socket;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

  socket = io.connect('http://localhost:3000');
  socket.on('mouse', incomingMouse);
}

function draw() {
  // background(0);
  // translate(width/2, height/2);
  // rotate(frameCount/10%TWO_PI)
  // circle(20, 0, 40);
}

function incomingMouse(data) {
  fill(255);
  circle(data.x, data.y, 20);
}

function mouseDragged() {
  let data = {
    x: mouseX,
    y: mouseY
  }

  socket.emit('mouse', data);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
