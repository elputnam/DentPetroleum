var colorCount = 30;
var hueValues = [];
var saturationValues = [];
var brightnessValues = [];
var actRandomSeed = 0;
var alphaValue = 65;
var r = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  noStroke();
}

function draw() {
  background(random(20), 1);
  randomSeed(actRandomSeed);
  colorGrid();
  noFill();
  stroke(random(100, 200), 100, 100);
  //circle(mouseX, mouseY, r);
  for (let i = 0; i < 7; i++) {
    ellipse(mouseX, mouseY, r * i);
  }
  r += random(-5, 5);
  
  if (r > height*.75){
    r = 0
  }
}

function colorGrid() {
  // ------ colors ------
  // create palette
  for (var i = 0; i < colorCount; i++) {
    if (i % 2 == 0) {
      hueValues[i] = random(200, 360);
      saturationValues[i] = random(100);
      brightnessValues[i] = random(100);
    } else {
      hueValues[i] = 195;
      saturationValues[i] = random(20);
      brightnessValues[i] = 100;
    }
  }

  // ------ area tiling ------
  // count tiles
  var counter = 0;
  // row count and row height
  var rowCount = int(random(5, 30));
  var rowHeight = height / rowCount;

  // seperate each line in parts
  for (var i = rowCount; i >= 0; i--) {
    // how many fragments
    var partCount = i + 1;
    var parts = [];

    for (var ii = 0; ii < partCount; ii++) {
      // sub fragments or not?
      if (random() < 0.075) {
        // take care of big values
        var fragments = int(random(2, 20));
        partCount = partCount + fragments;
        for (var iii = 0; iii < fragments; iii++) {
          parts.push(random(2));
        }
      } else {
        parts.push(random(2, 20));
      }
    }

    // add all subparts
    var sumPartsTotal = 0;
    for (var ii = 0; ii < partCount; ii++) {
      sumPartsTotal += parts[ii];
    }

    // draw rects
    var sumPartsNow = 0;
    for (var ii = 0; ii < parts.length; ii++) {
      sumPartsNow += parts[ii];

      if (random() < 0.45) {
        var x = map(sumPartsNow, 0, sumPartsTotal, 0, width);
        var y = rowHeight * i;
        var w = -map(parts[ii], 0, sumPartsTotal, 0, width);
        var h = rowHeight * 1.5;

        var index = counter % colorCount;
        var col1 = color(0);
        var col2 = color(
          hueValues[index],
          saturationValues[index],
          brightnessValues[index],
          alphaValue
        );
        gradient(x, y, w, h, col1, col2);
      }

      counter++;
    }
  }
  if (frameCount % 20 == 0) {
    actRandomSeed = random(100000);
    loop();
  }
}

function gradient(x, y, w, h, c1, c2) {
  var ctx = drawingContext; // global canvas context p5.js var
  var grd = ctx.createLinearGradient(x, y, x, y + h);
  grd.addColorStop(0, c1.toString());
  grd.addColorStop(1, c2.toString());
  ctx.fillStyle = grd;
  ctx.fillRect(x, y, w, h);
}
