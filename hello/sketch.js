//Global variables(글로벌 변수)
// let 변수 생성의 기본

let capture;

//var 글로벌 변수-> 웬만하면 사용X
//const -> 수정되지 않는 변수

const cam_w = 640;
const cam_h = 480;
let prevBrightestPixelLocation;

function setup() {
  background(0);
  createCanvas(cam_w, cam_h);

  capture = createCapture(VIDEO);
  capture.size(cam_w, cam_h);

  prevBrightestPixelLocation = createVector(width / 2, height / 2);
  
}

//
function draw() {
  capture.loadPixels();

  let brightestValue = 0;

  let brightestPixelLocation = createVector(0, 0);

  if (capture.pixels.length > 0) {
    //const stepSize = 40;

    for (let y = 0; y < capture.height; y++) {
      for (let x = 0; x < capture.width; x++) {
        const index = (x + y * capture.width) * 4;

        const r = capture.pixels[index];
        const g = capture.pixels[index + 1];
        const b = capture.pixels[index + 2];
        const a = capture.pixels[index + 3];

        const brightness = (r + g + b) / 3;

        if (brightness > brightestValue) {
          brightestValue = brightness;
          brightestPixelLocation = createVector(x, y);
        }
      }
    }
    // draw the capture feed
    push()
      translate(capture.width, 0);
      scale(-1, 1)
      // draw an ellipse where the brightest pixel is
      stroke(0, 255, 0);
    strokeWeight(4);
      line(prevBrightestPixelLocation.x, prevBrightestPixelLocation.y, brightestPixelLocation.x, brightestPixelLocation.y);
    pop()
    
    prevBrightestPixelLocation = createVector(brightestPixelLocation.x, brightestPixelLocation.y);
  }
}
