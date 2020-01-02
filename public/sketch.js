function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  translate(width/2, height/2);
  rotate(frameCount/10%TWO_PI)
  circle(20, 0, 40);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
