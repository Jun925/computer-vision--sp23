// Face detection with mediapipe
// https://google.github.io/mediapipe/solutions/face_detection.html

let sketch = function(p) {

  let arial;

  p.preload = function() {
    arial = p.loadFont('Arial.ttf');
  }

  p.setup = function() {
    p.createCanvas(cam_w, cam_h, p.WEBGL);
    p.setAttributes({alpha: true})
    p.rectMode(p.CENTER);
  }

  p.draw = function() {
    p.clear(0);
    p.translate(-p.width/2, -p.height/2)

    if(detections != undefined) {
      if(detections.detections != undefined) {
        
        console.log(detections)
        
        p.drawFaces();
        // console.log(detections.detections);
      }
    }
  }

  p.drawFaces = function() {
    p.strokeWeight(10);

    for(let i = 0; i < detections.detections.length; i++) {

      // it's not necessary to create this boundingBox variable, but it makes for less typing and neater coder
      const boundingBox = detections.detections[i].boundingBox;
      const bbX = p.width -  boundingBox.xCenter * p.width;
      const bbY = boundingBox.yCenter * p.height;
      const bbW = boundingBox.width *p.width;
      const bbH = boundingBox.height * p.height;

      
      p.fill(255, 255, 255, 80);
      p.rect(bbX, bbY, bbW, bbH);

      p.stroke(0, 255, 0);
      for(let j = 0; j < detections.detections[i].landmarks.length; j++) {
        const facePoint = detections.detections[i].landmarks[j]
        const x = p.width - (facePoint.x * p.width)
        const y = facePoint.y * p.height
        
        //p.point(x, y);

        //p.text(j,x,y)

        
        // function preload() {
        //   inconsolata = p.loadFont('assets/inconsolata.otf');
        // }
        //function setup() {
          //p.createCanvas(100, 100, WEBGL);
          p.textFont(arial);
          p.textSize(p.width / 3);
          p.textAlign(p.CENTER, p.CENTER);
          p.fill(0, 102, 150);
        //}
        // function draw() {
        //   background(0);
          let time = p.millis();
          p.rotateX(time / 1000);
          p.rotateZ(time / 1234);
          p.text(j, x, y);
        //}


      }
    }
  }
}

let myp5 = new p5(sketch)